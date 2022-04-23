import {Formik} from 'formik'
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import * as yup from 'yup';
import "yup-phone";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {getRandomInteger} from "../utills/getRandomInteger";

const schema = yup.object().shape({
    //seller: yup.string().required().max(15),
    //sellerPhone: yup.string().phone("IN").required(),
    title: yup.string().required().max(100),
    price: yup.number().required().min(0),
    description: yup.string().required().max(250),
});

const AddElement = () => {

    const navigate = useNavigate()
    const [dataUser, setDataUser] = useState([])
    const [categories, setCategories] = useState([])

    const initialValues = {
        /*seller: `${dataUser.firstName} ${dataUser.lastName}`,
        sellerPhone: dataUser.phone,*/
        title: '',
        price: '',
        description: '',
        canNegotiate: false,
        categoryId: ''
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(`/categories`)
            setCategories(response.data)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/user`)
            setDataUser(response.data)
        }
        fetchUser()
    },[])

    const handleFormikSubmit = async (values) => {
        const request = {
            ...values,
            createdOn: new Date(),
            image: `http://placeimg.com/400/400/business?i=${getRandomInteger()}`,
            // categoryId: Number(values.categoryId)
            categoryId: +values.categoryId
            // canNegotiate: !!values.canNegotiate
            // canNegotiate: : Boolean(values.canNegotiate)
        }
        const response = await axios.post(`/adverts`, request)
        navigate(`/advert/${response.data.id}`)
    }

    return (
        <div>
            <h1>
                Add New Element
            </h1>
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
                            <Form.Group as={Col} md="3">
                                <Form.Label>Seller</Form.Label>
                                <Form.Control
                                    disabled
                                    type='text'
                                    name='seller'
                                    placeholder='Seller name'
                                    onChange={handleChange}
                                    value={`${dataUser.firstName} ${dataUser.lastName}`}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    disabled
                                    type='text'
                                    inputMode='tel'
                                    name='sellerPhone'
                                    placeholder='Seller phone'
                                    onChange={handleChange}
                                    value={dataUser.phone}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
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
                            <Form.Group as={Col} md="3">
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

                        <Button type="submit">Submit form</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default AddElement;