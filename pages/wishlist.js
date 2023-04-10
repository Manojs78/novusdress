import AccountSidebarComponent from '@/Components/Account/AccountSidebarComponent'
import React from 'react'
import { toast } from "react-toastify"
import { WislistList,RemoveWishlistitemapi } from '../Api/Api'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UsernameComponent from '@/Components/Account/UsernameComponent'
import AccountBreadcrumbComponent from '@/Components/Account/AccountBreadcrumbComponent'
import { useSelector } from 'react-redux'
import LoaderComponent from '@/Components/LoaderComponent'
import { useRouter } from 'next/router';

function Wishlist() {
    const router = useRouter();
    const [userWishList, setuserWishList] = useState([]);
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {

        const userToken = sessionStorage.getItem('userToken');

        if (!userToken) {
            router.push('/login');
          }

        WislistList(userToken).then((response) => {
            let res = response.data;

            if (res) {
                setuserWishList(res.data)
            }

        }).catch((error) => {

        })
    }, [userInfo])

    if (!userInfo) {
        return <><LoaderComponent/></>;
      }

    


    const onRemoveHandleWishlist = (index, item) => {
        setuserWishList(userWishList.filter((v, i) => i !== index));
        const userToken = sessionStorage.getItem('userToken');
        RemoveWishlistitemapi(userToken,item.product_id).then((response) => {

            toast.success("Wishlist removed successfully!", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })

        }).catch((error) => {
            toast.error("something went wrong", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })
        })
    }

    return (
        <>

        <AccountBreadcrumbComponent pagename="My Wishlist"/>
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
                                <h4 class="heading_right_side_bar">My Wishlist ({userWishList.length})</h4>
                                <div class="my_wishlist_dash">
                                    {
                                        userWishList.map((item, index) => (
                                            <div class="box_wish d-block d-sm-flex mb-3">
                                                <div class="wish_image_thumb mb-3 mb-sm-0">
                                                    <a href=""><img src={item.product_details.images[0].image} alt="" class="w-100" /></a>
                                                </div>
                                                <div class="wish_title  text-center text-sm-start">
                                                    <h4 class="m-0">{item.product_details.product_name}</h4>
                                                    <div class="wish_price mb-2 mb-sm-0"><span><b>Rs. {item.product_details.selling_price}</b><del class="mx-2">Rs. {item.product_details.mrp}</del></span></div>
                                                    <div class="d-flex action_btns">
                                                        <Link href={'/'+'product/'+item.product_details.id}>Add To Cart</Link><a type='button' onClick={() => onRemoveHandleWishlist(index, item)} class="mx-3">Remove</a>
                                                    </div>
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

export default Wishlist