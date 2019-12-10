import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header } from './styles';

export default function Students() {
    return (
        <Container>
            <Header>
                <h2>Gerenciar Alunos</h2>
                <aside>
                    <Link to="/"> Cadastrar </Link>
                    <input type="text" />
                </aside>
            </Header>
        </Container>
    );
}
