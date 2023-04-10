import React from 'react'
import axios from "axios"
import Router from 'next/router';
import Link from 'next/link'
import { AddToCartItem,AddToWislistItem,WislistList,RemoveWishlistitemapi } from '../../Api/Api'
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { useState } from 'react'


const backendApiUrl = "https://api.novusuniforms.com";


function ProductPage(props) {
    const [inWislist, setinWislist] = useState(false);
    const { userInfo, userToken } = useSelector((state) => state.auth)

    
    const productDetail = props.productDetail.data;

    if(userInfo != null){
        WislistList(userToken).then((response) => {
            let res = response.data.data;

            res.forEach(myFunction);

            function myFunction(item, index) {
                if(item.product_id == productDetail.id){
                    setinWislist(true)
                }
            }
            

        }).catch((error) => {

        })
    }

    const reccommendProductList = props.reccommendProductList.data;
    function onvariationChange(event) {
        const variation_id = event.target.value;
        const product_id = productDetail.id;

        axios.get(backendApiUrl + "/api/customer/get_next_variation_product_id/" + product_id + '/' + variation_id).then((response) => {
            const get_next_variation_product_id = response.data.data.product_id;

            const setproductpath = '/product/' + get_next_variation_product_id;

            Router.push(setproductpath);

        });


    }

    const AddToWishlistHandler = () => {
        
        if (userInfo !== null) {
            
            var formdata = new FormData();
            formdata.append('product_id', productDetail.id);

            AddToWislistItem(formdata, userToken).then((response) => {
                setinWislist(true);
                toast.success("Item added to Wishlist", {
                    position: "bottom-center",
                    autoClose: 1000,
                })


            }).catch((error) => {

            })
        } else {
            Router.push('/login');
        }



    }

    const onRemoveHandleWishlist = () => {
        RemoveWishlistitemapi(userToken,productDetail.id).then((response) => {
            setinWislist(false);
            toast.success("Wishlist removed successfully!", {
                position: "bottom-center",
                autoClose: 1000,
            })

        }).catch((error) => {
            toast.error("something went wrong", {
                position: "top-right",
                autoClose: 1000,
            })
        })
    }

    const AddToCartHandler = () => {

        var customerId = null;
        var formdata = new FormData();

        if (userInfo !== null) {
            customerId = userInfo.id;
            formdata.append('customer_id', customerId);
        } else {
            const session_id = sessionStorage.getItem('cartsession');
            formdata.append('session_id', session_id);
        }

        formdata.append('product_id', productDetail.id);
        formdata.append('quantity', 1);

        AddToCartItem(formdata).then((response) => {
            toast.success("Item added to cart successfully", {
                position: "top-right",
                autoClose: 1000,
            })
            Router.push('/cart');

        }).catch((error) => {

            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 1000,
            })
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
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item" aria-current="page">Product</li>
                                    <li class="breadcrumb-item active" aria-current="page">{productDetail.product_name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section class="single_product_details bg_gray">
                <div class="container bg-white">
                    <div class="row">
                        <div class="col-lg-6">
                            {/* <!------------------------> */}
                            <div class="single_product_slider">

                                <div id="single_products_main" class="carousel slide">

                                    <div class="Thumbs_indicator">



                                        {
                                            productDetail.images.map((item, key) => (
                                                <div data-bs-target="#single_products_main" data-bs-slide-to={key} class="" aria-current="true"
                                                    aria-label="Slide 1">
                                                    <img src={item.image} />
                                                </div>

                                            ))

                                        }

                                    </div>

                                    <div class="carousel-inner main_featured_thumb border">
                                        {
                                            productDetail.images.map((item, key) => (
                                                <div class={key == 0 ? 'active carousel-item img-container' : 'carousel-item img-container'}>
                                                    <img src={item.image} class="d-block w-100" alt="..." />
                                                </div>

                                            ))

                                        }


                                    </div>
                                </div>
                            </div>
                            {/* <!------------------------> */}
                        </div>
                        <div class="col-lg-6">
                            <div class="product_detail_info">
                                <span class="wishlist_icon ">{inWislist == false?<img onClick={AddToWishlistHandler} class="w-100" src={'/' + 'assets/images/wishlist.png'} />:<img class="w-100" onClick={onRemoveHandleWishlist} src={'/' + 'assets/images/wished.png'} />}</span>
                                <h4 class="product_title">{productDetail.product_name.slice(0, 50)} </h4>

                                {/* <div class="rating">
                                    <div class="star-img"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i> <i class="fas fa-star"></i>
                                    </div>
                                    <p class="mb-0"> 250 Reviews</p>
                                </div> */}



                                <div class="product_price">
                                    <p class="regular_price">Rs {productDetail.selling_price}</p>
                                    {productDetail.selling_price < productDetail.mrp ?
                                        <p class=""><del>Rs {productDetail.mrp}</del></p> : ""
                                    }
                                </div>

                                <div class="product_attributes">

                                    {
                                        productDetail.variations_types.map((item, key) => (
                                            <div class="size_attribute d-flex">
                                                <div class="input-group">
                                                    <label><span>*</span>{item.name}</label>
                                                    <select class="form-control" aria-label="Default select example" onChange={onvariationChange}>
                                                        {item.name == 'Color' ?



                                                            item.variation_value.map((variation_value, index) => (

                                                                <option value={variation_value.id} selected={variation_value.value === productDetail.variation_combination.color ? true : false} >{variation_value.value}</option>

                                                            )) : ""

                                                        }

                                                        {item.name == 'Size' ?



                                                            item.variation_value.map((variation_value, index) => (

                                                                <option value={variation_value.id} selected={variation_value.value === productDetail.variation_combination.size ? true : false} >{variation_value.value}</option>

                                                            )) : ""

                                                        }

                                                        {item.name == 'Pack' ?



                                                            item.variation_value.map((variation_value, index) => (

                                                                <option value={variation_value.id} selected={variation_value.value === productDetail.variation_combination.pack ? true : false} >{variation_value.value}</option>

                                                            )) : ""

                                                        }

                                                        {item.name == 'Style' ?



                                                            item.variation_value.map((variation_value, index) => (

                                                                <option value={variation_value.id} selected={variation_value.value === productDetail.variation_combination.style ? true : false} >{variation_value.value}</option>

                                                            )) : ""

                                                        }

                                                    </select>
                                                </div>

                                            </div>

                                        ))

                                    }




                                </div>
                                {productDetail.size_chart != null ?<div><Link target="_blank" href={'/'+'size-charts#size_chart_'+productDetail.size_chart.id} className='text-warning'>Size Chart</Link></div>:''}
                                


                                {productDetail.quantity == 0 ? <div class="add_to_cart_btn text-danger"><h3>Out Of Stock</h3></div> :
                                    <div class="add_to_cart_btn">
                                        <button onClick={AddToCartHandler} class="btn cart_btn">ADD TO CART</button>
                                        <button onClick={AddToCartHandler} class="btn buy_now">BUY IT NOW</button>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>

                    {/* <!--------descprition-tabs------> */}

                    <div class="row descprition_tabs">
                        <div class="col-lg-12">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="11-tab" data-bs-toggle="tab" data-bs-target="#11" type="button"
                                        role="tab" aria-controls="11-tab-pane" aria-selected="true">Description</button>
                                </li>
                                {productDetail.details.description == null ?'': <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="12-tab" data-bs-toggle="tab" data-bs-target="#12-tab-pane" type="button"
                                        role="tab" aria-controls="12-tab-pane" aria-selected="false">Additional Information</button>
                                </li>}
                               
                            </ul>

                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="11" role="tabpanel" aria-labelledby="11-tab" tabindex="0">
                                    <div>
                                        {productDetail.details.description}
                                    </div>
                                </div>
                                {productDetail.details.description == null ?'':<div class="tab-pane fade" id="12-tab-pane" role="tabpanel" aria-labelledby="12-tab" tabindex="0">
                                    <div>
                                        {productDetail.details.additional_information}
                                    </div>
                                </div>}
                                
                            </div>
                        </div>
                    </div>

                    {/* <!-------end-tabs----------->
      <!-------recommends-products--------> */}

                    <div class="row pt-0 pt-md-5 recommends_products">
                        <div class="col-lg-12">
                            <h2 class="sec-title mb-2 text-center">RECOMMENDED PRODUCTS</h2>
                        </div>

                        <div class="row pt-2 pt-md-5">
                            {
                                reccommendProductList.map((item, key) => (
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-6">
                                        <div class="product-card">
                                            <Link href={'/product/' + item.id}><img src={item.main_image.image} class="w-100" alt="" /></Link>
                                            <div class="product-detail text-center">
                                                <a href="#">
                                                    <p class="product-name mb-0">{item.product_name.slice(0, 28)}...</p>
                                                </a>
                                                <p class="price mb-2"><b>Rs. {item.selling_price}/-</b> {productDetail.selling_price < productDetail.mrp ?
                                                    <del>Rs {productDetail.mrp}</del> : ""
                                                }</p>
                                            </div>
                                        </div>
                                    </div>

                                ))

                            }



                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default ProductPage

export async function getServerSideProps(context) {

    const { product_id } = context.query;

    let productDetails = await axios.get(backendApiUrl + "/api/customer/get_product_details/" + product_id);

    const productDetail = productDetails.data;

    if (productDetail.data == null) {
        return {
          notFound: true,
        }
      }

    let getreccommendProductList = await axios.get(backendApiUrl + "/api/customer/get_recommended_product/list/" + product_id);
    const reccommendProductList = getreccommendProductList.data;
    return {
        props: { productDetail: productDetail, reccommendProductList: reccommendProductList }, // will be passed to the page component as props
    }

}