import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdQuestionAnswer } from 'react-icons/md';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import PaginationInfo from '~/components/Pagination/PaginationInfo';
import Pagination from '~/components/Pagination';

import {
  Container,
  Header,
  Content,
  StudentTable,
  ButtonDelete,
} from '../_layout/default/styles';

import Modal from './components/ReactModal';

import api from '~/services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function HelperOrderList() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
  });
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  async function loadOrders(page = 1, perPage = 5) {
    setLoading(true);

    const res = await api.get('help-orders', {
      params: {
        page,
        perPage,
      },
    });
    setLoading(false);

    setOrders(res.data.mydata);
    delete res.data.mydata;
    setPagination(res.data);
  }

  useEffect(() => {
    loadOrders(1);
  }, []);

  function handleLoadPage(page) {
    loadOrders(page);
  }

  function showModalAnswer(order) {
    setOrder(order);
    setShowModal(!showModal);
  }

  async function handleSubmitAwswer(data, { resetForm }) {
    console.log('merda');
    try {
      await api.post(`help-orders/${order.id}/answer`, {
        answer: data.answer,
      });
      toast.success('Resposta enviada com sucesso');
      setShowModal(!showModal);
      resetForm();
      loadOrders();
    } catch (err) {
      toast.error('Ops, Erro ao responder');
    }
  }
  return (
    <Container style={{ width: '900px' }}>
      <Header>
        <strong>Pedidos de auxílio</strong>
      </Header>
      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={String(order.id)}>
                <td>{order.students.name}</td>
                <td>
                  <MdQuestionAnswer
                    color="#4D85EE"
                    size={24}
                    onClick={() => showModalAnswer(order)}
                  >
                    Responder
                  </MdQuestionAnswer>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
        <br />
        <PaginationInfo
          page={pagination.page}
          perPage={pagination.perPage}
          totalPage={pagination.totalPage}
          total={pagination.total}
        />
        <br />
        {pagination.totalPage > 1 && (
          <Pagination
            page={pagination.page}
            totalPage={pagination.totalPage}
            align="center"
            onLoadPage={handleLoadPage}
          />
        )}
      </Content>

      <Modal
        title="PERGUNTA DO ALUNO"
        isShow={showModal}
        onClose={() => setShowModal(!showModal)}
        width="450px"
      >
        <span>{order.question}</span>

        <Form schema={schema} onSubmit={handleSubmitAwswer}>
          <label>SUA RESPOSTA</label>
          <Input multiline name="answer" />
          <button id="answerButton" type="submit">
            Responder Aluno
          </button>
        </Form>
      </Modal>
    </Container>
  );
}
