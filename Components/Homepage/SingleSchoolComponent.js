import React from 'react'
import Link from 'next/link'

function SingleSchoolComponent(props) {
    return (
        <>
            <div className="category_card_box" key={props.school_item_key}>
                <div className="school-card text-center">
                    <div className="img"><Link href={'/school'+'/'+props.school_item.id}><img src={props.school_item.logo_img} className="w-100 border" alt="" /></Link></div>
                    <Link href={'/school'+'/'+props.school_item.id} className="text-dark text-decoration-none">
                        <h4>{props.school_item.name}</h4>
                    </Link>
                    <Link href={'/school'+'/'+props.school_item.id}>VIEW PRODUCTS</Link>
                </div>
            </div>
        </>
    )
}

export default SingleSchoolComponent