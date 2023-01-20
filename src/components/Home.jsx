import React from 'react';
import { popularStays } from '../data/popularStays';
import Yoga from '../images/yoga.png';
import House from '../images/home.png';
import CheckList from '../images/checks.png';
import SearchBar from './SearchBar';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className='hero w-full min-h-[95vh] relative'>
                <h1 className='text-[56px] absolute left-[8.26%] right-[78.54%] top-[19.42%] bottom-[71.17%] min-w-[500px] lg:top-[18%]'>
                    Find a
                </h1>

                <h1 className='primary-txt-color text-[56px] absolute left-[15.14%] right-[72.15%] top-[33.08%] bottom-[59.79%] min-w-[500px] lg:top-[30%]'>
                    HOME
                </h1>

                <h1 className='text-[56px] absolute left-[20.07%] right-[66.04%] top-[43.85%] bottom-[46.74%] min-w-[500px] lg:top-[41.5%]'>
                    For the
                </h1>

                <h1 className='primary-txt-color text-[56px] absolute left-[26.74%] right-[61.94%] top-[56.9%] bottom-[35.96%] min-w-[500px] lg:top-[52%]'>
                    NEW
                </h1>

            </div>

            {/* Popular Stays Section */}
            <div className='flex flex-col py-10 pb-20 gap-5'>
                <h1 className='text-4xl p-6'>
                    Popular <span className='primary-txt-color'>Stays</span>
                </h1>

                <div className='flex flex-row justify-around flex-wrap gap-5'>
                    {
                        popularStays.map((stay, i) => {
                            const { imgSrc, imgAlt, title } = stay;
                            return (
                                <div key={i} className='flex flex-col justify-around items-center max-w-[250px] h-[300px] basis-1/4 hover:primary-txt-color group cursor-pointer'>
                                    <img src={imgSrc} alt={imgAlt} className='rounded-[50%] w-[220px] h-[220px] group-hover:primary-border group-hover:scale-105 transition-all' />
                                    <p>{title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* 3 Icon Section */}
            <div className='icon-bg flex flex-col items-center justify-evenly min-h-[55vh] my-8'>
                <h1 className='text-5xl'>
                    On an <span className='primary-txt-color'>Endeavor</span> to make your <span className='primary-txt-color'>Excursions</span>
                </h1>

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-center text-center justify-evenly w-1/3 px-10 min-h-[250px]'>
                        <h1 className='text-2xl primary-txt-color'>
                            Less Stressful
                        </h1>

                        <img className='w-[100px] h-[100px]' src={Yoga} alt="yoga pose" />

                        <p className='text-sm w-1/2'>
                            We list out all of your options to reduce the anxiety of missing out on the ideal stay.
                        </p>
                    </div>

                    <div className='flex flex-col items-center text-center justify-evenly w-1/3 px-10 min-h-[250px]'>
                        <h1 className='text-2xl primary-txt-color'>
                            Welcoming
                        </h1>

                        <img className='w-[100px] h-[100px]' src={House} alt="house" />

                        <p className='text-sm w-1/2'>
                            We provide the means to filter out unwanted hotels  so you can feel at home during your trip.
                        </p>
                    </div>

                    <div className='flex flex-col items-center text-center justify-evenly w-1/3 px-10 min-h-[250px]'>
                        <h1 className='text-2xl primary-txt-color'>
                            Perfect
                        </h1>

                        <img className='w-[100px] h-[100px]' src={CheckList} alt="checklist" />

                        <p className='text-sm w-1/2'>
                            We make finding a hotel easy so that you can check off all the boxes of having a perfect trip.
                        </p>
                    </div>
                </div>
            </div>

            {/* Find Hotel Button Call Section*/}
            <div className='action-section flex flex-col min-h-[65vh] justify-evenly items-center py-10 my-5'>
                <h1 className='text-5xl secondary-txt-color'>
                    Don't Wait! Find Your Next Stay Now
                </h1>

                <button className='primary-btn py-2 px-5 text-lg'>
                    Find Hotels
                </button>
            </div>

            {/* Newsletter Section */}
            <div className='bg-black secondary-txt-color flex flex-col items-center justify-center min-h-[45vh] my-4'>
                <div>
                    <h1 className='text-4xl pb-5'>
                        Subscribe To Our Newsletter
                    </h1>
                    <p className='pb-5 text-center'>
                        Stay up to date on the latest
                    </p>
                </div>

                <input className='w-1/3 py-3 px-1 rounded my-5 text-black placeholder-slate-500 brightness-50 focus:brightness-75 text-lg' type="text" name="" id="" placeholder='Email Address' />
                <button className='primary-btn bg-[#8000FF] text-black px-5'>
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default Home