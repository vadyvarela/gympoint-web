import React, { useState, useParams, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';

import { registerRequest } from '~/store/modules/students/actions';

import { Container, Header, Content, ControlElement } from '../Edit/styles';

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

export default function StudentForm() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const dispath = useDispatch();

  function handleSubmit(data) {
    dispath(studentsSaveRequest({ ...data, id }));
  }

  useEffect(() => {
    if (id) {
      async function loadStudent() {
        const res = await api.get(`students/${id}`);
        setStudent(res.data);
      }

      loadStudent();
    }
  }, [id]);

  return (
    <Container>
      <Header>
        <strong>{id > 0 ? 'Edição de aluno' : 'Cadastro de aluno'}</strong>
        <aside>
          <Link to="/students">Voltar</Link>
          <button form="formStudent" type="submit">
            Salvar
          </button>
        </aside>
        <Controls>
          <ButtonLink to="/alunos" color={colors.second}>
            <MdArrowBack size={24} color="#fff" />
            <span>Voltar</span>
          </ButtonLink>
          <Button
            type="submit"
            label="Salvar"
            icon={<MdDone size={24} color="#fff" />}
            form="formStudent"
           />
        </Controls>
      </Header>

      <Panel>
        <Form
          id="formStudent"
          initialData={student}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Input name="id" type="hidden" />
          <Label>NOME COMPLETO</Label>
          <Input name="name" placeholder="Digite seu nome completo" />

          <Label>E-MAIL</Label>
          <Input
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-Mail"
          />
          <Row>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>IDADE</Label>
                <Input type="number" name="age" placeholder="Sua Idade" />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>PESO (em kg)</Label>
                <Input
                  step="0.01"
                  type="number"
                  name="weight"
                  placeholder="Seu Peso"
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>ALTURA</Label>
                <Input
                  step="0.01"
                  type="number"
                  name="feet_tall"
                  placeholder="Sua Altura"
                />
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </Panel>
    </Container>
  );
}
