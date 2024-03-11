import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { addExpenseAction, fetchCurrenciesAndAddExpense, updateTotalExpense } from '../redux/actions';

function WalletForm() {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();
  const expenses = useSelector((state: RootState) => state.wallet.outgoing);
  const userCurrency = useSelector((state: RootState) => state.wallet.currency);
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  const exchangeRates = useSelector((state: RootState) => state.wallet.exchangeRates);

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [prevUserCurrency, setPrevUserCurrency] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);

  const calculateTotalExpense = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.convertedValue);
    });
    setTotalExpense(parseFloat(total.toFixed(2)));
  };
  useEffect(() => {
    calculateTotalExpense();
  }, [expenses]);

  useEffect(() => {
    if (prevUserCurrency !== userCurrency) {
      dispatch(fetchCurrenciesAndAddExpense(expenses, userCurrency));
      setPrevUserCurrency(userCurrency);
    }
  }, [dispatch, userCurrency, prevUserCurrency]);

  const handleAddExpense = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const exchangeRate = data[currency]?.ask;

      const newId = expenses.length;
      const selectedExchangeRate = exchangeRates[currency];
      console.log('Chaves de exchangeRates:', Object.keys(exchangeRates));
      if (!selectedExchangeRate) {
        console.error(`Taxa de câmbio para ${currency} não está disponível`);
        return;
      }
      const expenseValue = parseFloat(value);
      const convertedValue = parseFloat(value) * parseFloat(exchangeRate);
      const expense = {
        id: newId,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRate,
        convertedValue,
      };
      dispatch(addExpenseAction(expense));
      const updatedTotalExpense = parseFloat(totalExpense) + convertedValue;
      dispatch(updateTotalExpense(updatedTotalExpense.toFixed(2)));
      setValue('');
      setDescription('');
      setCurrency('USD');
      setMethod('Dinheiro');
      setTag('Alimentação');
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  console.log(currencies);

  return (
    <div>
      <form action="">
        <input
          type="number"
          name="value"
          data-testid="value-input"
          placeholder="Insira um valor"
          onChange={ (e) => {
            console.log('Novo valor:', e.target.value);
            setValue(e.target.value);
          }}
          value={ value }
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          placeholder="Insira uma descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ (e) => setCurrency(e.target.value)}
          value={ currency }
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
      <button type="button" onClick={handleAddExpense}>Adicionar despesa</button>
      {expenses.map((expense: any) => {
        if (!expense || !expense.exchangeRates) {
          console.log('Despesa ou taxa de câmbio inválidos', expense);
          return null;
        }
        const convertedValue = expense.convertedValue;

        if (!isNaN(convertedValue)) {
          console.log('Valor convertido:', convertedValue);
          return (
            <div key={expense.id}>
              <p>{`Descrição: ${expense.description}`}</p>
              <p>{`Valor convertido: ${convertedValue.toFixed(2)} BRL`}</p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default WalletForm;
