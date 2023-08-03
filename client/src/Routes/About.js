import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import AboutMain from '../Components/AboutMain';

export default function About() {
    return (
        <>
            <Routes>
                <Route
                    path="/about"
                    element={
                        <>
                            <Navbar />
                            <AboutMain />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
