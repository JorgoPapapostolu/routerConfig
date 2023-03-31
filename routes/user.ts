import { Router, Request, Response } from 'express';
export const userRouter: Router = Router();
import { getUsers, getUsersById } from '../controller/user';

userRouter.get('/', getUsers);
userRouter.get('/:id', getUsersById);