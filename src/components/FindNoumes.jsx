import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import NoumesList from './NoumesList';
import SearchBar from './SearchBar'

const FindNoumes = () => {
    const [noumes, setNoumes] = useState([]);

    const receiveNoumes = (properties) => {
        console.log(properties)
    }
    return (
        <div className='h-screen'>
            <Navbar bg={'icon-bg'} paddingSize={'py-5'} />
            <div className='pt-20'>
                <SearchBar
                    sentNoumes={receiveNoumes}
                />
            </div>
            {noumes.length > 0 &&
                <NoumesList />
            }
        </div>
    )
}

export default FindNoumes