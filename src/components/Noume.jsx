import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Noume = () => {
    const { id } = useParams();
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