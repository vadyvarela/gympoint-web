import styled from 'styled-components';

export const Paginator = styled.ul`
    display: flex;
    align-items: center;
    justify-content: ${props =>
        props.align === 'center' ? 'center' : 'flex-start'};
`;
export const PagePrev = styled.li`
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: ${props => (props.active ? '#fff' : #f00)};
    background-color: ${props => (props.active ? #f00 : '#fff')};
    border: 1px solid #dee2e6;

    &:hover {
        background-color: ${#f00};
        color: #fff;
    }
`;
export const PageItem = styled.li`
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: ${props => (props.active ? '#fff' : #f00)};
    background-color: ${props => (props.active ? #f00 : '#fff')};
    border: 1px solid #dee2e6;

    &:hover {
        background-color: ${props =>
            props.active ? #f00 : '#e9ecef'};
        border-color: ${props => (props.active ? #f00 : '#dee2e6')};
    }
`;
export const PageNext = styled.li`
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: ${props => (props.active ? '#fff' : #f00)};
    background-color: ${props => (props.active ? #f00 : '#fff')};
    border: 1px solid #dee2e6;

    &:hover {
        background-color: ${#f00};
        color: #fff;
    }
`;
