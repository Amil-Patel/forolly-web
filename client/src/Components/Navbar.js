import React from "react";
import '../CSS/App.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand ps-0 ps-lg-3" to="/">
            <img src={require('../Assets/images/logo.png')} className="img-fluid w-100 nav-logo" alt="" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto mt-5 mt-lg-0">
              <NavLink to="/" className="nav-link mx-2">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link mx-2">
                About Us
              </NavLink>
              <NavLink to="/products" className="nav-link mx-2">
                Products
              </NavLink>
              <NavLink to="/inquiries" className="nav-link mx-2">
                Inquiries
              </NavLink>
              <NavLink to="/contact" className="nav-link mx-2">
                Contact Us
              </NavLink>
            </div>
            <button type="button" className="mx-5 px-4 py-2 d-lg-block d-none cate-btn">Veiw Catalogue</button>
          </div>
        </div>
      </nav>
    </>
  );
}

