import React from 'react'
import Link from 'next/link'

function AccountBreadcrumbComponent(props) {
    return (
        <>
            <section class="Breadcrub_sec">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">{props.pagename}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountBreadcrumbComponent