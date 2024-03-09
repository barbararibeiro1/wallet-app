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
