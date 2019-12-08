import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content, Box } from './styles';

export default function AuthLayout({ children }) {
    return (
        <Wrapper>
            <Content>
                <Box>{children}</Box>
                <small> v.2.01 by vadnir vieira</small>
            </Content>

        </Wrapper>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
