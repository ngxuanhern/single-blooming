package org.example;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import javax.json.Json;
import javax.json.JsonObject;

@WebServlet("/api/data")
public class HomeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");


        String catalogJson = "["
                + "{ \"name\": \"Stole My Heart\", \"price\": 188, \"image\": \"img.png\" },"
                + "{ \"name\": \"Santa Mini Bouquet\", \"price\": 48, \"image\": \"img_1.png\" },"
                + "{ \"name\": \"Xmas Flower Bouquet\", \"price\": 108, \"image\": \"img_2.png\" },"
                + "{ \"name\": \"Xmas Mini Flower Bouquet\", \"price\": 88, \"image\": \"img_3.png\" },"
                + "{ \"name\": \"Black Leyanna\", \"price\": 88, \"image\": \"img_4.png\" },"
                + "{ \"name\": \"Nolan\", \"price\": 88, \"image\": \"img_5.png\" },"
                + "{ \"name\": \"Carmelia\", \"price\": 90 , \"image\": \"img_6.webp\" },"
                + "{ \"name\": \"Daily Light\", \"price\": 78 , \"image\": \"img_6.jpeg\" },"
                + "{ \"name\": \"Lovely Lilac\", \"price\": 105 , \"image\": \"img_7.jpg\" },"
                + "{ \"name\": \"Daily Light\", \"price\": 85 , \"image\": \"img_8.jpg\" }"
                + "]";

        response.getWriter().write(catalogJson);
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
