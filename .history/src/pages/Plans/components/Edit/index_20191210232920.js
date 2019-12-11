import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/utils/format';
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

    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    const total = useMemo(() => {
        return formatPrice(duration * price);
    }, [duration, price]);

    const planPrevious = history.location.state.plan;

    function handleSubmit(data) {
        dispatch(updateRequest(planPrevious.id, data));
    }

    return (
        <Container>
            <Form
                schema={schema}
                initialData={planPrevious}
                onSubmit={handleSubmit}
            >
                <Header>
                    <strong>Ediçao do Aluno</strong>
                    <aside>
                        <Link to="/plans">Voltar</Link>
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
                                onChange={event =>
                                    setDuration(event.target.value)
                                }
                                label="DURAÇÃO (em meses)"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="price"
                                type="number"
                                onChange={event => setPrice(event.target.value)}
                                label="PREÇO MENSAL"
                            />
                        </ControlElement>
                        <ControlElement>
                            <Input
                                name="total"
                                type="text"
                                readOnly
                                value={total}
                                label="PREÇO TOTAL"
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
