import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
    return <Content>{children}</Content>;
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
