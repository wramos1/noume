import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [predictedLocations, setPredictedLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({ index: null, name: '', coordinates: { lat: null, long: null } });

    const fetchLocations = async () => {
        const results = await fetch(`https://hotels4.p.rapidapi.com/locations/v3/search?q=${term}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            },
        })
            .then((res) => res.json())
            .then((data) => setPredictedLocations(data.sr))
            .catch((err) => console.error(err))
    };

    const setLocation = ({ e, name, coordinates, index }) => {
        document.querySelector('.locations').classList.toggle('hidden');
        setTerm(name);
        setSelectedLocation({ name, index, coordinates });
        console.log({ name, index, coordinates });
    }

    const toggleLocations = () => {
        document.querySelector('.locations').classList.toggle('hidden');
    }

    useEffect(() => {
        if (term && !predictedLocations.length) {
            fetchLocations();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    fetchLocations();
                }
            }, 1000)

            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [term])

    return (
        <div className='h-screen'>
            <Navbar bg={'icon-bg'} paddingSize={'py-5'} />
            <div className='py-20 bg-slate-600'>
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} onFocus={toggleLocations} className="bg-slate-800 primary-txt-color" />
                <div className='locations bg-blue-500 hidden'>
                    {predictedLocations.length ?
                        predictedLocations.map((location) => {
                            return (
                                <div className='bg-black text-white cursor-pointer hover:bg-slate-500' key={location.essId.sourceId} onClick={(e) => setLocation({ name: location.regionNames.primaryDisplayName, index: location.index, coordinates: { lat: location.coordinates.lat, long: location.coordinates.long } })}>
                                    {location.regionNames.primaryDisplayName}
                                </div>
                            )
                        })
                        : null}
                </div>
            </div>

        </div>
    )
}

export default SearchBar