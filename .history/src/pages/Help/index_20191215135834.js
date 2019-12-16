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
  const [helps, setHelps] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    question: '',
    idQuestion: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('help-orders');

      const data = response.data.mydata.map(help => {
        return {
          id: help.id,
          question: help.question,
          studentName: help.students.name,
        };
      });

      setHelps(data);
    }
    fetchData();
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

  function hadleInfosModal(help) {
    setModalData({
      isOpen: true,
      question: help.question,
      idQuestion: help.id,
    });
  }

  function removeHelpFromList({ helpId = null }) {
    if (helpId) {
      const _helps = helps.filter(item => item.id !== helpId);

      setHelps(_helps);
    }

    setModalData({
      isOpen: false,
    });
  }

  function handleLoadPage(page) {
    loadOrders(page);
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
      {modalData.isOpen && (
        <Modal
          isOpen={modalData.isOpen}
          question={modalData.question}
          idQuestion={modalData.idQuestion}
          onRemoveHelpItem={removeHelpFromList}
        />
      )}
    </Container>
  );
}
