import db from '../src/api/models/index';
import routes from './api/routes';
import express, { Application, Request, Response } from 'express'
const cors = require('cors');
const bodyParser = require('body-parser');



const app: Application = express()
const port = 3000

const dbIn = () => {
  db.connection
    .sync({ alter: true })
    .then(() => console.log('success'))
    .catch((err: any) => {
      return console.log(err);
    });
};



app.use(bodyParser.json());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
})

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error) {
  console.log(`Error occurred: ${error}`)
}
app.use('/api/v1', routes);
dbIn();
