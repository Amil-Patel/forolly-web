import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import AddNutr from '../../Components/admin/AddNutr';

export default function AddNutrPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/add-nutrition"
                    element={
                        <>
                            <Dashboard />
                            <AddNutr />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
