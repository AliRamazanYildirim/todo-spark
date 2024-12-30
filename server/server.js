import express from 'express';
import pool from './db.js';

const PORT = process.env.PORT ?? 8000;
const app = express();

/* app.get('/', (req, res) => {
    res.send('Hallo Welt!');
});
 */

app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos');
    console.log('Fetched todos:', todos.rows); //!Drucken der zurückgegebenen Daten in der Konsole
    res.json(todos.rows);
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));