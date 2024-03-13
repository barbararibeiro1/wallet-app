import { useSelector } from 'react-redux';
import { RootState } from '../types/types';
import ExpenseItem from '../helpers/Expense Item';

function ExpensesList() {
  const { expenses } = useSelector((state: RootState) => {
    console.log(state.wallet);
    return state.wallet;
  });

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseItem key={ expense.id } expense={ expense } />
      ))}
    </div>
  );
}
export default ExpensesList;
