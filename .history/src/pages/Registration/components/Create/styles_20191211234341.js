import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export const InputText = styled(Input)`
    background: ${props => (props.disabled ? '#eee' : '#fff')};
`;

export const Label = styled.div`
    font-size: 1.1em;
`;

export const ControlElement = styled.div`
    text-align: left;
    margin: 10px;
`;
