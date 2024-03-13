import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type Dispatch = ThunkDispatch<ReduxNeeds, null, AnyAction>;

export type UserDataType = {
  user : {
    email: string;
  };
  wallet: {
    currencies: string[];
    expenses: DataType[];
    editor: boolean;
    editorId: number;
  };
};

export type MenuSelectOptions = {
  currencie?: string;
  payment?: string;
  expense?: string;
};

export type ExchangeRate = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type DataType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRate>;
};

export type RootState = {
  user: {
    email: string;
  }
  wallet: {
    currencies: string[];
    expenses: DataType[];
    editor: boolean;
    editorId: number;
  }
};

export type LoginType = {
  email: string;
};

export type WalletType = {
  currencies: string[];
  expenses: DataType[];
  editor: boolean;
  editorId: number;
};

export type ReduxNeeds = {
  isFetching: boolean;
  errorMessage: string;
};
