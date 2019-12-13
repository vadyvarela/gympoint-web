import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import api from '~/services/api';

import { formatPrice } from '~/utils/format';
import { deleteRequest } from '~/store/modules/plans/actions';

import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from '../_layout/default/styles';

export default function Plans() {
    const dispatch = useDispatch();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`plans`);

            const data = response.data.map(plan => {
                return {
                    ...plan,
                    priceFormated: formatPrice(plan.price),
                };
            });

            setPlans(data);
        }

        fetchData();
    }, []);

    function handleDeletePlan(id) {
        dispatch(deleteRequest(id));

        const _plans = plans.filter(item => item.id !== id);
        setPlans(_plans);
    }

    return (
        <Container>
            <Header>
                <strong>Gerenciar Planos</strong>
                <aside>
                    <Link to="/plans/create">
                        <MdAdd size={19} color="#fff" />
                        CADASTRAR
                    </Link>
                </aside>
            </Header>
            <Content>
                <StudentTable>
                    <thead>
                        <tr>
                            <th>TITULO</th>
                            <th>DURAÇÃO </th>
                            <th>VALOR p/MES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.id}>
                                <td>{plan.title}</td>
                                <td>
                                    {plan.duration === 1
                                        ? `${plan.duration} Mês`
                                        : `${plan.duration} Mêses`}
                                </td>
                                <td> {plan.priceFormated} </td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: '/plans/edit',
                                            state: {
                                                plan,
                                            },
                                        }}
                                    >
                                        <MdEdit size={22} />
                                    </Link>
                                </td>
                                <td>
                                    <ButtonDelete
                                        onClick={() =>
                                            handleDeletePlan(plan.id)
                                        }
                                    >
                                        <MdDelete size={22} color="#de3b3b" />
                                    </ButtonDelete>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StudentTable>
            </Content>
        </Container>
    );
}
