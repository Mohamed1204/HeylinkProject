export interface PaymentNote {
  payment_note_uuid: string;
  payment_note_period_to_date: Date;
  payment_note_period_from_date: Date;
  payment_note_transactions_count: number;
  payment_note_value: number;
  payment_note_status_code: 'CREATING' | 'COMPLETED';
}
