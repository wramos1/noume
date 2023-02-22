import React, { useContext } from 'react'
import { QueriesContext } from '../data/QueriesContext';
import Navbar from './Navbar'
import NoumesList from './NoumesList';
import SearchBar from './SearchBar'

const FindNoumes = () => {
    const { noumes } = useContext(QueriesContext);
    const { selectedLocation } = useContext(QueriesContext)

    return (
        <div>
            <Navbar classProps={'bg-slate-800/80 text-white p-5'} />
            <div className='pt-20'>
                <SearchBar
                />
            </div>

            {noumes.length > 0 &&
                <div>
                    <p>{`Search Results For ${selectedLocation.name}'`}</p>
                    <NoumesList noumes={noumes} />
                </div>
            }

        </div>
    )
}

export default FindNoumes