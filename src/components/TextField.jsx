import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {useField} from "formik";

const TextField = ({type = 'text', name, label, placeholder}) => {

    const [field, meta, helpers] = useField(name);

    return (
        <div>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={field.onChange}
                value={field.value}
                isInvalid={!!meta.error}
            />
            <Form.Control.Feedback type="invalid">
                {meta.error}
            </Form.Control.Feedback>
        </div>
    );
};

TextField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

export default TextField;