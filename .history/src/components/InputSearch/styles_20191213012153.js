import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Search = styled.input`
    background: rgba(255, 255, 255, 1);
    border: 1px solid #666;
    border-radius: 4px;
    height: 44px;
    padding: 0px 15px 0px 30px !important;
    color: #666;
    margin: 0 0 10px;

    &::placeholder {
        color: #666;
    }
`;
