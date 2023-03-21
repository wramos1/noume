import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as BasicHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { QueriesContext } from '../data/QueriesContext';

const NoumePreview = ({ noume }) => {

    const [clicked, setClicked] = useState(false);
    const { selectedLocation } = useContext(QueriesContext);
    const { setNoumePrice } = useContext(QueriesContext);

    return (
        <Link
            to={`/noumes/${noume.id}`}
            onClick={() => setNoumePrice(noume.price.lead.formatted)}
            className='w-full flex h-[220px] border-2 my-5 z-10 border-[#0000007b] transition-all mobile:flex-col mobile:h-[revert] mobile:items-center'
        >
            <div
                className='w-[20%] relative z-30 mobile:w-1/2'
            >
                <div
                    className='absolute right-6 top-5 text-2xl z-50'
                    onClick={() => setClicked(!clicked)}
                >
                    {clicked ? <FontAwesomeIcon icon={SolidHeart} style={{ color: 'red' }} /> : <FontAwesomeIcon icon={BasicHeart} style={{ color: 'red' }} />}
                </div>
                <div className='w-full p-3 h-full'>
                    <img
                        className='border-[3px] border-[#AA9BE6] h-full w-full'
                        src={noume.propertyImage.image.url}
                        alt={noume.name}
                    />
                </div>
            </div>

            <div
                className='w-[80%] flex justify-between mobile:w-full mobile:flex-col'
            >
                <div className='flex flex-col justify-around mobile:items-center'>
                    <div>
                        <h1 className='text-xl font-black noume-availability mt-0 '>
                            {noume.name} <span className={noume.availability.available === true ? 'bg-green-700' : 'bg-red-700'}>{noume.availability.available === true ? 'Available' : 'Unavailable'}</span>
                        </h1>
                        <span className='text-sm mobile:block mobile:text-center text-[#0000009f]'>{noume.destinationInfo.distanceFromDestination.value} Miles from {selectedLocation.name} </span>
                        <p className='text-md text-[#AA9BE6] py-1 mobile:text-center'>
                            {noume.reviews.score}/10 ({noume.reviews.total} Reviews)
                        </p>
                    </div>
                    <button className='primary-btn w-[120px] rounded-none'>View Property</button>
                </div>

                <div className='flex flex-col justify-between h-full p-2 mobile:flex-row'>
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-[#3FA600] text-lg'>
                            {noume.price.lead.formatted}
                        </h1>
                        <p className='text-[#0000007b] text-sm'>Per Night(Avg.)</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='text-lg'>
                            {noume.availability.minRoomsLeft > 0 ? noume.availability.minRoomsLeft : 0}
                        </h1>
                        <p className='text-[#0000007b] text-sm'>Open Rooms</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoumePreview