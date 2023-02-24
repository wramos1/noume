import React, { useContext } from 'react'
import { QueriesContext } from '../data/QueriesContext'
import NoumePreview from './NoumePreview'

const NoumesList = ({ noumes }) => {
    const { selectedLocation, loading } = useContext(QueriesContext);

    const mapNoumes = noumes.map((noume) => {
        return (
            <NoumePreview
                key={noume.id}
                noume={noume}
            />
        )
    })

    {
        return (
            !noumes.length > 0 ?
                null
                :
                <div className='flex flex-col px-8'>
                    <p className='pl-2 py-4'>{`Search Results For '${selectedLocation.name}'`}</p>
                    {mapNoumes}
                </div>
        )
    }
}

export default NoumesList