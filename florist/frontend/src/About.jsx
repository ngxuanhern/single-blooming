import React from 'react';
import './About.css';

function About() {
    return (
        <div className="About-container">
            <div className="About-body">
                <h2>About Us</h2>
                <p>
                    Welcome to the Flower Shop! We offer hand-picked flowers and stunning arrangements for every occasion.
                    Whether it’s a birthday, anniversary, or simply brightening someone’s day, our bouquets are crafted to make every moment special.
                </p>
                <p>
                    Founded in <strong>2013</strong>, our goal has always been to spread happiness and beauty through flowers.
                    With a commitment to quality, creativity, and customer satisfaction, we’ve become a trusted name in floral design.
                </p>
                <h3>Why Choose Us?</h3>
                <ul>
                    <li><strong>Free Shipping</strong> on all orders for convenient and affordable gifting.</li>
                    <li><strong>Fresh, High-Quality Blooms</strong> that arrive vibrant and fragrant.</li>
                    <li><strong>Custom Designs</strong> tailored to your needs.</li>
                    <li><strong>Exceptional Service</strong> that ensures a seamless experience.</li>
                </ul>
                <p>
                    At the Flower Shop, we take pride in making every occasion unforgettable. Browse our collections today
                    and let us help you create memories with the gift of flowers!
                </p>
            </div>
        </div>
    );
}

export default About;

