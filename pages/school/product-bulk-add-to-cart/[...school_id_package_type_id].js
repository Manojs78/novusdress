import React, { useState } from 'react';
import axios from "axios"
import { AddToCartItemBulk } from "../../../Api/Api"
import { toast } from "react-toastify"
import Router from 'next/router';
import { useSelector } from 'react-redux'
import Link from 'next/link'

const backendApiUrl = "https://api.novusuniforms.com";

function BulkAddToCart(props) {
  const { userInfo } = useSelector((state) => state.auth)
  const packageDetailget = props.packageDetail.data;

  const [packageDetail, setpackageDetail] = useState(packageDetailget);

  const boys_product_ids_array = [];
  const girls_product_ids_array = [];



  const [boysProductids, setboysProductids] = useState(boys_product_ids_array);
  const [girlsProductids, setgirlsProductids] = useState(girls_product_ids_array);


  function boysCheckboxHandler(variation_array,event) {

    const target = event.target;
    var value = target.value;
    
    
    variation_array.forEach(myFunction);

    function myFunction(item, key) {
      const index = boysProductids.indexOf(parseInt(item.product_id));

      if (index > -1) {
        boysProductids.splice(index, 1);
      }

    }  
    if (target.checked) {
      boysProductids.push(value);
      var filterids = [];
      boysProductids.forEach(filteridsarray);
      function filteridsarray(products, products_index) {
        filterids.push(parseInt(products));
      }


      setboysProductids(filterids);
    } else {

      for (var i = 0; i < girlsProductids.length; i++) {

        if (girlsProductids[i] == value) {

          girlsProductids.splice(i, 1);
        }

      }
      var filterids = [];
      girlsProductids.forEach(filteridsarray);
      function filteridsarray(products, products_index) {
        filterids.push(products);
      }


      setgirlsProductids(filterids);



    }
  }

  // girlhandler
  function girlsCheckboxHandler(variation_array,event) {
    const target = event.target;
    var value = target.value;
    
    
    variation_array.forEach(myFunction);

    function myFunction(item, key) {
      const index = girlsProductids.indexOf(parseInt(item.product_id));

      if (index > -1) {
        girlsProductids.splice(index, 1);
      }

    }  
    if (target.checked) {
      girlsProductids.push(value);
      var filterids = [];
      girlsProductids.forEach(filteridsarray);
      function filteridsarray(products, products_index) {
        filterids.push(parseInt(products));
      }


      setgirlsProductids(filterids);
    } else {

      for (var i = 0; i < girlsProductids.length; i++) {

        if (girlsProductids[i] == value) {

          girlsProductids.splice(i, 1);
        }

      }
      var filterids = [];
      girlsProductids.forEach(filteridsarray);
      function filteridsarray(products, products_index) {
        filterids.push(products);
      }


      setgirlsProductids(filterids);



    }

  }


  const handleBulkAddToCartSubmit = async (event) => {
    event.preventDefault()
    const button_type = event.target.button_type.value;
    

    if (button_type == "boys_button") {
      var product_ids = boysProductids;
    } else {
      var product_ids = girlsProductids;
    }

    var formdata = new FormData();
    var customerId = null;
    if (userInfo !== null) {
      customerId = userInfo.id;
      formdata.append('customer_id', customerId);
    } else {
      const session_id = sessionStorage.getItem('cartsession');
      formdata.append('session_id', session_id);
    }

    product_ids.forEach(myFunction);


    function myFunction(item, index) {
      formdata.append('product_id' + '[' + index + ']', item);
    }


    AddToCartItemBulk(formdata).then((response) => {
      toast.success("Item added to cart successfully", {
        position: "top-right",
        classNameName: "app_toast",
        autoClose: 1000,
      })
      Router.push('/cart');

    }).catch((error) => {
      toast.error("something went wrong", {
        position: "top-right",
        classNameName: "app_toast",
        autoClose: 1000,
      })
    })

    // console.log(data)

  }

  function isset(accessor) {
    try {
      // Note we're seeing if the returned value of our function is not
      // undefined or null
      return accessor() !== undefined && accessor() !== null
    } catch (e) {
      // And we're able to catch the Error it would normally throw for
      // referencing a property of undefined
      return false
    }
  }


  const onvariationChangeboy = (productkey,school_package_index,variation_array, event) => {
    const variation_index = event.target.value;

    let lists = {...packageDetail};

    let school_packages = [ ...lists.school_packages ]

    let school_package = { ...school_packages[school_package_index] }

    let products = [ ...school_package.products ]

    let product = { ...products[productkey] };
    

    product["product_name"] = variation_array[variation_index].product_details.product_name;
    product["id"] = variation_array[variation_index].product_details.id;
    product["selling_price"] = variation_array[variation_index].product_details.selling_price;
    product["mrp"] = variation_array[variation_index].product_details.mrp;
    products[productkey] = { ...product };
    school_package['products'] = [ ...products ];
    school_packages[school_package_index] = { ...school_package };
    lists['school_packages'] = [ ...school_packages ];
    
    
    setpackageDetail(lists)

    variation_array.forEach(myFunction);

    function myFunction(item, key) {
      const index = boysProductids.indexOf(parseInt(item.product_id));

      if (index > -1) {
        boysProductids.splice(index, 1);
      }

    }
    boysProductids.push(parseInt(product.id));
    setboysProductids(boysProductids)



  }

  const onvariationChangegirl = (productkey,school_package_index,variation_array, event) => {
    const variation_index = event.target.value;

    let lists = {...packageDetail};

    let school_packages = [ ...lists.school_packages ]

    let school_package = { ...school_packages[school_package_index] }

    let products = [ ...school_package.products ]

    let product = { ...products[productkey] };
    

    product["product_name"] = variation_array[variation_index].product_details.product_name;
    product["id"] = variation_array[variation_index].product_details.id;
    product["selling_price"] = variation_array[variation_index].product_details.selling_price;
    product["mrp"] = variation_array[variation_index].product_details.mrp;
    products[productkey] = { ...product };
    school_package['products'] = [ ...products ];
    school_packages[school_package_index] = { ...school_package };
    lists['school_packages'] = [ ...school_packages ];
    
    
    setpackageDetail(lists)


    variation_array.forEach(myFunction);

    function myFunction(item, key) {
      const index = girlsProductids.indexOf(parseInt(item.product_id));

      if (index > -1) {
        girlsProductids.splice(index, 1);
      }

    }
    girlsProductids.push(parseInt(product.id));
    setgirlsProductids(girlsProductids)

  }

  return (
    <>
      <section class="Breadcrub_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item" aria-current="page">Schools</li>
                  <li className="breadcrumb-item" aria-current="page">{packageDetail.name}</li>
                  <li className="breadcrumb-item active" aria-current="page">{packageDetail.package_type.name}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="Breadcrub_sec" id="bundle_selection_banner" style={{ backgroundImage: `url(${packageDetail.package_type.featured_image})` }}>
        <div className="container">

        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <h2 class="innber_banner_heading"><b>{packageDetail.name}</b></h2>
              <h5>{packageDetail.package_type.name}</h5>
            </div>
          </div>
        </div>
      </section>

      <section className="bundle_tab_sec bg_gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-boys-tab" data-bs-toggle="pill" data-bs-target="#pills-boys"
                    type="button" role="tab" aria-controls="pills-boys" aria-selected="true">Boys</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-girls-tab" data-bs-toggle="pill" data-bs-target="#pills-girls"
                    type="button" role="tab" aria-controls="pills-girls" aria-selected="false">Girls</button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-boys" role="tabpanel" aria-labelledby="pills-boys-tab"
                  tabindex="0">
                  <form onSubmit={handleBulkAddToCartSubmit}>
                    {
                      packageDetail.school_packages.map((item, key) => (


                        <>



                          <div className="row">
                            <div className="col-lg-12">
                              <h2 className="sec-title mb-2 text-start">{item.name}</h2>

                              <div className="product_list_head">
                                <p>Item</p>
                                <p>Product Name</p>
                                <p>Price</p>
                                <p>Size</p>
                                <p></p>
                                <p>Total</p>
                              </div>
                            </div>
                          </div>


                          <div className="row products_list">

                            <div className="col-lg-12">
                              {
                                item.products.map((product, productkey) => (

                                  <>
                                    {product.gender == 'Boys' || product.gender == 'Unisex' ?
                                      <div className="products_list_card bg_orange">
                                        <div className="Products_check"><input name="product_ids" id={"prd_id" + product.id} className="form-check-input mt-0" onChange={(event) => boysCheckboxHandler(product.variations, event)} type="checkbox" value={product.id}
                                          aria-label="Checkbox for following text input" checked={boysProductids.includes(product.id) ? true : false} /></div>
                                        <div className="item_thumb"><Link href={'/product/' + product.id}><img class="product_image_thumb" src={product.main_image.image} alt="" /></Link></div>
                                        <div className="item_name pt-3 pt-md-0">
                                        <Link href={'/product/' + product.id}><h4>{product.product_name}</h4></Link>
                                          {product.size_chart != null ? <div><Link target="_blank" href={'/'+'size-charts#size_chart_'+product.size_chart.id} className='text-warning'>Size Chart</Link></div> : ''}
                                        </div>
                                        <div className="price pt-3 pt-md-0"><b>Rs. {product.selling_price}/-</b> <br /> <del>Rs. {product.mrp}/-</del></div>

                                        <div className="size pt-3 pt-md-0">
                                          <p className="mb-0 pe-2 d-block d-md-none">Size: </p>
                                          {product.variations.length !== 0 ?
                                            <select class="form-select" onChange={(event) => onvariationChangeboy(productkey,key,product.variations, event)}>
                                              {
                                                product.variations.map((product_var, product_varkey) => (
                                                  <option value={product_varkey}>{product_var.size}</option>
                                                ))

                                              }
                                            </select> : <input class="form-control" value="No size available" disabled />}

                                        </div>
                                        <div className="qty pt-3 pt-md-0">

                                        </div>
                                        <div className="total_price pt-3 pt-md-0">
                                          <p className="mb-0 pe-2 d-inline d-md-none">Total: </p>
                                          <b>  {product.selling_price}/-</b>
                                        </div>

                                      </div>

                                      : ""}
                                  </>

                                ))

                              }






                            </div>

                          </div>
                        </>











                      ))

                    }


                    {boysProductids.length !== 0 ? <div class="row shopping_cart">
                      <div class="col-lg-12">
                        <div class="total text-end p-0">
                          <button name="button_type" value="boys_button" type="submit" class="btn checkout">ADD All TO CART</button>
                        </div>
                      </div>
                    </div> : ""}

                  </form>











                </div>
                <div className="tab-pane fade" id="pills-girls" role="tabpanel" aria-labelledby="pills-girls-tab" tabindex="0">
                  <form onSubmit={handleBulkAddToCartSubmit}>
                    {
                      packageDetail.school_packages.map((item, key) => (




                        <>
                          <div className="row">
                            <div className="col-lg-12">
                              <h2 className="sec-title mb-2 text-start">{item.name}</h2>

                              <div className="product_list_head">
                                <p>Item</p>
                                <p>Product Name</p>
                                <p>Price</p>
                                <p>Size</p>
                                <p></p>
                                <p>Total</p>
                              </div>
                            </div>
                          </div>


                          <div className="row products_list">

                            <div className="col-lg-12">
                              {
                                item.products.map((product, productkey) => (
                                  <>
                                    {product.gender == 'Girls' || product.gender == 'Unisex' ?
                                      <div className="products_list_card bg_orange">
                                        <div className="Products_check"><input name="product_ids" className="form-check-input mt-0" onChange={(event) => girlsCheckboxHandler(product.variations, event)} type="checkbox" value={product.id}
                                          aria-label="Checkbox for following text input" checked={girlsProductids.includes(product.id) ? true : false} /></div>
                                        <div className="item_thumb"><Link href={'/product/' + product.id}><img src={product.main_image.image} alt="" /></Link></div>
                                        <div className="item_name pt-3 pt-md-0">
                                        <Link href={'/product/' + product.id}><h4>{product.product_name}</h4></Link>
                                          {product.size_chart != null ? <div><Link target="_blank" href={'/'+'size-charts#size_chart_'+product.size_chart.id} className='text-warning'>Size Chart</Link></div> : ''}
                                        </div>
                                        <div className="price pt-3 pt-md-0"><b>Rs. {product.selling_price}/-</b> <br /> <del>Rs. {product.mrp}/-</del></div>

                                        <div className="size pt-3 pt-md-0">
                                          <p className="mb-0 pe-2 d-block d-md-none">Size: </p>
                                          {product.variations.length !== 0 ?
                                            <select class="form-select" onChange={(event) => onvariationChangegirl(productkey,key,product.variations, event)}>
                                              {
                                                product.variations.map((product_var, product_varkey) => (
                                                  <option value={product_varkey}>{product_var.size}</option>
                                                ))

                                              }
                                            </select> : <input class="form-control" value="No size available" disabled />}
                                        </div>
                                        <div class="qty pt-3 pt-md-0"></div>

                                        <div className="total_price pt-3 pt-md-0">
                                          <p className="mb-0 pe-2 d-inline d-md-none">Total: </p>
                                          <b> {product.selling_price}/-</b>
                                        </div>

                                      </div>

                                      : ""}
                                  </>

                                ))

                              }






                            </div>

                          </div>

                        </>







                      ))

                    }

                    <div class="row shopping_cart">
                      <div class="col-lg-12">
                        <div class="total text-end p-0">
                          <button name="button_type" value="girl_button" type="submit" class="btn checkout">ADD All TO CART</button>
                        </div>
                      </div>
                    </div>
                  </form>










                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default BulkAddToCart

export async function getServerSideProps(context) {

  const school_id = context.query.school_id_package_type_id[0];
  const package_type_id = context.query.school_id_package_type_id[1];

  let packageDetails = await axios.get(backendApiUrl + "/api/customer/get_school_package_detail/" + school_id + '/' + package_type_id);

  const packageDetail = packageDetails.data;

  if (packageDetail.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: { packageDetail: packageDetail },
  }

}