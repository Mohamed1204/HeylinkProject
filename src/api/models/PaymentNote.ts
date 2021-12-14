import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../../config/dbConfig';

interface PaymentNoteAttributes {
  uuid: string;
  period_to_date: Date
  period_from_date: Date;
  transactions_count: number;
  value: number
  status_code: 'CREATING' | 'COMPLETED' 
  
}
export interface PaymentNoteInput extends Optional<PaymentNoteAttributes, 'uuid' | 'transactions_count' | 'status_code' |'value'> {}
export interface PaymentNoteOutput extends Required<PaymentNoteAttributes> {}

class PaymentNote extends Model<PaymentNoteAttributes, PaymentNoteInput> implements PaymentNoteAttributes
{
  public uuid!: string;
  public period_to_date!: Date
  public period_from_date!: Date;
  public transactions_count!: number;
  public value!: number
  public status_code!: 'CREATING' | 'COMPLETED' 

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

PaymentNote.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      //allowNull: false
    },
    period_to_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    period_from_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    status_code: {
      type: DataTypes.STRING,
      defaultValue: 'Creating'
    },
    transactions_count: {
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

