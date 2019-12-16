import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useParams } from 'react-router-dom';
import { MdArrowBack, MdDone } from 'react-icons/md';

import Select from '../ReactSelect';
import SelectAsync from '../ReactAsyncSelect';

import api from '~/services/api';

import { formatPrice } from '~/utils/format';
import { getRequest } from '~/store/modules/registrations/actions';

const schema = Yup.object().shape({
  student_id: Yup.number().required('O Aluno é obrigatório'),
  plan_id: Yup.number().required('O Plano é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
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

    dispath(getRequest(data));
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
      setPriceFormatted(formatPrice(price));
    }
  }, [startDate, planSelected]);

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  return (
    <>
          <SelectAsync
            placeholder="Digite o nome do aluno..."
            name="student_id"
            options={students}
            value={studentSelected}
            onChange={e => setStudentSelected(e)}
            asyncFunc={loadStudents}
          />

          <Select
            name="plan_id"
            options={plans}
            value={planSelected}
            getOptionLabel={option => option.title}
            onChange={e => setPlanSelected(e)}
          />
<>
)
  ;
}
