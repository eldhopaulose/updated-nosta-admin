import React from 'react';
import './AddProducts.css';

const AddProducts = () => {
    return (
        <div className="add-products-container">
            <div className="container main section dashboard">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="add-products-title text-center mb-4">Add Product</h4>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="productName" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="productName" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productPrice" className="form-label">Price</label>
                                        <input type="number" className="form-control" id="productPrice" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDiscount" className="form-label">Discount</label>
                                        <select className="form-select" id="productDiscount">
                                            <option defaultValue>No discount</option>
                                            <option value="5%">5%</option>
                                            <option value="10%">10%</option>
                                            <option value="15%">15%</option>
                                            <option value="15%">20%</option>
                                            <option value="15%">30%</option>
                                            <option value="15%">40%</option>
                                            <option value="15%">50%</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productThumbnail" className="form-label">Thumbnail</label>
                                        <input type="file" className="form-control" id="productThumbnail" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productImages" className="form-label">Images</label>
                                        <input type="file" className="form-control" id="productImages" multiple />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDescription" className="form-label">Description</label>
                                        <textarea className="form-control" id="productDescription" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productCategory" className="form-label">Category</label>
                                        <select className="form-select" id="productCategory">
                                            <option defaultValue>Cotton Candy</option>
                                            <option value="electronics">Popcorn</option>
                                            <option value="clothing">Dry Fruits</option>
                                            <option value="books">Curry powders</option>
                                            <option value="books">spices</option>
                                            <option value="books">kerala Spices</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productShippingCost" className="form-label">Shipping Cost</label>
                                        <input type="number" className="form-control" id="productShippingCost" />
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
        </div>
    );
};

export default AddProducts;
