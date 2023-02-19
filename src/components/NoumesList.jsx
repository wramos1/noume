import React from 'react'

const NoumesList = ({ noumes }) => {
    console.log(noumes)
    return (
        <div>
            {noumes.map((noume) => {
                return (
                    <div key={noume.id}>
                        {noume.name}
                        {noume.price.lead.formatted}
                        <img src={noume.propertyImage.image.url} alt="" />
                        {noume.availability.available}
                        {noume.availability.minRoomsLeft}
                    </div>
                )
            })}
        </div>
    )
}

export default NoumesList