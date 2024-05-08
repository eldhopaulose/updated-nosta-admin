import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editProduct.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageKit from 'imagekit';
import axios from 'axios';
import { BASE_URL, DEV_URL } from '../../constants/constants';


const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        productOriginalPrice: '',
        productPrice: '',
        productDiscount: '',
        productDescription: '',
        productCategory: '',
        productShippingCost: '',
        productThumbnail: null
    });

    const imagekit = new ImageKit({
        publicKey: "public_VJ2m1hSm+Sdf+U3VWl5h+u5dSlA=",
        privateKey: "private_tOVZHHDsn9pznH30E5NlKZHSgw0=",
        urlEndpoint: "https://ik.imagekit.io/elvin/"
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/product/findproduct/${productId}`);
                if (response.status === 200) {
                    const productData = response.data;
                    setFormData({
                        productName: productData.name,
                        productOriginalPrice: productData.originalPrice,
                        productPrice: productData.price,
                        productDiscount: productData.discount,
                        productDescription: productData.description,
                        productCategory: productData.category,
                        productShippingCost: productData.shippingCost,
                        productThumbnail: productData.thumbnail
                    });
                    setSelectedImages(productData.images);
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

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
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
        const isEmptyField = Object.values(formData).some(value => value === '');
        if (isEmptyField) {
            toast.error('All fields must be filled.');
            return;
        }

        const price = parseFloat(formData.productPrice);
        const discount = parseFloat(formData.productDiscount.replace('%', '')) / 100;
        const discountedPrice = (price - (price * discount)).toFixed(2);

        try {
            const formDataToSend = {
                name: formData.productName,
                price: discountedPrice,
                discount: formData.productDiscount,
                description: formData.productDescription,
                category: formData.productCategory,
                shippingCost: formData.productShippingCost,
                thumbnail: formData.productThumbnail,
                images: selectedImages,
                originalPrice: formData.productOriginalPrice
            };

            const response = await axios.patch(`${DEV_URL}/admin/product/updateProduct/${productId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                console.log('Product updated successfully');
                toast.success('Product updated successfully');
            } else {
                console.error('Failed to update product:', response.statusText);
                toast.error('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };


    const handleDeleteProduct = async (e) => {
        e.preventDefault(); // Add this line to prevent default form submission
    
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${BASE_URL}/admin/product/deleteproduct/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    navigate('/admindashboard');
                    // Display success toast message only when deletion is confirmed and successful
                    toast.success('Product deleted successfully');
                } else {
                    console.error('Failed to delete product:', response.statusText);
                    toast.error('Failed to delete product. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('Product deletion cancelled');
        }
    };
    
    
    return (
        <div className="add-products-container">
            <div className="container main section dashboard">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="add-products-title text-center mb-4">Edit Product</h4>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="productName" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="productName" value={formData.productName} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productOriginalPrice" className="form-label">Original Price</label>
                                        <input type="number" className="form-control" id="productOriginalPrice" value={formData.productOriginalPrice} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productPrice" className="form-label">price which discount to be applied</label>
                                        <input type="number" className="form-control" id="productPrice" value={formData.productPrice} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDiscount" className="form-label">Discount</label>
                                        <select className="form-select" id="productDiscount" value={formData.productDiscount} onChange={handleChange}>
                                            <option value="0%">No discount</option>
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
                                        {formData.productThumbnail && (
                                            <div className="thumbnail-container">
                                                <img src={formData.productThumbnail} alt="Thumbnail Preview" className="thumbnail-preview" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productImages" className="form-label">Images</label>
                                        <input type="file" className="form-control" id="productImages" multiple onChange={handleImageChange} />
                                        {selectedImages.length > 0 && (
                                            <div className="selected-images-box">
                                                {selectedImages.map((imageUrl, index) => (
                                                    <div key={index} className="selected-image">
                                                        <img src={imageUrl} alt={`Selected Image ${index}`} className="thumbnail" />
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
                                            <option value="Spices">Spices</option>
                                            <option value="Kerala Special">Kerala Special</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productShippingCost" className="form-label">Shipping Cost</label>
                                        <input type="number" className="form-control" id="productShippingCost" value={formData.productShippingCost} onChange={handleChange} />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary w-100">Update</button>
                                    </div>
                                    <div className="delete-buttons-container">
                                        <button type="submit" className="btn btn-danger w-100 mt-3" onClick={handleDeleteProduct}>Delete Product</button>
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

export default EditProduct;
