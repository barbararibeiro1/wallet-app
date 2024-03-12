import { AnyAction } from 'redux';

const initialState = {
  totalExpense: 0,
  exchangeRates: 0,
  outgoing: [],
  currency: 'BRL',
};

function calculateTotalExpense(outgoing) {
  return outgoing.reduce((total, item) => total + item.expense, 0);
}

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
    default:
      return state;
  }
};
export default walletReducer;
