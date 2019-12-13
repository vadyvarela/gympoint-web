import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
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

export default function EnrollmentEdit({ history }) {
    const dispatch = useDispatch();
    const [plans, setPlans] = useState([]);
    const [priceFormated, setPriceFormated] = useState();
    const [choosedRegistration, setchoosedRegistration] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const registrationPrevious = history.location.state.registration;

    useEffect(() => {
        async function loadPlans() {
            const response = await api.get('plans');

            const _plan = response.data.find(
                plan => plan.id === registrationPrevious.plan_id
            );
            setchoosedRegistration(_plan);
            setPlans(response.data);
        }
        setStartDate(registrationPrevious.start_date);
        setPriceFormated(formatPrice(registrationPrevious.price));

        loadPlans();
    }, [
        registrationPrevious.plan_id,
        registrationPrevious.price,
        registrationPrevious.start_date,
    ]);

    const endDate = useMemo(() => {
        if (choosedRegistration !== '' && startDate !== null) {


            return format(endDateFormatted, "dd'/'MM'/'Y", { locale: en });
        }

        if (registrationPrevious && choosedRegistration === '') {
            return format(
                parseISO(registrationPrevious.end_date),
                "dd'/'MM'/'Y",
                {
                    locale: en,
                }
            );
        }

        return '';
    }, [choosedRegistration, registrationPrevious, startDate]);

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
        dispatch(updateRequest(registrationPrevious.id, data));
    }

    return (
        <Container>
            <Form initialData={registrationPrevious} onSubmit={handleSubmit}>
                <Header>
                    <strong>Edit a enrollment</strong>
                    <aside>
                        <Link to="/enrollments">
                            <button type="button">RETURN</button>
                        </Link>
                        <button type="submit">SAVE</button>
                    </aside>
                </Header>
                <Content>
                    <div className="editRow">
                        <ControlElement>
                            <Label>STUDENT</Label>
                            <div className="selectStudent">
                                <ReactAsyncSelect
                                    name="student_id"
                                    options={promiseOptions}
                                    defaultValue={registrationPrevious}
                                />
                            </div>
                        </ControlElement>
                    </div>
                    <div className="editColumn">
                        <ControlElement>
                            <Label>PLAN</Label>
                            <div className="selectElement">
                                <ReactSelect
                                    name="plan_id"
                                    placeholder="Choose a plan"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    onChange={plan =>
                                        setchoosedRegistration(plan)
                                    }
                                    options={plans}
                                    defaultValue={registrationPrevious.plan}
                                />
                            </div>
                        </ControlElement>
                        <ControlElement>
                            <Label>START DATE</Label>
                            <DatePicker
                                name="start_date"
                                placeholder="Start date"
                                onChangeDate={data => setStartDate(data)}
                            />
                        </ControlElement>
                        <ControlElement>
                            <Label>END DATE</Label>
                            <Input name="end_date" value={endDate} readOnly />
                        </ControlElement>
                        <ControlElement>
                            <Label>TOTAL PRICE</Label>
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
