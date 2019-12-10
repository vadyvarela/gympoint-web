import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    padding: 30px 70px;
    margin: 25px;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-content: center;
`;

export const Header = styled.div`

`;

export const Content = styled.div`
    padding: 20px 15px;
    background: #fff;
    border-radius: 4px;
`;

export const StudentTable = styled.table`
    width: 100%;
    padding: 12px 30px 5px 12px;
    thead th {
        text-align: left;
        padding: 12px 2px 5px 2px;
    }
    tbody td {
        padding: 12px 2px 5px 2px;
        border-bottom: 1px solid #eee;
        a {
            color: #4d85ee;
        }
    }
    th#delete-column {
        width: 10px;
    }
`;

export const DeleteButton = styled.button`
    color: #de3b3b;
    background: none;
    border: none;
`;
