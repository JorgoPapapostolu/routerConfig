import pool from '../db';
import { Request, Response } from 'express';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * from users');
        res.json({ data: rows })
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

export const getUsersById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * from users WHERE id=$1', [id]);
        if (rows.length > 0) {
            res.json({ data: rows });
        } else {
            res.status(404).send('User not found');
        }
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

export const postUser = async (req: Request, res: Response) => {
    const { id, firstname, lastname  } = req.body;
    try {
      const { rows } = await pool.query(
        'INSERT INTO users (id, firstname, lastname) VALUES ($1, $2, $3) RETURNING *',
        [id, firstname, lastname]
      );
      res.json({ data: rows });
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  };
