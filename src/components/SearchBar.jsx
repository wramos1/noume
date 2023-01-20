import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const [predictedLocations, setPredictedLocations] = useState([]);

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
        <div className='absolute z-20 bg-green-400 top-0 pl-40 h-screen'>
            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
            <div className='bg-blue-500'>
                {predictedLocations.length ?
                    predictedLocations.map((location) => {
                        return (
                            <div className='bg-black text-white cursor-pointer hover:bg-slate-500' key={location.essId.sourceId} onClick={() => console.log(location.coordinates.lat, location.coordinates.long)}>
                                {location.regionNames.primaryDisplayName}
                            </div>
                        )
                    })
                    : null}
            </div>
        </div>
    )
}

export default SearchBar