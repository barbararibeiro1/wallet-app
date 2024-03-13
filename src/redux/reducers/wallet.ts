import { generalExpensesType } from '../../types/types';
import { success, SET_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  editorId: 0,
};

const walletReducer = (state = initialState, action: generalExpensesType) => {
  switch (action.type) {
    case SET_CURRENCIES: {
      return { ...state, currencies: action.payload.currencies };
    }
    case success:
      return {
        ...state,
        expenses: [...state.expenses, ...action.payload.expenses],
      };
    default:
      return state;
  }
};
export default walletReducer;
