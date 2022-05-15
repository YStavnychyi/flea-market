import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {useField} from "formik";

const NumberField = ({type = 'number',name, label, inputMode = 'decimal', placeholder}) => {

    const [filed, meta] = useField(name)

    return (
        <div>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                inputMode={inputMode}
                placeholder={placeholder}
                name={name}
                value={filed.value}
                onChange={filed.onChange}
                isInvalid={!!meta.error}
            />
            <Form.Control.Feedback type="invalid">
                {meta.error}
            </Form.Control.Feedback>
        </div>
    );
};

NumberField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    inputMode: PropTypes.string,
};

export default NumberField;