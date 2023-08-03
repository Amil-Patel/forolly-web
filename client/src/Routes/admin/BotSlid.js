import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Components/admin/Dashboard';
import BotSlider from '../../Components/admin/BotSlider';

export default function BotSlid() {
    return (
        <>
            <Routes>
                <Route
                    path="/bottom-slider"
                    element={
                        <>
                            <Dashboard />
                            <BotSlider />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
