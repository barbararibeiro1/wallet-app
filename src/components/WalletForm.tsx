import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { addExpenseAction, fetchCurrenciesAndAddExpense } from '../redux/actions';

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

  useEffect(() => {
    if (prevUserCurrency !== userCurrency) {
      dispatch(fetchCurrenciesAndAddExpense(expenses, userCurrency));
      setPrevUserCurrency(userCurrency);
    }
  }, [dispatch, userCurrency, prevUserCurrency]);

  const handleAddExpense = () => {
    const selectedExchangeRate = exchangeRates[currency];
    console.log('Chaves de exchangeRates:', Object.keys(exchangeRates));
    if (!selectedExchangeRate) {
      console.error(`Taxa de câmbio para ${currency} não está disponível`);
      return;
    }
    const expenseValue = parseFloat(value);
    const convertedValue = isNaN(expenseValue) ? 0 : expenseValue
      * parseFloat(selectedExchangeRate.ask);
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRate: selectedExchangeRate.ask,
      convertedValue,
    };
    dispatch(addExpenseAction(expense));
    setValue('');
    setDescription('');
    setCurrency('USD');
    setMethod('Dinheiro');
    setTag('Alimentação');
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
        const expenseValue = parseFloat(expense.value);
        const exchangeRate = parseFloat(expense.exchangeRates[currency]?.ask);
        if (!isNaN(expenseValue) && !isNaN(exchangeRate)) {
          const convertedValue = (expenseValue
            * exchangeRate) * (exchangeRates
            && exchangeRates.BRL ? exchangeRates.BRL : 1);
          console.log('Valor convertido:', convertedValue);
          return (
            <div key={ expense.id }>
              <p>{expense.description}</p>
              <p>{convertedValue}</p>
            </div>
          );
        }
        console.log('Valor da despesa ou taxa de câmbio inválidos', expense);
        return null;
      })}
    </div>
  );
}

export default WalletForm;
