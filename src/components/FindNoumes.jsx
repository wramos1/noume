import React, { useContext } from 'react'
import { QueriesContext } from '../data/QueriesContext';
import Navbar from './Navbar'
import NoumesList from './NoumesList';
import SearchBar from './SearchBar'

const FindNoumes = () => {
    const { noumes } = useContext(QueriesContext);

    return (
        <div className='h-screen'>
            <Navbar bg={'icon-bg'} paddingSize={'py-5 px-4'} />
            <div className='pt-20'>
                <SearchBar
                />
            </div>
            {noumes.length > 0 &&
                <NoumesList noumes={noumes} />
            }
        </div>
    )
}

export default FindNoumes