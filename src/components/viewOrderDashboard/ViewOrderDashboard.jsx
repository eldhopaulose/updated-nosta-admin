import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';


const ViewOrdersDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]); // State to store orders

    useEffect(() => {
        const checkAuthentication = () => {
            // Check if email and token exist in localStorage
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');

            // If email or token is missing, redirect to admin login page
            if (!email || !token) {
                navigate('/adminlogin');
            }
        };

        // Call the authentication check function when the component mounts
        checkAuthentication();

        // Fetch orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/order`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [navigate]); // Include navigate in the dependency array to ensure it's up to date

    const handleProductClick = (productId) => {
        // Navigate to the vieworder page with the productId as a URL parameter
        navigate(`/vieworders/${productId}`);
    };


    return (
        <>
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
                                            <th scope="col">Product IDs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id} className="table-hover" style={{ cursor: 'pointer' }}>
                                                <td>{order.orderId}</td>
                                                <td>{order.items[0].status}</td>
                                                <td>{new Date(order.items[0].billDate).toLocaleDateString()}</td>
                                                <td>{order.items[0].address.address}, {order.items[0].address.district}, {order.items[0].address.state}</td>
                                                <td>{order.items[0].address.mobileNumber}</td>
                                                <td>
                                                    {order.items[0].productId[0].items.map(item => (
                                                        <span key={item.productId} onClick={() => handleProductClick(item.productId)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{item.productId}<br /></span>
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
        </>
    );
};

export default ViewOrdersDashboard;
