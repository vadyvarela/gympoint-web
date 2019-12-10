import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header } from './styles';

export default function Students() {
    return (
        <Container>
            <Header>
                <strong>Gerenciar Alunos</strong>
                <aside>
                    <button
                        type="button"
                        onClick={() => handleEditStudent(null)}
                    >
                        CADASTRAR
                    </button>
                    <input type="text" placeholder="Pesquisar..." />
                </aside>
            </Header>
        </Container>
    );
}
