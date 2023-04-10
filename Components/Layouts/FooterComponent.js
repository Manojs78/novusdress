import React from 'react'
import Link from 'next/link'
import { subscribeApi } from "../../Api/Api"
import { toast } from "react-toastify"

function FooterComponent() {

    const handleSubscribeSubmit = async (event) => {
        event.preventDefault()
        var email = event.target.email.value;

        if(email == ''){
            toast.error("Email is required", {
                position: "top-right",
                autoClose: 1000,
              })
            return;
        }

        var formdata = new FormData();

        formdata.append('email', email);

        subscribeApi(formdata).then((response) => {
            toast.error("You have Subscibed Successfully", {
                position: "top-right",
                autoClose: 1000,
              })
      
          }).catch((error) => {
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 1000,
            })
          })

    }
    return (
        <>
            <footer className="footer_section">
                <div className="container border-b">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="logo text-start">
                                <Link href="/">
                                 <img height={55}  src={"/"+"assets/images/logofooter.png"}/>
                                </Link>
                            </div>
                            <p className="text-white pt-4">Novus India  (an ISO 9001:2008 company) came into existence in the year 2016  and since then we have carved a niche for ourselves as a noteworthy manufacturer of excellent quality school, college and corporate uniforms.</p>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <h4 className="footer-heading mb-4 ps-0 ps-sm-4">IMPORTANT LINKS</h4>
                            <ul className="f-menu text-white ps-2 ps-sm-4">
                                <li><Link href="/page/about-us"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> About Us</Link></li>
                                <li><Link href="/page/privacy-policy"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> Privacy Policy</Link></li>
                                <li><Link href="/page/returns-and-refund"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> Return & Refund Policy</Link></li>
                                <li><Link href="/page/terms-of-service"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> Terms Of Service</Link></li>
                                <li><Link href="/page/shipping-policy"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> Shipping Policy</Link></li>
                                <li><Link href="/size-charts"><img src={"/"+"assets/images/right-arrow.png"} alt="" /> Size Charts</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <h4 className="footer-heading mb-4">ADDRESS</h4>
                            <p className="text-white"><b>Novus India</b> <br />Plot No : 590, 2nd Floor,  JLPL, Sector 82, Mohali, Punjab - 160055</p>
                            <ul className="contact-details list-unstyled">
                                <li><a href="#" className="email text-white "><b>Email</b>: manish@novusindia.net</a></li>
                                <li><a href="#" className="email text-white "><b>Email</b>: rm@novusindia.net</a></li>
                                
                                <li className="text-light">Reach us at:</li>
                                <li><a href="#" className="call">Saupin School: +91 90410-01442</a></li>
                                <li><a href="#" className="call">Manav Mangal School: +91 73073-45777</a></li>
                                <li><a href="#" className="call">Mukand/Govt.School: +91 98963-22799</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container pt-5 footer-bottom">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <h5><span>Subscribe to our newsletter</span> <br />and stay updated on courses</h5>
                            <form className="d-flex" role="search" onSubmit={handleSubscribeSubmit} >
                                <input className="form-control me-2" name='email' autoComplete='off' type="email" placeholder="Enter Email ID" />
                                <button className="btn drak-btn" type="submit">SUBSCRIBE</button>
                            </form>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <h4 className="text-white ps-sm-4 pt-4 pt-sm-0">Follow Us On:</h4>
                            <ul className="social-icon ps-sm-4 list-unstyled ">
                                <li><a href="https://www.instagram.com/novusuniforms/" target="_blank"><img src={"/"+"assets/images/insta.png"} alt="insta" /></a></li>
                                <li><a href="https://www.facebook.com/profile.php?id=100090860678344" target="_blank"><img src={"/"+"assets/images/fb.png"} alt="fb" /></a></li>
                                {/* <li><a href="#"><img src={"/"+"assets/images/tweet.png"} alt="tweet" /></a></li>
                                <li><a href="#"><img src={"/"+"assets/images/linkdin.png"} alt="linkdin" /></a></li> */}
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-4 pt-4 pt-sm-0">
                            <h5>We Accept Online Payments:</h5>
                            <img src={"/"+"assets/images/paymnt.jpg"} className="w-100" alt="" />
                        </div>
                    </div>
                </div>
            </footer>
            <section className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <p>Copyright © 2023, <a href="#">Novus India</a> . All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FooterComponent