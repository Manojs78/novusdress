import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getcardDetails, ApplyCouponCode, GuestCheckoutSubmit } from '../../Api/Api'
import { toast } from "react-toastify"
import ThankYouComponent from './ThankYouComponent'
import { useRouter } from 'next/router';

function GuestCheckoutComponent() {
    const router = useRouter();
    const [userCartList, setuserCartList] = useState([]);
    const [couponApplied, setCouponApplied] = useState(false);
    const [totalPrice, settotalPrice] = useState(0);
    const [grandtotalPrice, setgrandtotalPrice] = useState(0);
    const [coupondiscountvalue, setcoupondiscountvalue] = useState(0);
    const [couponcode, setcouponcode] = useState('');
    const [billingAddresschecked, setbillingAddresschecked] = useState(true);
    const [isOrderSubmited, setisOrderSubmited] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [payment_method, setpayment_method] = useState("COD");


    useEffect(() => {
        const cartsession = sessionStorage.getItem('cartsession');
        const type = "session_id";
        getcardDetails(cartsession, type).then((response) => {
            let res = response.data;

            if (res) {

                if(res.data == 0){
                    router.push('/cart');
                  }

                setuserCartList(res.data);
                var total_price_cal = 0;

                res.data.forEach(element => {
                    total_price_cal += parseFloat(element.product_details.selling_price) * parseFloat(element.quantity);
                });

                settotalPrice(total_price_cal);
                setgrandtotalPrice(total_price_cal);

            }

        }).catch((error) => {
            toast.error("something went wrong", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })
        })

    }, [])

    const onChangePaymentgateway = async (event) => {
        setpayment_method(event.target.value)
    }

    const handleCouponApply = async (event) => {
        event.preventDefault()
        var btn_type = event.target.btn_type.value;
        if (btn_type == "REMOVE") {
            setgrandtotalPrice(totalPrice)
            setcoupondiscountvalue(0)
            setCouponApplied(false);
            setcouponcode('');
            return;
        }

        if (event.target.coupon_code.value == '') {
            toast.error("Please fill coupon code", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })
            return;
        }
        const coupon_code = event.target.coupon_code.value;

        var formdata = new FormData();

        formdata.append('code', coupon_code);
        formdata.append('total_price', totalPrice);
        formdata.append('quantity', 50);

        ApplyCouponCode(formdata).then((response) => {

            if (response.data.type == 'Fixed') {
                var discountvalue = response.data.value;
                const calgrandtotal = totalPrice - discountvalue;
                setgrandtotalPrice(calgrandtotal)
                setcoupondiscountvalue(discountvalue)
                setCouponApplied(true);
                setcouponcode(coupon_code);
            } else {
                const discountvalue = totalPrice * response.data.value / 100;
                const calgrandtotal = totalPrice - discountvalue;

                setgrandtotalPrice(calgrandtotal)
                setcoupondiscountvalue(discountvalue)
                setCouponApplied(true);
                setcouponcode(coupon_code);
            }

        }).catch((error) => {
            setcouponcode('');
            toast.error(error.response.data.message, {
                position: "top-right",
                classNameName: "app_toast",
                autoClose: 1000,
            })
        })

    }



    const billingAddresscheckedHandle = event => {
        if (event.target.checked) {
            setbillingAddresschecked(true)
        } else {
            setbillingAddresschecked(false)
        }

    };

    const numberlengthhandle = event => {
        if (event.target.value.length > event.target.maxLength){
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
        

    };

    const handleAddressContinue = async (event) => {
        event.preventDefault()

        const cartsession = sessionStorage.getItem('cartsession');
        var shipping_full_name = event.target.shipping_full_name.value;
        var shipping_mobile_number = event.target.shipping_mobile_number.value;
        var shipping_company_name = event.target.shipping_company_name.value;
        var shipping_address_one = event.target.shipping_address_one.value;
        var shipping_address_two = event.target.shipping_address_two.value;
        var shipping_pincode = event.target.shipping_pincode.value;
        var shipping_state = event.target.shipping_state.value;
        var landmark = event.target.landmark.value;
        var delivery_instructions = event.target.delivery_instructions.value;
        var shipping_city = event.target.shipping_city.value;
        var shipping_email = event.target.shipping_email.value;

        if (shipping_full_name == '') {
            toast.error('Please Fill Name', { autoClose: 1000 })
            return;
        } else if (shipping_mobile_number == '') {
            toast.error('Please Fill Mobile Number', { autoClose: 1000 })
            return;
        } else if (shipping_email == '') {
            toast.error('Please Fill Email Address', { autoClose: 1000 })
            return;
        } else if (shipping_address_one == '') {
            toast.error('Please Fill Address 1', { autoClose: 1000 })
            return;
        } else if (shipping_pincode == '') {
            toast.error('Please Fill Pincode', { autoClose: 1000 })
            return;
        } else if (shipping_city == '') {
            toast.error('Please Fill City', { autoClose: 1000 })
            return;
        } else if (shipping_state == '') {
            toast.error('Please Fill State', { autoClose: 1000 })
            return;
        }

        var data = new FormData();

        if (billingAddresschecked == false) {
            var billing_full_name = event.target.billing_full_name.value;
            var billing_mobile_number = event.target.billing_mobile_number.value;
            var billing_company_name = event.target.billing_company_name.value;
            var billing_address_one = event.target.billing_address_one.value;
            var billing_address_two = event.target.billing_address_two.value;
            var billing_pincode = event.target.billing_pincode.value;
            var billing_city = event.target.billing_city.value;
            var billing_state = event.target.billing_state.value;



            if (billing_full_name == '') {
                toast.error('Please Fill Name', { autoClose: 1000 })
                return;
            } else if (billing_mobile_number == '') {
                toast.error('Please Fill Mobile Number', { autoClose: 1000 })
                return;
            } else if (billing_address_one == '') {
                toast.error('Please Fill Address 1', { autoClose: 1000 })
                return;
            } else if (billing_pincode == '') {
                toast.error('Please Fill Pincode', { autoClose: 1000 })
                return;
            } else if (billing_city == '') {
                toast.error('Please Fill City', { autoClose: 1000 })
                return;
            } else if (billing_state == '') {
                toast.error('Please Fill State', { autoClose: 1000 })
                return;
            }

            data.append('billing_full_name', billing_full_name);
            data.append('billing_mobile_number', billing_mobile_number);
            data.append('billing_company_name', billing_company_name);
            data.append('billing_address_one', billing_address_one);
            data.append('billing_address_two', billing_address_two);
            data.append('billing_pincode', billing_pincode);
            data.append('billing_state', billing_state);
            data.append('billing_city', billing_city);
            
        
            


        } else {

        }



        userCartList.forEach(userCartListfunction);

        function userCartListfunction(item, index) {
            data.append('qty' + '[' + index + ']', item.quantity);
            data.append('product_ids' + '[' + index + ']', item.product_id);
        }

        data.append('coupon_code', couponcode);

        data.append('shipping_full_name', shipping_full_name);
        data.append('shipping_mobile_number', shipping_mobile_number);
        data.append('shipping_company_name', shipping_company_name);
        data.append('shipping_address_one', shipping_address_one);
        data.append('shipping_address_two', shipping_address_two);
        data.append('shipping_pincode', shipping_pincode);
        data.append('shipping_state', shipping_state);
        data.append('landmark', landmark);
        data.append('delivery_instructions', delivery_instructions);
        data.append('shipping_city', shipping_city);
        data.append('shipping_email', shipping_email);
        data.append('payment_method', payment_method);



        data.append('isbillingaddresssame', billingAddresschecked);
        data.append('cartsessionid', cartsession);

        GuestCheckoutSubmit(data).then((response) => {
            let res = response.data;
        
         
                if (res) {

                    setOrderNumber(res.data)
                    if(payment_method == 'COD'){
                    setisOrderSubmited(true)
                    }else{
                    window.location.href = "https://api.novusuniforms.com/payment_gateway/"+res.data;
                    }
                    
            
                  }
               

            

        }).catch((error) => {
            toast.error("something went wrong", {
                position: "top-right",
                className: "app_toast",
                autoClose: 1000,
            })
        })
    };
    return (
        <>
            {isOrderSubmited == true ? <ThankYouComponent orderNumber={orderNumber} /> :
                <section class="guest_checkout">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-12 col-12">
                                <div class="guest_checkout_main_wrap">
                                    <form onSubmit={handleAddressContinue}>
                                        <h2 class="sec-title">Guest Checkout</h2>
                                        <p class="Already_acount">Already have an account?  Click <Link href="/login">here</Link> ?</p>

                                        <h4>Shipping Address</h4>

                                        <div class="mb-3">
                                            <input type="name" name='shipping_full_name' class="form-control" id="" placeholder="Full Name*" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="number" onChange={numberlengthhandle} maxlength="10" name='shipping_mobile_number' class="form-control" id="" placeholder="Mobile Number*" />
                                            <input type="text" name='shipping_company_name' class="form-control" id="" placeholder="Company Name" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="email" name='shipping_email' class="form-control" id="" placeholder="Email Address*" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="text" name='shipping_address_one' class="form-control" id="" placeholder="Address 1*" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="text" name='shipping_address_two' class="form-control" id="" placeholder="Address 2 (Optional)" />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="number" onChange={numberlengthhandle} maxlength="6" name='shipping_pincode' class="form-control" id="" placeholder="Pincode*" />
                                            <input type="text" name='shipping_city' class="form-control" id="" placeholder="City" />
                                        </div>

                                        <div class="input-group mb-3">
                                            <select name="shipping_state" id="state" class="form-control">
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chandigarh">Chandigarh</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                                <option value="Daman and Diu">Daman and Diu</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Lakshadweep">Lakshadweep</option>
                                                <option value="Puducherry">Puducherry</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab" selected>Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                            </select>
                                            <input type="text" name='landmark' class="form-control" id="" placeholder="Landmark" />

                                        </div>


                                        <div class="input-group">
                                            <textarea class="form-control" name='delivery_instructions' placeholder="Delivery Instructions"></textarea>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" onChange={billingAddresscheckedHandle} checked={billingAddresschecked} value="" id="shping-address" />
                                            <label class="form-check-label" for="shping-address">
                                                Billing address is same as shipping address
                                            </label>
                                        </div>


                                        <div className={billingAddresschecked == true ? 'd-none' : ''}>
                                            <h4>Billing Address</h4>

                                            <div class="mb-3">
                                                <input type="email" name='billing_full_name' class="form-control" id="" placeholder="Full Name*" />
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name='billing_mobile_number' class="form-control" id="" placeholder="Mobile Number*" />
                                                <input type="text" name='billing_company_name' class="form-control" id="" placeholder="Company Name" />
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name='billing_address_one' class="form-control" id="" placeholder="Address 1*" />
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name='billing_address_two' class="form-control" id="" placeholder="Address 2 (Optional)" />
                                            </div>
                                            <div class="input-group mb-3">
                                                <input type="text" name='billing_pincode' class="form-control" id="" placeholder="Pincode*" />
                                                <input type="text" name='billing_city' class="form-control" id="" placeholder="City" />
                                            </div>

                                            <div class="input-group mb-3">
                                                <select name="billing_state" id="state" class="form-control">
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                    <option value="Assam">Assam</option>
                                                    <option value="Bihar">Bihar</option>
                                                    <option value="Chandigarh">Chandigarh</option>
                                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                                    <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                                    <option value="Daman and Diu">Daman and Diu</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Lakshadweep">Lakshadweep</option>
                                                    <option value="Puducherry">Puducherry</option>
                                                    <option value="Goa">Goa</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                    <option value="Haryana">Haryana</option>
                                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                    <option value="Jharkhand">Jharkhand</option>
                                                    <option value="Karnataka">Karnataka</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Manipur">Manipur</option>
                                                    <option value="Meghalaya">Meghalaya</option>
                                                    <option value="Mizoram">Mizoram</option>
                                                    <option value="Nagaland">Nagaland</option>
                                                    <option value="Odisha">Odisha</option>
                                                    <option value="Punjab" selected>Punjab</option>
                                                    <option value="Rajasthan">Rajasthan</option>
                                                    <option value="Sikkim">Sikkim</option>
                                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                                    <option value="Telangana">Telangana</option>
                                                    <option value="Tripura">Tripura</option>
                                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                    <option value="Uttarakhand">Uttarakhand</option>
                                                    <option value="West Bengal">West Bengal</option>
                                                </select>

                                            </div>




                                        </div>
                                        <div class="mt-3">
                                            <label class="radio-inline px-2">
                                                <input type="radio" class="form-check-input" onChange={onChangePaymentgateway} value="COD" name="payment_method" checked={payment_method == "COD"} /><span class="mx-2">COD</span>
                                            </label>
                                            <label class="radio-inline px-2">
                                                <input type="radio" class="form-check-input" onChange={onChangePaymentgateway} value="Online" checked={payment_method == "Online"} name="payment_method" /><span class="mx-2">Online</span>
                                            </label>
                                        </div>
                                       



                                        <div class=""><button type='submit' class="btn  button">Place Order </button></div>
                                    </form>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div class="order_summary">
                                    <h4><img src="/assets/images/shopping_cart_checkout.png" /> Order Summary</h4>

                                    <form class="pt-4" onSubmit={handleCouponApply}>
                                        <h5>Reward & Promo Code ?</h5>

                                        <div class="input-group">
                                            <input type="text" class="form-control" name='coupon_code' id="" placeholder="Enter code here" disabled={couponApplied != false ? true : false} />
                                            {couponApplied != false ? <input style={{ backgroundColor: '#e1e1e1', color: 'red' }} type="submit" name="btn_type" value="REMOVE" /> :
                                                <input type="submit" name="btn_type" value="APPLY" />
                                            }
                                        </div>
                                        {couponApplied != false ? <p className='text-success fw-bold'>Coupon is Applied</p> : false}


                                    </form>

                                    <hr style={{ margin: `40px 0px 30px` }} />

                                    <div class="totals">
                                        <ul>
                                            <li>
                                                <span>Items ({userCartList.length})</span>
                                                <span><b>₹{totalPrice.toFixed(2)}</b></span>
                                            </li>
                                            {couponApplied != false ? <li>
                                                <span>Discount</span>
                                                <span className='text-success'><b> -₹{coupondiscountvalue}</b></span>
                                            </li> : false}

                                            <li>
                                                <span>Shipping</span>
                                                <span className='text-success'><b>Free</b></span>
                                            </li>
                                            <li>
                                                <span><b>Total</b></span>
                                                <span><b>₹{grandtotalPrice.toFixed(2)}</b></span>
                                            </li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default GuestCheckoutComponent