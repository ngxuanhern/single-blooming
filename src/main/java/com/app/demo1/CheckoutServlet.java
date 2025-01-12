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

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=utf-8");

        try (PrintWriter out = response.getWriter()) {
            // Retrieve the cart from the session
            HttpSession session = request.getSession();
            ArrayList<Cart> cartList = (ArrayList<Cart>) session.getAttribute("cart-list");

            // If the cart is null or empty, return an error response
            if (cartList == null || cartList.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"status\": \"error\", \"message\": \"Your cart is empty.\"}");
                return;
            }

            // Calculate the total price
            double totalPrice = 0;
            for (Cart cartItem : cartList) {
                totalPrice += cartItem.getFlower().getPrice() * cartItem.getQuantity();
            }

            // Manually construct JSON response
            StringBuilder jsonResponse = new StringBuilder();
            jsonResponse.append("{\"status\": \"success\", \"message\": \"Checkout successful. Here are your items:\", \"cart\": [");

            // Add cart items to JSON
            for (int i = 0; i < cartList.size(); i++) {
                Cart item = cartList.get(i);
                jsonResponse.append("{\"name\": \"")
                        .append(item.getFlower().getName())
                        .append("\", \"price\": ")
                        .append(item.getFlower().getPrice())
                        .append(", \"quantity\": ")
                        .append(item.getQuantity())
                        .append("}");
                if (i < cartList.size() - 1) {
                    jsonResponse.append(", ");
                }
            }

            jsonResponse.append("], \"totalPrice\": ").append(totalPrice).append("}");

            // Send JSON response
            out.print(jsonResponse.toString());
        }
    }
}
