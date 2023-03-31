"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { DATABASE_URL } = process.env;
const pool = new pg_1.Pool({ connectionString: DATABASE_URL });
exports.default = pool;
