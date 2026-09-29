import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import {
  Activity, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Dog, FileText, Heart, LayoutDashboard,
  MoreHorizontal, PawPrint, Pencil, Plus, Search, ShieldCheck, Sparkles, Stethoscope,
  Syringe, Truck, X,
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import './App.css'
import './theme.css'

type Stage = 'Nuevo' | 'Corte de pelo' | 'Bañado' | 'Revisión veterinaria' | 'Vacunado' | 'Castrado'
type Animal = { id: number; name: string; age: string; breed: string; sex: string; stage: Stage; image: string; rescued: string }
type Expense = { id: number; title: string; category: string; date: string; amount: number }

const stages: Stage[] = ['Nuevo', 'Corte de pelo', 'Bañado', 'Revisión veterinaria', 'Vacunado', 'Castrado']
const photos = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=160&q=80',
]
const startingAnimals: Animal[] = [
  { id: 1, name: 'Milo', age: '8 meses', breed: 'Mestizo', sex: 'Macho', stage: 'Vacunado', image: photos[0], rescued: 'hace 12 días' },
  { id: 2, name: 'Luna', age: '2 años', breed: 'Labrador mestiza', sex: 'Hembra', stage: 'Revisión veterinaria', image: photos[1], rescued: 'hace 8 días' },
  { id: 3, name: 'Rocco', age: '1 año', breed: 'Mestizo', sex: 'Macho', stage: 'Bañado', image: photos[2], rescued: 'hace 5 días' },
  { id: 4, name: 'Nina', age: '4 meses', breed: 'Mestiza', sex: 'Hembra', stage: 'Nuevo', image: photos[3], rescued: 'hace 2 días' },
]
const categoryMeta = [
  { name: 'Comida', color: '#4ade80', icon: Dog },
  { name: 'Veterinario', color: '#fbbf24', icon: Stethoscope },
  { name: 'Vacunas', color: '#34d399', icon: Syringe },
  { name: 'Traslados', color: '#e07a5f', icon: Truck },
]
const stageColors = ['#fbbf24', '#d97706', '#e07a5f', '#b45309', '#34d399', '#4ade80']
const monthSpend = [
  { month: 'Abr', amount: 182000 }, { month: 'May', amount: 215000 }, { month: 'Jun', amount: 194000 },
  { month: 'Jul', amount: 247000 }, { month: 'Ago', amount: 228000 }, { month: 'Sep', amount: 276000 },
]
const startingExpenses: Expense[] = [
  { id: 1, title: 'Alimento balanceado · 4 bolsas', category: 'Comida', date: '26 sep', amount: 68500 },
  { id: 2, title: 'Consulta y control de Luna', category: 'Veterinario', date: '24 sep', amount: 42000 },
  { id: 3, title: 'Vacuna séxtuple · Milo', category: 'Vacunas', date: '22 sep', amount: 28500 },
  { id: 4, title: 'Traslado desde San Martín', category: 'Traslados', date: '18 sep', amount: 18000 },
]
const money = (amount: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)
const today = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
const loadSaved = <T,>(key: string, fallback: T): T => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback }
}

