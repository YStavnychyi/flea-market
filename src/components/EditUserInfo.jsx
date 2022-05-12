import React, {useContext, useEffect, useState} from 'react';
import {Formik} from "formik";
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as yup from "yup";
import {UserContext} from "./context/Context";
import TextField from "./TextField";

const schema = yup.object().shape({
    firstName: yup.string().required().max(15),
    lastName: yup.string().required().max(25),
    phone: yup.string().phone("IN").required(),
})

const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
}

const EditUserInfo = () => {

    const [user,fetchData] = useContext(UserContext)

    const handleFormikSubmit = async (values) =>{
        await axios.put(`/user`, values)
        await fetchData()
    }

    const initialValues = {...defaultValues, ...user}

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
                                <TextField name='firstName' label='First Name'/>
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