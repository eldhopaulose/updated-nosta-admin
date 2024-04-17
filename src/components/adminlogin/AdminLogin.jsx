import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgggggnosta from '../../assetsNosta/nosta.png';
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/api/admin/signin', { email });
            const data = response.data;
            console.log(data);
            navigate('/otplogin', { state: { email } }); 
        } catch (error) {
            console.error('Error:', error.response.data);
            toast.error(error.response.data.error);     
        }
    };
    
    

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center">
                                <div className="app-brand-link gap-2">
                                    <img style={{ width: '100px', height: '100px' }} src={imgggggnosta} alt="Logo" className="app-brand-logo" />
                                    <span className="app-brand-logo demo">
                                        <svg
                                            width="25"
                                            viewBox="0 0 25 42"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink">
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="mb-2">Admin Login</h4>
                                <p className="mb-4">Please enter your email address to continue</p>
                            </div>
                            <form onSubmit={handleSubmit} className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary d-grid"
                                        type="submit"
                                        style={{ width: '100%' }} 
                                    >
                                        Login
                                    </button>
                                </div>
                            </form> 
                            <p className="text-center">
                                <span>Don't have an account?</span>
                                <Link to="/mailAuthentication"> 
                                    <span> Sign up instead</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default AdminLogin;