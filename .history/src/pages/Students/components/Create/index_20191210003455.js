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
                                name="name"
                                placeholder="Your name"
                                label="FULL NAME"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                label="E-MAIL"
                            />
                        </ControlElement>
                    </div>
                    <div className="editColumn">
                        <ControlElement>
                            <Input
                                name="age"
                                type="number"
                                placeholder="Age"
                                label="AGE"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="weight"
                                type="number"
                                placeholder="Wight (Kg)"
                                label="WEIGHT"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="height"
                                type="text"
                                placeholder="Height (m)"
                                label="HEIGHT"
                            />
                        </ControlElement>
                    </div>
                </Content>
            </Form>
        </Container>
    );
}
