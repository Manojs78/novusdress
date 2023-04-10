import React from 'react'
import Link from 'next/link'

function FeatureOfferComponent() {
  return (
    <section className="ad-banner-sec ">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 text-left">
              <h2 className="sec-title mb-2">ONLY FOR THIS MONTH
                <span>UPTO 60%OFF</span>
                ON UNIFORMS
              </h2>
              <Link href="/products?search_query=">
                <button className="btn orange-btn">BUY NOW</button>
              </Link>
            </div>

            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
  )
}

export default FeatureOfferComponent