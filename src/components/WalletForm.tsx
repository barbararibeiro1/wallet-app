import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/index';
import { addExpenseAction, setCurrencies } from '../redux/actions/index';

function WalletForm() {
  const dispatch = useDispatch();
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  console.log(currencies);
  const [nextId, setNextId] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const currencyKeys = Object.keys(data);
        const filteredCurrencies = currencyKeys.filter((currency) => currency !== 'USDT');
        dispatch(setCurrencies(filteredCurrencies));
        console.log(filteredCurrencies);
        setExchangeRates(data);
      });
  }, [dispatch]);

  console.log(currencies);

  const handleAddExpense = () => {
    const expense = {
      id: nextId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRates[currency],
    };
    dispatch(addExpenseAction(expense));
    setNextId(nextId + 1);
    setValue('');
    setDescription('');
    setCurrency('BRL');
    setMethod('');
    setTag('');
  };

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [method, setMethod] = useState('');
  const [tag, setTag] = useState('');
  const expenses = useSelector((state: RootState) => state.wallet.outgoing);
  console.log(currencies);

  return (
    <>
      <form action="">
        <input
          type="number"
          name="value"
          data-testid="value-input"
          placeholder="Insira um valor"
          onChange={ (e) => setValue(e.target.value) }
          value={ value }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          placeholder="Insira uma descrição"
          onChange={ (e) => setDescription(e.target.value) }
          value={ description }
        />
        <select
          name=""
          data-testid="currency-input"
          onChange={ (e) => setCurrency(e.target.value) }
          value={ currency }
        >
          {currencies && currencies.map((item) => (
            <option key={ item } value={ item }>{ item }</option>
          ))}
          ;

        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ (e) => setMethod(e.target.value) }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ (e) => setTag(e.target.value) }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
      <button type="button" onClick={ handleAddExpense }>Adicionar despesa</button>
      {expenses.map((expense: ExpenseType) => (
        <div key={expense.id}>
          <p>{expense.description}</p>
          <p>{expense.value}</p>
        </div>
      ))}
    </>
  );
}

export default WalletForm;
