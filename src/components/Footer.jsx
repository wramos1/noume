import React from 'react'

const Footer = () => {
    return (
        <div className='primary-bg-color secondary-txt-color px-36 flex flex-col gap-3'>
            <h1 className='text-2xl py-4'>Noume</h1>

            <div className='flex justify-evenly'>
                <div className='flex flex-col'>
                    <h2 className='text-lg'>Resources</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li>Support Center</li>
                        <li>Support Plans</li>
                        <li>Licenses</li>
                    </ul>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-lg'>Company</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li>Accessibility Statement</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                        <li>Leadership</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-lg'>About</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li>Don't sell my personal information</li>
                        <li>Terms & Conditions - Privacy Policy</li>
                        <li>Learn how Noume works</li>
                        <li>Legal Information</li>
                    </ul>
                </div>
            </div>

            <p className='text-xs my-0 mx-auto mt-10'>
                @2023 Noume, LLC. All rights reserved.
            </p>
        </div>
    )
}

export default Footer