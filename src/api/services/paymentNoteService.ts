import { PaymentNoteInput, PaymentNoteOutput } from '../models/PaymentNote';
import { FilterPaymentNoteDTO } from '../dto/paymentNote.dto';
import * as paymentNoteDal from '../dal/paymentNote';
import { TransactionOutPut } from '../models/transaction';




export const create = async (
  payload: PaymentNoteInput
): Promise<PaymentNoteOutput> => {
  
  return paymentNoteDal.create(payload);
};

export const update = async (
  id: string,
  payload: Partial<PaymentNoteInput>
) => {
  

  await paymentNoteDal.update(id, payload);
};

export const getAll = (
  filters: FilterPaymentNoteDTO
): Promise<PaymentNoteOutput[]> => {
  return paymentNoteDal.getAll(filters);
};

export const getAllRelatedTransactions = (
  uuid: string
): Promise<TransactionOutPut[]> => {
  return paymentNoteDal.getAllRealtedTransactions(uuid);
};

