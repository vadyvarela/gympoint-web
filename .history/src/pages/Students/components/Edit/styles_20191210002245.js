import styled from 'styled-components';
import { darken } from 'polished';
import { Input } from '@rocketseat/unform';

export const Container = styled.div`
    padding: 30px 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
        font-size: 20px;
    }
    /*  */
    aside {
        button {
            border: none;
            background: #de3b3b;
            color: #fff;
            padding: 8px 15px;
            margin-right: 5px;
            border-radius: 4px;
            font-weight: bold;
            &:hover {
                background: ${darken(0.05, '#de3b3b')};
            }
        }
    }
`;

export const Content = styled.div`
    padding: 20px;
    background: #fff;
    label {
        font-weight: bold;
    }
    input {
        margin-top: 8px !important;
        padding: 0 15px;
        margin: 0 0 10px;
        height: 37px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: #fff;
        &::placeholder {
            color: #999;
        }
    }
    div.editRow {
        display: flex;
        flex-direction: column;
        label {
            display: block;
        }
    }
    div.editColumn {
        display: flex;
        flex-direction: row;
        label {
            display: block;
        }
        div.selectElement {
            width: 180px;
            margin-top: 8px;
            input {
                height: 1px;
            }
        }
        input:read-only {
            background-color: #f5f5f5;
        }
    }
`;

export const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InputText = styled(Input)`
    background: ${props => (props.disabled ? '#eee' : '#fff')};
`;

export const ControlElement = styled.div`
    text-align: left;
    margin: 10px;
`;
