import React, {useContext} from 'react';
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

    const [user, fetchData] = useContext(UserContext)

    const handleFormikSubmit = async (values) => {
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
                      handleSubmit
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="2">
                                <TextField
                                    name='firstName'
                                    label='First Name'
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <TextField
                                    name='lastName'
                                    label='Last Name'
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="4">
                                <TextField
                                    name='phone'
                                    label='Phone'
                                />
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