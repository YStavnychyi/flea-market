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

const schema = yup.object().shape({
    title: yup.string().required().max(100),
    price: yup.number().required().min(0),
    description: yup.string().required().max(250),
});

const EditAdvert = () => {

    /*Change initialValues and add useContext*/

    const {id} = useParams()
    const navigate = useNavigate()

    const [categories] = useFetchData(`/categories`,[])

    const [advert] = useFetchData(`/adverts/${id}`, {})

    const initialValues = {
        title: advert.title,
        price: advert.price,
        description: advert.description,
        canNegotiate: advert.canNegotiate,
        categoryId: '',
        createdOn: advert.createdOn,
        image: advert.image
    }

    const handleFormikSubmit = async (values) => {
        const request = {
            ...values
        }
        const response = await axios.put(`/adverts/${id}`, request)
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
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
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
                                <CheckboxField name='canNegotiate' label='To negotiate'/>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Select
                                    name="categoryId"
                                    onChange={handleChange}
                                    value={values.categoryId}
                                >
                                    <option>Select a category</option>
                                    {categories.map((category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.title}
                                            </option>
                                        )
                                    })
                                    }
                                </Form.Select>
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