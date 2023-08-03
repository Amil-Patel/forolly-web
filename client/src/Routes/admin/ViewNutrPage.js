import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import ViewNutr from '../../Components/admin/ViewNutr';

export default function ViewNutrPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/view-nutrition"
                    element={
                        <>
                            <Dashboard />
                            <ViewNutr />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
