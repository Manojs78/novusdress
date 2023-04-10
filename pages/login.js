import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../Actions/authActions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from "react-toastify"
import LoaderComponent from '@/Components/LoaderComponent'


function login() {

  const router = useRouter();
  const { userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        classNameNameName: "app_toast",
        autoClose: 1000,
      })
    }
  }, [error])

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo])



  const submitForm = (data) => {
    dispatch(userLogin(data))
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
      <section className="Breadcrub_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>

                  <li className="breadcrumb-item active" aria-current="page">Login</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="signin_register_sec">
        <div className="container max-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="signin_card">
                <p>Welcome back! 👋</p>
                <h4>Sign in to your account</h4>

                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="mb-3">
                    <label for="email-l" className="form-label">Email or Phone Number <span>*</span></label>
                    <div className="input-group">
                      <img src="assets/images/email-f.svg" alt="email" />
                      <input type="text" autoComplete='off' className="form-control" id="email-l" placeholder="" {...register('email')} required="" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="password-l" className="form-label">Password <span>*</span></label>
                    <div className="input-group">
                      <img src="assets/images/lock.svg" alt="email" />
                      <input type={passwordType} autoComplete='off' className="form-control" id="password-l" {...register('password')} placeholder="" required="" />
                      <span onClick={togglePassword} type="button" toggle="#password-l" className={ passwordType==='password'? 'field-icon toggle-password fa fa-fw fa-eye' :'field-icon toggle-password fas fa-eye-slash'}></span>
                    </div>
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remerber_me" />
                    <label className="form-check-label" for="remerber_me">Remember me</label>
                  </div>
                  <button type="submit" className="btn form_submit">SIGN IN</button>
                </form>
                <Link href="forgot-password" className="forget_password">Forget your password?</Link>

                <div className='text-center pt-3'>
                  <span className='text-dark p-2 h6 '>New User?</span><span><Link href='/register' className='register_link p-2'>Register</Link></span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default login