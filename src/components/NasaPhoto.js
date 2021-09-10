import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const apiKey = process.env.REACT_APP_NASA_KEY;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function NasaPhoto() {
  const classes = useStyles()
    const [photoData, setPhotoData] = useState({})


      const [like, setLike] = useState(0)

      useEffect(() => {
        setLike(JSON.parse(window.localStorage.getItem('like')));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('like', like);
      }, [like]);

      
      const increaseLike = () => {
        return setLike(like + 1);
      }
      const decreaseLike = () => {
        return setLike(like - 1)
      }
      

      useEffect(() => {
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
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

                 <Button variant="contained" color="primary" className={classes.button} startIcon={<FavoriteIcon />} 
                 onClick={increaseLike}>Like {like}</Button>
                 
                 <Button variant="contained" color="secondary" className={classes.button} onClick={decreaseLike}>Unlike</Button>
             </div>
             
        </div>
        </>
    )
}


