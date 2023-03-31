import express, { Application, Request, Response } from 'express';
const app: Application = express();
import { userRouter } from './routes/user';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

export default app;