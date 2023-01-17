import React from 'react'
import { popularStays } from '../data/popularStays'

const Home = () => {
    return (
        <div>
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

            <div className='flex flex-col py-10 pb-20 gap-5'>
                <h1 className='text-4xl p-6'>
                    Popular <span className='primary-txt-color'>Stays</span>
                </h1>

                <div className='flex flex-row justify-around flex-wrap'>
                    {popularStays.map((stay) => {
                        const { imgSrc, imgAlt, title } = stay;
                        return (
                            <div className='flex flex-col justify-around items-center max-w-[300px] h-[300px] basis-1/5'>
                                <img src={imgSrc} alt={imgAlt} className='rounded-[50%] w-[250px] h-[250px]' />
                                <p>{title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Home