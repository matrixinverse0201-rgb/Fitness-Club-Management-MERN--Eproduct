import {BrowserRouter ,Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/AboutUs";
import Services from "./pages/Services/Services";
import Feedback from "./pages/Feedback/Feedback";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./pages/routes/ProtectedRoute";
import Payment from "./pages/Payment/Payment";
import LocateGym from "./pages/LocateGym/LocateGym";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/locate-gym" element={<LocateGym/>}/>
      

      {/*USER PROTECTED */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <UserDashboard/>
        </ProtectedRoute>
      }
      />

      {/*ADMIN PROTECTED */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard/>
        </ProtectedRoute>
      }
      />

      <Route path="/payment" element={
        <ProtectedRoute >
          <Payment/>
        </ProtectedRoute>
      }
      />
      </Routes>
      <Footer />
    </>
  );
};

export default App;