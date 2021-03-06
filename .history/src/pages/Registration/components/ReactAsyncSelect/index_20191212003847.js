import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({
    name,
    label,
    options,
    multiple,
    ...rest
}) {
    const ref = useRef(null);
    const { fieldName, registerField, error } = useField(name);

    function parseSelectValue(selectRef) {
        const selectValue = selectRef.select.state.value;

        if (!multiple) {
            return selectValue ? selectValue.id : '';
        }

        return selectValue ? selectValue.map(option => option.id) : [];
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'state.value',
            parseValue: parseSelectValue,
            clearValue: selectRef => {
                selectRef.select.clearValue();
            },
        });
  }, [ref.current, fieldName]); // eslint-disable-line

    return (
        <>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <AsyncSelect
                name={fieldName}
                cacheOptions
                aria-label={fieldName}
                loadOptions={options}
                isMulti={multiple}
                ref={ref}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />

            {error && <span>{error}</span>}
        </>
    );
}

// ReactSelect.propTypes = {
//     name: PropTypes.element.isRequired,
//     label: PropTypes.element.isRequired,
//     options: PropTypes.element.isRequired,
//     multiple: PropTypes.element.isRequired,
// };
