import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as BasicHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NoumePreview = ({ noume }) => {
    const [clicked, setClicked] = useState(false);
    return (
        <Link
            to={`/noumes/${noume.id}`}
            className='w-full flex'
        >
            <div
                className='w-1/3 relative'
            >
                <div
                    className='absolute right-0 top-0'
                    onClick={() => setClicked(!clicked)}
                >
                    {clicked ? <FontAwesomeIcon icon={SolidHeart} style={{ color: 'red' }} /> : <FontAwesomeIcon icon={BasicHeart} style={{ color: 'red' }} />}
                </div>
                <img
                    src={noume.propertyImage.image.url}
                    alt={noume.name}
                />
            </div>

            <div
                className='w-2/3 flex justify-between'
            >
                <div className='flex flex-col justify-around'>
                    <h1>
                        {noume.name} <span className={"rounded p-1" + noume.availability.available ? 'bg-green-500' : 'bg-red-500'}>{noume.availability.available ? 'Available' : 'Unavailable'}</span>
                    </h1>
                    {/* <h3>{noume.neighborhood.name} - {noume.destinationInfo.distanceFromDestination.value}</h3>  NEEDS CONDITIONAL, SOME DO NOT HAVE NEIGHBORHOOD NAME, MILES DISTANCES ALWAYS*/}
                    <p>{noume.reviews.score}/10 ({noume.reviews.total} Reviews)</p>
                    <button className='primary-btn'>View Property</button>
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        <h1>
                            {noume.price.lead.formatted}
                        </h1>
                        <p>Per Night(Avg.)</p>
                    </div>
                    <div>
                        <h1>
                            {noume.availability.minRoomsLeft}
                        </h1>
                        <p>Open Rooms</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoumePreview