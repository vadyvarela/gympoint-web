import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export const InputText = styled(Input)`
    background: ${props => (props.disabled ? '#eee' : '#fff')};
`;

export const Label = styled.div`
    text-align: left;
    margin: 10px;
`;

export const ControlElement = styled.div`
    text-align: left;
    margin: 10px;
`;
