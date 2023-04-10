import React from 'react'
import { useState, useEffect } from 'react'
import { CustomerAddresses, RemoveAddressapi, getcardDetails, ApplyCouponCode, AuthCheckoutSubmit } from '../../Api/Api'
import Link from 'next/link'
import { toast } from "react-toastify"
import AddNewAddressComponent from '../Account/AddNewAddressComponent'
import EditAddressComponent from '../Account/EditAddressComponent'
import { useSelector } from 'react-redux'
import ThankYouComponent from './ThankYouComponent'

function AuthCheckOutComponent() {

  const [userAddressList, setuserAddressList] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [userCartList, setuserCartList] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [grandtotalPrice, setgrandtotalPrice] = useState(0);
  const [coupondiscountvalue, setcoupondiscountvalue] = useState(0);
  const [couponcode, setcouponcode] = useState('');
  const [checkedShippingAddress, setcheckedShippingAddress] = useState(null);
  const [isOrderSubmited, setisOrderSubmited] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [payment_method, setpayment_method] = useState("COD");

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {

    const userToken = sessionStorage.getItem('userToken');
    const type = "customer_id";

    if (userInfo != null) {
      var customerId = userInfo.id;
    }

    CustomerAddresses(userToken).then((response) => {
      let res = response.data;

      if (res) {
        setuserAddressList(res.data)

        res.data.forEach(address_list);
        function address_list(item, index) {
          if (item.is_default === 'Yes') {
            setcheckedShippingAddress(item.id)
            return;
          }
        }
      }

    }).catch((error) => {

    })

    getcardDetails(customerId, type).then((response) => {
      let res = response.data;

     

      if (res) {
        setuserCartList(res.data);
        var total_price_cal = 0;

        res.data.forEach(element => {
          total_price_cal += parseFloat(element.product_details.selling_price) * parseFloat(element.quantity);
        });

        settotalPrice(total_price_cal);
        setgrandtotalPrice(total_price_cal);

      }

    }).catch((error) => {

    })
  }, [userInfo])

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


  const onAddressChange = (index, item) => {
    setcheckedShippingAddress(item.id)
  }

  const handlesubmitorder = async (event) => {
    event.preventDefault()


    if (checkedShippingAddress == null) {
      toast.error('Shipping Address Is Required');
      return;
    }
    var data = new FormData();
    userCartList.forEach(userCartListfunction);

    function userCartListfunction(item, index) {
      data.append('qty' + '[' + index + ']', item.quantity);
      data.append('product_ids' + '[' + index + ']', item.product_id);
    }

    data.append('shipping_address_id', checkedShippingAddress);
    data.append('billing_address_id', checkedShippingAddress);
    data.append('payment_method', payment_method);
    
    data.append('coupon_code', couponcode);
    const userToken = sessionStorage.getItem('userToken');
    AuthCheckoutSubmit(data, userToken).then((response) => {
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

  }

  const onChangePaymentgateway = async (event) => {
    setpayment_method(event.target.value)
  }

  return (
    <>
      {isOrderSubmited == true ? <ThankYouComponent orderNumber={orderNumber} /> :
        <>
          <div class="Manage_Address">
            <AddNewAddressComponent />
          </div>
          <section class="guest_checkout guest_checkout_main_wrap ">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-12 col-12">
                  <form onSubmit={handlesubmitorder}>
                    <div class="Checkout_main_wrap">
                      <div class="Checkout_title">
                        <h2 class="sec-title">Checkout</h2>
                        <Link href="/">Continue to shopping</Link>
                      </div>

                      <div class="checkout_address_list pt-3">
                        {
                          userAddressList.map((item, index) => (
                            <div class="checkout_address_card">
                              <input class="form-check-input" onClick={() => onAddressChange(index, item)} type="radio" name="shipping_address_id" id="address1" checked={checkedShippingAddress == item.id} />
                              <div class="checkout_address_content">
                                <p> {item.full_name}, {item.address_line_1},  {item.town_or_city}, {item.state} {item.pincode}, Mobile Number : {item.mobile_number}</p>
                                <p class="pt-1"><a type="button" class="edit" data-bs-toggle="modal" data-bs-target={'#edit_address' + item.id}>Edit</a> <a class="Delete" type="button" onClick={() => handleRemoveaddress(index, item)}>Delete</a></p>
                              </div>
                              <div class="Manage_Address">
                                <EditAddressComponent addressItem={item} />
                              </div>
                            </div>

                          ))

                        }

                      </div>
                      <a type='button' class="add_new_address" data-bs-toggle="modal"
                        data-bs-target="#add_address">+ Add New Address</a>




                    </div>
                    <div class="mt-3">
                      <label class="radio-inline px-2">
                        <input type="radio" class="form-check-input" onChange={onChangePaymentgateway} value="COD" name="payment_method" checked={payment_method == "COD"} /><span class="mx-2">COD</span>
                      </label>
                      <label class="radio-inline px-2">
                        <input type="radio" class="form-check-input" onChange={onChangePaymentgateway} value="Online" checked={payment_method == "Online"} name="payment_method" /><span class="mx-2">Online</span>
                      </label>
                    </div>

                    <div class=""><button type='submit' class="btn  button">Place Order</button></div>


                  </form>
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
        </>
      }
    </>
  )
}

export default AuthCheckOutComponent