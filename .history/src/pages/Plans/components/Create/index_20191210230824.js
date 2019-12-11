import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { registerRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from '../Edit/styles';

const schema = Yup.object().shape({
    title: Yup.string()
        .required('O Campo titulo é obrigatorio')
        .min(3, 'No minimo 3 caracteres'),
    duration: Yup.number().required('Campo Duração é obrigatorio'),
    price: Yup.number().required('Campo preço é obrigatorio'),
});

export default function Create() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(registerRequest(data));
    }

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <Header>
                    <strong>Cadastro do Plano</strong>
                    <aside>
                        <Link to="/students">Voltar</Link>
                        <button type="submit">Salvar</button>
                    </aside>
                </Header>
                <Content>
                    <div className="editRow">
                        <ControlElement>
                            <Input name="title" label="TÍTULO DO PLANO" />
                        </ControlElement>
                    </div>
                    <div className="editColumn">
                        <ControlElement>
                            <Input
                                name="duration"
                                type="number"
                                label="DURAÇÃO (em meses)"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="price"
                                type="number"
                                label="PREÇO MENSAL"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="total"
                                type="text"
                                label="PREÇO TOTAL"
                            />
                        </ControlElement>
                    </div>
                </Content>
            </Form>
        </Container>
    );
}
