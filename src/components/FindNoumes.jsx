import React, { useContext } from 'react'
import { QueriesContext } from '../data/QueriesContext';
import Navbar from './Navbar'
import NoumesList from './NoumesList';
import SearchBar from './SearchBar'

const FindNoumes = () => {
    const { noumes, loading } = useContext(QueriesContext);

    return (
        <div className='min-h-[100vh]'>
            <Navbar classProps={'bg-[#7468AD] text-white p-5'} />
            <div className='pt-24'>
                <SearchBar
                />
            </div>

            {
                loading ?
                    <div className="spinner"></div> :
                    <NoumesList noumes={noumes} />
            }

        </div>
    )
}

export default FindNoumes