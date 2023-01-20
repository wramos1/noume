import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex justify-around items-center absolute z-20 w-full p-10'>
            <div className='w-1/2'>
                <h1 className='text-3xl secondary-txt-color'>
                    Noume<span className='primary-txt-color'>.</span>
                </h1>
            </div>

            <div className='w-1/2'>
                <ul className='text-base flex flex-row justify-around items-center'>
                    <li>
                        Newsletter
                    </li>

                    <li>
                        Contact Us
                    </li>

                    <li>
                        My Noumes
                    </li>

                    <li>
                        <Link to={'/find-hotels'}>
                            <button className='primary-btn'>
                                Find Hotels
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar