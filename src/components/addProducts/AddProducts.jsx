import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageKit from 'imagekit';

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

    const imagekit = new ImageKit({
        publicKey: "public_VJ2m1hSm+Sdf+U3VWl5h+u5dSlA=",
        privateKey: "private_tOVZHHDsn9pznH30E5NlKZHSgw0=",
        urlEndpoint: "https://ik.imagekit.io/elvin/"
    });

    useEffect(() => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!email || !token) {
            navigate('/adminregister');
        }
    }, []);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        // Ensure only a maximum of 5 images can be selected
        if (selectedImages.length + files.length > 5) {
            toast.error('You can only select up to 5 images.');
            return;
        }
        for (const file of files) {
            try {
                const response = await imagekit.upload({
                    file: file,
                    fileName: file.name,
                });
                setSelectedImages(prevImages => [...prevImages, response.url]);
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };


    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0];
        try {
            const response = await imagekit.upload({
                file: file,
                fileName: file.name,
            });
            setFormData({ ...formData, productThumbnail: response.url });
        } catch (error) {
            console.error('Thumbnail upload failed:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any of the form fields are empty
        const isEmptyField = Object.values(formData).some(value => value === '');
        if (isEmptyField) {
            toast.error('All fields must be filled.');
            return;
        }

        // Calculate discounted price
        const price = parseFloat(formData.productPrice);
        const discount = parseFloat(formData.productDiscount.replace('%', '')) / 100;
        const discountedPrice = (price - (price * discount)).toFixed(2);


        try {
            const formDataToSend = {
                name: formData.productName,
                price: discountedPrice, // Send discounted price instead of original price
                discount: formData.productDiscount,
                description: formData.productDescription,
                category: formData.productCategory,
                shippingCost: formData.productShippingCost,
                thumbnail: formData.productThumbnail,
                images: selectedImages // Send selectedImages directly as an array
            };

            console.log('Form Data:', formDataToSend);

            const response = await fetch('http://localhost:3000/api/admin/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formDataToSend) // Pass the data in the body
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
                                        {/* Conditional rendering for selected images container */}
                                        {selectedImages.length > 0 && (
                                            <div className="selected-images-box">
                                                {selectedImages.map((imageUrl, index) => (
                                                    <div key={index} className="selected-image">
                                                        <img src={imageUrl} alt={`Selected Image ${index}`} />
                                                        <button type="button" className="delete-button" onClick={() => handleDeleteImage(index)}>x</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
            </div >
            <ToastContainer />
        </div >
    );
};

export default AddProducts;
