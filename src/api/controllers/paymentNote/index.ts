import {CreatePaymentNoteDTO, UpdatePaymentNoteDTO} from '../../dto/paymentNote.dto';
import { PaymentNote } from '../../interfaces';
import * as mapper from './mapper';
import * as service from '../../services/paymentNoteService';
import { FilterPaymentNoteDTO } from '../../dto/paymentNote.dto';
import  { TransactionOutPut } from '../../models/transaction';

export const create = async (
  payload: CreatePaymentNoteDTO
): Promise<PaymentNote> => {
  return mapper.toPaymentNote(await service.create(payload));
};

export const update = async (
  id: string,
  payload: UpdatePaymentNoteDTO
) => {
   await service.update(id, payload)
};

export const getAll = async (
  filters: FilterPaymentNoteDTO
): Promise<PaymentNote[]> => {
  return (await service.getAll(filters)).map(mapper.toPaymentNote);
};

export const getAllRelatedTransactions = async (
  uuid: string
): Promise<TransactionOutPut[]> => {
  return (await service.getAllRelatedTransactions(uuid));
};
