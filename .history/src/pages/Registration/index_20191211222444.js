import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import api from '~/services/api';

import { formatPrice } from '~/utils/format';
import { deleteRequest } from '~/store/modules/registrations/actions';

import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from '../_layout/default/styles';

export default function Registrations() {
    const dispatch = useDispatch();
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`registrations`);
            const data = response.data.map(registration => {
                return {
                    ...registration,
                    priceFormated: formatPrice(registration.price),
                };
            });

            setRegistrations(data);
        }

        fetchData();
    }, []);

    function handleDeleteRegistrations(id) {
        dispatch(deleteRequest(id));

        const _registrations = registrations.filter(item => item.id !== id);
        setRegistrations(_registrations);
    }

    return (
        <Container>
            <Header>
                <strong>Gerenciando Matrículas </strong>
                <aside>
                    <Link to="/registrations/create">
                        <MdAdd size={19} color="#fff" />
                        CADASTRAR
                    </Link>
                </aside>
            </Header>
            <Content>
                <StudentTable>
                    <thead>
                        <tr>
                            <th>ALUNO</th>
                            <th>PLANO </th>
                            <th>INÌCIO</th>
                            <th>TÉRMINO</th>
                            <th>ATIVA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map(registration => (
                            <tr key={registration.id}>
                                <td>{registration.students.nome}</td>
                                <td>{registration.plans.title}</td>
                                <td> </td>
                                <td />
                                <td>
                                    <Link
                                        to={{
                                            pathname: '/registrations/edit',
                                            state: {
                                                registration,
                                            },
                                        }}
                                    >
                                        <MdEdit size={22} />
                                    </Link>
                                </td>
                                <td>
                                    <ButtonDelete
                                        onClick={() =>
                                            handleDeleteRegistrations(
                                                registration.id
                                            )
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
