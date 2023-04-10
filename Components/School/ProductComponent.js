import React from 'react'
import Link from 'next/link'

function ProductComponent(props) {
    return (
        <>
            <div class="col-lg-3">
                <div class="product-card mb-3">
                <Link href={'/product'+'/'+props.item.id}><img style={{aspectRatio:'1/1'}} src={props.item.main_image.image} class="w-100" alt="" /></Link>
                    <div class="product-detail text-center">
                        <a href="#"><p class="product-name mb-0">{props.item.product_name.slice(0, 30)}...</p></a>
                        <p class="price mb-2"><b>Rs. {props.item.selling_price}/-</b> <del>Rs. {props.item.mrp}/-</del></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent