import * as service from '../../services/transactionService';
import { countAndSum } from '../../interfaces/countAndSum';
export const updateByDate = async (
  periodFromDate: Date,
  periodToDate: Date,
  paymentNoteId: string
):Promise<countAndSum> => {
   return await service.updateByDate(periodFromDate, periodToDate, paymentNoteId);
};