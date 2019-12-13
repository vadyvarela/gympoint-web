import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, label, placeholder, onChangeDate }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.selected',
            clearValue: pickerRef => {
                pickerRef.clear();
            },
        });
  }, [ref.current]); // eslint-disable-line

    return (
        <>
            <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                name={fieldName}
                selected={selected}
                onChange={date => onChangeDate(date, setSelected(date))}
                ref={ref}
                placeholderText={placeholder}
            />
            {error && <span>{error}</span>}
        </>
    );
}

DatePicker.propTypes = {
    name: PropTypes.element.isRequired,
    label: PropTypes.element.isRequired,
    placeholder: PropTypes.element.isRequired,
    onChangeDate: PropTypes.element.isRequired,
};
