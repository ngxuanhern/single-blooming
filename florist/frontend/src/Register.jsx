import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch('http://localhost:8080/florist-1.0-SNAPSHOT/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                navigate('/login'); // Redirect to login after successful registration
            })
            .catch(error => setError('Registration failed. Please try again.'));
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '85vh', backgroundColor: '#f7f7f7' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4} sm={12} className="register-container p-4 shadow-sm rounded bg-white">
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}

                    <Form>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" className="custom-register-btn w-100" onClick={handleRegister}>
                            Register
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <p>
                            Already have an account? <Link to="/login" className="link">Login</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
