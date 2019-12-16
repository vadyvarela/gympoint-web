import React, { useState, useEffect, useMemo, useParams } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/en-US';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import ReactSelect from '../ReactSelect';
import ReactAsyncSelect from '../ReactAsyncSelect';
import DatePicker from '../DatePicker';

import api from '~/services/api';
import { formatPrice } from '~/utils/format';

import { registerRequest } from '~/store/modules/registrations/actions';

import { ControlElement, Label, Container, Header, Content } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('O Campo Aluno é obrigatorio'),
  plan_id: Yup.string().required('Campo Plano é obrigatorio'),
  start_date: Yup.string().required('Campo Data inicio é obrigatorio'),
});

export default function CreateRegistrations() {
  const dispath = useDispatch();
  const { id } = useParams();

  const [enrollment, setEnrollment] = useState(null);
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentSelected, setStudentSelected] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [planSelected, setPlanSelected] = useState(null);
  const [endDateFormatted, setEndDateFormatted] = useState('');
  const [priceFormatted, setPriceFormatted] = useState('');

  async function loadEnrollment(id) {
    const res = await api.get(`registrations/${id}`);
    const { data } = res;
    const startDateFormatted = data.start_date;

    setEnrollment({
      ...data,
      start_date: startDateFormatted,
    });

    setStartDate(startDateFormatted);
    setStudentSelected(data.student);
    setPlanSelected(data.plan);
  }

  async function loadPlans() {
    const res = await api.get('plans');
    const data = res.data.data.map(plan => ({
      ...plan,
      title: `${plan.title} - ${formatPrice(plan.price)} / ${plan.duration} (${
        plan.duration === 1 ? 'Mês' : 'Meses'
      })`,
    }));
    setPlans(data);
  }

  async function loadStudents(value) {
    const res = await api.get('students', {
      params: {
        name: value,
        page: 1,
        perPage: 10,
      },
    });

    const { data } = res.data;
    setStudents(data);

    return new Promise(resolve => {
      resolve(data);
    });
  }

  useEffect(() => {
    if (id) {
      loadEnrollment(id);
    }
  }, [id]);

  function handleSubmit(values) {
    const data = {
      ...values,
      id,
    };

    dispath(registerRequest(data));
  }



  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  return (
    <Container>
      <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
        <Header>
          <strong>Cadastro de matrícula</strong>
          <aside>
            <Link to="/registrations">Voltar</Link>
            <button type="submit">Salvar</button>
          </aside>
        </Header>
        <Content>
          <div className="editRow">
            <ControlElement>
              <Label>ALUNO</Label>
              <div className="selectStudent">
                <ReactAsyncSelect
                  placeholder="Digite o nome do aluno..."
                  name="student_id"
                  options={students}
                  value={studentSelected}
                  onChange={e => setStudentSelected(e)}
                  asyncFunc={loadStudents}
                />
              </div>
            </ControlElement>
          </div>
          <div className="editColumn">
            <ControlElement>
              <Label>PLANO</Label>
              <div className="selectElement">
                <ReactSelect
                  name="plan_id"
                  options={plans}
                  value={planSelected}
                  getOptionLabel={option => option.title}
                  onChange={e => setPlanSelected(e)}
                />
              </div>
            </ControlElement>
            <ControlElement>
              <Label>DATA INICIO</Label>
              <DatePicker
                name="start_date"
                placeholder="Escolha a data"
                onChangeDate={data => setStartDate(data)}
              />
            </ControlElement>
            <ControlElement>
              <Label>DATA DE TERMINO</Label>
              <Input name="end_date" value={endDateFormatted} readOnly />
            </ControlElement>
            <ControlElement>
              <Label>VALOR FINAL</Label>
              <Input name="price" type="text" value={priceFormatted} readOnly />
            </ControlElement>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
