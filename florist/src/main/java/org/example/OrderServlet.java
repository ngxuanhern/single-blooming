package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.*;
import java.io.*;

@WebServlet("/api/order")
public class OrderServlet extends HttpServlet {
    private static final String CART_FILE = "/WEB-INF/cart.json";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        setCorsHeaders(response);

        response.setContentType("application/json");

        BufferedReader reader = request.getReader();
        StringBuilder requestBodyBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBodyBuilder.append(line);
        }
        String requestBody = requestBodyBuilder.toString();

        JsonObject requestBodyJson;
        try {
            requestBodyJson = Json.createReader(new StringReader(requestBody)).readObject();
        } catch (JsonException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Invalid JSON format\"}");
            return;
        }

        String username = requestBodyJson.getString("username", "");

        if (username.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Invalid input\"}");
            return;
        }

        synchronized (this) {
            String realPath = getServletContext().getRealPath(CART_FILE);
            File file = new File(realPath);
            JsonObject cartData = Json.createObjectBuilder().build();

            if (file.exists() && file.length() > 0) {
                try (JsonReader jsonReader = Json.createReader(new FileReader(file))) {
                    cartData = jsonReader.readObject();
                } catch (JsonException e) {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    response.getWriter().write("{\"message\": \"Error reading cart data\"}");
                    return;
                }
            }

            JsonArray userCart = cartData.getJsonArray(username);
            if (userCart == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"message\": \"Cart is empty\"}");
                return;
            }

            JsonArrayBuilder updatedCart = Json.createArrayBuilder();
            for (JsonValue value : userCart) {
                JsonObject item = value.asJsonObject();
                if ("Unpaid".equals(item.getString("status"))) {
                    // Update status to "Paid" when checkout is made
                    JsonObject itemWithPaidStatus = Json.createObjectBuilder(item)
                            .add("status", "Paid")
                            .build();
                    updatedCart.add(itemWithPaidStatus);
                } else {
                    updatedCart.add(item);
                }
            }

            JsonObjectBuilder updatedCartData = Json.createObjectBuilder(cartData);
            updatedCartData.add(username, updatedCart);

            // Save updated cart data
            try (FileWriter writer = new FileWriter(file)) {
                Json.createWriter(writer).writeObject(updatedCartData.build());
            }

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Payment successful! Items marked as Paid.\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        setCorsHeaders(response);

        response.setContentType("application/json");

        // Get the username from request parameters
        String username = request.getParameter("username");

        if (username == null || username.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Username is required\"}");
            return;
        }

        synchronized (this) {
            String realPath = getServletContext().getRealPath(CART_FILE);
            File file = new File(realPath);

            if (!file.exists() || file.length() == 0) {
                response.getWriter().write("[]");
                return;
            }

            try (JsonReader jsonReader = Json.createReader(new FileReader(file))) {
                JsonObject cartData = jsonReader.readObject();
                JsonArrayBuilder paidItems = Json.createArrayBuilder();

                // Check if the cart contains the user and filter for "Paid" items
                JsonArray userCart = cartData.getJsonArray(username);
                if (userCart != null) {
                    for (JsonValue itemValue : userCart) {
                        JsonObject item = itemValue.asJsonObject();
                        if ("Paid".equals(item.getString("status"))) {
                            paidItems.add(item);
                        }
                    }
                }

                response.getWriter().write(paidItems.build().toString());
            } catch (JsonException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"message\": \"Error reading cart data\"}");
            }
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
