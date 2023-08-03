import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import Category from '../../Components/admin/Category';

export default function CatePage() {
    return (
        <>
            <Routes>
                <Route
                    path="/category"
                    element={
                        <>
                            <Dashboard />
                            <Category />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
