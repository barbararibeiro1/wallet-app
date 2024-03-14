import { useSelector } from 'react-redux';

export function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);
  const formatCurrency = (value) => Number(value).toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{formatCurrency(expense.value)}</td>
            <td>
              {expense.exchangeRates[expense.currency].name }
            </td>
            <td>{formatCurrency(expense.exchangeRates[expense.currency].ask)}</td>
            <td>
              {formatCurrency(
                expense.value * expense.exchangeRates[expense.currency].ask,
              )}
            </td>
            <td>Real</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
