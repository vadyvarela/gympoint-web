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
    const [plans, setPlans] = useState([]);
    const [priceFormated, setPriceFormated] = useState();
    const [choosedPlan, setChoosedPlan] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const registrationsPrevious = history.location.state.registration;

    useEffect(() => {
        async function loadPlans() {
            const response = await api.get('plans');

            const _plan = response.data.find(
                plan => plan.id === registrationsPrevious.plan_id
            );
            setChoosedPlan(_plan);
            setPlans(response.data);
        }
        setStartDate(registrationsPrevious.start_date);
        setPriceFormated(formatPrice(registrationsPrevious.price));

        loadPlans();
    }, [
        registrationsPrevious.plan_id,
        registrationsPrevious.price,
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
}

EditRegistrations.propTypes = {
    history: PropTypes.element.isRequired,
};
