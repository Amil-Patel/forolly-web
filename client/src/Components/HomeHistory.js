import React from 'react';


export default function HomeHistory() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 p-0 col-md-12 d-lg-block d-none history-bg">
                        <img src={require('../Assets/images/history-bg.png')} alt="" className='img-fluid about-img' />
                    </div>
                    <div className="col-lg-6 col-md-12 pt-5 ps-5 history-right-side">
                        <p className='about-text'>About us</p>
                        <p className='about-head'><span className='about-brd pb-2'>OUR</span> HISTORY</p>
                        <p className='about-para mt-5'><span>Forolly</span> was established in Nov 2020.
                            From the snapshot of its creation, the organization put the majority of its undertakings to lead the best portrayal of the brand Forolly on the Indian market.
                            After the essential exercises to promote the <span>forolly</span> mark in different States, the group focused on building a methodology for perhaps the broadest circulation of its items.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
