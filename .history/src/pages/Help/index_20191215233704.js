import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import PaginationInfo from '~/components/Pagination/PaginationInfo';
import Pagination from '~/components/Pagination';

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

  useEffect(() => {
    loadOrders(1);
  }, []);

  async function loadOrders(page = 1, perPage = 5) {
    setLoading(true);

    const res = await api.get('help-orders', {
      params: {
        page,
        perPage,
      },
    });
    setLoading(false);

    setOrders(res.data.data);
    delete res.data.data;
    setPagination(res.data);
  }

  function handleLoadPage(page) {
    loadOrders(page);
  }

  function showModalAnswer(order) {
    setOrder(order);
    setShowModal(!showModal);
  }

  async function handleSubmitAwswer(data, { resetForm }) {
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
    <div style={{ width: '700px' }}>
      <div>
        <strong>Pedidos de auxílio</strong>
      </div>


              <tabel>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={String(order.id)}>
                      <td>{order.student.name}</td>
                      <td>
                        <ButtonLikeLink
                          color="#4D85EE"
                          onClick={() => showModalAnswer(order)}
                        >
                          responder
                        </ButtonLikeLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </>
          )}
        </Panel>

      <Modal
        title="PERGUNTA DO ALUNO"
        isShow={showModal}
        onClose={() => setShowModal(!showModal)}
        width="450px"
      >
        <Question>{order.question}</Question>

        <Form schema={schema} onSubmit={handleSubmitAwswer}>
          <Label>SUA RESPOSTA</Label>
          <InputTextArea multiline name="answer" />
          <Button type="submit" label="Responder Aluno" />
        </Form>
      </Modal>
    </Container>
  );
}
