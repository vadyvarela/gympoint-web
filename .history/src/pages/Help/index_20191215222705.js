import React, { useState, useEffect } from 'react';

import Modal from './components/ReactModal';

import api from '~/services/api';

import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';

import {
  Container,
  Header,
  Content,
  HelpTable,
  AnswerButton,
} from '../_layout/default/styles';

export default function Help() {
  const [helps, helpOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
  });
  const [loading, setLoading] = useState(false);

  async function loadOrders(page = 1, perPage = 5) {
    setLoading(true);

    const res = await api.get('help-orders', {
      params: {
        page,
        perPage,
      },
    });
    setLoading(false);

    helpOrders(res.data.data);
    delete res.data.data;
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
    try {
      await api.post(`help-orders/${helps.id}/help-orders`, {
        answer: data.answer,
      });
      toast.success('Resposta enviada com sucesso');
      setShowModal(!showModal);
      resetForm();
      loadOrders();
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar resposta');
    }
  }

  return (
    <Container>
      <Header>
        <strong>Pedidos de Auxilio</strong>
      </Header>
      <Content>
        <HelpTable>
          <thead>
            <tr>
              <th className="studentColumn">ALUNOS</th>
            </tr>
          </thead>
          <tbody>
            {helps.map(help => (
              <tr key={help.id}>
                <td>{help.studentName}</td>
                <td align="right">
                  <AnswerButton
                    type="button"
                    onClick={() => hadleInfosModal(help)}
                  >
                    answer
                  </AnswerButton>
                </td>
              </tr>
            ))}
          </tbody>
        </HelpTable>

        <PaginationInfo
          page={helps.page}
          perPage={helps.perPage}
          totalPage={helps.totalPage}
          total={helps.total}
        />
        <br />
        {helps.totalPage > 1 && (
          <Pagination
            page={helps.page}
            totalPage={helps.totalPage}
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
