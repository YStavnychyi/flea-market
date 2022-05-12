import React, {useEffect, useState} from 'react';
import {fsParagraph} from "../style/fsParagraph";
import {ListGroup} from "react-bootstrap";
import axios from "axios";

const FavouritesList = () => {

    const [favorite, setFavorite] = useState()
    const [advert, setAdvert] = useState([])

    useEffect(async () => {
        const response = await axios.get(`/adverts`)
        setAdvert(response.data)
    },[])

    useEffect(async () => {
        const response = await axios.get('/favourites')
        console.log(response.data)
        setFavorite(response.data)
    },[])

    return (
        <div>
            <p className="my-3 text-center" style={fsParagraph}>
                My favorites
            </p>
            <ListGroup className='mt-3'>
                {

                }
            </ListGroup>
        </div>
    );
};

export default FavouritesList;