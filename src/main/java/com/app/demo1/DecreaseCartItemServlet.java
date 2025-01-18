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

@WebServlet("/decrease-cart-item")
public class DecreaseCartItemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=utf-8");

        try (PrintWriter out = response.getWriter()) {
            // Retrieve the cart from the session
            HttpSession session = request.getSession();
            ArrayList<Cart> cartList = (ArrayList<Cart>) session.getAttribute("cart-list");

            // Get the name of the item to decrease
            String flowerName = request.getParameter("name");

            // If the cart is null or empty, return an error response
            if (cartList == null || cartList.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"status\": \"error\", \"message\": \"Cart is empty.\"}");
                return;
            }

            // Find the item in the cart
            boolean itemFound = false;
            for (int i = 0; i < cartList.size(); i++) {
                Cart cartItem = cartList.get(i);
                if (cartItem.getFlower().getName().equals(flowerName)) {
                    itemFound = true;

                    // Decrease the quantity
                    int newQuantity = cartItem.getQuantity() - 1;

                    if (newQuantity <= 0) {
                        // If quantity is zero or less, remove the item from the cart
                        cartList.remove(i);
                    } else {
                        // Update the quantity
                        cartItem.setQuantity(newQuantity);
                    }

                    break;
                }
            }

            // If the item was not found, return an error response
            if (!itemFound) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"status\": \"error\", \"message\": \"Item not found in cart.\"}");
                return;
            }

            // Update the session attribute
            session.setAttribute("cart-list", cartList);

            // Respond with success and the updated cart
            response.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"status\": \"success\", \"message\": \"Item quantity decreased.\"}");
        }
    }
}