import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import Product from '../../Components/admin/Product';

export default function ProdPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/product"
                    element={
                        <>
                            <Dashboard />
                            <Product />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
