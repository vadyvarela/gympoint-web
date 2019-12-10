import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Header } from './styles';

export default function Students() {
    const [page, setPage] = useState(1);
    const [studentToSearch, setStudentToSearch] = useState('');
    const [students, getStudents] = useState([]);

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
        </Container>
    );
}
