import React from 'react'
import NoumePreview from './NoumePreview'

const NoumesList = ({ noumes }) => {

    const mapNoumes = noumes.map((noume) => {
        return (
            <NoumePreview
                key={noume.id}
                noume={noume}
            />
        )
    })

    const renderNoumePreviews = () => {
        if (noumes.length === 0 || !noumes) {
            console.log('loading spinner');
            return <div className='spinner'></div>;
        }
        return (
            <div>
                {mapNoumes}
            </div>
        )
    }

    return (
        <div
            className='flex flex-col gap-5 px-8'
        >
            {renderNoumePreviews()}
        </div>
    )
}

export default NoumesList