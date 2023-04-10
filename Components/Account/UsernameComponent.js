import React from 'react'
import { useGetUserDetailsQuery } from '../../app/services/auth/authService'
import { useSelector } from 'react-redux'

function UsernameComponent() {

    const { userInfo } = useSelector((state) => state.auth)


    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        // pollingInterval: 900000, // 15mins
    })


    return (
        <>
           <div className="User_avtar_wrap d-flex">
                                    <div>Hello, <br /> <span className="username"> {isFetching
                                        ? 'Fetching...'
                                        : userInfo !== null
                                            ? userInfo.name.slice(0, 15)
                                            : ''}</span></div>
                                </div>
        </>
    )
}

export default UsernameComponent