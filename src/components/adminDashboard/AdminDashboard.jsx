import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/nav';
import TopSelling from '../topSelling/TopSelling';

const Admin = () => {
  return (
    <>
      <Nav/>
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
            <Link to="/viewOrders" className="card-link">
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
            <Link to="/topSelling" className="card-link"> 
              <div className="card info-card customers-card">
                <div className="card-body">
                  <div className="card-title"></div>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3">
                      <h6>Top Selling Products</h6>
                      <span className="text-danger small pt-1 fw-bold">click here</span> <span className="text-muted small pt-2 ps-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
        <div className="col-12 col-lg-12">
          <div className="card top-selling overflow-auto">
          </div>
        </div>
      </div>

      <TopSelling/>
      
    </>
  );
};

export default Admin;
