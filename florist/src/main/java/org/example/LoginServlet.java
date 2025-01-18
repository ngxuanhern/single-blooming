package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    private static final String USERS_FILE = "/WEB-INF/users.json";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        BufferedReader reader = request.getReader();
        JsonObject requestBody = Json.createReader(reader).readObject();
        String username = requestBody.getString("username", "");
        String password = requestBody.getString("password", "");

        if (username.isEmpty() || password.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"message\": \"Invalid input\"}");
            return;
        }

        String realPath = getServletContext().getRealPath(USERS_FILE);
        File file = new File(realPath);
        if (!file.exists() || file.length() == 0) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\": \"User not found\"}");
            return;
        }

        JsonReader jsonReader = Json.createReader(new FileReader(file));
        JsonArray users = jsonReader.readArray();
        jsonReader.close();

        for (JsonValue value : users) {
            JsonObject user = value.asJsonObject();
            if (user.getString("username").equals(username) && user.getString("password").equals(password)) {
                response.getWriter().write("{\"message\": \"Login successful\"}");
                return;
            }
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"message\": \"Invalid credentials\"}");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle pre-flight requests
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
