import axios from "axios"

const backendApiUrl = "https://api.novusuniforms.com";

export async function getcardDetails(cartsession, type) {
    let result = await axios.get(backendApiUrl + '/api/customer/cart_item_list/' + type + '/' + cartsession)
    return result;
}

export async function getcartcount(cartsession, type) {
    let result = await axios.get(backendApiUrl + '/api/customer/cart_item_count/' + type + '/' + cartsession)
    return result;
}


export async function Removecartitemapi(item_id) {
    let result = await axios.get(backendApiUrl + '/api/customer/remove_item_from_cart/' + item_id)
    return result;
}

export async function Updatequantityitem(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/update_cart`,
        data: formdata
    });
    return result;
}

export async function AddToCartItem(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/add_to_cart_item`,
        data: formdata
    });
    return result;
}

export async function AddToCartItemBulk(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/add_to_cart_item_bulk`,
        data: formdata
    });
    return result;
}

export async function ApplyCouponCode(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/apply_coupon`,
        data: formdata
    });
    return result;
}

export async function GuestCheckoutSubmit(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/place_order_guest`,
        data: formdata
    });
    return result;
}

export async function CustomerAddresses(userToken) {


    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: backendApiUrl + `/api/customer/customer_address_list`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    };

    let result = await axios(
        config
    );
    return result;


}

export async function AddNewAddress(userToken, formdata) {


    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: backendApiUrl + `/api/customer/add_address`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
        data: formdata
    };

    let result = await axios(
        config
    );
    return result;


}

export async function UpdateAddress(userToken, formdata) {

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: backendApiUrl + `/api/customer/update_address`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
        data: formdata
    };

    let result = await axios(
        config
    );
    return result;

}

export async function RemoveAddressapi(userToken, item_id) {


    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: backendApiUrl + `/api/customer/customer_address_remove/` + item_id,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    };

    let result = await axios(
        config
    );
    return result;


}


export async function OrderList(userToken) {


    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: backendApiUrl + `/api/customer/get_orders`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    };

    let result = await axios(
        config
    );
    return result;


}

export async function AuthCheckoutSubmit(formdata,userToken) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/place_order`,
        data: formdata,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });
    return result;
}

export async function subscribeApi(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/subscriber`,
        data: formdata
    });
    return result;
}

export async function ContactUsApi(formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/query_save`,
        data: formdata
    });
    return result;
}

export async function ProductSearchApi(search_query) {
    let result = await axios({
        method: "get",
        url: backendApiUrl + "/api/customer/products_search_autocomplete?search_query=" + search_query,
    });
    return result;
}

export async function SchoolSearchApiautocomplete(search_query) {
    let result = await axios({
        method: "get",
        url: backendApiUrl + "/api/customer/get_search_schools?search_query=" + search_query,
    });
    return result;
}

export async function GetSubcategoriesApi() {
    let result = await axios({
        method: "get",
        url: backendApiUrl + "/api/customer/product_category/list",
    });
    return result;
}


export async function LogOutApi(userToken) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/logout`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });
    return result;
}
export async function UpdateCustomerProfileApi(userToken,formdata) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/customer_update_profile`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
        data: formdata
    });
    return result;
}


export async function WislistList(userToken) {
    let result = await axios({
        method: "get",
        url: backendApiUrl + `/api/customer/get_wishlist`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });
    return result;
}

export async function RemoveWishlistitemapi(userToken,item_id) {
    let result = await axios({
        method: "get",
        url: backendApiUrl + `/api/customer/customer_remove_wishlist/`+item_id,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });
    return result;
}

export async function OrderCancelmapi(userToken,formdata) {
    let result = await axios({
        method: "Post",
        url: backendApiUrl + `/api/customer/cancel_order`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
        data: formdata
    });
    return result;
}

export async function AddToWislistItem(formdata,userToken) {
    let result = await axios({
        method: "post",
        url: backendApiUrl + `/api/customer/customer_add_wishlist`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userToken
        },
        data: formdata
    });
    return result;
}


