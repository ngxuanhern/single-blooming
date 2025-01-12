<%@ page import="com.app.demo1.Cart, java.util.ArrayList" %>
<!DOCTYPE html>
<html>
<head>
    <title>Cart</title>
</head>
<body>
<h1>Your Cart</h1>
<%
    ArrayList<Cart> cartList = (ArrayList<Cart>) session.getAttribute("cart-list");
    if (cartList != null && !cartList.isEmpty()) {
        for (Cart cartItem : cartList) {
            out.println("<p>Flower: " + cartItem.getFlower().getName() + "</p>");
            out.println("<p>Price: $" + cartItem.getFlower().getPrice() + "</p>");
            out.println("<p>Quantity: " + cartItem.getQuantity() + "</p>");
            out.println("<hr>");
        }
    } else {
        out.println("<p>Your cart is empty.</p>");
    }
%>
<a href="index.jsp">Continue Shopping</a>
</body>
</html>