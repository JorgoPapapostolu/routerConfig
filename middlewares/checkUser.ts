import { Router, Request, Response, NextFunction } from "express";
import pool from "../db";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };