import React, { useState, useEffect } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import './styles.css';

import NovaTransacao from './Modals/NewTrasacao/NewTransaction';
import RemoveTransacao from './Modals/RemoveTransacao/index';

import Header from '../../components/Header';
import Card from '../../components/Card';
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
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  const accountID = localStorage.getItem('accountID');

  useEffect(() => {
    listaTransacoes()
  }, [])

  useEffect(() => {
    totalCards();
  }, [transactions])

  function totalCards() {
    let totalIncome = 0;
    let totalExpense = 0;
    let result = 0;
    transactions.map((item) => {
      if (item.amount > 0) {
        totalIncome = parseFloat(totalIncome + parseFloat(item.amount));
      } else {
        totalExpense = parseFloat(totalExpense + parseFloat(item.amount));
      }
    })
    result = totalIncome + totalExpense;
    setIncome(totalIncome)
    setExpense(totalExpense)
    setTotal(result);
  }

  async function listaTransacoes() {
    const response = await api.get('/alltransactions', {
      headers: {
        authorization: accountID
      }
    });
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

          <Card pathImage={ImgEntrada} altImage="Imagem de entrada" isTotal={false} tot={income}>
            Entradas
          </Card>
          <Card pathImage={ImgSaida} altImage="Imagem de saída" isTotal={false} tot={expense}>
            Saídas
          </Card>
          <Card pathImage={ImgTotal} altImage="Imagem de total" isTotal={true} tot={total}>
            Total
          </Card>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>

          <input type="text" placeholder="Descrição"/>

          <button type="button">Pesquisar</button>

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
