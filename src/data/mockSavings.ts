export interface RoundUpTransaction {
  id: string;
  merchant: string;
  amount: number;
  roundUp: number;
  date: string;
}

export const DEFAULT_GOAL_NAME = 'Emergency Cushion';
export const DEFAULT_GOAL_TARGET = 500;

export const SWIPE_SAVE_AMOUNT = 3;

export const MOCK_ROUND_UP_TRANSACTIONS: RoundUpTransaction[] = [
  { id: 'txn-1', merchant: 'Corner Coffee', amount: 4.65, roundUp: 0.35, date: 'Yesterday' },
  { id: 'txn-2', merchant: 'Metro Transit', amount: 2.75, roundUp: 0.25, date: 'Yesterday' },
  { id: 'txn-3', merchant: 'Groceries Plus', amount: 38.2, roundUp: 0.8, date: '2 days ago' },
];

export const MOCK_FIXED_SCHEDULE = {
  frequency: 'Weekly',
  amount: 15,
  nextDate: 'Every Friday',
};
