import React from 'react'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'

function LayoutComponent({ children }) {
  return (
    <>
   
        <HeaderComponent/>
        <ToastContainer/>
        <main>{children}</main>
        <FooterComponent/>
    </>
  )
}

export default LayoutComponent