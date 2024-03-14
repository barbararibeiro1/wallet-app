import ExpensesList from '../components/Expenses List';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { Table } from '../components/Table';

function Wallet() {
  return (
    <>
      <Header />
      <WalletForm />
      <ExpensesList />
      <Table />
    </>
  );
}

export default Wallet;
