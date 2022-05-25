import React, {useEffect, useState} from 'react';
import {fsParagraph} from "../style/fsParagraph";
import {ListGroup, Table} from "react-bootstrap";
import axios from "axios";
import {useFetchData} from "../hooks/useFetchData";
import {styleWidth} from "../style/styleWidth";
import {LinkContainer} from "react-router-bootstrap";
import {fsSmall} from "../style/fsSmall";
import {format, parseISO} from "date-fns";

const FavouritesList = () => {

    const [favorite, setFavorite] = useState([])
    const [adverts] = useFetchData(`/adverts`, [])

    useEffect(async () => {
        const response = await axios.get('/favourites')
        setFavorite(response.data)
    },[])

    /*empty state, loading state, error state, fulfilled state*/

    return (
        <div>
            <p className="my-3 text-center" style={fsParagraph}>
                My favorites
            </p>
            <ListGroup className='mt-3'>
                {
                    adverts
                        .filter((item) => favorite.includes(item.id))
                        .map((advert) => (
                            <ListGroup.Item action className='mb-2' key={advert.id}>
                                <Table size=''>
                                    <tbody>
                                    <tr>
                                        <td rowSpan={2} className="border-0" style={styleWidth}>
                                            <img src={advert.image} style={styleWidth}/>
                                        </td>
                                        <LinkContainer to={`/advert/${advert.id}`}>
                                            <td valign='top' className="border-0">
                                                {advert.title}
                                            </td>
                                        </LinkContainer>
                                        <td className="border-0 text-end">
                                            {advert.price} zł.
                                            <p className='text-secondary'
                                               style={fsSmall}>{advert.canNegotiate ? "To negotiate" : ""}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign='bottom' className="border-0">
                                            {format(parseISO(advert.createdOn), 'yyyy-MM-dd')}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </ListGroup.Item>
                        ))
                }
            </ListGroup>
        </div>
    );
};

export default FavouritesList;