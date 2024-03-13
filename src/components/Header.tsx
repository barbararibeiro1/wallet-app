import { useSelector } from 'react-redux';
import { RootState, LoginType, WalletType } from '../types/types';

type InitialState = {
  user: LoginType;
  wallet: WalletType;
};

function Header() {
  const { user, wallet } = useSelector((state: RootState) => state) as InitialState;

  const calculateTotalExpense = wallet.expenses
    ? wallet.expenses.reduce((total, item) => {
      const allExpeses = parseFloat(item.value)
        * parseFloat(item.exchangeRates[item.currency].ask);
      return total + allExpeses;
    }, 0) : 0;

  return (
    <header>
      <h1>Trybewallet</h1>
      <p data-testid="email-field">{`Email: ${user.email}`}</p>
      <p data-testid="total-field">
        {calculateTotalExpense.toFixed(2)}
      </p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
