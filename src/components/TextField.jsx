import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {useField} from "formik";

const TextField = ({type = 'text', name, label, placeholder, as, rows, disabled}) => {

    const [field, meta, helpers] = useField(name);

    return (
        <div>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                disabled={disabled}
                type={type}
                name={name}
                as={as}
                rows={rows}
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
    as: PropTypes.string,
    rows: PropTypes.number,
    disabled: PropTypes.bool
};

export default TextField;