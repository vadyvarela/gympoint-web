import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { getRequest, deleteRequest } from '~/store/modules/students/actions';
import Alert from '~/utils/alert';
import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from '../_layout/default/styles';

import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';

export default function Students() {
    const [termSearch, setTermSearch] = useState('');
    const students = useSelector(state => state.students.students);

    // const loading = useSelector(state => state.student.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRequest({ name: termSearch, page: 1 }));
    }, [dispatch, termSearch]);

    function handleSearchMain(value, page = 1) {
        setTermSearch(value);
        dispatch(getRequest({ name: value, page }));
    }

    function handleDelete(id) {
        Alert.delete().then(result => {
            if (result.value) {
                dispatch(deleteRequest(id));
            }
        });
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
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <MdDelete size={22} color="#de3b3b" />
                                    </ButtonDelete>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StudentTable>

                <PaginationInfo
                    page={students.page}
                    perPage={students.perPage}
                    totalPage={students.totalPage}
                    total={students.total}
                />
                <br />
                {students.totalPage > 1 && (
                    <Pagination
                        page={students.page}
                        totalPage={students.totalPage}
                        align="center"
                        onLoadPage={handleLoadPage}
                    />
                )}
            </Content>
        </Container>
    );
}
