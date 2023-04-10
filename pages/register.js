import React from 'react'
import Link from 'next/link'
import { registerUser } from '../Actions/authActions'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { toast } from "react-toastify"
import Router from 'next/router';
import RegisterOtpComponent from '@/Components/Homepage/auth/RegisterOtpComponent'
import LoaderComponent from '@/Components/LoaderComponent'

function register() {
  const [numberInputHide, setNumberInputHide] = useState(true)
  const [otpFill, setOtpFill] = useState(false)
  const { new_user_id, userInfo, error, success } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (error) {

      // console.log(JSON.parse(error))
      if (JSON.parse(error).email) {
        toast.error(JSON.parse(error).email[0], {
          position: "top-right",
          classNameName: "app_toast",
          autoClose: 1000,
        })
      }
      if (JSON.parse(error).phone) {
        toast.error(JSON.parse(error).phone[0], {
          position: "top-right",
          classNameName: "app_toast",
          autoClose: 1000,
        })
      }
      if (JSON.parse(error).name) {
        toast.error(JSON.parse(error).name[0], {
          position: "top-right",
          classNameName: "app_toast",
          autoClose: 1000,
        })
      }

      if (JSON.parse(error).password) {
        toast.error(JSON.parse(error).password[0], {
          position: "top-right",
          classNameName: "app_toast",
          autoClose: 1000,
        })
      }
    }
  }, [error])

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      setNumberInputHide(false);
      setOtpFill(true)
      
    }
    // redirect authenticated user to profile screen
    if (userInfo) Router.push('/')
  }, [userInfo, success])

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()
    dispatch(registerUser(data))
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
    if (userInfo) {
      return <><LoaderComponent/></>;
    }
  
  return (
    <>
    {
                numberInputHide ?
                    <>
      <section class="Breadcrub_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">

                  <li class="breadcrumb-item"><Link href="/">Home</Link></li>

                  <li class="breadcrumb-item active" aria-current="page">Register</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section class="signin_register_sec">
        <div class="container max-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="register_card">
                <p>Welcome back! 👋</p>
                <h4>New User ? Register Here</h4>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div class="mb-3">
                    <label for="email-r" class="form-label">Full Name <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/email-f.svg" alt="name" />
                      <input type="text" autoComplete='off' {...register('name')} class="form-control" id="email-r" placeholder="" required="" />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="email-r" class="form-label">Email address <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/email-f.svg" alt="email" />
                      <input type="email" autoComplete='off' {...register('email')} class="form-control" id="email-r" placeholder="" required="" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="mobile" class="form-label">Mobile Number <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/add_call.svg" alt="call" />
                      <input type="text" autoComplete='off' maxLength={10} {...register('phone')} class="form-control" id="mobile" placeholder="" required="" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password-p" class="form-label">Password <span>*</span></label>
                    <div class="input-group">
                      <img src="assets/images/lock.svg" alt="email" />
                      <input type={passwordType} autoComplete='off' class="form-control" {...register('password')} id="password-p" placeholder="" required="" />
                      <span onClick={togglePassword} type="button" toggle="#password-l" className={ passwordType==='password'? 'field-icon toggle-password fa fa-fw fa-eye' :'field-icon toggle-password fas fa-eye-slash'}></span>
                    </div>
                  </div>

                  <button type="submit" class="btn form_submit">SUBMIT</button>

                </form>
                <div className='text-center pt-3'>
                  <span className='text-dark p-2 h6 '>Already have an account?</span><span><Link href='/login' className='register_link p-2'>Login</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </> : null
            }

            {
                otpFill ? <RegisterOtpComponent userId={new_user_id}/> : null
            }
       
    </>
  )
}

export default register