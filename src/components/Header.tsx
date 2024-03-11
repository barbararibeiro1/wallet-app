import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const emailData = useSelector((state: RootState) => state.user.email) || '';
  const totalExpense = useSelector((state: RootState) => state.wallet.totalExpense) || 0;
  const currency = useSelector((state: RootState) => state.wallet.currency) || '';

  return (
    <header>
      <h1>Trybewallet</h1>
      <p data-testid="email-field">{`Email: ${emailData}`}</p>
      <p data-testid="total-field">{`${Number(totalExpense).toFixed(2)}`}</p>
      <p data-testid="header-currency-field">{`${currency}`}</p>
    </header>
  );
}

export default Header;
