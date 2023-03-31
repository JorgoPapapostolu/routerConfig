"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const express_validator_1 = require("express-validator");
const checkUser_1 = require("../middlewares/checkUser");
const user_1 = require("../controller/user");
exports.userRouter.get("/", user_1.getUsers);
exports.userRouter.get("/:id", checkUser_1.checkUser, user_1.getUsersById);
exports.userRouter.post("/", (0, express_validator_1.body)("id").isNumeric(), (0, express_validator_1.body)("firstname").isLength({ min: 2 }), (0, express_validator_1.body)("lastname").isLength({ min: 2 }), (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }
    next();
}, user_1.postUser);
exports.userRouter.put("/:id", (0, express_validator_1.body)("id").isNumeric(), (0, express_validator_1.body)("firstname").isLength({ min: 2 }), (0, express_validator_1.body)("lastname").isLength({ min: 2 }), (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }
    next();
}, checkUser_1.checkUser, user_1.updateUser);
exports.userRouter.delete("/:id", checkUser_1.checkUser, user_1.deleteUser);
