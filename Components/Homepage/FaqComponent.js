import React from 'react'
import { useState } from 'react'

const FaqComponent = (props) => {

  const faqList = props.faqList;
  
  
  return (
    <section className="faq-sec ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 text-center">
            <img src="assets/images/erf-1.png" className="w-100 girl-img" alt="" />
          </div>
          <div className="col-lg-6 col-md-6">
            <h2 className="sec-title mb-2">Frequently Asked Questions ?</h2>
            <div className="sep"></div>


            <div id="accordion">
              {
                faqList.map((item, key) => (
                  <div className="card" key={key}>
                    <div className="card-header">
                      <a className="btn" data-bs-toggle="collapse" href={'#collapse'+key}>
                        <img src="assets/images/faq-icon.png" alt="" /> {item.ques}
                      </a>
                    </div>
                    <div id={'collapse'+key} className={key == 0 ? ("collapse show") : ("collapse")} data-bs-parent="#accordion">
                      <div className="card-body">{item.ans}
                      </div>
                    </div>
                  </div>

                ))

              }

            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default FaqComponent
