import { AnyAction } from 'redux';

const initialState = {
  email: '',
  password: '',
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
