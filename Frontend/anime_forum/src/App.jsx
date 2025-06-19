import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SingleQuestion from "./pages/SingleQuestion.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import {ToastContainer} from "react-toastify";

const App = () => {

    return (
        <div>
                <Navbar />
                <ToastContainer position="top-right" autoClose={2000} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/question/:question_id" element={<SingleQuestion />} />
                </Routes>
                <Footer />
        </div>
    )
}
export default App
