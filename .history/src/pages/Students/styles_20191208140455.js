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
  }
  th#delete-column {
    width: 10px;
  }
`;

export const EditButton = styled.button`
  color: #4d85ee;
  background: none;
  border: none;
`;

export const DeleteButton = styled.button`
  color: #de3b3b;
  background: none;
  border: none;
`;
