import AccountSidebarComponent from '@/Components/Account/AccountSidebarComponent'
import React from 'react'
import { toast } from "react-toastify"
import { OrderList,OrderCancelmapi } from '../Api/Api'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UsernameComponent from '@/Components/Account/UsernameComponent'
import AccountBreadcrumbComponent from '@/Components/Account/AccountBreadcrumbComponent'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import LoaderComponent from '@/Components/LoaderComponent'


function MyOrders() {

    const router = useRouter();

    const [userOrderList, setuserOrderList] = useState([]);
    const { userInfo } = useSelector((state) => state.auth)


    useEffect(() => {

        const userToken = sessionStorage.getItem('userToken');

        if (!userToken) {
            router.push('/login');
          }

        OrderList(userToken).then((response) => {
            let res = response.data;

            if (res) {
                setuserOrderList(res.data)
            }

        }).catch((error) => {

        })
    }, [])

      if (!userInfo) {
        return <><LoaderComponent/></>;
      }

    const pluck = (arr, key) => arr.map(i => i[key]);

    const onCancelOrderHandle = (index, item) => {

        const userToken = sessionStorage.getItem('userToken');
        var formdata = new FormData();
        formdata.append('order_id', item.id);

        OrderCancelmapi(userToken,formdata).then((response) => {

            toast.success("Order Canceled successfully!", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })

            window.location.reload(false)

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
        <AccountBreadcrumbComponent pagename="My Orders"/>
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
                            <div class="user_info_rightbar my-order-right-sidebar">
                                {
                                    userOrderList.map((item, index) => (
                                        <>
                                        <div class="my_order_list d-flex">
                                            <div class="">
                                                <p class="p_items">Purchasd Items: <span class='text-dark'>{item.order_items.length}</span></p>
                                                <p class="total_amount">Total: <span class='text-success fw-bold'>₹ {item.total_amount}</span></p>
                                                {
                                                    item.order_items.map((order_item, order_items_index) => (
                                                        <>
                                                        <hr />
                                                            <div class="my_oder_info d-flex">
                                                                <img class="thumbnail thumbsquare" src={order_item.product_image} alt="" />
                                                                <div class="ps-3 w-100">
                                                                    <h4>{order_item.product_title}</h4>
                                                                    {item.invoice == null ?'': <div class="d-flex btn_group">
                                                                        <Link href={'product/'+order_item.product_id} class="orange_btn btn"><span> Buy it again</span></Link>
                                                                    </div>}
                                                                   
                                                                </div>

                                                            </div>

                                                            

                                                        </>



                                                    ))

                                                }

                                            </div>
                                            <div class="right_rside">
                                                <p class="orders_id">Order # {item.order_no}</p>
                                                <p class="ship_to">Ship to <a href="#">{item.shipping_order_address.full_name}</a></p>
                                                <p class="ship_to">Mobile Number <a href="#">{item.shipping_order_address.mobile_number}</a></p>
                                                <p class="ship_to">{item.shipping_order_address.address_line_1},{item.shipping_order_address.town_or_city},{item.shipping_order_address.pincode},{item.shipping_order_address.state}</p>
                                                {item.invoice == null?'':<p class="invoice"><a target='_blank' href={item.invoice.invoice}>Invoice</a></p>}
                                                {item.invoice != null || item.status == 'Cancelled'?'':<p class="invoice"><a class="text-danger" type='button' onClick={() => onCancelOrderHandle(index, item)}>Cancel Order</a></p>}
                                                
                                            </div>
                                        </div>
                                            <div class='card p-2 tracking_card border-0 mb-3'>
                                            {item.status == 'Cancelled'?
                                                <p class='text-danger fw-bold text-center'>Order Cancelled</p>
                                            :<div class="progress-track">
                                            <ul id="progressbar">
                                                <li class={pluck(item.order_logs, 'title').includes("Placed")?'step0 active':'step0'} id="step1">Ordered</li>
                                                <li class={pluck(item.order_logs, 'title').includes("Order Confirmed")?'step0 active text-center':'step0 text-center'} id="step2">Order Confirmed</li>
                                                <li class={pluck(item.order_logs, 'title').includes("Shipped")?'step0 active text-center':'step0 text-center'} id="step2">Shipped</li>
                                                <li class={pluck(item.order_logs, 'title').includes("Out For Delivery")?'step0 active text-end':'step0 text-end'} id="step3">On the way</li>
                                                <li class={pluck(item.order_logs, 'title').includes("Delivered")?'step0 active  text-end':'step0  text-end'}id="step4">Delivered</li>
                                            </ul>
                                            </div>
                                        }
                                                </div>
</>
                                    ))

                                }
                            {userOrderList.length == 0 ? 'No order yet' :''}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default MyOrders