import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import App from './Routes/App';
import About from './Routes/About';
import Products from './Routes/Products';
import Inquiry from './Routes/Inquiry';
import Contact from './Routes/Contact';
import Dash from './Routes/admin/Dash';
import LoginPage from './Routes/admin/LoginPage';
import BrandPage from './Routes/admin/BrandPage';
import CatePage from './Routes/admin/CatePage';
import BotSlid from './Routes/admin/BotSlid';
import ProdPage from './Routes/admin/ProdPage';
import AddProdPage from './Routes/admin/AddProdPage';
import ViewProdPage from './Routes/admin/ViewProdPage';
import EditProdPage from './Routes/admin/EditProdPage';
import AddNutrPage from './Routes/admin/AddNutrPage';
import ViewNutrPage from './Routes/admin/ViewNutrPage';
import AboutProductPage from './Routes/AboutProductPage';
import AdminCont from './Routes/admin/AdminCont';
import AddAdminInquiry from './Routes/admin/AddAdminInquiry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <About />
    <Products />
    <Inquiry />
    <Contact />
    <LoginPage />
    <Dash />
    <BrandPage />
    <CatePage />
    <BotSlid />
    <ProdPage />
    <AddProdPage />
    <ViewProdPage />
    <EditProdPage />
    <AddNutrPage />
    <ViewNutrPage />
    <AboutProductPage />
    <AdminCont />
    <AddAdminInquiry />
  </BrowserRouter>
);

reportWebVitals();
