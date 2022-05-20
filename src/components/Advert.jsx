import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import {ArrowLeft, PersonCircle} from "react-bootstrap-icons";
import {format, parseISO} from "date-fns";
import {cursorPointer} from "../style/cursorPointer"
import {fsSmall} from "../style/fsSmall";
import {fsPrice} from "../style/fsPrice";
import {useModal} from "../hooks/useModal";
import ModalWindow from "./ModalWindow";

const Advert = () => {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [buttonText, setButtonText] = useState('Phone number')
    const {handleShow, handleClose, handleSave, visible} = useModal()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDataOnId = async () => {
            try {
                const response = await axios.get(`/adverts/${id}`)
                const categoryResponse = await axios.get(`/categories/${response.data.categoryId}`)
                setData(response.data)
                setCategories({...response.data, category: categoryResponse.data.title})
            } catch (err) {
                if (err.response.status == 404) {
                    navigate('/error404')
                }
            }

        }
        fetchDataOnId()
    }, [id])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user`)
            setDataUser(response.data)
        }
        fetchUser()
    }, [])

    const handleClickPhone = () => {
        setButtonText(dataUser.phone)
    }

    return (
        <div>
            <div className='d-flex my-5'>
                <span onClick={() => navigate('/')} style={cursorPointer}>
                    <ArrowLeft className='me-1'/>
                    Back
                </span>
                <ol>
                    <li className='d-inline text-secondary'>
                        <p>Category: <span className='text-decoration-underline'>{categories.category}</span></p>
                    </li>
                </ol>
            </div>
            <Row>
                <Col xs={7} className='m-3 p-4 text-center bg-white'>
                    <img src={data.image} style={{width: "80%"}}/>
                </Col>
                <Col className='m-3'>
                    <div className='p-4 mb-3 bg-white'>
                        <Row>
                            <h3 className='mb-4'>User</h3>
                            <Col xs={4}>
                                <PersonCircle size={70}/>
                            </Col>
                            <Col>
                                <h4>{`${dataUser.firstName} ${dataUser.lastName}`}</h4>
                                <Button variant="success" onClick={handleClickPhone}>{buttonText}</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='p-4 text-center'>
                        <Button className='mx-4' variant="primary"
                                onClick={() => navigate(`/advert/${id}/edit`)}>Edit</Button>
                        <Button variant="danger" onClick={handleShow}>Delete</Button>
                        {
                            visible ? <ModalWindow handleShow={handleShow} handleClose={handleClose}
                                                   handleSave={handleSave}/> : null
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='m-3 p-4 bg-white'>
                    <div className='d-flex'>
                        <p style={fsSmall} className='text-secondary'>
                            <span>Dodano </span>
                            {data.createdOn ? (format(parseISO(data.createdOn), 'yyyy-MM-dd')) : undefined}
                            <span> o </span>
                            {data.createdOn ? (format(parseISO(data.createdOn), 'H:mm')) : undefined}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <h1 className='fw-normal'>{data.title}</h1>
                    </div>
                    <div className='d-flex align-items-end'>
                        <h3 className='mt-2' style={fsPrice}>{data.price} zł</h3>
                        <p className='mt-1 mx-2'>{data.canNegotiate ? "To negotiate" : ""}</p>
                    </div>
                    <div>
                        <h1 className='mt-2'>Opis</h1>
                        <div>
                            {data.description}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Advert;