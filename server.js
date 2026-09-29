import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
const port = Number(process.env.API_PORT || 3001)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'petapp',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
})
const stages = ['Nuevo', 'Corte de pelo', 'Bañado', 'Revisión veterinaria', 'Vacunado', 'Castrado']
const categories = ['Comida', 'Veterinario', 'Vacunas', 'Traslados']

app.use(cors())
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', async (_request, response) => {
  try {
    await pool.query('SELECT 1')
    await pool.query('SELECT 1 FROM animals LIMIT 0')
    await pool.query('SELECT 1 FROM expenses LIMIT 0')
    response.json({ status: 'ok', storage: 'mysql', database: process.env.DB_NAME || 'petapp' })
  } catch {
    response.json({ status: 'degraded', storage: 'local' })
  }
})

app.get('/api/animals', async (_request, response) => {
  const [rows] = await pool.query('SELECT id, name, age, breed, sex, stage, image, rescued FROM animals ORDER BY created_at DESC, id DESC')
  response.json(rows.map((animal) => ({ ...animal, id: Number(animal.id) })))
})

app.post('/api/animals', async (request, response) => {
  const { name, age, breed, sex, stage, image, rescued } = request.body
  if (typeof name !== 'string' || !name.trim()) return response.status(400).json({ error: 'El nombre es obligatorio.' })
  const safeStage = stages.includes(stage) ? stage : stages[0]
  const [result] = await pool.execute(
    'INSERT INTO animals (name, age, breed, sex, stage, image, rescued) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name.trim(), age || 'Sin dato', breed || 'Mestizo', sex === 'Hembra' ? 'Hembra' : 'Macho', safeStage, image || '', rescued || 'hoy'],
  )
  response.status(201).json({ id: Number(result.insertId), name: name.trim(), age: age || 'Sin dato', breed: breed || 'Mestizo', sex: sex === 'Hembra' ? 'Hembra' : 'Macho', stage: safeStage, image: image || '', rescued: rescued || 'hoy' })
})

app.put('/api/animals/:id', async (request, response) => {
  const { name, age, breed, sex, stage, image, rescued } = request.body
  if (typeof name !== 'string' || !name.trim()) return response.status(400).json({ error: 'El nombre es obligatorio.' })
  if (!stages.includes(stage)) return response.status(400).json({ error: 'La etapa no es válida.' })
  await pool.execute(
    'UPDATE animals SET name = ?, age = ?, breed = ?, sex = ?, stage = ?, image = ?, rescued = ? WHERE id = ?',
    [name.trim(), age || 'Sin dato', breed || 'Mestizo', sex === 'Hembra' ? 'Hembra' : 'Macho', stage, image || '', rescued || 'hoy', request.params.id],
  )
  const [rows] = await pool.execute('SELECT id, name, age, breed, sex, stage, image, rescued FROM animals WHERE id = ?', [request.params.id])
  if (!rows.length) return response.status(404).json({ error: 'No se encontró el animal.' })
  response.json({ ...rows[0], id: Number(rows[0].id) })
})

app.patch('/api/animals/:id/stage', async (request, response) => {
  const { stage } = request.body
  if (!stages.includes(stage)) return response.status(400).json({ error: 'La etapa no es válida.' })
  const [result] = await pool.execute('UPDATE animals SET stage = ? WHERE id = ?', [stage, request.params.id])
  if (result.affectedRows === 0) return response.status(404).json({ error: 'No se encontró el animal.' })
  response.json({ id: Number(request.params.id), stage })
})

app.get('/api/expenses', async (_request, response) => {
  const [rows] = await pool.query("SELECT id, title, category, DATE_FORMAT(expense_date, '%d %b') AS date, amount FROM expenses ORDER BY expense_date DESC, id DESC LIMIT 100")
  response.json(rows.map((expense) => ({ ...expense, id: Number(expense.id), amount: Number(expense.amount) })))
})

app.get('/api/expenses/monthly', async (_request, response) => {
  const [rows] = await pool.query("SELECT DATE_FORMAT(expense_date, '%b') AS month, SUM(amount) AS amount FROM expenses WHERE expense_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH) GROUP BY YEAR(expense_date), MONTH(expense_date), DATE_FORMAT(expense_date, '%b') ORDER BY YEAR(expense_date), MONTH(expense_date)")
  response.json(rows.map((month) => ({ ...month, amount: Number(month.amount) })))
})

app.post('/api/expenses', async (request, response) => {
  const { title, category, amount } = request.body
  const numericAmount = Number(amount)
  if (typeof title !== 'string' || !title.trim() || !categories.includes(category) || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    return response.status(400).json({ error: 'Revisa la descripción, categoría y monto del gasto.' })
  }
  const [result] = await pool.execute(
    'INSERT INTO expenses (title, category, amount, expense_date) VALUES (?, ?, ?, CURRENT_DATE())',
    [title.trim(), category, numericAmount],
  )
  response.status(201).json({ id: Number(result.insertId), title: title.trim(), category, amount: numericAmount, date: 'hoy' })
})

app.use((error, _request, response, _next) => {
  console.error('Error de API:', error.message)
  response.status(500).json({ error: 'No se pudo completar la operación.' })
})

app.listen(port, () => console.log(`petapp API escuchando en http://localhost:${port}`))