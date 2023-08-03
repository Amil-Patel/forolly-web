import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import ViewProd from '../../Components/admin/ViewProd';

export default function ViewProdPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/view-product"
                    element={
                        <>
                            <Dashboard />
                            <ViewProd />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
