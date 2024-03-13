import ExpensesList from '../components/Expenses List';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <>
      <Header />
      <WalletForm />
      <ExpensesList />
    </>
  );
}

export default Wallet;