function App() {
  const [animals, setAnimals] = useState<Animal[]>(() => loadSaved('petapp-animals', startingAnimals))
  const [expenses, setExpenses] = useState<Expense[]>(() => loadSaved('petapp-expenses', startingExpenses))
  const [monthlySpend, setMonthlySpend] = useState(monthSpend)
  const [page, setPage] = useState<'inicio' | 'animales' | 'gastos'>('inicio')
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('Todos')
  const [animalFilter, setAnimalFilter] = useState<'Todos' | 'Em cuidado' | 'Prontos para adoção'>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAnimalForm, setShowAnimalForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [connection, setConnection] = useState<'loading' | 'mysql' | 'local'>('loading')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/health').then((response) => response.ok ? response.json() : Promise.reject()).then((health) => {
      if (!active) return
      if (health.storage !== 'mysql') { setConnection('local'); return }
      return Promise.all([
        fetch('/api/animals').then((response) => response.ok ? response.json() as Promise<Animal[]> : Promise.reject()),
        fetch('/api/expenses').then((response) => response.ok ? response.json() as Promise<Expense[]> : Promise.reject()),
        fetch('/api/expenses/monthly').then((response) => response.ok ? response.json() as Promise<typeof monthSpend> : Promise.reject()),
      ]).then(([remoteAnimals, remoteExpenses, remoteMonthlySpend]) => {
        if (!active) return
        setAnimals(remoteAnimals)
        setExpenses(remoteExpenses)
        setMonthlySpend(remoteMonthlySpend)
        setConnection('mysql')
      })
    }).catch(() => { if (active) setConnection('local') })
    return () => { active = false }
  }, [])

  useEffect(() => { localStorage.setItem('petapp-animals', JSON.stringify(animals)) }, [animals])
  useEffect(() => { localStorage.setItem('petapp-expenses', JSON.stringify(expenses)) }, [expenses])

  const countFor = (stage: Stage) => animals.filter((animal) => animal.stage === stage).length
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
  const categoryData = categoryMeta.map((category) => ({ ...category, value: expenses.filter((expense) => expense.category === category.name).reduce((total, expense) => total + expense.amount, 0) }))
  const topCategory = categoryData.reduce((largest, category) => category.value > largest.value ? category : largest, categoryData[0])
  const filteredAnimals = animals.filter((animal) =>
    (stageFilter === 'Todos' || animal.stage === stageFilter)
    && (animalFilter === 'Todos' || (animalFilter === 'Em cuidado' ? animal.stage !== 'Castrado' : animal.stage === 'Castrado'))
    && `${animal.name} ${animal.breed}`.toLowerCase().includes(query.toLowerCase()),
  )
  const pageSize = 6
  const pageCount = Math.max(1, Math.ceil(filteredAnimals.length / pageSize))
  const visibleAnimals = filteredAnimals.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function openAnimalForm(animal: Animal | null = null) {
    setEditingAnimal(animal)
    setShowAnimalForm(true)
  }

  async function saveAnimal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const wasEditing = editingAnimal !== null
    const animal: Animal = {
      id: editingAnimal?.id ?? Date.now(),
      name: String(form.get('name')).trim(),
      age: String(form.get('age')).trim() || 'Sin dato',
      breed: String(form.get('breed')).trim() || 'Mestizo',
      sex: String(form.get('sex')),
      stage: editingAnimal?.stage ?? 'Nuevo',
      image: editingAnimal?.image ?? photos[animals.length % photos.length],
      rescued: editingAnimal?.rescued ?? 'hoy',
    }
    setAnimals((current) => wasEditing ? current.map((item) => item.id === animal.id ? animal : item) : [animal, ...current])
    setShowAnimalForm(false)
    setEditingAnimal(null)
    setNotice(wasEditing ? `Ficha de ${animal.name} actualizada` : `${animal.name} ya está en la lista de cuidados`)
    if (connection !== 'mysql') return
    try {
      const response = await fetch(wasEditing ? `/api/animals/${animal.id}` : '/api/animals', {
        method: wasEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      })
      if (response.ok) { const saved = await response.json() as Animal; setAnimals((current) => current.map((item) => item.id === animal.id ? saved : item)) }
    } catch { /* Local mode remains available. */ }
  }

  async function advanceAnimal(animal: Animal) {
    const index = stages.indexOf(animal.stage)
    if (index < 0 || index === stages.length - 1) return
    const stage = stages[index + 1]
    setAnimals((current) => current.map((item) => item.id === animal.id ? { ...item, stage } : item))
    setNotice(`${animal.name}: ${stage.toLowerCase()}`)
    if (connection !== 'mysql') return
    try { await fetch(`/api/animals/${animal.id}/stage`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stage }) }) } catch { /* Local mode remains available. */ }
  }

  async function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const expense: Expense = { id: Date.now(), title: String(form.get('title')).trim(), category: String(form.get('category')), date: 'hoy', amount: Number(form.get('amount')) }
    setExpenses((current) => [expense, ...current])
    setShowExpenseForm(false)
    if (connection !== 'mysql') return
    try {
      const response = await fetch('/api/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(expense) })
      if (response.ok) { const saved = await response.json() as Expense; setExpenses((current) => current.map((item) => item.id === expense.id ? saved : item)) }
    } catch { /* Local mode remains available. */ }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" onClick={() => setPage('inicio')}><span className="brand-mark"><PawPrint size={21} strokeWidth={2.3} /></span><span>petapp<span className="brand-period">.</span><small>REFUGIO</small></span></a>
        <div className="nav-label">MENÚ PRINCIPAL</div>
        <nav className="side-nav" aria-label="Navegación principal">
          <button className={page === 'inicio' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('inicio')}><LayoutDashboard size={18} />Visão geral</button>
          <button className={page === 'animales' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('animales')}><PawPrint size={18} />Animais<span className="nav-count">{animals.length}</span></button>
          <button className={page === 'gastos' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('gastos')}><Activity size={18} />Despesas</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="rescue-note"><span className="rescue-icon"><Heart size={17} fill="currentColor" /></span><p><strong>Un hogar empieza acá.</strong><span>Cada cuidado cuenta.</span></p><Sparkles size={17} /></div>
          <button className="profile-button"><span className="profile-avatar">AM</span><span className="profile-copy"><strong>Andrea Méndez</strong><small>Administradora</small></span><MoreHorizontal size={20} /></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Refúgio</span><ChevronRight size={14} /><strong>{page === 'inicio' ? 'Visão geral' : page === 'animales' ? 'Animais' : 'Despesas'}</strong></div><div className="topbar-right"><span className={`connection-pill ${connection}`}><i />{connection === 'mysql' ? 'MySQL conectado' : connection === 'local' ? 'Modo local' : 'Conectando'}</span><button className="icon-button help-button" aria-label="Ajuda"><CircleHelp size={18} /></button><span className="top-avatar">AM</span></div></header>

        <div className="page-wrap">
          {page === 'inicio' && <>
            <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" />PANEL DEL REFUGIO <span className="eyebrow-date"><CalendarDays size={13} />{today}</span></div><h1>Hola, Andrea <span className="wave">✳</span></h1><p className="page-subtitle">Así va el cuidado de tus animales esta semana.</p></div><button className="primary-button" onClick={() => openAnimalForm()}><Plus size={17} />Nuevo animal</button></section>
            <section className="summary-grid" aria-label="Resumen del refugio">
              <article className="summary-card"><div className="summary-top"><span>Animales en cuidado</span><span className="summary-icon green"><PawPrint size={17} /></span></div><div className="summary-value">{animals.length}<span className="summary-unit"> perros</span></div><div className="summary-foot"><span className="trend up"><ArrowUpRight size={14} />2</span><span>nuevos este mes</span><span className="summary-divider" /><span className="summary-small">{countFor('Castrado')} listos para adopción</span></div></article>
              <article className="summary-card"><div className="summary-top"><span>En preparación</span><span className="summary-icon orange"><Sparkles size={17} /></span></div><div className="summary-value">{animals.filter((animal) => animal.stage !== 'Castrado').length}<span className="summary-unit"> en proceso</span></div><div className="summary-foot"><span className="stage-mini"><i className="stage-dot dot-new" />{countFor('Nuevo')} nuevos</span><span className="stage-mini"><i className="stage-dot dot-vet" />{countFor('Revisión veterinaria')} veterinario</span></div></article>
              <article className="summary-card"><div className="summary-top"><span>Gastos registrados</span><span className="summary-icon blue"><Activity size={17} /></span></div><div className="summary-value value-currency">{money(totalExpenses)}</div><div className="summary-foot"><span className="summary-small">{expenses.length} movimientos guardados</span></div></article>
            </section>

            <section className="dashboard-grid">
              <article className="panel spend-panel"><div className="panel-heading"><div><span className="section-kicker">FINANZAS</span><h2>Gastos del refugio</h2></div><button className="period-button">Últimos 6 meses <ChevronDown size={15} /></button></div><div className="spend-total"><strong>{money(monthlySpend[monthlySpend.length - 1]?.amount ?? 0)}</strong><span className="spend-caption">último mes registrado</span></div><div className="bar-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlySpend} margin={{ top: 8, right: 6, bottom: 0, left: -12 }}><CartesianGrid vertical={false} stroke="#e9ece6" strokeDasharray="3 5" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8a9189', fontSize: 12 }} dy={9} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa097', fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} /><Tooltip cursor={{ fill: '#eff3ed' }} formatter={(value) => [money(Number(value)), 'Gastos']} contentStyle={{ border: '1px solid #e5e9e1', borderRadius: 8, fontSize: 12 }} /><Bar dataKey="amount" fill="#78947b" radius={[5, 5, 0, 0]} maxBarSize={34} /></BarChart></ResponsiveContainer></div><div className="chart-footnote"><span><i className="legend-dot sage" />Gastos totales</span><span>ARS · período mensual</span></div></article>
              <article className="panel distribution-panel"><div className="panel-heading"><div><span className="section-kicker">CUIDADOS</span><h2>Estado de la manada</h2></div><button className="icon-button subtle" aria-label="Más opciones"><MoreHorizontal size={19} /></button></div><div className="donut-wrap"><div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={stages.map((stage) => ({ name: stage, value: countFor(stage) || 0.001 }))} dataKey="value" nameKey="name" innerRadius="72%" outerRadius="94%" paddingAngle={4} stroke="none" startAngle={90} endAngle={-270}>{stages.map((stage, index) => <Cell key={stage} fill={stageColors[index]} />)}</Pie><Tooltip formatter={(_, name) => [countFor(name as Stage), name]} contentStyle={{ border: '1px solid #e5e9e1', borderRadius: 8, fontSize: 12 }} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>{animals.length}</strong><span>perritos</span></div></div><div className="stage-legend">{stages.map((stage, index) => <div className="legend-row" key={stage}><span className="legend-color" style={{ background: stageColors[index] }} /><span>{stage}</span><strong>{countFor(stage)}</strong></div>)}</div></div><button className="text-link" onClick={() => setPage('animales')}>Ver todos los animales <ArrowRight size={15} /></button></article>
            </section>

            <section className="panel animals-panel"><div className="panel-heading animals-heading"><div><span className="section-kicker">SEGUIMIENTO DIARIO</span><h2>Los que necesitan atención</h2></div><button className="text-link" onClick={() => setPage('animales')}>Ver todos <ArrowRight size={15} /></button></div><AnimalTable animals={animals.filter((animal) => animal.stage !== 'Castrado').slice(0, 4)} onAdvance={advanceAnimal} /></section>
            <div className="dashboard-bottom"><div className="soft-banner"><span className="banner-icon"><Heart size={19} fill="currentColor" /></span><div><strong>Pequeños pasos, grandes cambios.</strong><span>Ya llevan {animals.length ? 18 : 0} días cuidando juntos.</span></div><span className="banner-decoration">✳</span></div><div className="tip-card"><span className="tip-icon"><ShieldCheck size={18} /></span><div><strong>Recordatorio de cuidado</strong><span>Revisá las vacunas de este mes.</span></div><button className="icon-button subtle" aria-label="Ver recordatorio"><ArrowRight size={17} /></button></div></div>
          </>}

          {page === 'animales' && <>
            <section className="directory-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" />GESTÃO DO REFÚGIO</div>
                <div className="directory-title-row"><h1>Diretório de Animais</h1><span className="directory-total">{animals.length} ativos</span></div>
                <p className="page-subtitle">Acompanhe fichas, cuidados e a preparação para adoção.</p>
              </div>
              <div className="directory-actions">
                <label className="stage-filter"><span>Etapa</span><select value={stageFilter} onChange={(event) => { setStageFilter(event.target.value); setCurrentPage(1) }}><option>Todos</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><ChevronDown size={15} /></label>
                <button className="primary-button" onClick={() => openAnimalForm()}><Plus size={17} />Novo animal</button>
              </div>
            </section>
            <div className="directory-toolbar">
              <div className="directory-filters" aria-label="Filtros de animais">
                {(['Todos', 'Em cuidado', 'Prontos para adoção'] as const).map((filter) => <button key={filter} className={animalFilter === filter ? 'filter-chip selected' : 'filter-chip'} onClick={() => { setAnimalFilter(filter); setCurrentPage(1) }}>{filter}<span>{filter === 'Todos' ? animals.length : filter === 'Em cuidado' ? animals.filter((animal) => animal.stage !== 'Castrado').length : countFor('Castrado')}</span></button>)}
              </div>
              <label className="directory-search"><Search size={17} /><input aria-label="Buscar animal" value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1) }} placeholder="Buscar por nome ou raça..." /></label>
            </div>
            <AnimalCards animals={visibleAnimals} onAdvance={advanceAnimal} onDetails={setSelectedAnimal} onEdit={openAnimalForm} />
            <footer className="directory-footer"><p>Exibindo <strong>{filteredAnimals.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredAnimals.length)}</strong> de <strong>{filteredAnimals.length}</strong> animais</p><div className="directory-pagination"><button aria-label="Página anterior" disabled={currentPage <= 1} onClick={() => setCurrentPage((current) => current - 1)}><ChevronLeft size={17} /></button><span>{currentPage} / {pageCount}</span><button aria-label="Página seguinte" disabled={currentPage >= pageCount} onClick={() => setCurrentPage((current) => current + 1)}><ChevronRight size={17} /></button></div></footer>
          </>}

          {page === 'gastos' && <><section className="welcome-row page-title-row"><div><div className="eyebrow"><span className="eyebrow-dot" />TRANSPARENCIA Y CUIDADO</div><h1>Gastos del refugio</h1><p className="page-subtitle">Cada aporte se convierte en cuidado.</p></div><button className="primary-button" onClick={() => setShowExpenseForm(true)}><Plus size={17} />Registrar gasto</button></section><section className="summary-grid expense-summary"><article className="summary-card"><div className="summary-top"><span>Total registrado</span><span className="summary-icon green"><Activity size={17} /></span></div><div className="summary-value value-currency">{money(totalExpenses)}</div><div className="summary-foot"><span className="summary-small">{expenses.length} movimientos registrados</span></div></article><article className="summary-card"><div className="summary-top"><span>Mayor inversión</span><span className="summary-icon orange"><Dog size={17} /></span></div><div className="summary-value">{topCategory.value ? topCategory.name : 'Sin gastos'}</div><div className="summary-foot"><span className="summary-small">Por monto acumulado</span></div></article><article className="summary-card"><div className="summary-top"><span>Animales cuidados</span><span className="summary-icon blue"><Heart size={17} /></span></div><div className="summary-value">{animals.length}<span className="summary-unit"> perritos</span></div><div className="summary-foot"><span className="summary-small">Gracias a cada aporte</span></div></article></section><section className="dashboard-grid expense-dashboard"><article className="panel spend-panel"><div className="panel-heading"><div><span className="section-kicker">EVOLUCIÓN</span><h2>Gastos por mes</h2></div><button className="period-button">Últimos 6 meses <ChevronDown size={15} /></button></div><div className="bar-chart large-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlySpend} margin={{ top: 10, right: 8, bottom: 0, left: -8 }}><CartesianGrid vertical={false} stroke="#e9ece6" strokeDasharray="3 5" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8a9189', fontSize: 12 }} dy={9} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa097', fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} /><Tooltip formatter={(value) => [money(Number(value)), 'Gastos']} contentStyle={{ border: '1px solid #e5e9e1', borderRadius: 8, fontSize: 12 }} /><Bar dataKey="amount" fill="#78947b" radius={[5, 5, 0, 0]} maxBarSize={48} /></BarChart></ResponsiveContainer></div></article><article className="panel category-panel"><div className="panel-heading"><div><span className="section-kicker">DISTRIBUCIÓN</span><h2>Por categoría</h2></div></div><div className="category-chart-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="90%" paddingAngle={4} stroke="none">{categoryData.map((category) => <Cell key={category.name} fill={category.color} />)}</Pie><Tooltip formatter={(value) => money(Number(value))} contentStyle={{ border: '1px solid #e5e9e1', borderRadius: 8, fontSize: 12 }} /></PieChart></ResponsiveContainer><div className="category-center"><span>Total</span><strong>{money(totalExpenses)}</strong></div></div><div className="category-legend">{categoryData.map((category) => <div className="category-legend-row" key={category.name}><span className="legend-color" style={{ background: category.color }} />{category.name}<strong>{money(category.value)}</strong></div>)}</div></article></section><section className="panel expense-list-panel"><div className="panel-heading"><div><span className="section-kicker">MOVIMIENTOS RECIENTES</span><h2>Registro de gastos</h2></div><span className="expense-count">{expenses.length} movimientos</span></div><div className="expense-list">{expenses.map((expense) => { const meta = categoryMeta.find((category) => category.name === expense.category) ?? categoryMeta[0]; const Icon = meta.icon; return <div className="expense-row" key={expense.id}><span className="expense-icon" style={{ color: meta.color, background: `${meta.color}18` }}><Icon size={17} /></span><span className="expense-title"><strong>{expense.title}</strong><small>{expense.category} · {expense.date}</small></span><strong className="expense-amount">{money(expense.amount)}</strong></div> })}</div></section></>}
        </div>
      </main>

      {showAnimalForm && <Modal title={editingAnimal ? 'Editar ficha' : 'Sumar un animal'} subtitle={editingAnimal ? 'Actualizá los datos del animal.' : 'Un nuevo comienzo empieza con cuidado.'} onClose={() => { setShowAnimalForm(false); setEditingAnimal(null) }}><form className="entry-form" onSubmit={saveAnimal}><label>Nombre<input name="name" defaultValue={editingAnimal?.name} placeholder="¿Cómo le vamos a llamar?" required autoFocus /></label><div className="form-row"><label>Edad aproximada<input name="age" defaultValue={editingAnimal?.age === 'Sin dato' ? '' : editingAnimal?.age} placeholder="Ej. 6 meses" /></label><label>Sexo<select name="sex" defaultValue={editingAnimal?.sex ?? 'Macho'}><option>Macho</option><option>Hembra</option></select></label></div><label>Raza o descripción<input name="breed" defaultValue={editingAnimal?.breed} placeholder="Ej. Mestizo, tamaño mediano" /></label><button className="primary-button form-submit" type="submit">{editingAnimal ? <Check size={17} /> : <Plus size={17} />}{editingAnimal ? 'Guardar cambios' : 'Agregar al refugio'}</button></form></Modal>}
      {selectedAnimal && <Modal title={selectedAnimal.name} subtitle={`${selectedAnimal.breed} · ${selectedAnimal.age}`} onClose={() => setSelectedAnimal(null)}><div className="record-sheet"><img src={selectedAnimal.image} alt={`Foto de ${selectedAnimal.name}`} /><dl><div><dt>Sexo</dt><dd>{selectedAnimal.sex === 'Hembra' ? 'Fêmea' : 'Macho'}</dd></div><div><dt>Resgate</dt><dd>{selectedAnimal.rescued}</dd></div><div><dt>Etapa atual</dt><dd>{selectedAnimal.stage}</dd></div><div><dt>Próxima etapa</dt><dd>{stages[stages.indexOf(selectedAnimal.stage) + 1] ?? 'Pronto para adoção'}</dd></div></dl><div className="record-progress">{stages.map((stage, index) => <span className={index <= stages.indexOf(selectedAnimal.stage) ? 'complete' : ''} key={stage}><i>{index < stages.indexOf(selectedAnimal.stage) ? <Check size={12} /> : index + 1}</i>{stage}</span>)}</div></div></Modal>}
      {showExpenseForm && <Modal title="Registrar un gasto" subtitle="Anotá el cuidado que se convirtió en una historia mejor." onClose={() => setShowExpenseForm(false)}><form className="entry-form" onSubmit={addExpense}><label>Descripción<input name="title" placeholder="Ej. Alimento para cachorros" required autoFocus /></label><div className="form-row"><label>Categoría<select name="category">{categoryMeta.map((category) => <option key={category.name}>{category.name}</option>)}</select></label><label>Monto en ARS<input name="amount" type="number" min="1" placeholder="25000" required /></label></div><button className="primary-button form-submit" type="submit"><Plus size={17} />Guardar gasto</button></form></Modal>}
      {notice && <div className="toast" role="status"><Check size={16} />{notice}<button aria-label="Cerrar aviso" onClick={() => setNotice('')}><X size={15} /></button></div>}
    </div>
  )
}

