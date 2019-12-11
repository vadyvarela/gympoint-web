import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import api from '~/services/api';

import { deleteRequest } from '~/store/modules/students/actions';

import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from './styles';

export default function Students() {
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`plans`);
            setStudents(response.data);
        }

        fetchData();
    }, []);

    function handleDeleteStudent(id) {
        dispatch(deleteRequest(id));

        const _students = students.filter(item => item.id !== id);
        setStudents(_students);
    }

return (
        <Container>
            <Header>
                <strong>Gerenciar Alunos</strong>
                <aside>
                    <Link to="/students/create">
                        <MdAdd size={16} color="#fff" />
                        CADASTRAR
                    </Link>
                </aside>
            </Header>
            <Content>
                <StudentTable>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>IDADE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.nome}</td>
                                <td>{student.email}</td>
                                <td>{student.idade} Anos</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: '/students/edit',
                                            state: {
                                                student,
                                            },
                                        }}
                                    >
                                        <MdEdit size={22} />
                                    </Link>
                                </td>
                                <td>
                                    <ButtonDelete
                                        onClick={() =>
                                            handleDeleteStudent(student.id)
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
