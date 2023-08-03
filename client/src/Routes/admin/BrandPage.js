import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import Brand from '../../Components/admin/Brand';

export default function BrandPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/brand"
                    element={
                        <>
                            <Dashboard />
                            <Brand />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
