import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../../Components/admin/Login';

export default function LoginPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/admin"
                    element={
                        <>
                            <Login />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
