import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../_layout/default/styles';

export default function Students() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [studentToSearch, setStudentToSearch] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(
                `students?page=${page}&name=${studentToSearch}`
            );
            setStudents(response.data);
        }

        fetchData();
    }, [page, studentToSearch]);

    console.log(`TEXT ---- ${JSON.stringify(students.mydata)}`);

    function handleDeleteStudent(id) {
        dispatch(deleteRequest(id));

        const _students = students.filter(item => item.id !== id);
        setStudents(_students);
    }

    function handleStudentSearch(event) {
        setStudentToSearch(event.target.value);
    }

    return (
        <Container>
            <Header>
                <strong>Gerenciar Alunos</strong>
                <aside>
                    <Link to="/students/create">
                        <MdAdd size={22} color="#fff" />
                        CADASTRAR
                    </Link>
                    <input
                        type="text"
                        onChange={handleStudentSearch}
                        placeholder="Pesquisar..."
                    />
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
                        {console.log(`DIV VADY -----${studentss}`)}
                        {students.mydata.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
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
