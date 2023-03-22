import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { QueriesContext } from '../data/QueriesContext'
import NoumePreview from './NoumePreview'

const NoumesList = ({ noumes }) => {
    const location = useLocation();
    const { selectedLocation } = useContext(QueriesContext);

    const mapNoumes = () => {
        return noumes.map((noume) => {
            return (
                <NoumePreview
                    key={noume.id}
                    noume={noume}
                />
            )
        })
    }

    {
        return (
            noumes === null ?
                <div className='flex justify-center items-center py-5'>
                    <h1 className='text-2xl'>
                        No Properties Found
                    </h1>
                </div> :
                !noumes.length > 0 ?
                    null
                    :
                    <div className='flex flex-col px-8'>
                        {location === '/find-noumes' ? <p className='pl-2 py-4'>{`Search Results For '${selectedLocation.name}'`}</p> : null}
                        {mapNoumes()}
                    </div>
        )
    }
}

export default NoumesList