import React from 'react'

const NoumePreview = ({ noume }) => {
    return (
        <div>
            {noume.name}
            {noume.price.lead.formatted}
            <img src={noume.propertyImage.image.url} alt="" />
            {noume.availability.available}
            {noume.availability.minRoomsLeft}
        </div>
    )
}

export default NoumePreview