function AnimalTable({ animals, onAdvance }: { animals: Animal[]; onAdvance: (animal: Animal) => void }) {
  return <div className="animal-table"><div className="table-header"><span>ANIMAL</span><span>ESTADO ACTUAL</span><span>INGRESO</span><span>PRÓXIMO PASO</span><span /></div>{animals.length === 0 ? <div className="empty-state"><PawPrint size={24} /><strong>No encontramos animales</strong><span>Probá con otro nombre o estado.</span></div> : animals.map((animal) => { const stageIndex = stages.indexOf(animal.stage); const isReady = stageIndex === stages.length - 1; return <div className="animal-row" key={animal.id}><div className="animal-profile"><img className="animal-photo" src={animal.image} alt={`Foto de ${animal.name}`} /><span className="animal-info"><strong>{animal.name}</strong><small>{animal.breed} · {animal.age}</small></span></div><span><span className={`status-pill status-${stageIndex}`}>{animal.stage}</span></span><span className="rescued-date">{animal.rescued}</span><span>{isReady ? <span className="ready-badge"><Heart size={13} />Listo para adoptar</span> : <button className="advance-button" onClick={() => onAdvance(animal)}>Avanzar etapa <ArrowRight size={13} /></button>}</span><button className="row-more" aria-label={`Más opciones para ${animal.name}`}><MoreHorizontal size={18} /></button></div> })}<div className="table-footer"><span>Mostrando {animals.length} animales</span><div className="pagination"><button aria-label="Página anterior" disabled><ChevronLeft size={15} /></button><button className="page-number">1</button><button aria-label="Página siguiente" disabled><ChevronRight size={15} /></button></div></div></div>
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X size={18} /></button><span className="modal-icon"><PawPrint size={20} /></span><h2 id="modal-title">{title}</h2><p>{subtitle}</p>{children}</section></div>
}

