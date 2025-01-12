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

@WebServlet("/add-to-cart")
public class AddToCartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");

        try (PrintWriter out = response.getWriter()) {
            // Retrieve the cart from the session
            HttpSession session = request.getSession();
            ArrayList<Cart> cartList = (ArrayList<Cart>) session.getAttribute("cart-list");

            // If the cart is null, initialize a new cart list
            if (cartList == null) {
                cartList = new ArrayList<>();
            }

            // Get  name, and price from the request
            String flowerName = request.getParameter("name");
            double price = Double.parseDouble(request.getParameter("price"));

            // Create a new flower object
            OneFlower flower = new OneFlower(flowerName, price);
            Cart cartItem = new Cart(flower, 1); // Default quantity is 1

            // Check if the item already exists in the cart
            boolean exists = false;
            for (Cart c : cartList) {
                if (c.getFlower().getName().equals(flowerName)) {
                    exists = true;
                    // Increase quantity if the item already exists
                    c.setQuantity(c.getQuantity() + 1);
                    out.println("<p>Product already in cart. Quantity updated.</p>");
                    break;
                }
            }

            // If the item doesn't exist, add it to the cart
            if (!exists) {
                cartList.add(cartItem);
                out.println("<p>Product added to cart.</p>");
            }

            // Update session attribute
            session.setAttribute("cart-list", cartList);

            // Respond with JSON to indicate success and provide the updated cart
            response.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"status\": \"success\", \"cart\": " + cartList + "}");
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid parameters.");
        }
    }
}
