// pages/api/todos.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db'

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM todos');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching todos' });
    }
  } else if (req.method === 'POST') {
    const { task } = req.body;
    if (!task) {
      res.status(400).json({ message: 'Task is required' });
      return;
    }

    try {
      const [result] = await db.query('INSERT INTO todos (task, completed) VALUES (?, ?)', [task, false]);
      res.status(201).json({ id: result.insertId, task, completed: false });
    } catch (err) {
      res.status(500).json({ message: 'Error adding todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
