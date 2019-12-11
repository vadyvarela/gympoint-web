import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from './styles';

const schema = Yup.object().shape({
    title: Yup.string()
        .required('O Campo titulo é obrigatorio')
        .min(3, 'No minimo 3 caracteres'),
    duration: Yup.number().required('Campo Duração é obrigatorio'),
    price: Yup.number().required('Campo preço é obrigatorio'),
});

export default function Edit({ history }) {
    const dispatch = useDispatch();

    const studentPrevious = history.location.state.student;

    function handleSubmit(data) {
        dispatch(updateRequest(studentPrevious.id, data));
    }

    return (
        <Container>
            <Form
                schema={schema}
                initialData={studentPrevious}
                onSubmit={handleSubmit}
            >
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

Edit.propTypes = {
    history: PropTypes.element.isRequired,
};
