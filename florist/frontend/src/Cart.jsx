import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Cart.css';

function Cart({ cart, fetchCart, deleteFromCart, clearCart, makePayment }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let isSubscribed = true;
        if (!username && isSubscribed) {
            const toastId = toast.error('You must be logged in to view the cart.');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return () => {
                // Cleanup function
                isSubscribed = false;
                toast.dismiss(toastId);
            };
        }

        if (username) {
            fetchCart();
        }

        return () => {
            isSubscribed = false;
        };
    }, [fetchCart, username, navigate]);

    if (!username) {
        return null;
    }

    // Group items by name to combine the quantity
    const groupedItems = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity for the same item
        } else {
            acc.push({ ...item, quantity: 1 }); // Initialize with quantity = 1
        }
        return acc;
    }, []);

    // Calculate the total amount of the cart
    const calculateTotalAmount = () => {
        const total = groupedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    };

    // Show confirmation pop-up
    const handleCheckout = () => {
        calculateTotalAmount();
        setShowConfirmation(true); // Show the confirmation pop-up
    };

    // Proceed with payment
    const handleConfirmPayment = () => {
        makePayment(); // Proceed with the payment
        setShowConfirmation(false); // Close the confirmation pop-up
    };

    return (
        <div className= "cart-container">
        <div className="cart">
            <h2>Your Cart</h2>
            {groupedItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {groupedItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>Price: RM {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => deleteFromCart(item.name)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-actions">
                <button
                    onClick={clearCart}
                    disabled={groupedItems.length === 0}
                >
                    Clear Cart
                </button>
                <button
                    onClick={handleCheckout}
                    disabled={groupedItems.length === 0}
                >
                    Checkout
                </button>
            </div>


            {/* Confirmation pop-up */}
            {showConfirmation && (
                <div className="confirmation-popup">
                    <div className="popup-content">
                        <h3>Total Amount: RM {totalAmount}</h3>
                        <p>Do you want to proceed with the payment?</p>
                        <button onClick={handleConfirmPayment}>OK</button>
                        <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Cart;
