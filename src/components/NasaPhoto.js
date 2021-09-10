import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import axios from 'axios';

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto({limit}) {
    const [photoData, setPhotoData] = useState({})

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    
      const randomDate = `${randomNum(2000, 2021)}-${randomNum(1, 12)}-${randomNum(
        1,
        28
      )}`;
      console.log(randomNum(2000, 2021));


      useEffect(() => {
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`
          )
          .then(response => {
            console.log(response.data);
            setPhotoData(response.data);
          });
      }, []);

    if(!photoData) return <div />;

    return (
        <>
        <NavBar />
        <div className="nasa-photo">
            {photoData.media_type === "image" ? (
            <img src={photoData.url}  alt={photoData.title} className="photo"/>
             ) : (
                 <iframe 
                 title="space-video"
                 src={photoData.url}
                 frameBorder="0"
                 gesture="media"
                 allow="encrypted-media"
                 allowFullScreen
                 className="photo"
                 />
             )}
             <div>
                 <h1>{photoData.title}</h1>
                 <p className="date">{photoData.date}</p>
                 <p className="explanation">{photoData.explanation}</p>
             </div>
        </div>
        </>
    )
}


