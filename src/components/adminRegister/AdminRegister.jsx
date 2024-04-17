import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            toast.error('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/admin/register', { name, email });
            const data = response.data;
            console.log(data);
            navigate('/otpVerification', { state: { email } }); 
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
                            <div className="text-center">
                                <h4 className="mb-2">Admin Registration</h4>
                                <p className="mb-4">Make your app management easy and fun!</p>
                            </div>
                            <form onSubmit={handleSubmit} className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={handleNameChange}
                                        autoFocus
                                    />
                                </div>
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary d-grid"
                                        type="submit"
                                        style={{ width: '100%' }}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                            <p className="text-center">
                                <span>Already have an account? </span>
                                <Link to="/adminLogin"> Login instead</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminRegister;