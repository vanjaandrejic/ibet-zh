export interface User {
  id: number;
  userUuid: string;
  ccy: string;
  userAccountTransactions: unknown[];
  balance: number;
  bettingBonus: number;
  deposit: number;
  withdrawal: number;
  win: number;
  reserved: number;
  blockedAmount: number;
  payIn: number;
  accountType: string;
  freebetTotalBonusInfo: null;
}
