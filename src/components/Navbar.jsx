import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Navbar = (props) => {
    const location = useLocation();
    const [scrollDir, setScrollDir] = useState("scrolling down");

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        console.log(scrollDir);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);
    return (
        <nav className={`nav flex justify-around items-center absolute z-20 w-full p-9 transition-all ${props.bg} ${props.paddingSize}`}>
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