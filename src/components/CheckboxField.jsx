import React from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-bootstrap";
import {useField} from "formik";

const CheckboxField = ({type='checkbox', name, label}) => {

    const [field] = useField(name);

    return (
        <div>
            <Form.Check
                type={type}
                label={label}
                name={name}
                checked={field.checked}
                onChange={field.onChange}
            />
        </div>
    );
};

CheckboxField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
};

export default CheckboxField;