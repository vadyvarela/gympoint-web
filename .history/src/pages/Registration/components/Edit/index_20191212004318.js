import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/en-US';
import { Form, Input } from '@rocketseat/unform';

import ReactSelect from '../ReactSelect';
import ReactAsyncSelect from '../ReactAsyncSelect';
import DatePicker from '../DatePicker';

import api from '~/services/api';
import { formatPrice } from '~/utils/format';

import { updateRequest } from '~/store/modules/registrations/actions';

import {
    Container,
    Header,
    Content,
    Label,
    ControlElement,
} from '../Create/styles';

export default function EditRegistrations({ history }) {
    const dispatch = useDispatch();
    const [registrations, setRegistrations] = useState([]);
    const [priceFormated, setPriceFormated] = useState();
    const [choosedPlan, setChoosedPlan] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const registrationsPrevious = history.location.state.registration;

    useEffect(() => {
        async function loadRegistrations() {
            const response = await api.get('plans');

            const _registration = response.data.find(
                registration =>
                    registration.id === registrationsPrevious.registration_id
            );
            setChoosedRegistrations(_registration);
            setRegistrations(response.data);
        }
        setStartDate(registrationsPrevious.start_date);
        setPriceFormated(formatPrice(registrationsPrevious.price));

        loadRegistrations();
    }, [
        registrationsPrevious.price,
        registrationsPrevious.registration_id,
        registrationsPrevious.start_date,
    ]);

    const endDate = useMemo(() => {
        if (registrationsPrevious && choosedPlan === '') {
            return format(
                parseISO(registrationsPrevious.end_date),
                "dd'/'MM'/'Y",
                {
                    locale: pt,
                }
            );
        }

        return '';
    }, [choosedPlan, registrationsPrevious]);

    const filterStudents = inputValue => {
        async function loadStudents() {
            const response = await api.get(
                `students?student_name=${inputValue}`
            );

            return response.data;
        }

        return loadStudents();
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterStudents(inputValue));
            }, 1000);
        });

    function handleSubmit(data) {
        dispatch(updateRequest(registrationsPrevious.id, data));
    }

    return (
        <Container>
            <Form initialData={registrationsPrevious} onSubmit={handleSubmit}>
                <Header>
                    <strong>Edição de Matricula</strong>
                    <aside>
                        <Link to="/registrations">Voltar </Link>
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
                                    defaultValue={registrationsPrevious}
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
                                    defaultValue={registrationsPrevious.plan}
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

EditRegistrations.propTypes = {
    history: PropTypes.element.isRequired,
};
