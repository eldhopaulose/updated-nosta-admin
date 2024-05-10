import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';

const ViewOrdersDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const checkAuthentication = () => {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');
            if (!email || !token) {
                navigate('/adminlogin');
            }
        };

        checkAuthentication();

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/order`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleProductClick = (productId) => {
        navigate(`/vieworders/${productId}`);
    };

    return (
        <div className="section dashboard" style={{ marginTop: '1.5rem' }}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-xxl-8 col-md-8 col-11 ">
                    <div className="card top-selling overflow-auto">
                        <div className="card-body pb-0">
                            <h5 className="card-title">All Orders</h5>
                            <table className="table table-borderless table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Bill Date</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Product Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.orderId}</td>
                                            <td>{order.status}</td>
                                            <td>{new Date(order.billDate).toLocaleDateString()}</td>
                                            <td>{order.address.name}, {order.address.address}, {order.address.district}, {order.address.state}</td>
                                            <td>{order.address.mobileNumber}</td>
                                            <td>
                                                {order.items.map(item => (
                                                    <div key={item.productId._id}>
                                                        <span onClick={() => handleProductClick(item.productId._id)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{item.productId.name}</span> (Quantity: {item.quantity})
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrdersDashboard;
