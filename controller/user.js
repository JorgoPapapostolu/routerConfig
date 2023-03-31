"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUsersById = exports.getUsers = void 0;
const db_1 = __importDefault(require("../db"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query("SELECT * from users");
        res.json({ data: rows });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        // if (rows.length === 0) {
        //     return res.status(404).json({ error: "User not found" });
        // }
        const { rows } = yield db_1.default.query("SELECT * FROM users WHERE id=$1", [id]);
        res.json({ data: rows });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUsersById = getUsersById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstname, lastname } = req.body;
    try {
        const { rows } = yield db_1.default.query("INSERT INTO users (id, firstname, lastname) VALUES ($1, $2, $3) RETURNING *", [id, firstname, lastname]);
        res.json({ data: rows });
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    try {
        // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        // if (rows.length === 0) {
        //   return res.status(404).json({ error: "User not found" });
        // }
        const result = yield db_1.default.query("UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING *", [firstname, lastname, id]);
        res.json({ data: result.rows });
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        // if (rows.length === 0) {
        //   return res.status(404).json({ error: "User not found" });
        // }
        const result = yield db_1.default.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
        res.json({ data: result.rows });
    }
    catch (err) {
        res.status(500).json({ error: "internal Server Error" });
    }
});
exports.deleteUser = deleteUser;