export default App

function AnimalCards({ animals: cardAnimals, onAdvance, onDetails, onEdit }: { animals: Animal[]; onAdvance: (animal: Animal) => void; onDetails: (animal: Animal) => void; onEdit: (animal: Animal) => void }) {
  if (!cardAnimals.length) return <div className="resident-empty"><PawPrint size={26} /><strong>Nenhum animal encontrado</strong><span>Ajuste os filtros ou cadastre um novo residente.</span></div>
  return <div className="resident-grid">{cardAnimals.map((animal) => {
    const stageIndex = stages.indexOf(animal.stage)
    const nextStage = stages[stageIndex + 1]
    return <article className="resident-card" key={animal.id}>
      <div className="resident-image-frame"><img src={animal.image} alt={`Foto de ${animal.name}`} /><span className={`resident-status status-${stageIndex}`}>{animal.stage}</span><span className="resident-rescue">Resgatado {animal.rescued === 'hoy' ? 'hoje' : animal.rescued}</span></div>
      <div className="resident-card-content"><div className="resident-identity"><div><h2>{animal.name}</h2><p>Cão · {animal.breed}</p></div><span className="resident-age">{animal.age}</span></div><div className="resident-metadata"><div><span>ETAPA ATUAL</span><strong>{animal.stage}</strong></div><div><span>PRÓXIMO PASSO</span>{nextStage ? <button onClick={() => onAdvance(animal)}>{nextStage}<ArrowRight size={14} /></button> : <strong className="adoptable-label">Apto para adoção</strong>}</div></div></div>
      <footer className="resident-card-actions"><button className="card-details-button" onClick={() => onDetails(animal)}><FileText size={16} />Ficha clínica completa</button><button className="card-edit-button" onClick={() => onEdit(animal)} aria-label={`Editar dados de ${animal.name}`} title="Editar dados"><Pencil size={16} /></button></footer>
    </article>
  })}</div>
}
