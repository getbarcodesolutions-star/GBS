import React from 'react'

const Title = ({ heading }) => {
    return (
        <div className='lg:p-10 sm:p-5 p-3 lg:text-7xl  text-4xl font-semibold text-neutral-800 tracking-wide'>
            <h1>{heading}</h1>
        </div>
    )
}

export default Title
