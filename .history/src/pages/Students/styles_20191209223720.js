import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    flex: 1;
    padding: 30px 70px;
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
        button {
            border: 0;
            background: #de3b3b;
            color: #fff;
            padding: 6px 15px;
            margin-right: 5px;
            border-radius: 4px;
            font-weight: bold;
            &:hover {
                background: ${darken(0.05, '#de3b3b')};
            }
        }
        input {
            border-radius: 4px;
            border: 1px solid #ddd;
            padding: 5px 5px;
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
`;
export const StudentTable = styled.div`
    width: 100%;
    padding: 12px 30px 5px 12px;
    thead th {
        text-align: left;
        padding: 12px 2px 5px 2px;
    }
`;
