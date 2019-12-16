import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdThumbDown,
  MdThumbUp,
} from 'react-icons/md';
import Alert from '~/utils/alert';

import {
  getRequest,
  deleteRequest,
} from '~/store/modules/registrations/actions';

import {
  Container,
  Header,
  Content,
  StudentTable,
  ButtonDelete,
} from '../_layout/default/styles';

export default function Registrations() {
  const registrations = useSelector(state => state.registration.registrations);
  // const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequest({ page: 1 }));
  }, [dispatch]);

  function handleSearchMain(page = 1) {
    dispatch(getRequest({ page }));
  }

  function handleDelete(id) {
    Alert.delete().then(result => {
      if (result.value) {
        dispatch(deleteRequest(id));
      }
    });
  }

  function handleLoadPage(page) {
    handleSearchMain(page);
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
                <td>
                  {registration.students ? registration.students.name : ''}
                </td>
                <td>{registration.plans.title}</td>
                <td> {registration.startDateFormatted} </td>
                <td> {registration.endDateFormatted} </td>
                <td>
                  {' '}
                  {registration.active === false ? (
                    <MdThumbDown size={19} color="#de3b3b" />
                  ) : (
                    <MdThumbUp size={19} color="#27a943" />
                  )}
                </td>
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
                  <ButtonDelete onClick={() => handleDelete(registration.id)}>
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
