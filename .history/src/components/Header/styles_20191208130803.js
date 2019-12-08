import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        display: flex;
        align-items: center;
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #333;
        }
        a {
            display: block;
            margin-top: 2px;
            font-size: 12px;
            color: #999;
        }
    }
    img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
`;
