import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import EditProduct from './components/EditProduct/EditProduct';
import AdminRegister from './components/adminRegister/AdminRegister';
import OtpVerification from './components/OtpVerification/OtpVerification';
import AddProducts from './components/addProducts/AddProducts';
import ViewOrders from './components/viewOrders/ViewOrders';
import AdminLogin from './components/adminlogin/AdminLogin';
import OtpLogin from './components/otpLogin/OtpLogin';
import EditProductDashboard from './components/editProductDashboard/EditProductsDashboard';
function App() {
  return (
    <>

      <Routes>
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/adminRegister' element={<AdminRegister />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/otpVerification' element={<OtpVerification />} />
        <Route path='/addProducts' element={<AddProducts />} />
        <Route path='/viewOrders' element={<ViewOrders />} />
        <Route path='/otplogin' element={<OtpLogin />} />
        <Route path='/editproductdashboard' element={<EditProductDashboard />} />
        <Route path='/editproduct/:productId' element={<EditProduct/>} />
      </Routes>
    </>
  );
}
  
export default App;
