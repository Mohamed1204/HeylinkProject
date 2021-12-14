import { PaymentNote } from '../../interfaces/';



export const toPaymentNote = (paymentNote: PaymentNote): PaymentNote => {
  return {
    payment_note_uuid: paymentNote.payment_note_uuid,
    payment_note_period_to_date: paymentNote.payment_note_period_to_date,
    payment_note_period_from_date: paymentNote.payment_note_period_from_date,
    payment_note_transactions_count:
      paymentNote.payment_note_transactions_count,
    payment_note_value: paymentNote.payment_note_value,
    payment_note_status_code: paymentNote.payment_note_status_code
  };
};


