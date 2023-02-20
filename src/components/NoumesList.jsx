import React from 'react'
import NoumePreview from './NoumePreview'

const NoumesList = ({ noumes }) => {
    console.log(noumes)
    return (
        <div>
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