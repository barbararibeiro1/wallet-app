import { AnyAction } from 'redux';

const initialState = {
  outgoing: [],
};

// Definição do reducer
const walletReducer = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    case 'INITIAL_OUTGOING':
      return {
        ...state,
        outgoing: [...state.outgoing, action.payload],
      };
    default:
      return state;
  }
};

export default walletReducer;
