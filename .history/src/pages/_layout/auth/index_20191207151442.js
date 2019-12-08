import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content, Box } from './styles';

export default function AuthLayout({ children }) {
    return (
        <Wrapper>
            <Content>
                <Box>{children}</Box>
                <small> with by Vadnir Vieira</small>
            </Content>
        </Wrapper>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
