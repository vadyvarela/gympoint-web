import React, { useState, useEffect, useMemo } from 'react';
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

export default function EnrollmentForm() {
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
    const res = await api.get(`enrollments/${id}`);
    const {data} = res;
    const startDateFormatted = formatDatePicker(data.start_date);

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
      title: `${plan.title} - ${formatCurrencyBR(plan.price)} / ${
        plan.duration
      } (${plan.duration === 1 ? 'Mês' : 'Meses'})`,
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

    const {data} = res.data;
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

    dispath(enrollmentsSaveRequest(data));
  }

  useMemo(() => {
    if (startDate && planSelected) {
      const parseStartDate = new Date(startDate);

      const end = addMonths(parseStartDate, planSelected.duration);

      setEndDateFormatted(
        format(end, 'dd/MM/yyyy', {
          locale: pt,
        })
      );
      const price = planSelected.duration * planSelected.price;
      setPriceFormatted(formatCurrencyBR(price));
    }
  }, [startDate, planSelected]);

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  return (
    <Container>
      <Header>
        <strong>Cadastro de matrícula</strong>
        <aside>
          <Link to="/registrations">Voltar</Link>
          <button form="formEnrollment" type="submit">
            Salvar
          </button>
        </aside>
      </Header>

      <Content>
        <Form
          id="formEnrollment"
          initialData={enrollment}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Label>ALUNO</Label>
          <SelectAsync
            placeholder="Digite o nome do aluno..."
            name="student_id"
            options={students}
            value={studentSelected}
            onChange={e => setStudentSelected(e)}
            asyncFunc={loadStudents}
          />
          <br />
          <Row>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>PLANO</Label>

                <ReactSelect
                  name="plan_id"
                  options={plans}
                  value={planSelected}
                  getOptionLabel={option => option.title}
                  onChange={e => setPlanSelected(e)}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE INÍCIO</Label>
                <Input
                  name="start_date"
                  type="date"
                  onChange={e => setStartDate(parseISO(e.target.value))}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE TÉRMINO</Label>
                <InputInfo value={endDateFormatted} />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>VALOR FINAL</Label>
                <InputInfo value={priceFormatted} />
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}
