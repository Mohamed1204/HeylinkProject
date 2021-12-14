import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/dbConfig';

interface TransactionAtributes {
  transaction_uuid: string;
  transaction_status_code: string;
  transaction_value: number;
  transaction_datetime: Date;
  PaymentNotePaymentNoteUuid?: string;
}

export interface TransactionOutPut extends Required<TransactionAtributes> {}


class Transaction
  extends Model<TransactionAtributes>
  implements TransactionAtributes
{
  public transaction_uuid!: string;
  public transaction_status_code!: string;
  public transaction_value!: number;
  public transaction_datetime!: Date;
  public PaymentNotePaymentNoteUuid!: string;

  // timestamps!
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    transaction_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
      //allowNull: false
    },
    transaction_status_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    transaction_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  }
);

export default Transaction;
