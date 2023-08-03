import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Dashboard = lazy(() => import('../../Components/admin/Dashboard'))

export default function Dash() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Dashboard />
                            </Suspense>

                        </>
                    }
                />
            </Routes>
        </>
    )
}
