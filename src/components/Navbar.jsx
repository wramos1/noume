import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Navbar = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (location.pathname === '/') {
            const moveNavbar = () => {
                const scrollY = window.pageYOffset;
                if (scrollY > 0) {
                    setScrolled(true);
                    document.querySelector('.nav').classList.remove('absolute', 'p-9');
                    document.querySelector('.nav').classList.add('fixed', 'bg-slate-800/80', 'p-5', 'text-white');
                } else {
                    setScrolled(false);
                    document.querySelector('.nav').classList.add('absolute', 'p-9');
                    document.querySelector('.nav').classList.remove('fixed', 'bg-slate-800/80', 'p-5', 'text-white');
                }
            };

            window.addEventListener("scroll", moveNavbar);

            return () => window.removeEventListener("scroll", moveNavbar);
        }

    }, [scrolled]);

    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    const navigateToNewsletter = async () => {
        if (location.pathname !== '/') {
            navigate('/');
            const elm = await waitForElm('#newsletter');
            document.querySelector('#newsletter').scrollIntoView({ behavior: 'smooth' });
        };
        document.querySelector('#newsletter').scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <nav className={`nav flex justify-around items-center absolute z-20 w-full transition-all ${props.classProps}`}>
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
                        className='hover:text-slate-500 cursor-pointer'
                        onClick={() => {
                            navigateToNewsletter();
                        }}
                    >
                        Newsletter
                    </li>

                    <li
                        className='hover:text-slate-500 cursor-pointer'
                        onClick={() => {
                            navigateToNewsletter();
                        }}
                    >
                        Support
                    </li>

                    <li
                        className='hover:text-slate-500 cursor-pointer'
                    >
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