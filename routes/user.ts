import { Router, Request, Response, NextFunction } from "express";
export const userRouter: Router = Router();
import { getUsers, getUsersById, postUser } from "../controller/user";
import { body, validationResult } from "express-validator";

userRouter.get("/", getUsers);

userRouter.get("/:id", getUsersById);

userRouter.post(
  "/",
  body("id").isNumeric(),
  body("firstname").isLength({ min: 2 }),
  body("lastname").isLength({ min: 2 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    next();
  },
  postUser
);
