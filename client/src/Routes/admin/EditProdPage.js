import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import EditProd from '../../Components/admin/EditProd';

export default function EditProdPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/edit-product"
                    element={
                        <>
                            <Dashboard />
                            <EditProd />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
