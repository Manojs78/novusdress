import React from 'react'
import axios from "axios"
import Link from 'next/link';


const backendApiUrl = "https://api.novusuniforms.com";

function Category(props) {

  const get_product_list = props.get_product_list.data;

  const product_list = get_product_list.products_new;

  function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
    })
    return params;
  }

  return (
    <>
      <section class="Breadcrub_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li class="breadcrumb-item" aria-current="page">Category</li>
                  <li class="breadcrumb-item active" aria-current="page">{get_product_list.name}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section class="Breadcrub_sec" id="serach_result_banner" style={get_product_list.image == null ? {} : { backgroundImage: `url(${get_product_list.image})` }} >
        <div class="container">

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <h2 class="innber_banner_heading text-center">{get_product_list.name}</h2>
            </div>
          </div>
        </div>
      </section>



      <section class="b_products bg_gray">
        <div class="container">

          <div class="row pt-5">
            {product_list.data.length != 0 ?
              <>
                {
                  product_list.data.map((item, index) => (
                    <div className="col-lg-3 col-md-6">
                      <div className="product-card mb-3">
                      <Link href={'/' + 'product/' + item.id}>
                        <img src={item.main_image.image} className="w-100" alt="" />
                        </Link>
                        <div className="product-detail">

                          <p className="product-name mb-2">{item.product_name.slice(0, 30)}...</p>
                          <p className="price mb-2"><b>Rs. {item.selling_price}/-</b> <del>Rs. {item.mrp}/-</del></p>
                          <Link href={'/' + 'product/' + item.id} className="buy-btn"><b>SHOP NOW</b></Link>
                        </div>
                      </div>
                    </div>
                  ))

                }


                <div class="PageNation_card">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">

                      {
                        product_list.links.map((item, key) => (
                          <li class="page-item"><Link style={{ pointerEvents: item.url == null ? 'none' : 'auto' }} class={item.active == true ? 'page-link active' : 'page-link'} href={item.url != null ? "/category/" + get_product_list.name + "?page=" + getQueryParams(item.url).page : ''} dangerouslySetInnerHTML={{ __html: item.label }}></Link></li>
                        ))

                      }

                    </ul>
                  </nav>
                </div></> :
              <p class="text-center">No Result Found</p>}

          </div>
        </div>
      </section>

      <section class="platform_kids bg_gray pt-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <h4 class="sub_title"><span>Best Platform to buy your kids dress online</span></h4>
            </div>
          </div>
          <div class="row icon_box_wrap_row">
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src={"/" + "assets/images/p-icon2.png"} alt="Easy Exchange" />
                <h4>Easy Exchange</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src={"/" + "assets/images/p-icon1.png"} alt="Cod" />
                <h4>Secure Payments</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src={"/" + "assets/images/p-icon3.png"} alt="Guaranteed Authenticity" />
                <h4>Quality Guaranteed</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src={"/" + "assets/images/p-icon4.png"} alt="Handpicked" />
                <h4>Fast Delivery</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Category

export async function getServerSideProps(context) {


  const { category_id, page } = context.query;

  let category_data = await axios.get(backendApiUrl + "/api/customer/products_by_category/" + category_id + "?page=" + page)

  const get_product_list = category_data.data;

  if (get_product_list.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: { get_product_list: get_product_list }, // will be passed to the page component as props
  }

}