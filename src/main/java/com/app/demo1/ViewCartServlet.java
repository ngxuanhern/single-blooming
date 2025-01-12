// File: ViewCartServlet.java
package com.app.demo1;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("/view-cart")
public class ViewCartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=utf-8");

        try (PrintWriter out = response.getWriter()) {
            // Retrieve the cart from the session
            HttpSession session = request.getSession();
            ArrayList<Cart> cartList = (ArrayList<Cart>) session.getAttribute("cart-list");

            // If the cart is null or empty, return an empty response
            if (cartList == null || cartList.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_OK);
                out.print("{\"status\": \"success\", \"cart\": [], \"totalPrice\": 0.0}");
                return;
            }

            // Calculate the total price
            double totalPrice = 0.0;
            StringBuilder jsonResponse = new StringBuilder("{\"status\": \"success\", \"cart\": [");
            for (int i = 0; i < cartList.size(); i++) {
                Cart cartItem = cartList.get(i);
                double itemTotalPrice = cartItem.getFlower().getPrice() * cartItem.getQuantity();
                totalPrice += itemTotalPrice; // Add to the total price

                jsonResponse.append("{\"name\": \"").append(cartItem.getFlower().getName()).append("\", ")
                        .append("\"price\": ").append(cartItem.getFlower().getPrice()).append(", ")
                        .append("\"quantity\": ").append(cartItem.getQuantity()).append(", ")
                        .append("\"itemTotalPrice\": ").append(itemTotalPrice).append("}");
                if (i < cartList.size() - 1) {
                    jsonResponse.append(", ");
                }
            }
            jsonResponse.append("], \"totalPrice\": ").append(totalPrice).append("}");

            // Send the JSON response
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(jsonResponse.toString());
        }
    }
}