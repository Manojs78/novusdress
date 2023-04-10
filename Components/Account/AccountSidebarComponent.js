import React from 'react'
import Link from 'next/link'
import { LogOutApi } from '../../Api/Api'
import { toast } from "react-toastify"

function AccountSidebarComponent(props) {

    function LogOutHandle() {
        
        const userToken = sessionStorage.getItem('userToken');
        LogOutApi(userToken).then((response) => {
            toast.success('Logout successfully', {
                position: "top-right",
                classNameName: "app_toast",
                autoClose: 1000,
            })
            sessionStorage.removeItem('userToken');
            window.location.reload('/login')

        }).catch((error) => {

        })
    }

    return (
        <>


            <div className="Profile_sidebar_menu">
                <ul>
                    <li>
                        <Link href="/my-orders" className=""><img src="assets/images/my-order.svg" alt="order" />My Order</Link>
                    </li>

                    <li>
                        <Link href="/manage-address"><img src="assets/images/My-wishlist.svg" alt="wishlist" />Manage Address</Link>
                    </li>
                    <li>
                        <Link href="/wishlist"><img src="assets/images/My-wishlist.svg" alt="wishlist" />My wishlist</Link>
                    </li>
                    <li className="coupons">
                        <Link href="/account"><img src="assets/images/Account-Settings.svg" alt="Coupons" />Personal information</Link>
                    </li>
                    <li className="coupons">
                        <Link href="/coupons"><img src="assets/images/Coupons.svg" alt="Coupons" />Coupons</Link>
                    </li>
                    <li className="user_logout">
                        <a type='button' onClick={LogOutHandle}><img src="assets/images/logout.svg" alt="order" />Logout</a>
                    </li>

                </ul>
            </div>

        </>
    )
}

export default AccountSidebarComponent