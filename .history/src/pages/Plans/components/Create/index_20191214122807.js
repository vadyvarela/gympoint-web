import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { formatPrice } from '~/utils/format';
import { registerRequest } from '~/store/modules/plans/actions';

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

  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const total = useMemo(() => {
    return formatPrice(duration * price);
  }, [duration, price]);

  function handleSubmit(data) {
    dispatch(registerRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Header>
          <strong>Cadastro do Plano</strong>
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
                onChange={event => setDuration(event.target.value)}
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
