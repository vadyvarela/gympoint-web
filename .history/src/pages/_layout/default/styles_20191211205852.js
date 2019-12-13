import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: #ccc;
`;

export const Container = styled.div`
    padding: 30px 120px;
    margin: 25px;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-content: center;
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
        display: flex;
        align-items: center;
        a {
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
        input {
            border-radius: 4px;
            border: 1px solid #ddd;
            padding: 8px 15px;
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
`;
export const StudentTable = styled.table`
    width: 100%;
    padding: 12px 30px 5px 12px;

    thead th {
        text-align: left;
        padding: 12px 2px 5px 2px;
        color: #999;
        font-size: 1.1em;
    }

    tbody td {
        color: #464343;
        padding: 15px 2px 7px 2px;
        border-bottom: 1px solid #eee;
        a {
            color: #4d85ee;
        }
    }
`;

export const ButtonDelete = styled.button`
 border: 0;
    background: none;
}`;
