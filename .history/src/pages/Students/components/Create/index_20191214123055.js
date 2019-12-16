import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { registerRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from '../Edit/styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O Campo name é obrigatorio')
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

export default function Create() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(registerRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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
              <Input name="name" placeholder="Seu name" label="NOME COMPLETO" />
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
