import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as BasicHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

const NoumePreview = ({ noume }) => {
    const [clicked, setClicked] = useState(false);
    return (
        <div
            className='relative w-full flex'
        >
            <div
                className='absolute right-0 top-0'
                onClick={() => setClicked(!clicked)}
            >
                {clicked ? <FontAwesomeIcon icon={SolidHeart} style={{ color: 'red' }} /> : <FontAwesomeIcon icon={BasicHeart} style={{ color: 'red' }} />}
            </div>

            <div
                className='w-1/3'
            >
                <img
                    src={noume.propertyImage.image.url}
                    alt={noume.name}
                />
            </div>

            <div
                className='w-2/3'
            >
                <ul>
                    <li>
                        <span>Name:</span>{noume.name}
                    </li>

                    <li>
                        <span>Avg. Price:</span>
                        {noume.price.lead.formatted}
                    </li>

                    <li>
                        <span>
                            Open Rooms:
                        </span>
                        {noume.availability.minRoomsLeft}
                    </li>

                </ul>
                {noume.availability.available}
            </div>
        </div>
    )
}

export default NoumePreview