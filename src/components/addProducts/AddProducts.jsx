import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        productPrice: '',
        productDiscount: '',
        productDescription: '',
        productCategory: '',
        productShippingCost: '',
        productThumbnail: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!email || !token) {
            navigate('/adminregister');
        }
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (selectedImages.length + files.length > 5) {
            toast.error('Maximum 5 images are allowed');
            return;
        }
        setSelectedImages([...selectedImages, ...files]);
    };

    const handleDeleteImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleThumbnailChange = (e) => {
        setFormData({ ...formData, productThumbnail: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('productPrice', formData.productPrice);
            formDataToSend.append('productDiscount', formData.productDiscount);
            formDataToSend.append('productDescription', formData.productDescription);
            formDataToSend.append('productCategory', formData.productCategory);
            formDataToSend.append('productShippingCost', formData.productShippingCost);
            formDataToSend.append('productThumbnail', formData.productThumbnail);
            selectedImages.forEach((image, index) => {
                formDataToSend.append(`image${index}`, image);
            });

            const response = await fetch('http://localhost:3000/api/admin/product/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Product created successfully');
                toast.success('Product created successfully');
            } else {
                console.error('Failed to create product:', response.statusText);
                toast.error('Failed to create product. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="add-products-container">
            <div className="container main section dashboard">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="add-products-title text-center mb-4">Add Product</h4>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="productName" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="productName" value={formData.productName} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productPrice" className="form-label">Price</label>
                                        <input type="number" className="form-control" id="productPrice" value={formData.productPrice} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDiscount" className="form-label">Discount</label>
                                        <select className="form-select" id="productDiscount" value={formData.productDiscount} onChange={handleChange}>
                                            <option value="No discount">No discount</option>
                                            <option value="5%">5%</option>
                                            <option value="10%">10%</option>
                                            <option value="15%">15%</option>
                                            <option value="20%">20%</option>
                                            <option value="30%">30%</option>
                                            <option value="40%">40%</option>
                                            <option value="50%">50%</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productThumbnail" className="form-label">Thumbnail</label>
                                        <input type="file" className="form-control" id="productThumbnail" onChange={handleThumbnailChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productImages" className="form-label">Images</label>
                                        <input type="file" className="form-control" id="productImages" multiple onChange={handleImageChange} />
                                        <div className="selected-images">
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className="selected-image">
                                                    <img src={URL.createObjectURL(image)} alt={`Selected Image ${index}`} />
                                                    <button type="button" className="delete-button" onClick={() => handleDeleteImage(index)}>x</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="selected-images-count">
                                            <input type="text" className="form-control" value={`${selectedImages.length} images selected`} readOnly style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDescription" className="form-label">Description</label>
                                        <textarea className="form-control" id="productDescription" value={formData.productDescription} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productCategory" className="form-label">Category</label>
                                        <select className="form-select" id="productCategory" value={formData.productCategory} onChange={handleChange}>
                                            <option value="">Select category</option>
                                            <option value="Cotton Candy">Cotton Candy</option>
                                            <option value="Popcorn">Popcorn</option>
                                            <option value="Dry Fruits">Dry Fruits</option>
                                            <option value="Curry powders">Curry powders</option>
                                            <option value="spices">Spices</option>
                                            <option value="kerala Spices">Kerala Spices</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productShippingCost" className="form-label">Shipping Cost</label>
                                        <input type="number" className="form-control" id="productShippingCost" value={formData.productShippingCost} onChange={handleChange} />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddProducts;
