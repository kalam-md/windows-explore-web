import { Elysia } from 'elysia'
import { db } from '../config/database'

export const folderRoutes = new Elysia()
  .decorate('db', db)
  .get('/api/folders', async ({ db }) => {
    const [rows] = await db.query(
      'SELECT * FROM folders ORDER BY parent_id, name'
    )
    return rows
  })
  .get('/api/folders/:id/children', async ({ params: { id }, db }) => {
    const [rows] = await db.query(
      'SELECT * FROM folders WHERE parent_id = ? ORDER BY name',
      [id]
    )
    return rows
  })
  .post('/api/folders', async ({ body, db }) => {
    const { name, parent_id } = body as { name: string; parent_id: number }
    const [result] = await db.query(
      'INSERT INTO folders (name, parent_id) VALUES (?, ?)',
      [name, parent_id]
    )
    return result
  })
  .put('/api/folders/:id', async ({ params: { id }, body, db }) => {
    const { name } = body as { name: string }
    const [result] = await db.query(
      'UPDATE folders SET name = ? WHERE id = ?',
      [name, id]
    )
    return result
  })
  .delete('/api/folders/:id', async ({ params: { id }, db }) => {
    const [result] = await db.query(
      'DELETE FROM folders WHERE id = ?',
      [id]
    )
    return result
  })
  .get('/api/folders/search', async ({ query: { term }, db }) => {
    const [rows] = await db.query(
      'SELECT * FROM folders WHERE name LIKE ?',
      [`%${term}%`]
    )
    return rows
  })