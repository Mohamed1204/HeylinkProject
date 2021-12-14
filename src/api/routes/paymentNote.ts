import { Router, Request, Response } from 'express';
import {CreatePaymentNoteDTO, FilterPaymentNoteDTO} from '../dto/paymentNote.dto'
import * as paymentNoteController from '../controllers/paymentNote/index';
import * as transactionController from '../controllers/transaction/index';



const paymentNotesRouter = Router();


paymentNotesRouter.get('/:uuid', async (req: Request, res: Response) => {
  const id = String(req.params.uuid);

  const result = await paymentNoteController.getAllRelatedTransactions(id);
  return res.status(200).send(result);
  
});

paymentNotesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const filters: FilterPaymentNoteDTO = req.query;
    console.log('getall');
    const results = await paymentNoteController.getAll(filters);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error);
  }
  
});


paymentNotesRouter.post(
  '/',
  async (req: Request<{}, {}, CreatePaymentNoteDTO>, res: Response) => {
    console.log('post');
    console.log(req.body);
    const payload: CreatePaymentNoteDTO = req.body;
    console.log(payload);

    const result = await paymentNoteController.create(payload);
    
    transactionController.updateByDate(result.period_from_date, result.period_to_date, result.uuid)
      .then((sumAndCount) => {
        paymentNoteController.update(result.uuid, {status_code:'COMPLETED', transactions_count:sumAndCount.count, value:sumAndCount.sum});
      });
      
    
    return res.status(200).send(result);
  }
);

export default paymentNotesRouter;
