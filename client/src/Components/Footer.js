import React, { useEffect } from 'react';
import '../CSS/Footer.css';
import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [location.pathname])
    return (
        <>
            <div className="container-fluid footer-bg1">
                <div className="container">
                    <div className="row text-center py-5">
                        <p className='foot1-head'>Become a Distributor/Dealer</p>
                        <p className='foot1-para'>Your content goes here. Edit or remove this text inline or
                            in the module Content settings. You can also style every aspect of this content in
                            the module Design settings and even apply custom CSS to this text in the module Advanced
                            settings.
                        </p>
                        <div className='text-center'>
                            <button className='foot1-btn m-3'>Dealer Inquiry</button>
                            <button className='foot1-btn m-0'>View Catelogue</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid footer2-bg">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-lg-3 col-md-6">
                            <img src={require('../Assets/images/footer-logo.png')} alt="" className='img-fluid footer2-img' />
                            <p className='footer-col1-para mt-4 pe-5'>The mission of the ‘Forolly’ is to give youth candy
                                recollections, for example, a way that it celebrates God and His arrangement for our
                                lives. Our objective for each candy arrange is that it results in a “charmed client”
                                who will tell their companions.
                            </p>
                            <span className='footer-icon p-0'>
                                <NavLink className='text-white' to="https://www.facebook.com/profile.php?id=100080207596150" target='_blank'>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </NavLink>

                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </span>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <p className='footer-title'><span className='footer-title-brd'>Links</span></p>
                            <div>
                                <NavLink to="/" className='footer-links'>Home</NavLink>
                            </div>
                            <div>
                                <NavLink to="/about" className='footer-links'>About us</NavLink>
                            </div>
                            <div>
                                <NavLink to="/products" className='footer-links'>Products</NavLink>
                            </div>
                            <div>
                                <NavLink to="/inquiries" className='footer-links'>Dealer Inquiries</NavLink>
                            </div>
                            <div>
                                <NavLink to="/contact" className='footer-links'>Contact us</NavLink>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-md-5 mt-lg-0 mt-sm-5">
                            <p className='footer-title'><span className='footer-title-brd'>Cont</span>act Us </p>
                            <div className='footer-contact-link text-white d-flex mb-4'>
                                <div className='footer-contact-icon'><i className="fa-solid fa-location-dot pe-4"></i></div>
                                <div>
                                    <p className='footer-contact-para pe-5'> Survey No. 646, Plot No. 3, 4, 5, Ahmedabad palanpur Highway, Village-Majadar,
                                        Ta-vadgam, Dist-Banaskantha, Gujarat-385210, India.
                                    </p>
                                </div>
                            </div>
                            <div className='footer-contact-link text-white d-flex mb-4'>
                                <div className='footer-contact-icon pe-3'><i className="fa-solid fa-phone"></i></div>
                                <div>
                                    <p className='footer-contact-para pe-5 mt-3'> +91 95102 70600</p>
                                </div>
                            </div>
                            <div className='footer-contact-link text-white d-flex mb-4'>
                                <div className='footer-contact-icon pe-3'><i className="fa-solid fa-envelope-open"></i></div>
                                <div>
                                    <p className='footer-contact-para pe-5 mt-3'>support@forollyfood.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-md-5 mt-lg-0 mt-sm-5">
                            <div className='footer-bg-white p-3 text-center'>
                                <p>Subscribe for hot updates </p>
                                <input type="text" placeholder='Enter Your Name' />
                                <input type="text" placeholder='Enter Your Email Address' />
                                <button className='btn btn-secondary px-3 py-2'>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
