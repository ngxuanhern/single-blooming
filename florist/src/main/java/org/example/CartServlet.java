package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.*;
import java.io.*;

@WebServlet("/api/cart")
public class CartServlet extends HttpServlet {
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
        JsonObject item = requestBodyJson.getJsonObject("item");

        if (username.isEmpty() || item == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Invalid input\"}");
            return;
        }

        // Add the item with Unpaid status
        JsonObject itemWithStatus = Json.createObjectBuilder(item)
                .add("status", "Unpaid") // Add "Unpaid" status
                .build();

        synchronized (this) {
            String realPath = getServletContext().getRealPath(CART_FILE);
            File file = new File(realPath);
            JsonObject cartData = Json.createObjectBuilder().build();

            // Load existing cart data
            if (file.exists() && file.length() > 0) {
                try (JsonReader jsonReader = Json.createReader(new FileReader(file))) {
                    cartData = jsonReader.readObject();
                } catch (JsonException e) {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    response.getWriter().write("{\"message\": \"Error reading cart data\"}");
                    return;
                }
            }

            // Add item to user's cart
            JsonArrayBuilder userCart = Json.createArrayBuilder(cartData.getJsonArray(username) != null
                    ? cartData.getJsonArray(username)
                    : Json.createArrayBuilder().build());
            userCart.add(itemWithStatus);

            JsonObjectBuilder updatedCartData = Json.createObjectBuilder(cartData);
            updatedCartData.add(username, userCart);

            // Save the updated cart data
            try (FileWriter writer = new FileWriter(file)) {
                Json.createWriter(writer).writeObject(updatedCartData.build());
            }

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\": \"Item added to cart\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        setCorsHeaders(response);

        response.setContentType("application/json");

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
                JsonArray userCart = cartData.getJsonArray(username);

                if (userCart != null) {
                    // Filter out only "Unpaid" items
                    JsonArrayBuilder unpaidItems = Json.createArrayBuilder();
                    for (JsonValue itemValue : userCart) {
                        JsonObject item = itemValue.asJsonObject();
                        if ("Unpaid".equals(item.getString("status"))) {
                            unpaidItems.add(item);
                        }
                    }

                    response.getWriter().write(unpaidItems.build().toString());
                } else {
                    response.getWriter().write("[]");
                }
            } catch (JsonException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"message\": \"Error reading cart data\"}");
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        setCorsHeaders(response);

        response.setContentType("application/json");

        String username = request.getParameter("username");
        String itemName = request.getParameter("item");

        if (username == null || username.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Username is required\"}");
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
                if (!item.getString("name").equals(itemName)) {
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
            response.getWriter().write("{\"message\": \"Item removed from cart\"}");
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
