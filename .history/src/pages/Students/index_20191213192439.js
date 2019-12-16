import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Container } from '~/components/Grid';
import Title from '~/components/Title';
import { Table, Thead, Th, Tbody, Tr, Td } from '~/components/Table';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import { HeaderPage } from '~/components/HeaderPage/styles';
import { Controls } from '~/components/Controls/styles';

import colors from '~/styles/colors';

import {
  studentsSearchRequest,
  studentsDeleteRequest,
} from '~/store/modules/students/actions';
import ButtonLink from '~/components/ButtonLink';
import Alert from '~/util/alert';
import { Panel } from '~/components/Panel/styles';
import NoResultFound from '~/components/NoResultFound';
import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';
import ButtonLikeLink from '~/components/ButtonLikeLink';

export default function StudentList() {
  const [termSearch, setTermSearch] = useState('');
  const students = useSelector(state => state.student.students);
  const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  console.log(`VADY${  students}`)

  useEffect(() => {
    dispatch(studentsSearchRequest({ name: termSearch, page: 1 }));
  }, []); // eslint-disable-line

  function handleSearchMain(value, page = 1) {
    setTermSearch(value);
    dispatch(studentsSearchRequest({ name: value, page }));
  }

  function handleDelete(id) {
    Alert.delete().then(result => {
      if (result.value) {
        dispatch(studentsDeleteRequest(id));
      }
    });
  }

  function handleLoadPage(page) {
    handleSearchMain(termSearch, page);
  }

  return (
    <Container>
      <HeaderPage>
        <Title>Gerenciando Alunos</Title>
        <Controls>
          <ButtonLink to="/alunos/new">
            <MdAdd size={24} color="#fff" title="Adicionar Novo Aluno" />
            <span>Cadastrar</span>
          </ButtonLink>

          <InputSearch
            handleSearch={handleSearchMain}
            placeholder="Buscar aluno"
          />
        </Controls>
      </HeaderPage>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <Panel>
          {students.total === 0 ? (
            <NoResultFound />
          ) : (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>NOME</Th>
                    <Th>EMAIL</Th>
                    <Th align="center">IDADE</Th>
                    <Th colSpan="2" />
                  </Tr>
                </Thead>
                <Tbody>
                  {students.data.map(student => (
                    <Tr key={String(student.id)}>
                      <Td>{student.name}</Td>
                      <Td>{student.email}</Td>
                      <Td align="center">{student.age}</Td>
                      <Td>
                        <Link
                          style={{ color: colors.edit }}
                          to={`/alunos/${student.id}/edit`}
                        >
                          editar
                        </Link>
                      </Td>
                      <Td>
                        <ButtonLikeLink
                          style={{ color: colors.delete }}
                          onClick={() => handleDelete(student.id)}
                        >
                          apagar
                        </ButtonLikeLink>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <br />
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
            </>
          )}
        </Panel>
      )}
    </Container>
  );
}
