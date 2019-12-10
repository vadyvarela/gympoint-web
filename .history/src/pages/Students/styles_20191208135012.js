import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    padding: 30px 70px;
`;


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
    font-size: 20px;
  }
  aside {
    button {
      background: #de3b3b;
      color: #fff;
      padding: 4px 15px;
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
      padding: 4px 5px;
    }
  }
`;
