import { AnyAction } from 'redux';

const initialState = {
  totalExpense: 0,
  outgoing: [],
  currency: 'BRL',
  currencies: [],
  exchangeRates: {},
};

function calculateTotalExpense(outgoing) {
  return outgoing.reduce((total, item) => total + item.expense, 0);
}

const addExpense = (state, action) => {
  const newExpense = {
    ...action.payload,
    exchangeRates: state.exchangeRates,
  };
  const newExpenses = [...state.outgoing, newExpense];
  const newTotal = calculateTotalExpense(newExpenses);
  return {
    ...state,
    outgoing: newExpenses,
    totalExpense: newTotal,
  };
};

const walletReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'INITIAL_OUTGOING': {
      const newOutgoing = [...state.outgoing, action.payload];
      return {
        ...state,
        outgoing: newOutgoing,
        totalExpense: calculateTotalExpense(newOutgoing),
      };
    }
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };
    case 'ADD_EXPENSE':
      return addExpense(state, action);
    case 'SET_CURRENCIES':
      return {
        ...state,
        currencies: action.payload,
      };
    case 'SET_EXCHANGE_RATES':
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case 'UPDATE_TOTAL_EXPENSE':
      return {
        ...state,
        totalExpense: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
