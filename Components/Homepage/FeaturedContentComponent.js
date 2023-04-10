import React from 'react'
import { getschoolList } from "../../Api/Api"
import { useState, useEffect } from 'react'
import SchoolComponent from './SchoolComponent';




function FeaturedContentComponent(props) {
    const schoolList = props.schoolList;

    return (
        <section className="school-sec pt-0">
            {/* <!---------------------------------> */}
            <div className="container policy_section mb-5">
                <div className="row">
                    <div className="col-lg-3 col-md-3 text-center">
                        <div className="ft-box mb-4 mb-sm-0">
                            <img src="assets/images/custom-dress.png" className="w-100" alt="" />
                            <h4>CUSTOMIZED DRESSES</h4>
                            <p className="mb-0">Tailored to Suit Your Specific Size & Shape</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 text-center">
                        <div className="ft-box mb-4 mb-sm-0">
                            <img src="assets/images/return-policy.png" className="w-100" alt="" />
                            <h4>3 DAYS RETURN POLICY</h4>
                            <p className="mb-0">Hassle Free 3 Days Return Policy </p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 text-center">
                        <div className="ft-box mb-4 mb-sm-0">
                            <img src="assets/images/free-shipping.png" className="w-100" alt="" />
                            <h4>FREE SHIPPING</h4>
                            <p className="mb-0">Save Time & Fuel and Get Free Shipping</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 text-center">
                        <div className="ft-box">
                            <img src="assets/images/cod.png" className="w-100" alt="" />
                            <h4>CASH ON DELIVERY</h4>
                            <p className="mb-0">Pay Cash on Delivery for Dress at the Time of Delivery</p>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!---------------------------------> */}

            <SchoolComponent schoolList={schoolList} />
        </section>
    )
}



export default FeaturedContentComponent