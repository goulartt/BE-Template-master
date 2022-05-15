import * as express from "express";
import * as bodyParser from 'body-parser';
import { sequelize } from './models/db';
import contractsRoute from './routes/contract.route';
import jobsRoute from './routes/job.route';
import profileRoute from './routes/profile.route';

const app = express();

app.set('sequelize', sequelize)
app.set('models', sequelize.models)


app.use(bodyParser.json());
app.use(contractsRoute);
app.use(jobsRoute);
app.use(profileRoute);


export default app;