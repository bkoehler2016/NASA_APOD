import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="navbar">
            <ul>
                <Link  className="link" to="/">Take Me Home</Link>
                <Link className="link" to="/nasaphoto" onClick={() => window.location.reload()}>Get new Photo</Link>
            </ul>
        </div>
    )
}