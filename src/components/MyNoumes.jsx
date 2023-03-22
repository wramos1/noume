import React, { useContext } from 'react'
import { QueriesContext } from '../data/QueriesContext'
import Navbar from './Navbar'
import NoumesList from './NoumesList';

const MyNoumes = () => {
    const { savedNoumes } = useContext(QueriesContext);

    return (
        <div className='min-h-[100vh]'>
            <Navbar classProps={'bg-[#7468AD] text-white p-5'} />
            <div className='pt-24'>
                {savedNoumes.length > 0 ?
                    <>
                        <h1 className='text-center text-2xl'>My Noumes</h1>
                        <NoumesList
                            noumes={savedNoumes}
                        />
                    </>
                    : <h1 className='text-center text-2xl'>No Saved Noumes</h1>
                }
            </div>
        </div>
    )
}

export default MyNoumes