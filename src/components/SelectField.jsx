import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {useFetchData} from "../hooks/useFetchData";
import {useField} from "formik";

const SelectField = (name) => {

    const [categories] = useFetchData(`/categories`, [])
    const [field] = useField(name)

    return (
        <div>
            <Form.Select
                name="categoryId"
                onChange={field.onChange}
                value={field.value}
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
        </div>
    );
};

SelectField.propTypes = {
    name: PropTypes.string.isRequired
};

export default SelectField;