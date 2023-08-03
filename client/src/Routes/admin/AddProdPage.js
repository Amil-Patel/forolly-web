import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import AddProd from '../../Components/admin/AddProd';

export default function AddProdPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/add-product"
                    element={
                        <>
                            <Dashboard />
                            <AddProd />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
