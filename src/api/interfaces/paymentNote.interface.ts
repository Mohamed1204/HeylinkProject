export interface PaymentNote {
  uuid: string;
  period_to_date: Date;
  period_from_date: Date;
  transactions_count: number;
  value: number;
  status_code: 'CREATING' | 'COMPLETED';
}
