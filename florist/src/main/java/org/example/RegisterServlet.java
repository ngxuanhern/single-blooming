package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.*;
import java.io.*;

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {
    private static final String USERS_FILE = "/WEB-INF/users.json";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers
        setCorsHeaders(response);

        response.setContentType("application/json");

        // Read and parse request body
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
        String password = requestBodyJson.getString("password", "");

        if (username.isEmpty() || password.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Invalid input\"}");
            return;
        }

        synchronized (this) {
            String realPath = getServletContext().getRealPath(USERS_FILE);
            File file = new File(realPath);
            JsonArray existingUsers = Json.createArrayBuilder().build(); // Default empty array

            // Load existing users if the file exists
            if (file.exists() && file.length() > 0) {
                try (JsonReader jsonReader = Json.createReader(new FileReader(file))) {
                    existingUsers = jsonReader.readArray();
                } catch (JsonException e) {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    response.getWriter().write("{\"message\": \"Error reading users data\"}");
                    return;
                }
            }

            // Check for duplicate username
            for (JsonValue user : existingUsers) {
                JsonObject userObject = user.asJsonObject();
                if (userObject.getString("username").equals(username)) {
                    response.setStatus(HttpServletResponse.SC_CONFLICT);
                    response.getWriter().write("{\"message\": \"User already exists\"}");
                    return;
                }
            }

            // Add the new user
            JsonArrayBuilder updatedUsersBuilder = Json.createArrayBuilder(existingUsers);
            JsonObject newUser = Json.createObjectBuilder()
                    .add("username", username)
                    .add("password", password) // In production, hash the password
                    .build();
            updatedUsersBuilder.add(newUser);

            // Save updated users array to file
            try (FileWriter writer = new FileWriter(file)) {
                Json.createWriter(writer).writeArray(updatedUsersBuilder.build());
            }

            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write("{\"message\": \"User registered successfully\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle pre-flight requests
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // Helper method to set CORS headers
    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
}
