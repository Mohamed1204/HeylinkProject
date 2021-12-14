import PaymentNote from '../models/PaymentNote';
import { FilterPaymentNoteDTO } from '../dto/paymentNote.dto';
import { PaymentNoteInput, PaymentNoteOutput } from '../models/PaymentNote';
import Transaction, { TransactionOutPut } from '../models/transaction';



export const create = async (payload: PaymentNoteInput): Promise<PaymentNoteOutput> => {
  const paymentNote = await PaymentNote.create(payload);
  
  return paymentNote;
};

export const update = async (uuid: string,payload: Partial<PaymentNoteInput>) => {
  const paymentNote = await PaymentNote.findByPk(uuid);

  if (!paymentNote) {
    // @todo throw custom error
    throw new Error('not found');
  }

   await PaymentNote.update(payload, {where:{
    uuid:uuid
  }});
  
};

export const getAll = async (
  filters?: FilterPaymentNoteDTO
): Promise<PaymentNoteOutput[]> => {
  return await PaymentNote.findAll({
    where: filters  
  });
};

export const getAllRealtedTransactions = async (
  uuid: string
): Promise<TransactionOutPut[]> => {
  const array: TransactionOutPut[] = []

  const transactions = await Transaction.findAll({
    where:{
      PaymentNoteUuid:uuid
    },
    raw:true
  });
   if(transactions.length===0){
     return array
   }else{
    return transactions;
   }
   
};