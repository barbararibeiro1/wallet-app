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
  outgoing: Array<number>;
  currency: string;
};
