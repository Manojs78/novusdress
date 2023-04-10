import React from 'react'
import Link from 'next/link'

function ThankYouComponent(props) {
    return (
        <>

            <div class="container mt-5 mb-5 pt-3 pb-3" >
                <div class="content mt-4 mb-4">
                    <div class="wrapper-1">
                        <div class="wrapper-2">
                            <h1>Thank you !</h1>
                            <p>Thank you for your order. Order No. is <strong>{props.orderNumber}</strong> </p>
                            <p>Order details are sent to email used while checking out. </p>
                            <Link type='button' href='/' class="go-home">
                                Go home
                            </Link>
                        </div>
                        <div class="footer-like">
                            <p>Buy Again?
                                <Link href="/">Click here to shop again</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ThankYouComponent