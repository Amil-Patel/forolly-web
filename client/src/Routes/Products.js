import React, { lazy, Suspense } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Route, Routes } from 'react-router-dom';
const ProductMain = lazy(() => import('../Components/ProductMain'));

export default function Products() {
    return (
        <>
            <Routes>
                <Route
                    path="/products"
                    element={
                        <>
                            <Navbar />
                            <Suspense fallback={<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}>
                                <ProductMain />
                            </Suspense>
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
