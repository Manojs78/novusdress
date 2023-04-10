import AuthCheckOutComponent from '@/Components/Checkout/AuthCheckOutComponent';
import GuestCheckoutComponent from '@/Components/Checkout/GuestCheckoutComponent'
import React from 'react'
import { useState, useEffect } from 'react'



function checkout() {
  const [userToken, setuserToken] = useState('');
  useEffect(() => {

    const userToken = sessionStorage.getItem('userToken');
    setuserToken(userToken)
  }, [])

  return (
    <>
         {userToken == null?<GuestCheckoutComponent/>:<AuthCheckOutComponent/>}
        
    </>
  )
}

export default checkout