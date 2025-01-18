import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Order.css';

function Order({ order, fetchOrder }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        let isSubscribed = true;  // Add this flag

        if (!username && isSubscribed) {
            const toastId = toast.error('You must be logged in to view the order.');
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
            fetchOrder();
        }

        return () => {
            isSubscribed = false;
        };
    }, [fetchOrder, username, navigate]);

    if (!username) {
        return null;
    }

    return (
        <div className="order">
            <h2>Your Order</h2>
            {order.length === 0 ? (
                <p>Your order is empty.</p>
            ) : (
                <div className="order-items">
                    {order.map((item, index) => (
                        <div key={index} className="order-item">
                            <img src={item.image} alt={item.name} />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>Price: RM {item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Order;