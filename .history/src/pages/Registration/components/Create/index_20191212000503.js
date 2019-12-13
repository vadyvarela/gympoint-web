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
    title: Yup.string()
        .required('O Campo titulo é obrigatorio')
        .min(3, 'No minimo 3 caracteres'),
    duration: Yup.number().required('Campo Duração é obrigatorio'),
    price: Yup.number().required('Campo preço é obrigatorio'),
});

export default function CreateRegistrations() {
    const dispatch = useDispatch();
    const [plans, setPlans] = useState([]);
    const [choosedPlan, setChoosedPlan] = useState('');
    const [priceFormated, setPriceFormated] = useState('');
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        async function loadlans() {
            const response = await api.get('plans');
            setPlans(response.data);
        }

        loadlans();
    }, []);

    const endDate = useMemo(() => {
        if (choosedPlan !== '' && startDate !== '') {
            const endDateFormatted = addMonths(startDate, choosedPlan.duration);

            setPriceFormated(
                formatPrice(choosedPlan.price * choosedPlan.duration)
            );

            return format(endDateFormatted, "dd'/'MM'/'Y", { locale: pt });
        }

        return '';
    }, [choosedPlan, startDate]);

    const filterStudents = inputValue => {
        async function loadStudents() {
            const response = await api.get(`students?q=${inputValue}`);

            return response.data;
        }

        return loadStudents();
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterStudents(inputValue));
            }, 200);
        });

    function handleSubmit(data) {
        dispatch(registerRequest(data));
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
                                <ReactAsyncSelect
                                    placeholder="Buscar Aluno"
                                    name="student_id"
                                    options={promiseOptions}
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
                                    placeholder="Selecione o plano"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    onChange={plan => setChoosedPlan(plan)}
                                    options={plans}
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
                            <Input name="end_date" value={endDate} readOnly />
                        </ControlElement>
                        <ControlElement>
                            <Label>VALOR FINAL</Label>
                            <Input
                                name="price"
                                type="text"
                                value={priceFormated}
                                readOnly
                            />
                        </ControlElement>
                    </div>
                </Content>
            </Form>
        </Container>
    );
}
