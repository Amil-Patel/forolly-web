import React from 'react';
import '../CSS/AboutMain.css';

export default function AboutMain() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="about-history-bg img-fluid">
                        <p className="about-history-head">Our History</p>
                        <p className="about-history-para">The mission of the ‘Forolly’ is to give youth candy recollections, for
                            example, a way that it celebrates God and His arrangement for our lives. Our objective for each
                            candy arrange is that it results in a “charmed client” who will tell their companions.</p>
                    </div>
                </div>
            </div>

            {/* /********** HISTORY SECTION START ********** */}

            <div className="container-fluid welcome-bg">
                <div className="row p-lg-5 p-0 ps-md-5 ps-0">
                    <div className="col-lg-6 col-sm-12 text-center">
                        <img src={require('../Assets/images/about-welcome-img.png')} alt=''
                            className='welcome-img float-lg-end' />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <p className="welcome-para1">Welcome to</p>
                        <p className='welcome-head'><span className='welcome-head-brd'>FO</span>ROLLY</p>
                        <p className="welcome-para2 mt-5"><strong>‘Forolly’</strong>was established in Nov 2020.<br />
                            From the snapshot of its creation, the organization put the majority of its undertakings to lead the
                            best portrayal of the brand<strong> ‘Forolly’ </strong>on the Indian market.<br />
                            After the essential exercises to promote the ‘Forolly’ mark in different States, the group focused
                            on building a methodology for perhaps the broadest circulation of its items.
                        </p>
                    </div>
                </div>
            </div>

            {/* /********** HISTORY SECTION END ********** */}

            {/* *********** CALL SECTION START *********** */}

            <div className="container call-bg">
                <div className="row">
                    <div className='d-flex'>
                        <span className='call-icon'>
                            <i className="fa-sharp fa-solid fa-phone"></i>
                        </span>
                        <span>
                            <p className='call-head'>CALL US IF YOU HAVE ANY QUESTIONS <br />
                                <span className='call-para'>+91 9510 270 600</span>
                            </p>
                        </span>
                    </div>
                </div>
            </div>

            {/* *********** CALL SECTION END *********** */}

            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-6 col-md-12">
                        <p className='about-head'>About us</p>
                        <p className='about-para'><strong>‘Forolly’</strong> offers us the chance to come nearer to the
                            happiness
                            of a kid’s grin and dreams by furnishing us with an approach to feel perpetually caught by the
                            mysterious universe of adolescence and the life-changing taste of its items, with which we will
                            dependably associate with.
                            The group of <strong>‘Forolly’ </strong>wishes you upbeat biting!</p>
                    </div>
                    <div className="col-lg-6 col-md-12 about-bg">
                        <p className='about-head'>🙂We are the Best</p>
                        <p className='about-para'>‘Forolly’ offers us the chance to come nearer to the happiness
                            of a kid’s grin and dreams by furnishing us with an approach to feel perpetually caught
                            by the mysterious universe of adolescence and the life-changing taste of its items,
                            with which we will dependably associate with. The group of ‘Forolly’ wishes you upbeat
                            biting!
                        </p>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12 py-3 about-bg2">
                        <p className='about-para2'>
                            You can choose from a wide assortment of chocolates going from plain rich chocolates
                            to nutty focuses, from crunches to seasoned rarities, from rich truffles to delicate
                            caramels and a lot more to satisfy the chocoholics.‘Forolly’ guarantees to leave a
                            ‘Chocolaty Signature’ in your heart.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
