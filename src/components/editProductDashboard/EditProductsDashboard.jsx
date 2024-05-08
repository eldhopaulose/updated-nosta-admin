import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/constants';

const EditProductDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // State to store products

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

        // Fetch products
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/product/all`);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [navigate]); // Include navigate in the dependency array to ensure it's up to date

    const handleRowClick = (productId) => {
        // Navigate to the editproduct page with the productId as a URL parameter
        navigate(`/editproduct/${productId}`);
    };

    return (
        <>
            <div className="section dashboard" style={{ marginTop: '1.5rem' }}>
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-xxl-8 col-md-8 col-11 ">
                        <div className="card top-selling overflow-auto">
                            <div className="card-body pb-0">
                                <h5 className="card-title">Select the product you want to edit</h5>
                                <table className="table table-borderless table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Preview</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Original Price</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Shipping Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id} onClick={() => handleRowClick(product._id)} className="table-hover" style={{ cursor: 'pointer' }}>
                                                <td><img src={product.thumbnail} alt="product preview" /></td>
                                                <td className="text-primary fw-bold">{product.name}</td>
                                                <td>${product.price}</td>
                                                <td>${product.originalPrice}</td>
                                                <td>{product.discount}</td>
                                                <td>{product.category.join(', ')}</td>
                                                <td>${product.shippingCost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Remove the Link component */}
            </div>
        </>
    );
};

export default EditProductDashboard;
