import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from './styles';

const schema = Yup.object().shape({
    nome: Yup.string()
        .required('O Campo nome é obrigatorio')
        .min(6, 'No minimo 8 caracteres'),
    email: Yup.string()
        .email('Insira um email valido')
        .required('O email é obrigatorio'),

    idade: Yup.number()
        .positive('Apenas numeros positivos')
        .integer('Apenas numeros inteiros')
        .required('O senha é obrigatorio'),
    peso: Yup.number().required('Campo peso é obrigatorio'),
    altura: Yup.string().required('Campo Altura é obrigatorio'),
});

export default function Edit({ history }) {
    const dispatch = useDispatch();

    const studentPrevious = history.location.state.student;

    function handleSubmit(data) {
        dispatch(updateRequest(studentPrevious.id, data));
    }

    return (
        <Container>
            <Form schema={schema} initialData={studentPrevious} onSubmit={handleSubmit}>
                <Header>
                    <strong>Ediçao do Aluno</strong>
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
