import pool from "../db";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * from users");
    res.json({ data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    // if (rows.length === 0) {
    //     return res.status(404).json({ error: "User not found" });
    // }
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
      res.json({ data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { id, firstname, lastname } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (id, firstname, lastname) VALUES ($1, $2, $3) RETURNING *",
      [id, firstname, lastname]
    );
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  try {
    // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    // if (rows.length === 0) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    const result = await pool.query(
      "UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING *",
      [firstname, lastname, id]
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    // if (rows.length === 0) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};
