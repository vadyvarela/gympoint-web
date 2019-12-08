import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: #ee4d64;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Box = styled.div`
    background: #fff;
    padding: 40px;
    border-radius: 5px;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 415px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        label {
            color: #666;
            text-align: left;
            margin: 0 0 20px;
        }

        input {
            margin-top: 10px;
            display: block;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #666;


            &::placeholder {
                color: #666;
            }
        }

        span {
            color: #ee4d64;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #ee4d64;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#ee4d64')};
            }
        }
    }
`;
