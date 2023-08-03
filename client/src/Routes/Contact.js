import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import ContactPage from '../Components/Contact';

export default function Contact() {
    return (
        <>
            <Routes>
                <Route
                    path="/contact"
                    element={
                        <>
                           <Navbar />
                            <ContactPage />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
