import React from 'react'
import toastMessage from '../../../utils/toast';
import axios from "axios";
import { useState, useEffect } from "react";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module


const TIME_DOWN = 60;
var timeOut;

const setSession = (accessToken) => {
  if (typeof window !== 'undefined')
    localStorage.setItem('userToken', accessToken);
};

function RegisterOtpComponent(props) {
  const [timer, setTimer] = useState(TIME_DOWN);

  NProgress.done()
 
  const getnew_user_id = () => {
    if (typeof window !== 'undefined') {
       return sessionStorage.getItem('new_user_id');
      }
  };
  const userId = getnew_user_id();

  
  const [OtpValue, setOtpValue] = useState(null);
  


  const handleverifyOtp = () => {
      let formdata = new FormData();
      formdata.append("user_id", userId);
      formdata.append("otp", OtpValue)

      NProgress.start()

      axios({
          method: "post",
          url: "https://api.novusuniforms.com/api/customer/verify_otp",
          data: formdata,
      }).then((response) => {
          let res = response.data;
          if (response.status === 200 && res.status) {
              
            
            setSession(res.access_token)
              toastMessage({
                  message: res.message,
              })


                Router.push('/login')

          } else {
            NProgress.done()
              toastMessage({ message: res.message, type: 'error' });
          }
      }).catch(({ response: { data: { message } } = {} }) => {
          toastMessage({ message, type: 'error' });
      })
  }

  const resendOtpHandler = () => {
      let formdata = new FormData();
      formdata.append("user_id", userId);
      axios({
          method: "post",
          url: "https://api.novusuniforms.com/api/customer/resendotp",
          data: formdata,
      }).then((response) => {
          var res = response.data;
       
          if (res.status === true) {
              resetTimer();
              toastMessage({ message: res.message })
          }
      }).catch(({ response: { data: { message } } = {} }) => {
          toastMessage({ message, type: "error" })
      });
  };

  const initialiseTimeOut = () => {
      timeOut = setInterval(() => setTimer(currTimer => currTimer - 1), 1000);
  };

  useEffect(initialiseTimeOut, []);
  useEffect(() => {
      if (timer <= 0) {
          clearInterval(timeOut);
      }
  }, [timer]);

  const resetTimer = () => {
      clearInterval(timeOut);
      setTimer(TIME_DOWN);
      initialiseTimeOut();
  };
  return (
    <>

            <section class="signin_register_sec">
                <div class="container max-container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="signin_card">
                                <h4>Fill your OTP</h4>

                                <div class="mb-3">
                                    <label for="email-l" class="form-label">Enter OTP <span>*</span></label>
                                    <div class="input-group">
                                        <img src="assets/images/otp-icon.svg" alt="email" />
                                        <input type="email" autoComplete='off' onChange={(e) => { setOtpValue(e.target.value) }} class="form-control" id="email-l" required="" />
                                    </div>
                                </div>



                                <button type="submit" onClick={handleverifyOtp} class="btn form_submit">Verify</button>
                                {
                                    timer <= 0
                                        ?
                                        <div className='text-center pt-3'>
                                            <span className='text-dark p-2 h6 '>Not received your code?</span><span> <a type='button' className='register_link p-2'
                                                onClick={resendOtpHandler}

                                            >
                                                Resend code
                                            </a>
                                            </span>
                                        </div>
                                        : <></>
                                }
                                <div className='text-center pt-3'>
                                    <span className='text-dark p-2 h6 '>
                                        {timer > 0 ? <>You can resend otp in  : <span className='text-success'>{timer}</span>s</> : ''}
                                    </span>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </section>
</>
  )
}

export default RegisterOtpComponent