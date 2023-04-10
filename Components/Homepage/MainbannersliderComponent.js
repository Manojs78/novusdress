import React from 'react'
import Link from 'next/link'

function MainbannersliderComponent() {
    return (
        <section className="main-slider p-0">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 p-0">
                        <div id="banner-slider" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#banner-slider" data-bs-slide-to="0" className="active"
                                    aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#banner-slider" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#banner-slider" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#banner-slider" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            </div>
                            <div className="carousel-inner">
                            <div className="carousel-item active slider-content">
                                    <img src="assets/images/Baner.jpg" className="d-none d-sm-block w-100" alt="..." />
                                    <img src="assets/images/mbB1.jpg" className="d-block d-sm-hidden w-100" alt="..." />
                                    <div className="carousel-caption">
                                        <div className="num-head">
                                            <h2>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</h2>
                                        </div>
                                        <p className="pt-3 ps-3">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/></p>
                                        <div className="slider_btn pt-3">
                                            <Link href={'/'+'products?search_query='}>
                                                <button className="btn orange-btn">BUY NOW</button>
                                            </Link>
                                            <Link href={'/'+'schools-we-stock?search_school_query='}>
                                                <button className="btn white-btn">VIEW SCHOOL</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item slider-content">
                                    <img src="assets/images/b3.jpg" className="d-none d-sm-block w-100" alt="..." />
                                    <img src="assets/images/mbF3.jpg" className="d-block d-sm-hidden w-100" alt="..." />
                                    <div className="carousel-caption">
                                    <div className="num-head">
                                            <h2>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</h2>
                                        </div>
                                        <p className="pt-3 ps-3">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/></p>
                                        <div className="slider_btn pt-3">
                                            <Link href={'/'+'products?search_query='}>
                                                <button className="btn orange-btn">BUY NOW</button>
                                            </Link>
                                            <Link href={'/'+'schools-we-stock?search_school_query='}>
                                                <button className="btn white-btn">VIEW SCHOOL</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item slider-content">
                                    <img src="assets/images/b2.jpg" className="d-none d-sm-block w-100" alt="..." />
                                    <img src="assets/images/mbF2.jpg" className="d-block d-sm-hidden w-100" alt="..." />
                                    <div className="carousel-caption">
                                    <div className="num-head">
                                            <h2>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</h2>
                                        </div>
                                        <p className="pt-3 ps-3">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/></p>
                                        <div className="slider_btn pt-3">
                                            <Link href={'/'+'products?search_query='}>
                                                <button className="btn orange-btn">BUY NOW</button>
                                            </Link>
                                            <Link href={'/'+'schools-we-stock?search_school_query='}>
                                                <button className="btn white-btn">VIEW SCHOOL</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item slider-content">
                                    <img src="assets/images/b1.jpg" className="d-none d-sm-block w-100" alt="..." />
                                    <img src="assets/images/mbF1.png" className="d-block d-sm-hidden w-100" alt="..." />
                                    <div className="carousel-caption">      
                                    <div className="num-head">
                                            <h2>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</h2>
                                        </div>
                                        <p className="pt-3 ps-3">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/></p>
                                        <div className="slider_btn pt-3">
                                            <Link href={'/'+'products?search_query='}>
                                                <button className="btn orange-btn">BUY NOW</button>
                                            </Link>
                                            <Link href={'/'+'schools-we-stock?search_school_query='}>
                                                <button className="btn white-btn">VIEW SCHOOL</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#banner-slider" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#banner-slider" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainbannersliderComponent