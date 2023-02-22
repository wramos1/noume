import React from 'react'
import NoumePreview from './NoumePreview'

const NoumesList = ({ noumes }) => {
    return (
        <div
            className='flex flex-col gap-5 px-5'
        >
            {noumes.map((noume) => {
                return (
                    <NoumePreview
                        key={noume.id}
                        noume={noume}
                    />
                )
            })}
        </div>
    )
}

export default NoumesList