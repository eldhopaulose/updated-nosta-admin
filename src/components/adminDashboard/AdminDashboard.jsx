import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../nav/nav';
import EditProductDashboard from '../editProductDashboard/EditProductsDashboard';
import axios from 'axios'; // Import axios
import { BASE_URL } from '../../constants/constants';

const AdminDashboard = () => {
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
  console.log(BASE_URL);

  const handleEditProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/product/all`);
      navigate('/editProductdashboard', { state: { products: response.data.products } });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  
  return (
    <>
      <Nav />
      <div className="container main section dashboard mt-lg-5 mt-md-5 mt-5">
        <div className="row mt-lg-5 mt-md-5">
          <div className="col-xxl-4 col-md-6 mt-lg-5 mt-md-5 mt-5">
            <Link to="/addProducts" className="card-link">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <div className="card-title"></div>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cart"></i>
                    </div>
                    <div className="ps-3">
                      <h6>Add Products </h6>
                      <span className="text-success small pt-1 fw-bold">click here</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-xxl-4 col-md-6 mt-lg-5 mt-md-5">
            <Link to="/viewordersdashboard" className="card-link">
              <div className="card info-card revenue-card">
                <div className="card-body">
                  <div className="card-title"></div>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div className="ps-3">
                      <h6>View Orders</h6>
                      <span className="text-success small pt-1 fw-bold">click here</span> <span className="text-muted small pt-2 ps-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-xxl-4 col-xl-12 mt-lg-5 mt-md-5">
            <div className="card info-card customers-card">
              <div className="card-body">
                <div className="card-title"></div>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="ps-3">
                    <h6>Edit Products</h6>
                    <button onClick={handleEditProducts} className="btn" style={{ fontSize: '14px', color: 'orange' }}>Click here</button> {/* Inline CSS */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-12">
          <div className="card top-selling overflow-auto">
            {/* Content for top selling products */}
          </div>
        </div>
      </div>
      
      <EditProductDashboard />
      
    </>
  );
};

export default AdminDashboard;
