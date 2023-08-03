import React, { useEffect, useState,lazy,Suspense } from 'react';
import '../CSS/Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import axios from 'axios';
import ShimarUi from './ShimarUi';
const HomeHistory = lazy(() => import('./HomeHistory'));

export default function Home() {
    const [populerProduct, setPopulerProduct] = useState([]);
    useEffect(() => {
        $('.wrapper').slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
            ],
        });
        getPopulerProduct();
    }, []);

    const getPopulerProduct = () => {
        axios.get('http://localhost:1005/product/1/4')
            .then((response) => {
                setPopulerProduct(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Product data in Brand.js:', error);
            });
    }

    const navigate = useNavigate();
    const handlepopuler = (populerId) => {
        navigate('/products/about-product', {
            state: { id: populerId }
        })
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <Suspense fallback={ <ShimarUi width={500} height={400} />}>
                <HomeHistory />
            </Suspense>
            {/************** WHY CHOOSE US START **************/}

            <div className="container-fluid">
                <div className="row shadow">
                    <div className="col-lg-4 pt-lg-5 ps-lg-5">
                        <p className='serv-text'>Services</p>
                        <p className='choose-head'><span>WHY</span> CHOOSE US</p>
                    </div>
                    <div className="col-lg-8 choose-bg">
                        <div className="row choose-main">
                            <div className="col-lg-4 choose">
                                <div className='choose-icon'> <i className="fa-solid fa-bag-shopping"></i> </div>
                                <div className='choose-info'>
                                    <p>70+</p>
                                    <p>PRODUCTS</p>
                                </div>
                            </div>
                            <div className="col-lg-4 choose">
                                <div className='choose-icon'> <i className="fa-solid fa-bag-shopping"></i> </div>
                                <div className='choose-info'>
                                    <p>500+</p>
                                    <p>DISTRIBUTERS</p>
                                </div>
                            </div>
                            <div className="col-lg-4 choose">
                                <div className='choose-icon'> <i className="fa-solid fa-bag-shopping"></i> </div>
                                <div className='choose-info'>
                                    <p>100k+</p>
                                    <p>CUSTOMERS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/************** WHY CHOOSE US END **************/}

            {/*************** THREE CARD START ***************/}

            <div className="container-fluid mt-5">
                <div className="container pt-lg-5 pt-0">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-md-5 mt-5">
                            <div className='d-flex pt-5 card-main'>
                                <div className='card-icon'><i className="fa-solid fa-award"></i></div>
                                <div className='ps-3'>
                                    <p className='card-head'>High Quality</p>
                                    <p className='card-para'>Forolly is a great brand with a variety of options like Brownie Vanilla,
                                        Badam Shake, Cherry Merry, Choco Coconut, Mango Coconut Barfi, and Choco
                                        Paan and it’s one of our top dietitian-approved choices for chocolates
                                        with high-quality ingredients.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-md-5 mt-5">
                            <div className='d-flex pt-5 card-main'>
                                <div className='card-icon'> <i className="fa-solid fa-face-smile"></i></div>
                                <div className='ps-3'>
                                    <p className='card-head'>Super Taste</p>
                                    <p className='card-para'>Chocolate feels smooth and velvety in your mouth.
                                        Also known as mouth-feel, high-quality chocolate has a distinct texture that
                                        is difficult to describe but easily recognizable when you feel it in your
                                        own mouth.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-md-5 mt-5">
                            <div className='d-flex pt-5 card-main'>
                                <div className='card-icon'><i className="fa-solid fa-gift"></i></div>
                                <div className='ps-3'>
                                    <p className='card-head'>Great for Gift</p>
                                    <p className='card-para'>From the indulgent scent to the silky-smooth texture
                                        and decadent flavor, it’s tough not to love chocolate—which is exactly why
                                        it makes for a solid gift for every occasion, whether it be Mother’s Day or
                                        Valentine’s Day. it’s almost universally beloved by all ages.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*************** THREE CARD END ***************/}

            {/************* POPULAR PRODUCTS START *************/}

            <div className="container-fluid mt-5 prod-bg">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-8 col-12 pe-lg-5 pe-0">
                            <p className='popular-head'>Popular Products</p>
                            <p className='popular-para'>Chocolate and love go hand in hand – if you want to get on your loved one’s
                                good side, feed them a steady supply of confectionery! In fact, a study by
                                the Journal of Social and Personal Relationships found that eating sweet
                                treats can lead to heightened romantic interest.
                            </p>
                        </div>
                        <div className="col-lg-4 col-12">
                            <NavLink to="/products" className="popular-btn effect-5 my-5 mx-lg-5">View All Products</NavLink>
                        </div>
                    </div>

                    <div className="row mt-5 pb-5">
                        {
                            populerProduct.map((populer) => {
                                return (
                                    <div className="col-lg-3 col-md-6" key={populer.prod_id}>
                                        <div className='four-card-main text-center' onClick={() => { handlepopuler(populer.prod_id) }}>
                                            <p className='four-card-head'>{populer.title}</p>
                                            {populer.image && (
                                                <img src={require(`../Assets/upload/${populer.image}`)} alt="" className='four-card-img img-fluid' />
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/************* POPULAR PRODUCTS END *************/}

            {/************* TESTIMONIALS START *************/}

            <div className="container mt-5">
                <div className="row text-center">
                    <p className='testi-text'>Testimonials</p>
                    <p className='testi-head'>What Our Customers Says</p>
                    <p className='testi-para'>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
                    </p>
                    <div>
                        <img src={require('../Assets/images/testimen-img.png')} alt="" className='img-fluid testi-img' />
                    </div>
                </div>
            </div>

            <div className='testi-slider-main'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 text-center testi-slider-text">
                            Chocolate Makes Everything Better
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-6">
                            <div className="wrapper slider-wrapper">
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider1.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider2.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider3.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider4.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider5.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider6.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider7.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider8.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider9.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider1.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider10.png')} alt='' />
                                </div>
                                <div className="item">
                                    <img src={require('../Assets/images/bottom-slider11.png')} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/************* TESTIMONIALS END *************/}

        </>
    )
}

