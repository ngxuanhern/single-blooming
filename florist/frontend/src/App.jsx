import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Product from './Product';
import About from './About';
import Register from './Register';
import Login from './Login';
import Order from './Order';
import Cart from './Cart';

function App() {
    const username = localStorage.getItem('username');
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        // Fetch the catalog
        fetch('http://localhost:8080/florist-1.0-SNAPSHOT/api/data')
            .then(response => response.json())
            .then(data => setCatalog(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const addToCart = async (item) => {
        const username = localStorage.getItem('username'); // Get the username from localStorage

        if (!username) {
            alert('You must log in first to add items to the cart.');
            return;
        }

        const payload = {
            username,
            item
        };

        try {
            const response = await fetch('http://localhost:8080/florist-1.0-SNAPSHOT/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Item added to cart!');
                fetchCart(); // Refresh the cart
            } else {
                const errorData = await response.json();
                console.error('Error adding item to cart:', errorData.message);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const fetchCart = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch(`http://localhost:8080/florist-1.0-SNAPSHOT/api/cart?username=${username}`);
            if (response.ok) {
                const cartData = await response.json();
                setCart(cartData);
            } else {
                console.error('Error fetching cart');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const deleteFromCart = async (itemName) => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch(`http://localhost:8080/florist-1.0-SNAPSHOT/api/cart?username=${username}&item=${encodeURIComponent(itemName)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Item removed from cart!');
                fetchCart(); // Refresh the cart
            } else {
                console.error('Error removing item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const clearCart = async () => {
        const username = localStorage.getItem('username');
        try {
            // Loop through all items and delete each one by its name
            for (const item of cart) {
                const itemName = item.name; // Get the item name to pass as a parameter

                try {
                    const response = await fetch(`http://localhost:8080/florist-1.0-SNAPSHOT/api/cart?username=${username}&item=${encodeURIComponent(itemName)}`, {
                        method: 'DELETE',
                    });

                    fetchCart();
                } catch (error) {
                    console.error('Error removing item from cart:', error);
                }
            }

            // If all items are successfully deleted, clear cart from frontend
            setCart([]);
            alert('Cart cleared!');
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert('Failed to clear cart. Please try again.');
        }
    };


    const makePayment = async () => {
        const username = localStorage.getItem('username');
        const payload = { username };

        try {
            const response = await fetch('http://localhost:8080/florist-1.0-SNAPSHOT/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Payment successful!');
                setCart([]);
            } else {
                console.error('Error making payment');
            }
        } catch (error) {
            console.error('Error making payment:', error);
        }
    };

    const fetchOrder = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await fetch(`http://localhost:8080/florist-1.0-SNAPSHOT/api/order?username=${username}`);
            if (response.ok) {
                const orderData = await response.json();
                setOrder(orderData);
            } else {
                console.error('Error fetching order');
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.reload(); // Refresh to update the UI
    };

    return (
        <Router>
            <div className="App">
                <Toaster position="top-right" />
                <header className="header sticky-top">
                    <div className="container-fluid py-2 bg-light d-flex align-items-center justify-content-between">
                        <h1 className="shop-name text-center">Flower Shop</h1>
                        <div className="header-actions d-flex align-items-center">
                            {!username ? (
                                <Link to="/login" className="login-link me-3">
                                    Login/Register
                                </Link>
                            ) : (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle d-flex align-items-center"
                                        type="button"
                                        id="profileDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span className="me-2">Welcome, {username}!</span>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                            alt="Profile"
                                            className="profile-icon"
                                        />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                        <li>
                                            <Link to="/order" className="dropdown-item">
                                                My Order
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <Link to="/cart" className="cart-button ms-3">
                                <div className="cart-container">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                                        alt="Cart"
                                        className="cart-icon"
                                    />
                                    {cart.length > 0 && <span className="cart-badge"></span>}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container justify-content-center">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/product" className="nav-link">
                                        Product
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="Home">
                                <h2>This is homepage</h2>
                            </div>
                        }
                    />
                    <Route
                        path="/product"
                        element={<Product catalog={catalog} addToCart={addToCart} />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/order"
                        element={<Order order={order} fetchOrder={fetchOrder} />}
                    />
                    <Route
                        path="/cart"
                        element={<Cart
                                     cart={cart}
                                     fetchCart={fetchCart}
                                     deleteFromCart={deleteFromCart}
                                     clearCart={clearCart}
                                     makePayment={makePayment}
                                 />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
