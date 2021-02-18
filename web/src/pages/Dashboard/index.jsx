import React, { useState, useEffect } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import './styles.css';

import NovaTransacao from './Modals/NewTrasacao/NewTransaction';
import RemoveTransacao from './Modals/RemoveTransacao/index';

import Header from '../../components/Header';
import Card from '../../components/Card';
//import Modal from '../../components/Modal';
import Footer from '../../components/Footer';

import ImgEntrada from '../../assets/income.svg';
import ImgSaida from '../../assets/expense.svg';
import ImgTotal from '../../assets/total.svg';

import api from '../../services/api';

function Dashboard() {

  const [openModal, setOpenModal] = useState(false);
  const [transactions, SetTransactions] = useState([]);
  const [openModalExcluir, setOpenModalExcluir] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    listaTransacoes()
  }, [])

  async function listaTransacoes() {
    const response = await api.get('/alltransactions');
    SetTransactions(response.data);
  }

  function handleFecharModalNew() {
    setOpenModal(false);
    listaTransacoes();
  }

  function handleRemoveTransaction(item) {
    setSelectedTransaction(item);
    setOpenModalExcluir(true);
  }

  function handleFecharModalRemove() {
    setOpenModalExcluir(false);
    listaTransacoes();
  }

  return (
    <>
      <Header />

      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Balanço</h2>

          <Card pathImage={ImgEntrada} altImage="Imagem de entrada" isTotal={false}>
            Entradas
          </Card>
          <Card pathImage={ImgSaida} altImage="Imagem de saída" isTotal={false}>
            Saídas
          </Card>
          <Card pathImage={ImgTotal} altImage="Imagem de total" isTotal={true}>
            Saídas
          </Card>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>

          <button type="button"
            onClick={() => setOpenModal(true)}
            className="button new">+ Nova Transação</button>

          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                const CSSclass = item.amount > 0 ? "income" : "expense"
                return (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td className={CSSclass}>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>
                      <FiMinusCircle onClick={() => handleRemoveTransaction(item)} size={24} color="#e92929" style={{ cursor: 'pointer' }} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />

      <NovaTransacao
        isOpen={openModal}
        callbackParentFecharNew={() => handleFecharModalNew()} />

      <RemoveTransacao isOpen={openModalExcluir}
        callbackParentFecharRemove={() => handleFecharModalRemove()}
        transaction={selectedTransaction} />
    </>
  );
}
export default Dashboard;
