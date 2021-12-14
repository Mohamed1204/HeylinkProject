import Sequelize from 'sequelize';
import dbConfig from '../../config/dbConfig';

import paymentNote from '../models/PaymentNote'
import transaction from '../models/transaction'



var db = {paymentNote: paymentNote, transaction:transaction, Sequelize:Sequelize, connection:dbConfig}
db.paymentNote.hasMany(db.transaction)
db.transaction.belongsTo(db.paymentNote)

export default  db;