import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../constants/constants';


const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [resendLoading, setResendLoading] = useState(false); // To track loading state
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.email;

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setOtp(value);
        } else {
            toast.error('Only numbers are allowed.');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
    
        if (!otp || !email) {
            toast.error('Please fill out all fields');
            return;
        }
    
        try {
            const response = await axios.post(`${BASE_URL}/admin/register/verify`, { otp, email });
            const data = response.data;
            console.log(data);
            
            // Save email and token to localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('token', data.token);
    
            // Navigate to admin dashboard
            navigate('/admindashboard');
        } catch (error) {
            console.error('Error:', error.response.data);
            toast.error(error.response.data.error);
        }
    };
    

    const handleResendOTP = async () => {
        if (!email) {
            toast.error('Email is missing');
            return;
        }

        try {
            setResendLoading(true); 
            await axios.post('http://localhost:3000/api/admin/register/resend', { email });
            toast.success('OTP Resent successfully');
        } catch (error) {
            console.error('Error:', error.response.data);
            toast.error(error.response.data.error);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form id="formAuthentication" className="mb-3" onSubmit={handleOtpSubmit}>
                                <div className="mb-3">
                                    <h4 className="text-center">Enter your OTP which has been sent to your email</h4>
                                    <label htmlFor="otp" className="form-label"></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        autoFocus
                                        pattern="[0-9]*"
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary d-grid w-100"
                                        type="submit"
                                    >
                                        Submit OTP
                                    </button>
                                </div>
                            </form>
                            <div className="mb-3 text-center"> 
                                <button
                                    className="btn btn-secondary w-50 mx-auto"
                                    onClick={handleResendOTP}
                                    disabled={resendLoading}
                                >
                                    {resendLoading ? 'Resending...' : 'Resend OTP'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OtpVerification;