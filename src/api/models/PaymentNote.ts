import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../../config/dbConfig';

interface PaymentNoteAttributes {
  payment_note_uuid: string;
  payment_note_period_to_date: Date;
  payment_note_period_from_date: Date;
  payment_note_transactions_count: number;
  payment_note_value: number;
  payment_note_status_code: 'CREATING' | 'COMPLETED';
}
export interface PaymentNoteInput
  extends Optional<
    PaymentNoteAttributes,
    | 'payment_note_uuid'
    | 'payment_note_transactions_count'
    | 'payment_note_status_code'
    | 'payment_note_value'
  > {}
export interface PaymentNoteOutput extends Required<PaymentNoteAttributes> {}

class PaymentNote
  extends Model<PaymentNoteAttributes, PaymentNoteInput>
  implements PaymentNoteAttributes
{
  public payment_note_uuid!: string;
  public payment_note_period_to_date!: Date;
  public payment_note_period_from_date!: Date;
  public payment_note_transactions_count!: number;
  public payment_note_value!: number;
  public payment_note_status_code!: 'CREATING' | 'COMPLETED';

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PaymentNote.init(
  {
    payment_note_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
      //allowNull: false
    },
    payment_note_period_to_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    payment_note_period_from_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    payment_note_value: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    payment_note_status_code: {
      type: DataTypes.STRING,
      defaultValue: 'CREATING'
    },
    payment_note_transactions_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  }
);

export default PaymentNote;

