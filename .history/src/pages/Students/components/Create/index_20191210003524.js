import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { registerRequest } from '~/store/modules/student/actions';

import { Container, Header, Content, ControlElement } from './styles';

export default function Create() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(registerRequest(data));
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Header>
                    <strong>Cadastro do Aluno</strong>
                    <aside>
                        <Link to="/students">Voltar</Link>
                        <button type="submit">Salvar</button>
                    </aside>
                </Header>
                <Content>
                    <div className="editRow">
                        <ControlElement>
                            <Input
                                name="nome"
                                placeholder="Seu Nome"
                                label="NOME COMPLETO"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="email"
                                type="email"
                                placeholder="exemplo@email.com"
                                label="E-MAIL"
                            />
                        </ControlElement>
                    </div>
                    <div className="editColumn">
                        <ControlElement>
                            <Input
                                name="idade"
                                type="number"
                                placeholder="Idade"
                                label="IDADE"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="peso"
                                type="number"
                                placeholder="Peso (Kg)"
                                label="PESO"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="altura"
                                type="text"
                                placeholder="Altura (m)"
                                label="ALTURA"
                            />
                        </ControlElement>
                    </div>
                </Content>
            </Form>
        </Container>
    );
}
