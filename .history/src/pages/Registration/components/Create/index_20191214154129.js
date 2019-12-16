import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/en-US';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Select from '../ReactSelect';
import SelectAsync from '../ReactAsyncSelect';
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
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentSelected, setStudentSelected] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [planSelected, setPlanSelected] = useState(null);
  // const [endDateFormatted, setEndDateFormatted] = useState('');
  const [priceFormatted, setPriceFormatted] = useState('');

  async function loadPlans() {
    const res = await api.get('plans');
    const data = res.data.mydata.map(plan => ({
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

    const { mydata } = res.data;
    setStudents(mydata);

    return new Promise(resolve => {
      resolve(mydata);
    });
  }

  const endDate = useMemo(() => {
    if (planSelected !== '' && startDate !== '') {
      const endDateFormatted = addMonths(startDate, planSelected.duration);

      setPriceFormatted(
        priceFormatted(planSelected.price * planSelected.duration)
      );

      return format(endDateFormatted, "dd'/'MM'/'Y", { locale: pt });
    }

    return '';
  }, [planSelected, priceFormatted, startDate]);

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  function handleSubmit(data) {
    dispath(registerRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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
                <SelectAsync
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
                <Select
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
              <Input name="dateEnd" value={endDate} readOnly />
            </ControlElement>
            <ControlElement>
              <Label>VALOR FINAL</Label>
              <Input
                name="TotalPrice"
                type="text"
                value={priceFormatted}
                readOnly
              />
            </ControlElement>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
