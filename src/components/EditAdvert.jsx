import React, {useEffect, useState} from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
    seller: yup.string().required().max(15),
    sellerPhone: yup.string().phone("IN").required(),
    title: yup.string().required().max(100),
    price: yup.number().required().min(0),
    description: yup.string().required().max(250),
});

const EditAdvert = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(`/categories`)
            setCategories(response.data)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/adverts/${id}`)
            setData(response.data)
        }
        fetchData()
    },[])

    const initialValues = {
        seller: data.seller,
        sellerPhone: data.sellerPhone,
        title: data.title,
        price: data.price,
        description: data.description,
        canNegotiate: data.canNegotiate,
        categoryId: '',
        createdOn: data.createdOn,
        image: data.image
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
                                <Form.Label>Seller</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='seller'
                                    placeholder='Seller name'
                                    onChange={handleChange}
                                    value={values.seller}
                                    isInvalid={!!errors.seller}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.seller}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    inputMode='tel'
                                    name='sellerPhone'
                                    placeholder='Seller phone'
                                    onChange={handleChange}
                                    value={values.sellerPhone}
                                    isInvalid={!!errors.sellerPhone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.sellerPhone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    inputMode='decimal'
                                    placeholder="Price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Title</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type='text'
                                        name='title'
                                        placeholder='Title'
                                        onChange={handleChange}
                                        value={values.title}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Check
                                    type="checkbox"
                                    label="To Negotiate"
                                    name="canNegotiate"
                                    checked={values.canNegotiate}
                                    onChange={handleChange}
                                />
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
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    isInvalid={!!errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
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

export default EditAdvert;