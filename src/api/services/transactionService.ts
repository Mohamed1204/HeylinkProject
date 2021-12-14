import * as transactionDal from '../dal/transaction';
import {countAndSum} from '../interfaces/index'


export const updateByDate = async (
  periodFromDate: Date,
  periodToDate: Date,
  paymentNoteId: string
): Promise<countAndSum> => {
  return await transactionDal.updateByDate(
    periodFromDate,
    periodToDate,
    paymentNoteId
  );
};