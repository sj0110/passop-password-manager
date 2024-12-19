import React from 'react'

const Footer = () => {

    const date = new Date(Date.now());
    const year = date.getFullYear();
    return (
        <div className='h-12 bg-gray-900 flex justify-center items-center fixed bottom-0 w-full text-white font-light'>
            <p>Copyright <span className='text-blue-500 font-bold'>© </span> {`${year}`} | All rights reserved</p>
        </div>
    )
}

export default Footer