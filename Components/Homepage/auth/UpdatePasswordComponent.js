import React from 'react'
import Link from 'next/link'
import axios from "axios";
import { useState } from "react";
import toastMessage from '../../../utils/toast';
import Router from 'next/router';

function UpdatePasswordComponent(props) {

    const { otpUserId,token } = props;

    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUpdateNewPasswordOtp = () => {
        let formdata = new FormData();
        formdata.append("user_id", otpUserId);
        formdata.append("token", token);
        formdata.append("password", newPassword);
        formdata.append("password_confirmation", confirmPassword)

        axios({
            method: "post",
            url: "https://api.novusuniforms.com/api/customer/update_password",
            data: formdata,
        }).then((response) => {
            let res = response.data;
            if (response.status === 200 && res.status) {
                toastMessage({
                    message: res.message,
                })
                Router.push('/login')
            } 
        }).catch(({ response: { data: { message } } = {} }) => {
            toastMessage({ message, type: 'error' });
        })
    }
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

  return (
    <>
    <section class="signin_register_sec">
        <div class="container max-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="signin_card">
               
                <h4>Update Password</h4>

                  <div class="mb-3">
                    <label for="password-l" class="form-label">Password <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/lock.svg" alt="email" />
                      <input type={passwordType} onChange={(e) => { setNewPassword(e.target.value) }} autoComplete='off' class="form-control" id="password-l" placeholder="" required="" />
                      <span onClick={togglePassword} type="button" toggle="#password-l" className={ passwordType==='password'? 'field-icon toggle-password fa fa-fw fa-eye' :'field-icon toggle-password fas fa-eye-slash'}></span>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password-l" class="form-label">Confirm Password <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/lock.svg" alt="email" />
                      <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} autoComplete='off' class="form-control" id="password-l" placeholder="" required="" />
                     
                    </div>
                  </div>

                  <button type="submit" onClick={handleUpdateNewPasswordOtp} class="btn form_submit">Submit</button>
              
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default UpdatePasswordComponent