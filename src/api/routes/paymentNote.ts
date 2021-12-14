import { Router, Request, Response } from 'express';
import {CreatePaymentNoteDTO, FilterPaymentNoteDTO} from '../dto/paymentNote.dto'
import * as paymentNoteController from '../controllers/paymentNote/index';
import * as transactionController from '../controllers/transaction/index';



const paymentNotesRouter = Router();


paymentNotesRouter.get(
  '/getAllTransactions/:payment_note_uuid',
  async (req: Request, res: Response) => {
    const id = String(req.params.payment_note_uuid);

    const result = await paymentNoteController.getAllRelatedTransactions(id);
    return res.status(200).send(result);
  }
);

paymentNotesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const filters: FilterPaymentNoteDTO = req.query;
    console.log(filters)
    
    const results = await paymentNoteController.getAll(filters);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error);
  }
  
});


paymentNotesRouter.post(
  '/',
  async (req: Request<{}, {}, CreatePaymentNoteDTO>, res: Response) => {
    try {
      console.log('post');
      console.log(req.body);
      const payload: CreatePaymentNoteDTO = {
        payment_note_period_from_date: req.body.payment_note_period_from_date,
        payment_note_period_to_date: req.body.payment_note_period_to_date
      };
      console.log(payload);

      const result = await paymentNoteController.create(payload);

      transactionController
        .updateByDate(
          result.payment_note_period_from_date,
          result.payment_note_period_to_date,
          result.payment_note_uuid
        )
        .then((sumAndCount) => {
          paymentNoteController.update(result.payment_note_uuid, {
            payment_note_status_code: 'COMPLETED',
            payment_note_transactions_count: sumAndCount.count,
            payment_note_value: sumAndCount.sum
          });
        });

      return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
    
  }
);

export default paymentNotesRouter;
