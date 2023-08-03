import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Inquiries from '../Components/Inquiry';

export default function Inquiry() {
    return (
        <>
            <Routes>
                <Route
                    path="/inquiries"
                    element={
                        <>
                           <Navbar />
                            <Inquiries />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
