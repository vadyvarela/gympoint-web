import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { getRequest, deleteRequest } from '~/store/modules/students/actions';

import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from '../_layout/default/styles';

export default function Students() {
    const [termSearch, setTermSearch] = useState('');
    const dispatch = useDispatch();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        dispatch(getRequest({ name: termSearch, page: 1 }));
      }, []); // eslint-disable-line
    function handleDeleteStudent(id) {
        dispatch(deleteRequest(id));

        const _students = students.filter(item => item.id !== id);
        setStudents(_students);
    }

    function handleSearchMain(value, page = 1) {
        setTermSearch(value);
        dispatch(getRequest({ name: value, page }));
    }

    function handleLoadPage(page) {
        handleSearchMain(termSearch, page);
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
                    <input type="text" placeholder="Pesquisar..." />
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
