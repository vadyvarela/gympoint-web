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
    padding: 50px;
    border-radius: 10px;
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
        }

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #ccc;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.1);
            }
        }

        span {
            color: #de3048;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
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
