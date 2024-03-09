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
  exchangeRates: number;
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
  exchangeRates: any;
};