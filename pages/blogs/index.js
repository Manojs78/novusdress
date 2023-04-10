import React from 'react'
import axios from "axios"
import Link from 'next/link';


const backendApiUrl = "https://api.novusuniforms.com";
function blogs(props) {

    const getblogsList = props.getblogsList.data;

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
            <section class="Breadcrub_sec" id="blog_single_banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb text-light">
                                    <li class="breadcrumb-item"><Link href="/" class="text-light">Home</Link></li>
                                    <li class="breadcrumb-item text-light active" aria-current="page">Blogs</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <h2 class="innber_banner_heading text-light">Our Blogs</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section class="Products_grid_with_sidebar blog_section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 Product_Grid">
                            <div class="row">

                                {
                                    getblogsList.data.map((item, key) => (
                                        <div class="col-lg-4 col-md-6">
                                            <div class="product-card mb-5 m-0 m-sm-2">
                                                <Link href={'/blogs/' + item.slug}><img src={item.featured_image} class="w-100" alt="" /></Link>
                                                <div class="product-detail">
                                                    <Link href={'/blogs/' + item.slug}>
                                                        <h4 class="fw-bolder">{item.title}</h4>
                                                    </Link>
                                                    <p class="product-name mb-2"></p>
                                                    <Link href={'/blogs/' + item.slug} class="price mb-2"><span class="sale_off">Read More</span></Link>
                                                </div>
                                                <hr class="border-2" />
                                                <div class="blog-detail d-block d-sm-flex justify-content-lg-between expert fw-medium">
                                                    <span class="date">{item.created_at}</span>
                                                </div>
                                            </div>
                                        </div>

                                    ))

                                }



                            </div>


                            {getblogsList.data.length != 0 ?
                                <div class="PageNation_card">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">

                                            {
                                                getblogsList.links.map((item, key) => (
                                                    <li class="page-item"><Link style={{ pointerEvents: item.url == null ? 'none' : 'auto' }} class={item.active == true ? 'page-link active' : 'page-link'} href={item.url != null ? "/blogs?page=" + getQueryParams(item.url).page : ''} dangerouslySetInnerHTML={{ __html: item.label }}></Link></li>
                                                ))

                                            }

                                        </ul>
                                    </nav>
                                </div> :
                                'No Result Found'}


                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default blogs

export async function getServerSideProps(context) {

    const { page } = context.query;

    let blogs = await axios.get(backendApiUrl + "/api/customer/blogs/list?&page=" + page)
    const getblogsList = blogs.data;

    return {
        props: { getblogsList: getblogsList }, // will be passed to the page component as props
    }

}