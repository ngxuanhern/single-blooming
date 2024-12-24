package com.app.demo1;


import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/flowers")
public class FlowerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // JSON data for flowers
        String flowerData = "[{\"name\":\"Rose\", \"price\":5}, {\"name\":\"Tulip\", \"price\":3}]";

        // Set response type
        response.setContentType("application/json");
        response.getWriter().write(flowerData); // Send JSON to frontend
    }
}
