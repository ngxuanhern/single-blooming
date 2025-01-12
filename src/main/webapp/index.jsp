<!DOCTYPE html>
<html>
<head>
  <title>Florist E-Commerce</title>
</head>
<body>
<h1>Welcome to the Florist E-Commerce Website</h1>
<form action="add-to-cart" method="get">
  <label for="name">Flower Name:</label>
  <input type="text" id="name" name="name" required>
  <br>
  <label for="price">Price:</label>
  <input type="number" id="price" name="price" step="0.01" required>
  <br>
  <button type="submit">Add to Cart</button>
</form>
<br>
<a href="cart.jsp">View Cart</a>
</body>
</html>