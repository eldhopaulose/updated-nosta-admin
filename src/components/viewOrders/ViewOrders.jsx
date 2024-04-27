import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Vieworders.css';
import { BASE_URL } from '../../constants/constants';


const Vieworders = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            console.log(productId);
            try {
                const response = await axios.get(`${BASE_URL}/admin/product/findproduct/${productId}`);
                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    console.error('Failed to fetch product details:', response.statusText);
                    toast.error('Failed to fetch product details. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('An error occurred while fetching product details. Please try again.');
            }
        };

        fetchProductDetails();
    }, [productId]);

    return (
        <div className="container">
            <h1>Product Details</h1>
            {product ? (
                <div className="glass-morphism">
                    <div className="product-details-box">
                        <div className="detail-box">
                            <p><strong>Name:</strong> {product.name}</p>
                            <p><strong>Price:</strong> {product.price}</p>
                            <p><strong>Original Price:</strong> {product.originalPrice}</p>
                            <p><strong>Discount:</strong> {product.discount}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Shipping Cost:</strong> {product.shippingCost}</p>
                        </div>
                    </div>
                    <div className="product-media-box">
                        <div className="detail-box">
                            <p><strong>Thumbnail:</strong></p>
                            <img src={product.thumbnail} alt="Thumbnail" className="thumbnail" />
                        </div>
                        <div className="image-gallery">
                            <p><strong>Images:</strong></p>
                            {product.images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index}`} className="image" />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default Vieworders;
