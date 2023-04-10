import React from 'react'
import Link from 'next/link'
import axios from "axios";
import toastMessage from '../utils/toast';
import ForgetOtpPasswordComponent from '@/Components/Homepage/auth/ForgetOtpPasswordComponent';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import LoaderComponent from '@/Components/LoaderComponent'


const backendApiUrl = "https://api.novusuniforms.com";

function forget_password() {
    
    const router = useRouter();
    const [number, setNumber] = useState(null);
    const [forgetPassword, setForgetPassword] = useState(false)
    const [numberInputHide, setNumberInputHide] = useState(true)
    const [userId, setUserId] = useState(null);
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {

        if (userInfo) {
            router.push('/');
          }


    }, [userInfo])

      if (userInfo) {
        return <><LoaderComponent/></>;
      }


    const handleNumber = () => {

        let formdata = new FormData();
        formdata.append("phone", number);

        axios({
            method: "post",
            url: backendApiUrl+"/api/customer/forgot_password_send_otp",
            data: formdata,
        }).then((response) => {
            console.log("dd", response)
            let res = response.data;
            if (response.status === 200 && res.status) {
                setUserId(res.user_id);
                setNumberInputHide(false)
                setForgetPassword(true);
            }
        }).catch(({ response: { data: { message } } = {} }) => {
            message = "Something went wrong!"
            toastMessage({message , type: 'error' });
        })


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

                                    <li class="breadcrumb-item active" aria-current="page">Reset Password</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

            </section>
            {
                numberInputHide ?
                    <>
            <section class="signin_register_sec">
        <div class="container max-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="signin_card">
                <h4>Reset Password</h4>

                
                  <div class="mb-3">
                    <label for="phone-l" class="form-label">Mobile Number <span>*</span></label>
                    <div class="input-group">
                       <img src="assets/images/add_call.svg" alt="call" />
                      <input type="text" onChange={(e) => { setNumber(e.target.value) }} maxLength={10} class="form-control" id="phone-l" autoComplete='off' placeholder="" required="" />
                    </div>
                  </div>

                  <button onClick={handleNumber} type="submit" class="btn form_submit">Send OTP</button>
                 

              </div>
            </div>


          </div>
        </div>
      </section>
      </> : null
            }

            {
                forgetPassword ? <ForgetOtpPasswordComponent userId={userId}/> : null
            }
        </>
    )
}

export default forget_password