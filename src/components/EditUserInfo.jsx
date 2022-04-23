import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";

const schema = yup.object().shape({
    firstName: yup.string().required().max(15),
    lastName: yup.string().required().max(25),
    phone: yup.string().phone("IN").required(),
})

const EditUserInfo = () => {

    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user`)
            setDataUser(response.data)
        }
        fetchUser()
    },[])

    const initialValues = {
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        phone: dataUser.phone,
    }

    const handleFormikSubmit = async (values) =>{
        const request = {
            ...values
        }
        const response = await axios.put(`/user`, request)
        setDataUser(response.data)
        window.location.reload()
    }

    return (
        <div>
            <h1>Edit personal info</h1>
            <Formik
                validationSchema={schema}
                onSubmit={handleFormikSubmit}
                initialValues={initialValues}
                enableReinitialize
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="2">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='firstName'
                                    placeholder='First name'
                                    onChange={handleChange}
                                    value={values.firstName}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='lastName'
                                    placeholder='Last name'
                                    onChange={handleChange}
                                    value={values.lastName}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    inputMode='tel'
                                    name='phone'
                                    placeholder='Mobile phone'
                                    onChange={handleChange}
                                    value={values.phone}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Save</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditUserInfo;