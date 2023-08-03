import React, { lazy,Suspense } from 'react';
import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Footer from '../Components/Footer';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('../Components/Home'));

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Slider />
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
              <Footer />
            </>
          }
        />
      </Routes>

    </>
  )
}
