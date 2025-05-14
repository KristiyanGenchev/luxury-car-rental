import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';


interface User {
  userID: number;
  username: string;
  email: string;
}

export class UserController {
  // [CREATE] POST /api/users
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, email } = req.body;
    try {
      await db.conn.query(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        [username, email]
      );
      res.status(201).json({ message: '✅ User created successfully' });
    } catch (error) {
      console.error('❌ Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // [READ ALL] GET /api/users
  async getAllUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const [users] = await db.conn.query<(User & RowDataPacket)[]>('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // [READ ONE] GET /api/users/:id
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const [users] = await db.conn.query<(User & RowDataPacket)[]>(
        'SELECT * FROM users WHERE userID = ?',
        [id]
      );

      if (users.length === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(users[0]);
    } catch (error) {
      console.error('❌ Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // [UPDATE] PUT /api/users/:id
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const [result] = await db.conn.query<ResultSetHeader>(
        'UPDATE users SET username = ?, email = ? WHERE userID = ?',
        [username, email, id]
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: '✅ User updated successfully' });
    } catch (error) {
      console.error('❌ Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // [DELETE] DELETE /api/users/:id
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const [result] = await db.conn.query<ResultSetHeader>(
        'DELETE FROM users WHERE userID = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({ message: '🗑 User deleted successfully' });
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export const userController = new UserController();
