import React from 'react'
import Link from 'next/link'

function OurproductComponent(props) {


  const homepagecategoryList = props.homepagecategoryList;

  return (
    <section className="product-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec-title mb-2">OUR PRODUCTS</h2>
            <h5 className="sec-sub-title">Unique designs curated for you</h5>
          </div>

          <div className="col-lg-12">
            <div className="tabs-product mt-3">
              {/* <!-- Nav pills --> */}
              <div className="tabs-btn">
                <ul className="nav nav-pills" role="tablist">
                  {
                    homepagecategoryList.map((item, key) => (
                      <li key={key} className="nav-item">
                        <a className={key == 0 ? 'nav-link active' : 'nav-link'} role="tab" data-bs-toggle="pill" href={"#tab" + key} aria-selected>{item.name}</a>
                      </li>

                    ))

                  }


                </ul>
              </div>

              {/* <!-- Tab panes --> */}
              <div className="tab-content">
                {
                  homepagecategoryList.map((item, key) => (
                    <div key={key} id={"tab" + key} className={key == 0 ? 'container tab-pane active' : 'container tab-pane'}><br />
                      <div className="row">
                        {
                          item.products.map((product, product_key) => (
                            <div className="col-lg-3 col-md-6" key={product_key}>
                              <div className="product-card mb-3">
                                <Link href={'product/' + product.id}>
                                  <img src={product.main_image.image} className="w-100" alt="" />
                                </Link>
                                <div className="product-detail">
                                  <p className="product-name mb-2">{product.product_name.slice(0, 28)}...</p>
                                  <p className="price mb-2 w-100"><b>Rs. {product.selling_price}/-</b> <del>Rs. {product.mrp}/-</del></p>
                                  <Link href={'product/' + product.id} className="buy-btn"><b>SHOP NOW</b></Link>
                                </div>
                              </div>
                            </div>

                          ))

                        }

                      </div>
                    </div>

                  ))

                }
                <div className="row mt-5">
                  <div className="col-lg-12 text-center">
                    <Link href="/products?search_query=">
                      <button className="btn btn-light mt-4">VIEW ALL</button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default OurproductComponent