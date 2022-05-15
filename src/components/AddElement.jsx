import {Formik} from 'formik'
import {Button, Col, Form, Row} from "react-bootstrap";
import * as yup from 'yup';
import "yup-phone";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useContext} from "react";
import {getRandomInteger} from "../utills/getRandomInteger";
import {UserContext} from "./context/Context";
import {useFetchData} from "../hooks/useFetchData";
import TextField from "./TextField";
import NumberField from "./NumberField";
import CheckboxField from "./CheckboxField";

const schema = yup.object().shape({
    seller: yup.string().required().max(15),
    sellerPhone: yup.string().phone("IN").required(),
    title: yup.string().required().max(100),
    price: yup.number().required().min(0),
    description: yup.string().required().max(250),
});

const defaultValues = {
    seller: '',
    sellerPhone: '',
    title: '',
    price: '',
    description: '',
    canNegotiate: false,
    categoryId: ''
}

const AddElement = () => {

    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    const [categories] = useFetchData(`/categories`, [])

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

    const initialValues = {
        ...defaultValues,
        seller: user ? `${user.firstName} ${user.lastName}` : "",
        sellerPhone: user ? user.phone : ""
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
                                <TextField
                                    name='seller'
                                    label='Seller'
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <TextField
                                    name='sellerPhone'
                                    label='Phone'
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
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
                                    placeholder='Title'
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <CheckboxField name='canNegotiate' label='To Negotiate'/>
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

                        <Button type="submit">Submit form</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default AddElement;