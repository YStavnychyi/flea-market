import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useFetchData} from "../hooks/useFetchData";
import TextField from "./TextField";
import NumberField from "./NumberField";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";

const schema = yup.object().shape({
    title: yup.string().required().max(100),
    price: yup.number().required().min(0),
    description: yup.string().required().max(250),
});

const defaultValues = {
    title: '',
    price: '',
    description: '',
    canNegotiate: '',
    categoryId: '',
    createdOn: '',
    image: ''
}

const EditAdvert = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [advert] = useFetchData(`/adverts/${id}`, {})

    const initialValues = {...defaultValues, ...advert}

    const handleFormikSubmit = async (values) => {
        const response = await axios.put(`/adverts/${id}`, values)
        navigate(`/advert/${response.data.id}`)
    }

    return (
        <div>
            <h1>Edit information</h1>

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
                        {/*{JSON.stringify(values,undefined,2)}*/}
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <NumberField
                                    name='price'
                                    label='Price'
                                    placeholder='Price'
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <TextField
                                    name='title'
                                    label='Title'
                                    placeholder='Title'/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <CheckboxField
                                    name='canNegotiate'
                                    label='To negotiate'
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <SelectField
                                    name='categoryId'
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <TextField
                                    name='description'
                                    label='Description'
                                    as='textarea' rows={3}
                                    placeholder={'Descriptions'}
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

export default EditAdvert;