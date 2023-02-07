import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className={`flex justify-around items-center absolute z-20 w-full p-9 transition-all ${props.bg} ${props.paddingSize}`}>
            <div className='w-1/2'>
                <h1 className='text-3xl secondary-txt-color'>
                    <Link to={'/'}>
                        Noume<span className='primary-txt-color'>.</span>
                    </Link>
                </h1>
            </div>

            <div className='w-1/2'>
                <ul className='text-base flex flex-row justify-around items-center'>
                    <li
                        className='hover:text-slate-600 cursor-pointer'
                        onClick={() => {
                            document.querySelector('#newsletter').scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Newsletter
                    </li>

                    <li
                        className='hover:text-slate-600 cursor-pointer'
                        onClick={() => {
                            document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Support
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