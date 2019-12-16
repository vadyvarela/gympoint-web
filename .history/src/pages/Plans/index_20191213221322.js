import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import Alert from '~/utils/alert';

import { getRequest, deleteRequest } from '~/store/modules/plans/actions';

import {
  Container,
  Header,
  Content,
  StudentTable,
  ButtonDelete,
} from '../_layout/default/styles';

import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';

export default function Plans() {
  const plans = useSelector(state => state.plan.plans);
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
            {plans.mydata.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>
                  {plan.duration === 1
                    ? `${plan.duration} Mês`
                    : `${plan.duration} Mêses`}
                </td>
                <td> </td>
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
                  <ButtonDelete onClick={() => handleDelete(plan.id)}>
                    <MdDelete size={22} color="#de3b3b" />
                  </ButtonDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>

        <PaginationInfo
          page={plans.page}
          perPage={plans.perPage}
          totalPage={plans.totalPage}
          total={plans.total}
        />
        <br />
        {plans.totalPage > 1 && (
          <Pagination
            page={plans.page}
            totalPage={plans.totalPage}
            align="center"
            onLoadPage={handleLoadPage}
          />
        )}
      </Content>
    </Container>
  );
}
