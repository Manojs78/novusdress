import React from 'react'
import Link from 'next/link'

function SchoolUniformsComponent() {
  return (
    <section className="product-sec school-uniform">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="sec-title mb-2">SCHOOL UNIFORMS</h2>
          <h5 className="sec-sub-title mb-5" style={{ color: '#050505' }}>Find out all Uniforms, Shoes & Accessories for your
            school</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="su-box">
            <img src="assets/images/su-img1.png" className="w-100" alt="" />
            <h3>SCHOOL</h3>
            <p className="mb-0">UNIFORMS</p>
          </div>

          <div className="su-btn mb-3 mb-lg-0">
            <Link href="/schools-we-stock?search_school_query=">BUY NOW</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="su-box">
            <img src="assets/images/su-img2.png" className="w-100" alt="" />
            <h3>BOYS</h3>
            <p className="mb-0">UNIFORMS</p>
          </div>

          <div className="su-btn mb-3 mb-lg-0">
            <Link href="/schools-we-stock?search_school_query=">BUY NOW</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="su-box ">
            <img src="assets/images/su-img3.png" className="w-100" alt="" />
            <h3>GIRLS</h3>
            <p className="mb-0">UNIFORMS</p>
          </div>

          <div className="su-btn mb-3 mb-lg-0">
            <Link href="/schools-we-stock?search_school_query=">BUY NOW</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="su-box">
            <img src="assets/images/su-img4.png" className="w-100" alt="" />
            <h3>SHOES &</h3>
            <p className="mb-0">ACCESSORIES</p>
          </div>

          <div className="su-btn mb-3 mb-lg-0">
            <Link href="/category/accessories">BUY NOW</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SchoolUniformsComponent