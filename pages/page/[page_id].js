import React from 'react'
import axios from "axios"
import Link from 'next/link';

const backendApiUrl = "https://api.novusuniforms.com";
function Page(props) {
    const pageDetail = props.pageDetail.data;
    return (
        <>

            <section class="Breadcrub_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li class="breadcrumb-item" aria-current="page">Page</li>
                                    <li class="breadcrumb-item active" aria-current="page">{pageDetail.name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section class="Breadcrub_sec" id="package_category_banner" style={pageDetail.image == null ? {} : { backgroundImage: `url(${pageDetail.image})` }}>
                <div class="container">

                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                            <h2 class="innber_banner_heading"><b>{pageDetail.name}</b></h2>
                        </div>
                    </div>
                </div>
            </section>

            <section class="b_products bg_gray">
                <div class="container" dangerouslySetInnerHTML={{ __html: pageDetail.content }}>

                </div>
            </section>
        </>
    )
}

export default Page

export async function getServerSideProps(context) {

    const { page_id } = context.query;

    let pageDetails = await axios.get(backendApiUrl + "/api/customer/get_page_details/" + page_id);

    const pageDetail = pageDetails.data;

    if (pageDetail.data == null) {
        return {
            notFound: true,
        }
    }

    return {
        props: { pageDetail: pageDetail }, // will be passed to the page component as props
    }

}