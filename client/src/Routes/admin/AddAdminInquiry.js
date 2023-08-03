import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import AdminInquiry from '../../Components/admin/AdminInquiry';

export default function AddAdminInquiry() {
    return (
        <>
            <Routes>
                <Route
                    path="/inquiry"
                    element={
                        <>
                            <Dashboard />
                            <AdminInquiry />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
