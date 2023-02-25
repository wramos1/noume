import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Noume = () => {
    const { id } = useParams();
    const [noume, setNoume] = useState(null);

    const findNoume = async () => {
        const result = await fetch('https://hotels4.p.rapidapi.com/properties/v2/detail', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'ae9171a8fbmsh26e3b73616d4dc1p1e51f1jsnd4121cd446e0',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            },
        });

        const data = result.json();




    }
    useEffect(() => {
        console.log(id)
        //Call API with id on render
    }, [])
    return (
        <div>
            {id}
        </div>
    )
}

export default Noume