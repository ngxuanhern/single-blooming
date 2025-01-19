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
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'
function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
        const username = localStorage.getItem('username');

        if (!username) {
            alert('You must log in first to add items to the cart.');
            return;
        }

        const payload = { username, item };

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
                fetchCart();
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
                fetchCart();
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
            for (const item of cart) {
                const itemName = item.name;
                try {
                    const response = await fetch(`http://localhost:8080/florist-1.0-SNAPSHOT/api/cart?username=${username}&item=${encodeURIComponent(itemName)}`, {
                        method: 'DELETE',
                    });
                    fetchCart();
                } catch (error) {
                    console.error('Error removing item from cart:', error);
                }
            }

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
        window.location.reload();
    };

    return (
        <Router>
            <ScrollToTop/>
            <div className="App">
                <Toaster position="top-right" />
                <header className="header">
                    <h1 className="shop-name">Single and Blooming</h1>
                    <div className="header-actions">
                        {!username ? (
                            <Link to="/login" className="btn btn-outline-primary">
                                Login/Register
                            </Link>
                        ) : (
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    id="profileDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span className="me-2">Welcome, {username}!</span>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                        alt="Profile"
                                        className="profile-icon rounded-circle"
                                        style={{ width: '30px', height: '30px' }}
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
                        <Link to="/cart" className="btn btn-outline-secondary position-relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                                alt="Cart"
                                className="cart-icon"
                                style={{ width: '30px', height: '30px' }}
                            />
                            {cart.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </header>
                <nav className="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/product" className="nav-link">
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/about" className="nav-link">
                                About
                            </a>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <div className="Home">
                            <h2>Welcome to Single and Blooming Florist!</h2>
                            <Hero/>
                            {/* Featured Flowers Section */}
                            <div className="featured-flowers">
                                <h3 className="text-black font-bold">Featured Flowers</h3>
                                <div className="flowers-grid">
                                    <div className="flower-card">
                                        <img
                                            src="../public/img_1.png"
                                            className="flower-image"
                                            alt="Flower 1"
                                        />
                                        <a href="/product" className="btn btn-primary">View More</a>
                                    </div>
                                    <div className="flower-card">
                                        <img
                                            src="../public/img_2.png"
                                            alt="Flower 2"
                                            className="flower-image"
                                        />
                                        <a href="/product" className="btn btn-primary">View More</a>
                                    </div>
                                    <div className="flower-card">
                                        <img
                                            src="../public/img_3.png"
                                            alt="Flower 3"
                                            className="flower-image"
                                        />
                                        <a href="/product" className="btn btn-primary">View More</a>
                                    </div>
                                    <div className="flower-card">
                                        <img
                                            src="../public/img_4.png"
                                            alt="Flower 4"
                                            className="flower-image"
                                        />
                                        <a href="/product" className="btn btn-primary">View More</a>
                                    </div>
                                    <div className="flower-card">
                                        <img
                                            src="../public/img_5.png"
                                            alt="Flower 5"
                                            className="flower-image"
                                        />
                                        <a href="/product" className="btn btn-primary">View More</a>
                                    </div>
                                </div>

                                {/* Promo Banner Section */}
                                <div className="promo-banner">
                                    <h4>Get 10% off your first order!</h4>
                                    <a href="/product" className="btn btn-primary">Shop Now</a>
                                </div>

                            </div>
                        </div>
                            } />
                            <Route path="/product" element={<Product catalog={catalog} addToCart={addToCart}/>}/>
                            <Route path="/about" element={<About/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/order" element={<Order order={order} fetchOrder={fetchOrder}/>}/>
                    <Route path="/cart" element={<Cart cart={cart} fetchCart={fetchCart} deleteFromCart={deleteFromCart} clearCart={clearCart} makePayment={makePayment} />} />
                </Routes>
                <Footer/>

            </div>
        </Router>
    );
}

export default App;