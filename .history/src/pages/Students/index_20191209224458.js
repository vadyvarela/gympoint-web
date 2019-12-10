import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Header, Content, StudentTable } from './styles';

export default function Students() {
    const [page, setPage] = useState(1);
    const [studentToSearch, setStudentToSearch] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(
                `students?page=${page}&q=${studentToSearch}`
            );
            setStudents(response.data);
        }

        fetchData();
    }, [page, studentToSearch]);

    function handleStudentSearch(event) {
        setStudentToSearch(event.target.value);
    }

    return (
        <Container>
            <Header>
                <strong>Gerenciar Alunos</strong>
                <aside>
                    <button
                        type="button"
                        // onClick={() => handleEditStudent(null)}
                    >
                        CADASTRAR
                    </button>
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
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.nome}</td>
                                <td>{student.email}</td>
                                <td>{student.idade} Anos</td>
                            </tr>
                        ))}
                    </tbody>
                </StudentTable>
            </Content>
        </Container>
    );
}
