import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import AdminContact from '../../Components/admin/AdminContact';

export default function AdminCont() {
    return (
        <>
            <Routes>
                <Route
                    path="/admin-contact"
                    element={
                        <>
                            <Dashboard />
                            <AdminContact />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
