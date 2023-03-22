import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Navbar = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [headerClicked, setHeaderClicked] = useState(false);

    useEffect(() => {
        tabSelecting();

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

    const tabSelecting = () => {
        const tabs = document.getElementsByClassName('nav-link');
        if (window.innerWidth < 768) {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', () => {
                    closeSideNav();
                })
            };
        }
    }

    const closeSideNav = () => {
        document.querySelector('.main-nav').classList.remove('mobile', 'appear');
        setHeaderClicked(false)
    }

    const hamburgerClicked = () => {
        setHeaderClicked(!headerClicked)
        document.querySelector('.main-nav').classList.toggle('appear');
        document.querySelector('.main-nav').classList.toggle('mobile');
    }

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

            <div className='main-nav w-1/2 transition-all mobile:h-4/5 mobile:primary-bg-color mobile:top-[75px] mobile:justify-center mobile:fixed mobile:-left-full mobile:flex mobile:flex-col mobile:w-full mobile:z-20'>
                <ul className='text-base flex flex-row justify-around items-center mobile:flex-col mobile:justify-around mobile:h-full'>
                    <li
                        className='nav-link hover:text-black cursor-pointer mobile:text-[#FEFEDF]'
                        onClick={() => {
                            navigateToNewsletter();
                        }}
                    >
                        Newsletter
                    </li>

                    <li
                        className='nav-link hover:text-black cursor-pointer mobile:text-[#FEFEDF]'
                        onClick={() => {
                            navigateToNewsletter();
                        }}
                    >
                        Support
                    </li>

                    <li
                        className='nav-link hover:text-black cursor-pointer mobile:text-[#FEFEDF]'
                    >
                        <Link to={'/my-noumes'}>
                            My Noumes
                        </Link>
                    </li>

                    <li className='nav-link'>
                        <Link to={'/find-noumes'}>
                            <button className='primary-btn mobile:bg-black mobile:primary-txt-color'>
                                Find Noumes
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='hamburger hidden mobile:block' onClick={hamburgerClicked}>
                <button className="relative group">
                    <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all primary-bg-color ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md ${headerClicked ? 'ring-4' : ''}`}>
                        <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden ${headerClicked ? 'rotate-180' : ''}`}>
                            <div className={`bg-[#FEFEDF] h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? '-rotate-45' : ''}`}></div>
                            <div className="bg-[#FEFEDF] h-[2px] w-7 rounded transform transition-all duration-500 "></div>
                            <div className={`bg-[#FEFEDF] h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? 'rotate-45' : ''}`}></div>
                        </div>
                    </div>
                </button>
            </div>

        </nav>
    )
}

export default Navbar