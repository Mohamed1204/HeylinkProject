import { Optional } from 'sequelize/types';

export type CreatePaymentNoteDTO = {
  //uuid?: string;
  status_code?: "CREATING" | "COMPLETED"
  value?: number;
  transactions_count?: number;
  period_to_date : Date;
  period_from_date: Date;

};

export type UpdatePaymentNoteDTO = Optional<CreatePaymentNoteDTO, 'period_to_date' | 'period_from_date' >;


export type FilterPaymentNoteDTO = {
  uuid?: string;
  status_code?: 'CREATING' | 'COMPLETED';
  value?: number;
  transactions_count?: number;
  period_to_date?: Date;
  period_from_date?: Date;
};

