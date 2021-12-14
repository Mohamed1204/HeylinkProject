import { Router } from 'express';
import paymentNotesRouter from './paymentNote';
import transactionRouter from './transaction'

const router = Router();

router.use('/paymentNotes', paymentNotesRouter);
router.use('/transactions', transactionRouter);

export default router;
