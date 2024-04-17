import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopSelling = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if email and token exist in localStorage
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');

        // If email or token is missing, navigate to login page
        if (!email || !token) {
            navigate('/adminregister');
        }
    }, [navigate]);

    return (
        <div className="section dashboard" style={{ marginTop: '1.5rem' }}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-xxl-8 col-md-8 col-11 ">
                    <div className="card top-selling overflow-auto">
                        <div className="card-body pb-0">
                            <h5 className="card-title">Top Selling Products<span>| month</span></h5>

                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Preview</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">dis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"><img src="assets/img/product-1.jpg" alt="" /></th>
                                        <td className="text-primary fw-bold">hello world</td>
                                        <td>$64</td>
                                        <td className="fw-bold">124</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><img src="assets/img/product-2.jpg" alt="" /></th>
                                        <td className="text-primary fw-bold">hello world</td>
                                        <td>$46</td>
                                        <td className="fw-bold">98</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><img src="assets/img/product-3.jpg" alt="" /></th>
                                        <td className="text-primary fw-bold">hello world</td>
                                        <td>$59</td>
                                        <td className="fw-bold">74</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><img src="assets/img/product-4.jpg" alt="" /></th>
                                        <td className="text-primary fw-bold">hello world</td>
                                        <td>$32</td>
                                        <td className="fw-bold">63</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><img src="assets/img/product-5.jpg" alt="" /></th>
                                        <td className="text-primary fw-bold">hello world</td>
                                        <td>$79</td>
                                        <td className="fw-bold">41</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSelling;
