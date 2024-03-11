import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type UserDataType = {
  user?: string;
  email: string;
  password: string;
};

export type RootState = {
  user: UserDataType;
  wallet: WalletType;
};

export type WalletType = {
  totalExpense: number;
  exchangeRates: { [key: string]: number };
  outgoing: Array<ExpenseType>;
  currency: string;
};

export type ExpenseType = {
  id: number;
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: ExchangeRatesType;
};

export type ExchangeRatesType = {
  [key: string]: number;
};

export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;
