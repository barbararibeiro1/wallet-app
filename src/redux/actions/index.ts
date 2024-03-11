import { DispatchType } from "../../types";

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const updateEmail = (email) => ({
  type: UPDATE_EMAIL,
  payload: email,
});

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const addCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency,
});

export const updateTotalExpense = (totalExpense) => ({ 
  type: 'UPDATE_TOTAL_EXPENSE',
  payload: totalExpense,
});

const callApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      console.log('Moedas disponíveis: ', currencies);
      dispatch(setCurrencies(currencies));
    } catch (error) {
      console.error('Erro ao buscar moedas: ', error);
    }
  };
};

export const fetchCurrenciesAndAddExpense = (expenses, userCurrency) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);

      const exchangeRates = data;
      dispatch(setExchangeRates(exchangeRates));
      console.log('Taxas de câmbio armazenadas no estado Redux: ', exchangeRates);

      const dispatchPromises = expenses.map(async (expense) => {
        console.log('Despesa:', expense);
        const convertedExpense = convertExpenseToCurrency(
          expense, exchangeRates, userCurrency);
        if (convertedExpense) {
          await dispatch(addExpenseAction(convertedExpense));
        } else {
          console.error(`Taxa de câmbio para ${userCurrency} 
          não está disponível para despesa: `, expense);
        }
      });

      await Promise.all(dispatchPromises);
    } catch (error) {
      console.error('Erro ao buscar moedas ou adicionar despesas: ', error);
    }
  };
};

export function convertExpenseToCurrency(expense, data, currency) {
  const targetCurrency = currency;
  const exchangeRate = data[targetCurrency]?.ask;

  if (!exchangeRate) {
    console.error(`Taxa de câmbio para ${targetCurrency} não está disponível`);

    if (targetCurrency === 'BRL') {
      const averageBRLExchangeRate = calculateBRLExchangeRate(data);
      if (!averageBRLExchangeRate) {
        console.error('Não foi possível calcular a taxa de câmbio para BRL');
        return null;
      }

      const convertedAmount = expense.amount / averageBRLExchangeRate;
      return {
        ...expense,
        amount: convertedAmount,
        currency: targetCurrency,
      };
    }
    console.error(`Taxa de câmbio para ${targetCurrency} não está disponível`);
    return null;
  }
}

export const setExchangeRates = (exchangeRates) => {
  console.log('setExchangeRates payload: ', exchangeRates); // Adicionado
  return {
    type: 'SET_EXCHANGE_RATES',
    payload: exchangeRates,
  };
};

function calculateBRLExchangeRate(data, targetCurrency) {
  console.log('Calculating BRL exchange rate');
  console.log('Data:', data);
  console.log('Target currency:', targetCurrency);
  if (!data) {
    console.error('Dados das taxas de câmbio não estão não estão disponíveis');
    return null;
  }

  const availableCurrencies = Object.keys(data)
    .filter(currency => currency !== targetCurrency && currency !== 'BRL');

  const intermediateCurrency = 'USD'; // Escolha uma moeda intermediária, como USD
  const intermediateToTargetExchangeRate = data[targetCurrency]?.ask; // Taxa de câmbio direta para a moeda alvo
  const intermediateToBRLExchangeRate = data['BRL']?.ask; // Taxa de câmbio direta para BRL
  const intermediateToTargetRate = 1 / intermediateToTargetExchangeRate; // Taxa de câmbio inversa para a moeda alvo
  const intermediateToBRLRate = 1 / intermediateToBRLExchangeRate; // Taxa de câmbio inversa para BRL

  if (!intermediateToTargetExchangeRate || !intermediateToBRLExchangeRate) {
    console.error(`Taxa de câmbio direta para ${targetCurrency} 
    ou BRL não está disponível`);
    return null;
  }

  const indirectRate = intermediateToBRLRate / intermediateToTargetRate; // Taxa de câmbio indireta para BRL

  return indirectRate;
}

export default { callApi };
