import React, { useState, useParams, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdDone } from 'react-icons/md';
import api from '~/services/api';

import { registerRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from '../Edit/styles';

export default function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  // const dispath = useDispatch();

  function handleSubmit(data) {
    // dispath(registerRequest({ ...data, id }));
  }

  return (
    <Container>
      <Header>
        <strong>{id > 0 ? 'Edição de aluno' : 'Cadastro de aluno'}</strong>
        <aside>
          <Link to="/students">Voltar</Link>
          <button form="formStudent" type="submit">
            {' '}
            <MdDone size={24} color="#fff" /> Salvar
          </button>
        </aside>
      </Header>

      <Form id="formStudent" initialData={student} onSubmit={handleSubmit}>
        <div className="editRow">
          <ControlElement>
            <Input name="nome" placeholder="Seu Nome" label="NOME COMPLETO" />
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
      </Form>
    </Container>
  );
}
