import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { useGetUserDetailsQuery } from '../app/services/auth/authService'
import AccountSidebarComponent from '@/Components/Account/AccountSidebarComponent'
import UsernameComponent from '@/Components/Account/UsernameComponent'
import AccountBreadcrumbComponent from '@/Components/Account/AccountBreadcrumbComponent'
import { UpdateCustomerProfileApi } from '../Api/Api'
import LoaderComponent from '@/Components/LoaderComponent'
import { useRouter } from 'next/router';

function account() {
    const router = useRouter();
    const { userInfo,userToken } = useSelector((state) => state.auth)


    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        // pollingInterval: 900000, // 15mins
    })

    useEffect(() => {

        const userToken = sessionStorage.getItem('userToken');

        if (!userToken) {
            router.push('/login');
          }

    }, [userInfo])

    if (!userInfo) {
        return <><LoaderComponent/></>;
      }

    const UpdateCustomerProfile = async (event) => {
        event.preventDefault()
        var name = event.target.name.value;

        var formdata = new FormData();

        formdata.append('name', name);

        UpdateCustomerProfileApi(userToken,formdata).then((response) => {
        
            toast.success('Profile Updated Successfully', {
                position: "top-right",
                autoClose: 1000,
            })

        }).catch((error) => {

        })

    }

    return (
        <>
           <AccountBreadcrumbComponent pagename="My Account"/>

            <section className="user_profile">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12 d-none d-lg-block">
                            <div className="Profile_sidebar">
                                <UsernameComponent/>


                                <AccountSidebarComponent />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="user_info_rightbar">
                                <form className="Personal_info_form" onSubmit={UpdateCustomerProfile}>
                                    <div className="mb-3">
                                        <label for="" className="form-label">Personal Information*</label>
                                        <div className="input-group">
                                            <input type="text" name='name' className="form-control" id="" placeholder="Full Name" defaultValue={isFetching
                                                ? 'Fetching...'
                                                : userInfo !== null
                                                    ? userInfo.name
                                                    : ''} required="" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label for="email" className="form-label">E-mail Address*</label>
                                        <input type="email" value={isFetching
                                            ? 'Fetching...'
                                            : userInfo !== null
                                                ? userInfo.email
                                                : ''} className="form-control" id="email" placeholder="E-mail Address" required="" disabled />
                                    </div>

                                    <div className="mb-3">
                                        <label for="mobile_no" className="form-label">Mobile No.*</label>
                                        <input type="text" value={isFetching
                                            ? 'Fetching...'
                                            : userInfo !== null
                                                ? userInfo.phone
                                                : ''} className="form-control" disabled id="mobile_no" placeholder="+91 00000-00000" required="" />
                                    </div>

                                    <input type="submit" name="" value="UPDATE PROFILE" />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default account