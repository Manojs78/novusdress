import React from 'react'
import axios from "axios"
import ProductComponent from '@/Components/School/ProductComponent';
import Link from 'next/link'

const backendApiUrl = "https://api.novusuniforms.com";

function SchoolPage(props) {
  const schoolDetail = props.schoolDetail.data;

  return (
    <>
      <section class="Breadcrub_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li class="breadcrumb-item" aria-current="page"><Link href="/schools-we-stock?search_school_query=">Schools</Link></li>
                  <li class="breadcrumb-item active" aria-current="page">{schoolDetail.name}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section class="Breadcrub_sec" id="package_category_banner" style={{ backgroundImage: `url(${schoolDetail.banner_img})` }}>
        <div class="container">

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <h2 class="innber_banner_heading"><b>{schoolDetail.name}</b></h2>
              <p>{schoolDetail.description}</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!------------------------------------------------------------------------> */}

      <section class="shop_by_class bg_gray">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="sec-title mb-2 text-center">SHOP BY CLASS</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="shop_by_class_wrap">
                {
                  schoolDetail.package_types.map((item, key) => (
                    <Link href={'product-bulk-add-to-cart/' + schoolDetail.id + "/" + item.id}><img src={item.image} alt="" /></Link>

                  ))

                }

              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="b_products bg_gray">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="sec-title mb-2 text-center">PRODUCTS</h2>
            </div>
          </div>

          <div class="row pt-5">



            {
              schoolDetail.products.map((item, key) => (
                <ProductComponent item={item} />

              ))

            }

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
                <img src="/assets/images/p-icon2.png" alt="Easy Exchange" />
                <h4>Easy Exchange</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src="/assets/images/p-icon1.png" alt="Cod" />
                <h4>Secure Payments</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src="/assets/images/p-icon3.png" alt="Guaranteed Authenticity" />
                <h4>Quality Guaranteed</h4>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 col-6">
              <div class="icon_box_wrap">
                <img src="/assets/images/p-icon4.png" alt="Handpicked" />
                <h4>Fast Delivery</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SchoolPage

export async function getServerSideProps(context) {

  const { school_id } = context.query;

  let schoolDetails = await axios.get(backendApiUrl + "/api/customer/get_school_detail/" + school_id);

  const schoolDetail = schoolDetails.data;

  if (schoolDetail.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: { schoolDetail: schoolDetail }, // will be passed to the page component as props
  }

}