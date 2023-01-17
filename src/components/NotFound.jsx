import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1>
                404
            </h1>
            <h2>
                Page Not Found
            </h2>
            <p>Don't worry, we can get you back home to Noume</p>

            <Link to={'/'}>
                Back to Noume.
            </Link>
        </div>
    )
}

export default NotFound