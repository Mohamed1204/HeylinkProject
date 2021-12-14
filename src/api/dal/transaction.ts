import Transaction from '../models/transaction';
import {countAndSum} from '../interfaces/index'
const { Op} = require('sequelize');

export const updateByDate = async (periodFromDate: Date, periodToDate: Date, paymentNoteId: string): Promise<countAndSum>  => {
    const transaction_status = 'PENDING'
    const newTransactionStatus = 'PAID'
    var string_copy = (' ' + paymentNoteId).slice(1);

    await Transaction.update(
      {
        PaymentNotePaymentNoteUuid: paymentNoteId,
        transaction_status_code: newTransactionStatus
      },
      {
        where: {
          transaction_datetime: {
            [Op.and]: {
              [Op.or]: { [Op.lte]: periodToDate, [Op.eq]: periodToDate },
              [Op.gte]: periodFromDate
            }
          },
          transaction_status_code: transaction_status
        }
      }
    );
     
   const updated = await Transaction.findAndCountAll({
     where: {
       PaymentNotePaymentNoteUuid: string_copy
     },
     raw: true
   });
   


  
  var sumOfTransactionValue: number = 0.0
  for (let index = 0; index < updated.rows.length; index++) {
     sumOfTransactionValue= parseFloat((sumOfTransactionValue + updated.rows[index].transaction_value).toFixed(2))  
  }
  

  return { count: updated.count, sum: sumOfTransactionValue } ;

  
};
