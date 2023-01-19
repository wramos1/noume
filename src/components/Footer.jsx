import React from 'react'

const Footer = () => {
    return (
        <div className='primary-bg-color secondary-txt-color px-36 flex flex-col gap-3'>
            <h1 className='text-2xl py-4'>Noume</h1>

            <div className='flex justify-evenly'>
                <div className='flex flex-col'>
                    <h2 className='text-lg'>Resources</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li className='hover:text-slate-700 cursor-pointer'>Support Center</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Support Plans</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Licenses</li>
                    </ul>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-lg'>Company</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li className='hover:text-slate-700 cursor-pointer'>Accessibility Statement</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Careers</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Contact Us</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Leadership</li>
                        <li className='hover:text-slate-700 cursor-pointer'>FAQs</li>
                    </ul>
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-lg'>About</h2>
                    <ul className='text-xs flex flex-col gap-2'>
                        <li className='hover:text-slate-700 cursor-pointer'>Don't sell my personal information</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Terms & Conditions - Privacy Policy</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Learn how Noume works</li>
                        <li className='hover:text-slate-700 cursor-pointer'>Legal Information</li>
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