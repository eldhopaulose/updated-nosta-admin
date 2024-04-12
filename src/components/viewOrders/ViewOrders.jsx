import React from 'react';

const ViewOrders = () => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 text-center mb-4">
                    <h2>All Order Details</h2>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-fixed">
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Picture</th>
                            <th style={{ width: '10%' }}>Product</th>
                            <th style={{ width: '10%' }}>Name</th>
                            <th style={{ width: '10%' }}>Quantity</th>
                            <th style={{ width: '10%' }}>Price</th>
                            <th style={{ width: '10%' }}>p.h Number</th>
                            <th style={{ width: '15%' }}>Address</th>
                            <th style={{ width: '10%' }}>Pincode</th>
                            <th style={{ width: '15%' }}>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="picture_url_1" alt="Product 1" style={{ width: '100%', maxWidth: '50px', height: 'auto' }} /></td>
                            <td>Product 1</td>
                            <td>ABC Company</td>
                            <td>5</td>
                            <td>$10.00</td>
                            <td>1234567890</td>
                            <td>parassery house kuriachira p.o thrissurs</td>
                            <td>12345</td>
                            <td>2024-04-01</td>
                        </tr>
                        <tr>
                            <td><img src="picture_url_2" alt="Product 2" style={{ width: '100%', maxWidth: '50px', height: 'auto' }} /></td>
                            <td>Product 2</td>
                            <td>XYZ Corporation</td>
                            <td>10</td>
                            <td>$20.00</td>
                            <td>9876543210</td>
                            <td>parassery house kuriachira p.o thrissur</td>
                            <td>67890</td>
                            <td>2024-04-02</td>
                        </tr>
                        {/* Add more rows here if needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrders;
