import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function Dashboard() {
    return (
        <Container>
            <Content>
                <head>
                    <h2>Gerenciar Alunos</h2>
                    <aside>
                        <Link to="/"> Cadastar </Link>
                        <input type="text" />
                    </aside>
                </head>
            </Content>
        </Container>
    );
}
