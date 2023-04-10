import React from 'react'
import SingleSchoolComponent from '@/Components/Homepage/SingleSchoolComponent';
import axios from "axios"
import Link from 'next/link';

const backendApiUrl = "https://api.novusuniforms.com";

function schoolsWEstock(props) {

    const schoolAllList = props.schoolList.data;

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
                                    <li class="breadcrumb-item active" aria-current="page">Schools we stock</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section class="all_school_list bg_gray">
                <div class="container school_we_stock_cont">
                    <div class="row jcc">
                        <div class="category_card_box mb-0 mb-sm-4">
                            <form class="d-flex mb-0 mb-sm-4" role="search">
                                <input class="form-control" name='search_school_query' autoComplete='off' defaultValue={props.search_school_query} type="search" placeholder="Search by school" />
                                <button class="btn drak-btn" type="submit"><i class="fas fa-search"></i></button>
                            </form>
                        </div>

                        <div class="category_card_box_row">
                            {
                                schoolAllList.data.map((item, key) => (
                                    <SingleSchoolComponent school_item={item} school_item_key={key} />

                                ))

                            }

                        </div>



                        {schoolAllList.data.length !=  0 ?
                        <div class="PageNation_card">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
        
                                    {
                                        schoolAllList.links.map((item, key) => (
                                            <li class="page-item"><Link style={{ pointerEvents: item.url == null? 'none' : 'auto' }}  class={item.active == true ? 'page-link active':'page-link'} href={item.url != null?"/schools-we-stock?search_school_query="+props.search_school_query+"&page="+getQueryParams(item.url).page:''} dangerouslySetInnerHTML={{__html: item.label}}></Link></li>
                                        ))

                                    }
    
                                </ul>
                            </nav>
                        </div>:
                        'No Result Found'}

                    </div>
                </div>
            </section>
        </>
    )
}

export default schoolsWEstock

export async function getServerSideProps(context) {
     
    const { page,search_school_query=null} = context.query;

    let school = await axios.get(backendApiUrl + "/api/customer/school_list_all?search_school_query="+search_school_query+"&page="+page)
    const getSchoolList = school.data;


    return {
        props: { schoolList: getSchoolList,search_school_query:search_school_query }, // will be passed to the page component as props
    }

}