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
        font-weight: normal;
        font-size: 20px;
    }
    aside {
        a {
            background: #999;
            color: #fff;
            padding: 8px 15px;
            margin-right: 5px;
            border-radius: 4px;
            font-weight: bold;
            &:hover {
                background: ${darken(0.05, '#999')};
            }
        }
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
    div.selectStudent {
        margin-top: 8px;
    }
    div.editRow {
        flex-direction: column;
    }
    div.editColumn {
        display: flex;
        flex-direction: row;

        div.selectElement {
            width: 180px;
            margin-top: 8px;
            input {
                height: 1px;
            }
        }
        label {
            display: block;
            margin: 15px 0 5px 0;
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
