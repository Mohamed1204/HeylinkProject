import { PaymentNote } from '../../interfaces/';



export const toPaymentNote = (paymentNote: PaymentNote): PaymentNote => {
  return {
    uuid: paymentNote.uuid,
    period_to_date: paymentNote.period_to_date,
    period_from_date: paymentNote.period_from_date,
    transactions_count: paymentNote.transactions_count,
    value: paymentNote.value,
    status_code: paymentNote.status_code
    
  };
};


