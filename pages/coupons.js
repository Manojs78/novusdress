import React from 'react'
import AccountSidebarComponent from '@/Components/Account/AccountSidebarComponent';
import axios from "axios"
import UsernameComponent from '@/Components/Account/UsernameComponent';
import AccountBreadcrumbComponent from '@/Components/Account/AccountBreadcrumbComponent';
import LoaderComponent from '@/Components/LoaderComponent'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router';


const backendApiUrl = "https://api.novusuniforms.com";
function coupons(props) {
    const router = useRouter();
    const { userInfo,userToken } = useSelector((state) => state.auth)

    useEffect(() => {

        const userToken = sessionStorage.getItem('userToken');

        if (!userToken) {
            router.push('/login');
          }

    }, [userInfo])

      if (!userInfo) {
        return <><LoaderComponent/></>;
      }


    const getcouponlist = props.getcouponlist.data;

    return (
        <>
           <AccountBreadcrumbComponent pagename="Coupons"/>
            <section class="user_profile">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-12 d-none d-lg-block">
                            <div class="Profile_sidebar">
                               <UsernameComponent/>

                                <AccountSidebarComponent />
                            </div>
                        </div>


                        <div class="col-lg-9 col-md-12 col-sm-12 col-12">
                            <div class="user_info_rightbar">
                                <h4 class="heading_right_side_bar">Coupons</h4>
                                <div class="mycoupon_dash">

                                    {
                                        getcouponlist.map((item, key) => (
                                            <div class="box_code d-block d-sm-flex mb-3">
                                                <div class="coupon_text">
                                                    <h4 class="m-0">{item.name} <b>{item.discount}{item.discount == 'Fixed'?'RS':'%'} Discount</b></h4>
                                                    <h4 class="m-0">PROMOCODE: <b><span class='text-orange'>{item.code}</span></b></h4>
                                                </div>
                                            </div>

                                        ))

                                    }



                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default coupons

export async function getStaticProps(context) {

    let couponlist = await axios.get(backendApiUrl + "/api/customer/coupon_codes");

    const getcouponlist = couponlist.data;

    return {
        props: { getcouponlist: getcouponlist }, // will be passed to the page component as props
        revalidate: 60,
    }

}