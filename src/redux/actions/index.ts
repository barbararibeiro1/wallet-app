import { DataType, DispatchType } from '../../types/types';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_CURRENCIES = 'SET_CURRENCIES';
const initial = 'INITIAL_REQUEST';
export const success = 'SUCCESS_REQUEST';
const failed = 'FAILED_REQUEST';

export const setCurrencies = (data: string []) => ({
  type: SET_CURRENCIES,
  payload: { currencies: data },
});

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  payload: email,
});

function initialRequest() {
  return { type: initial };
}

function successRequest(data: DataType[]) {
  return { type: success, payload: { expenses: data } };
}

function failledRequest(error: string) {
  return { type: failed, payload: error };
}

export function fetchData(dataExpense: DataType[]) {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(initialRequest());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();

      const updatedExpenses = dataExpense.map((expense) => ({
        ...expense, exchangeRates: data }));
      dispatch(successRequest(updatedExpenses));
    } catch (error: any) {
      dispatch(failledRequest(error.message));
    }
  };
}

export const callApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      const currencies = Object.keys(data);
      dispatch(setCurrencies(currencies));
    } catch (error) {
      console.error('Erro ao buscar moedas: ', error);
    }
  };
};
