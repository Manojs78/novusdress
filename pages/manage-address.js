import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CustomerAddresses, RemoveAddressapi, UpdateAddress } from '../Api/Api'
import AddNewAddressComponent from '@/Components/Account/AddNewAddressComponent';
import { toast } from "react-toastify"
import EditAddressComponent from '@/Components/Account/EditAddressComponent';
import AccountSidebarComponent from '@/Components/Account/AccountSidebarComponent';
import UsernameComponent from '@/Components/Account/UsernameComponent';
import AccountBreadcrumbComponent from '@/Components/Account/AccountBreadcrumbComponent';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import LoaderComponent from '@/Components/LoaderComponent'

function manageAddress() {
    const router = useRouter();
    const [userAddressList, setuserAddressList] = useState([]);
    const { userInfo } = useSelector((state) => state.auth)
    





    useEffect(() => {


        const userToken = sessionStorage.getItem('userToken');

 
        if (!userToken) {
            router.push('/login');
          }

        CustomerAddresses(userToken).then((response) => {
            let res = response.data;

            if (res) {
                setuserAddressList(res.data)
            }

        }).catch((error) => {

        })
    }, [userInfo])

    if (!userInfo) {
        return <><LoaderComponent/></>;
      }

    
    const handleRemoveaddress = (index, item) => {

        const userToken = sessionStorage.getItem('userToken');
        setuserAddressList(userAddressList.filter((v, i) => i !== index));

        RemoveAddressapi(userToken, item.id).then((response) => {

            toast.success("Address removed successfully!", {
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

    const handleSetDefaultAddress = (index, item) => {

        const userToken = sessionStorage.getItem('userToken');

        let lists = [...userAddressList];

        lists.forEach(myFunction);

        function myFunction(item, myindex) {
            if (myindex == index) {
                let use = { ...lists[index] };
                use["is_default"] = 'Yes';
                lists[index] = { ...use };
            } else {
                let use = { ...lists[myindex] };
                use["is_default"] = 'No';
                lists[myindex] = { ...use };
            }
        }

        setuserAddressList([...lists]);

        var formdata = new FormData();
        formdata.append('address_id', item.id);
        formdata.append('full_name', item.full_name);
        formdata.append('mobile_number', item.mobile_number);
        formdata.append('company_name', item.company_name);
        formdata.append('pincode', item.pincode);
        formdata.append('address_line_1', item.address_line_1);
        formdata.append('address_line_2', item.address_line_2);
        formdata.append('landmark', item.landmark);
        formdata.append('town_or_city', item.town_or_city);
        formdata.append('state', item.state);
        formdata.append('delivery_instructions', item.delivery_instructions);
        formdata.append('address_type', item.address_type);
        formdata.append('is_default', 'Yes');

        UpdateAddress(userToken, formdata).then((response) => {
            toast.success('Address Updated successfully', {
                position: "top-right",
                classNameName: "app_toast",
                autoClose: 1000,
            })

        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: "top-right",
                classNameName: "app_toast",
                autoClose: 1000,
            })
        })


    }



    return (
        <>
           <AccountBreadcrumbComponent pagename="Manage Address"/>

            <section class="user_profile">
                <div class="container">
                    <div class="row">


                        <div class="col-lg-3 col-md-3 col-sm-3 col-12 d-none d-lg-block">
                            <div class="Profile_sidebar">
                               <UsernameComponent/>

                                <AccountSidebarComponent/>
                            </div>
                        </div>


                        <div class="col-lg-9 col-md-12 col-sm-12 col-12">
                            <div class="user_info_rightbar">
                                <h4 class="heading_right_side_bar">Add Address*</h4>
                                <div class="Manage_Address">
                                    <button type="button" class="btn btn-primary orange_btn" data-bs-toggle="modal"
                                        data-bs-target="#add_address">
                                        Add New Address
                                    </button>

                                    <AddNewAddressComponent />

                                    <div class="all_address_grid">



                                        {
                                            userAddressList.map((item, index) => (
                                                <div class="address_grid_card">
                                                    <p class="name">{item.full_name}</p>
                                                    <p class="user_address"># {item.address_line_1},{item.address_line_2},{item.town_or_city},{item.state} </p>
                                                    <p class="user_phn">Pincode: {item.pincode}</p>


                                                    <div class="manage_address_options">
                                                        <div><a type='button' data-bs-toggle="modal" data-bs-target={'#edit_address'+item.id}>Edit</a> | <a type='button' onClick={() => handleRemoveaddress(index, item)}>Delete</a></div>
                                                        {item.is_default == 'Yes' ? <div class="default_address text-dark">Default</div> : <div class=""><a type='button' onClick={() => handleSetDefaultAddress(index, item)}>Set As Default</a></div>}


                                                    </div>
                                                    <EditAddressComponent addressItem={item} />
                                                </div>



                                            ))

                                        }

                                        {userAddressList.length == 0 ? 'No Address added yet' : ''}


                                    </div>


                                </div>











                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default manageAddress