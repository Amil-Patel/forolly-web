import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import AboutProduct from '../Components/AboutProduct';

export default function AboutProductPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/products/about-product"
                    element={
                        <>
                            <Navbar />
                            <AboutProduct />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
