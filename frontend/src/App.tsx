import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Activity, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Dog, FileText, Heart, LayoutDashboard, MoreHorizontal, PawPrint, Pencil, Plus, Search, ShieldCheck, Sparkles, Stethoscope, Syringe, Truck, X } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './App.css'
import './theme.css'

type Stage = 'Nuevo' | 'Corte de pelo' | 'Bañado' | 'Revisión veterinaria' | 'Vacunado' | 'Castrado'
type Animal = {
  id: number
  name: string
  age: string
  breed: string
  sex: string
  stage: Stage
  image: string
  rescued: string
}
type Expense = {
  id: number
  title: string
  category: string
  date: string
  amount: number
}

const stages: Stage[] = ['Nuevo', 'Corte de pelo', 'Bañado', 'Revisión veterinaria', 'Vacunado', 'Castrado']
const photos = ['https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=160&q=80', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&q=80', 'https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=160&q=80', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=160&q=80']
const startingAnimals: Animal[] = [
  {
    id: 1,
    name: 'Milo',
    age: '8 meses',
    breed: 'Sem raça definida',
    sex: 'Macho',
    stage: 'Vacunado',
    image: photos[0],
    rescued: 'há 12 dias',
  },
  {
    id: 2,
    name: 'Luna',
    age: '2 anos',
    breed: 'Labrador sem raça definida',
    sex: 'Hembra',
    stage: 'Revisión veterinaria',
    image: photos[1],
    rescued: 'há 8 dias',
  },
  {
    id: 3,
    name: 'Rocco',
    age: '1 ano',
    breed: 'Sem raça definida',
    sex: 'Macho',
    stage: 'Bañado',
    image: photos[2],
    rescued: 'há 5 dias',
  },
  {
    id: 4,
    name: 'Nina',
    age: '4 meses',
    breed: 'Sem raça definida',
    sex: 'Hembra',
    stage: 'Nuevo',
    image: photos[3],
    rescued: 'há 2 dias',
  },
]
const categoryMeta = [
  { name: 'Comida', color: '#4ade80', icon: Dog },
  { name: 'Veterinario', color: '#fbbf24', icon: Stethoscope },
  { name: 'Vacunas', color: '#34d399', icon: Syringe },
  { name: 'Traslados', color: '#e07a5f', icon: Truck },
]
const stageColors = ['#fbbf24', '#d97706', '#e07a5f', '#b45309', '#34d399', '#4ade80']
const monthSpend = [
  { month: 'Abr', amount: 182000 },
  { month: 'Mai', amount: 215000 },
  { month: 'Jun', amount: 194000 },
  { month: 'Jul', amount: 247000 },
  { month: 'Ago', amount: 228000 },
  { month: 'Set', amount: 276000 },
]
const startingExpenses: Expense[] = [
  {
    id: 1,
    title: 'Ração · 4 sacos',
    category: 'Comida',
    date: '26 set.',
    amount: 68500,
  },
  {
    id: 2,
    title: 'Consulta e retorno da Luna',
    category: 'Veterinario',
    date: '24 set.',
    amount: 42000,
  },
  {
    id: 3,
    title: 'Vacina múltipla · Milo',
    category: 'Vacunas',
    date: '22 set.',
    amount: 28500,
  },
  {
    id: 4,
    title: 'Transporte de San Martín',
    category: 'Traslados',
    date: '18 set.',
    amount: 18000,
  },
]
const stageLabels: Record<Stage, string> = {
  Nuevo: 'Novo',
  'Corte de pelo': 'Tosa',
  Bañado: 'Banho',
  'Revisión veterinaria': 'Consulta veterinária',
  Vacunado: 'Vacinado',
  Castrado: 'Castrado',
}
const categoryLabels: Record<string, string> = {
  Comida: 'Alimentação',
  Veterinario: 'Veterinário',
  Vacunas: 'Vacinas',
  Traslados: 'Transporte',
}
const monthLabels: Record<string, string> = {
  Jan: 'Jan',
  Feb: 'Fev',
  Mar: 'Mar',
  Apr: 'Abr',
  May: 'Mai',
  Jun: 'Jun',
  Jul: 'Jul',
  Aug: 'Ago',
  Sep: 'Set',
  Oct: 'Out',
  Nov: 'Nov',
  Dec: 'Dez',
}
const stageLabel = (stage: Stage) => stageLabels[stage]
const categoryLabel = (category: string) => categoryLabels[category] ?? category
const monthLabel = (month: string) => monthLabels[month] ?? monthLabels[month.slice(0, 1).toUpperCase() + month.slice(1).toLowerCase()] ?? month
const sexLabel = (sex: string) => (sex === 'Hembra' ? 'Fêmea' : sex)
const ageLabel = (age: string) => {
  if (age === 'Sin dato') return 'Não informado'
  return age.replace(/\baños?\b/g, (year) => (year === 'año' ? 'ano' : 'anos'))
}
const breedLabel = (breed: string) =>
  ({
    Mestizo: 'Sem raça definida',
    Mestiza: 'Sem raça definida',
    'Labrador mestiza': 'Labrador sem raça definida',
  })[breed] ?? breed
const dateLabel = (date: string) => {
  if (date === 'hoy' || date === 'hoje') return 'Hoje'
  const relativeDate = /^hace (\d+) días?$/.exec(date)
  if (relativeDate) return `há ${relativeDate[1]} ${Number(relativeDate[1]) === 1 ? 'dia' : 'dias'}`
  return date.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/gi, monthLabel)
}
const money = (amount: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount)
const today = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())
const loadSaved = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [animals, setAnimals] = useState<Animal[]>(() => loadSaved('petapp-animals', startingAnimals))
  const [expenses, setExpenses] = useState<Expense[]>(() => loadSaved('petapp-expenses', startingExpenses))
  const [monthlySpend, setMonthlySpend] = useState(monthSpend)
  const [page, setPage] = useState<'inicio' | 'animales' | 'gastos'>('inicio')
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('Todos')
  const [animalFilter, setAnimalFilter] = useState<'Todos' | 'Sob cuidados' | 'Prontos para adoção'>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAnimalForm, setShowAnimalForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [connection, setConnection] = useState<'loading' | 'mysql' | 'local'>('loading')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    fetch('/api/health')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((health) => {
        if (!active) return
        if (health.storage !== 'mysql') {
          setConnection('local')
          return
        }
        return Promise.all([fetch('/api/animals').then((response) => (response.ok ? (response.json() as Promise<Animal[]>) : Promise.reject())), fetch('/api/expenses').then((response) => (response.ok ? (response.json() as Promise<Expense[]>) : Promise.reject())), fetch('/api/expenses/monthly').then((response) => (response.ok ? (response.json() as Promise<typeof monthSpend>) : Promise.reject()))]).then(([remoteAnimals, remoteExpenses, remoteMonthlySpend]) => {
          if (!active) return
          setAnimals(remoteAnimals)
          setExpenses(remoteExpenses)
          setMonthlySpend(remoteMonthlySpend)
          setConnection('mysql')
        })
      })
      .catch(() => {
        if (active) setConnection('local')
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('petapp-animals', JSON.stringify(animals))
  }, [animals])
  useEffect(() => {
    localStorage.setItem('petapp-expenses', JSON.stringify(expenses))
  }, [expenses])

  const countFor = (stage: Stage) => animals.filter((animal) => animal.stage === stage).length
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
  const categoryData = categoryMeta.map((category) => ({
    ...category,
    value: expenses.filter((expense) => expense.category === category.name).reduce((total, expense) => total + expense.amount, 0),
  }))
  const topCategory = categoryData.reduce((largest, category) => (category.value > largest.value ? category : largest), categoryData[0])
  const filteredAnimals = animals.filter((animal) => (stageFilter === 'Todos' || animal.stage === stageFilter) && (animalFilter === 'Todos' || (animalFilter === 'Sob cuidados' ? animal.stage !== 'Castrado' : animal.stage === 'Castrado')) && `${animal.name} ${breedLabel(animal.breed)}`.toLowerCase().includes(query.toLowerCase()))
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
      age: String(form.get('age')).trim() || 'Não informado',
      breed: String(form.get('breed')).trim() || 'Sem raça definida',
      sex: String(form.get('sex')),
      stage: editingAnimal?.stage ?? 'Nuevo',
      image: editingAnimal?.image ?? photos[animals.length % photos.length],
      rescued: editingAnimal?.rescued ?? 'hoy',
    }
    setAnimals((current) => (wasEditing ? current.map((item) => (item.id === animal.id ? animal : item)) : [animal, ...current]))
    setShowAnimalForm(false)
    setEditingAnimal(null)
    setNotice(wasEditing ? `Ficha de ${animal.name} atualizada` : `${animal.name} agora está na lista de cuidados`)
    if (connection !== 'mysql') return
    try {
      const response = await fetch(wasEditing ? `/api/animals/${animal.id}` : '/api/animals', {
        method: wasEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      })
      if (response.ok) {
        const saved = (await response.json()) as Animal
        setAnimals((current) => current.map((item) => (item.id === animal.id ? saved : item)))
      }
    } catch {
      /* Local mode remains available. */
    }
  }

  async function advanceAnimal(animal: Animal) {
    const index = stages.indexOf(animal.stage)
    if (index < 0 || index === stages.length - 1) return
    const stage = stages[index + 1]
    setAnimals((current) => current.map((item) => (item.id === animal.id ? { ...item, stage } : item)))
    setNotice(`${animal.name}: ${stageLabel(stage).toLowerCase()}`)
    if (connection !== 'mysql') return
    try {
      await fetch(`/api/animals/${animal.id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage }),
      })
    } catch {
      /* Local mode remains available. */
    }
  }

  async function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const expense: Expense = {
      id: Date.now(),
      title: String(form.get('title')).trim(),
      category: String(form.get('category')),
      date: 'hoje',
      amount: Number(form.get('amount')),
    }
    setExpenses((current) => [expense, ...current])
    setShowExpenseForm(false)
    if (connection !== 'mysql') return
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      })
      if (response.ok) {
        const saved = (await response.json()) as Expense
        setExpenses((current) => current.map((item) => (item.id === expense.id ? saved : item)))
      }
    } catch {
      /* Local mode remains available. */
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" onClick={() => setPage('inicio')}>
          <span className="brand-mark">
            <PawPrint size={21} strokeWidth={2.3} />
          </span>
          <span>
            petapp<span className="brand-period">.</span>
            <small>ABRIGO</small>
          </span>
        </a>
        <div className="nav-label">MENU PRINCIPAL</div>
        <nav className="side-nav" aria-label="Navegação principal">
          <button className={page === 'inicio' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('inicio')}>
            <LayoutDashboard size={18} />
            Visão geral
          </button>
          <button className={page === 'animales' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('animales')}>
            <PawPrint size={18} />
            Animais<span className="nav-count">{animals.length}</span>
          </button>
          <button className={page === 'gastos' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('gastos')}>
            <Activity size={18} />
            Despesas
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="rescue-note">
            <span className="rescue-icon">
              <Heart size={17} fill="currentColor" />
            </span>
            <p>
              <strong>Um lar começa aqui.</strong>
              <span>Cada cuidado faz diferença.</span>
            </p>
            <Sparkles size={17} />
          </div>
          <button className="profile-button">
            <span className="profile-avatar">AM</span>
            <span className="profile-copy">
              <strong>Andrea Méndez</strong>
              <small>Administradora</small>
            </span>
            <MoreHorizontal size={20} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Abrigo</span>
            <ChevronRight size={14} />
            <strong>{page === 'inicio' ? 'Visão geral' : page === 'animales' ? 'Animais' : 'Despesas'}</strong>
          </div>
          <div className="topbar-right">
            <span className={`connection-pill ${connection}`}>
              <i />
              {connection === 'mysql' ? 'Conectado ao MySQL' : connection === 'local' ? 'Modo local' : 'Conectando...'}
            </span>
            <button className="icon-button help-button" aria-label="Ajuda">
              <CircleHelp size={18} />
            </button>
            <span className="top-avatar">AM</span>
          </div>
        </header>

        <div className="page-wrap">
          {page === 'inicio' && (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    PAINEL DO ABRIGO{' '}
                    <span className="eyebrow-date">
                      <CalendarDays size={13} />
                      {today}
                    </span>
                  </div>
                  <h1>
                    Olá, Andrea <span className="wave">✳</span>
                  </h1>
                  <p className="page-subtitle">Veja como está o cuidado dos animais nesta semana.</p>
                </div>
                <button className="primary-button" onClick={() => openAnimalForm()}>
                  <Plus size={17} />
                  Novo animal
                </button>
              </section>
              <section className="summary-grid" aria-label="Resumo do abrigo">
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Animais sob cuidados</span>
                    <span className="summary-icon green">
                      <PawPrint size={17} />
                    </span>
                  </div>
                  <div className="summary-value">
                    {animals.length}
                    <span className="summary-unit"> cães</span>
                  </div>
                  <div className="summary-foot">
                    <span className="trend up">
                      <ArrowUpRight size={14} />2
                    </span>
                    <span>novos neste mês</span>
                    <span className="summary-divider" />
                    <span className="summary-small">{countFor('Castrado')} prontos para adoção</span>
                  </div>
                </article>
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Em preparação</span>
                    <span className="summary-icon orange">
                      <Sparkles size={17} />
                    </span>
                  </div>
                  <div className="summary-value">
                    {animals.filter((animal) => animal.stage !== 'Castrado').length}
                    <span className="summary-unit"> em andamento</span>
                  </div>
                  <div className="summary-foot">
                    <span className="stage-mini">
                      <i className="stage-dot dot-new" />
                      {countFor('Nuevo')} novos
                    </span>
                    <span className="stage-mini">
                      <i className="stage-dot dot-vet" />
                      {countFor('Revisión veterinaria')} em consulta
                    </span>
                  </div>
                </article>
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Despesas registradas</span>
                    <span className="summary-icon blue">
                      <Activity size={17} />
                    </span>
                  </div>
                  <div className="summary-value value-currency">{money(totalExpenses)}</div>
                  <div className="summary-foot">
                    <span className="summary-small">{expenses.length} lançamentos registrados</span>
                  </div>
                </article>
              </section>

              <section className="dashboard-grid">
                <article className="panel spend-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">FINANÇAS</span>
                      <h2>Despesas do abrigo</h2>
                    </div>
                    <button className="period-button">
                      Últimos 6 meses <ChevronDown size={15} />
                    </button>
                  </div>
                  <div className="spend-total">
                    <strong>{money(monthlySpend[monthlySpend.length - 1]?.amount ?? 0)}</strong>
                    <span className="spend-caption">último mês registrado</span>
                  </div>
                  <div className="bar-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySpend} margin={{ top: 8, right: 6, bottom: 0, left: -12 }}>
                        <CartesianGrid vertical={false} stroke="#e9ece6" strokeDasharray="3 5" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8a9189', fontSize: 12 }} tickFormatter={monthLabel} dy={9} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa097', fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} />
                        <Tooltip
                          cursor={{ fill: '#eff3ed' }}
                          formatter={(value) => [money(Number(value)), 'Despesas']}
                          contentStyle={{
                            border: '1px solid #e5e9e1',
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="amount" fill="#78947b" radius={[5, 5, 0, 0]} maxBarSize={34} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="chart-footnote">
                    <span>
                      <i className="legend-dot sage" />
                      Total de despesas
                    </span>
                    <span>ARS · por mês</span>
                  </div>
                </article>
                <article className="panel distribution-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">CUIDADOS</span>
                      <h2>Status dos animais</h2>
                    </div>
                    <button className="icon-button subtle" aria-label="Mais opções">
                      <MoreHorizontal size={19} />
                    </button>
                  </div>
                  <div className="donut-wrap">
                    <div className="donut-chart">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stages.map((stage) => ({
                              name: stage,
                              value: countFor(stage) || 0.001,
                            }))}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="72%"
                            outerRadius="94%"
                            paddingAngle={4}
                            stroke="none"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {stages.map((stage, index) => (
                              <Cell key={stage} fill={stageColors[index]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(_, name) => [countFor(name as Stage), stageLabel(name as Stage)]}
                            contentStyle={{
                              border: '1px solid #e5e9e1',
                              borderRadius: 8,
                              fontSize: 12,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="donut-center">
                        <strong>{animals.length}</strong>
                        <span>cães</span>
                      </div>
                    </div>
                    <div className="stage-legend">
                      {stages.map((stage, index) => (
                        <div className="legend-row" key={stage}>
                          <span className="legend-color" style={{ background: stageColors[index] }} />
                          <span>{stageLabel(stage)}</span>
                          <strong>{countFor(stage)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="text-link" onClick={() => setPage('animales')}>
                    Ver todos os animais <ArrowRight size={15} />
                  </button>
                </article>
              </section>

              <section className="panel animals-panel">
                <div className="panel-heading animals-heading">
                  <div>
                    <span className="section-kicker">ACOMPANHAMENTO DIÁRIO</span>
                    <h2>Animais que precisam de atenção</h2>
                  </div>
                  <button className="text-link" onClick={() => setPage('animales')}>
                    Ver todos <ArrowRight size={15} />
                  </button>
                </div>
                <AnimalTable animals={animals.filter((animal) => animal.stage !== 'Castrado').slice(0, 4)} onAdvance={advanceAnimal} />
              </section>
              <div className="dashboard-bottom">
                <div className="soft-banner">
                  <span className="banner-icon">
                    <Heart size={19} fill="currentColor" />
                  </span>
                  <div>
                    <strong>Pequenos passos, grandes mudanças.</strong>
                    <span>Vocês cuidam juntos há {animals.length ? 18 : 0} dias.</span>
                  </div>
                  <span className="banner-decoration">✳</span>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">
                    <ShieldCheck size={18} />
                  </span>
                  <div>
                    <strong>Lembrete de cuidado</strong>
                    <span>Confira as vacinas deste mês.</span>
                  </div>
                  <button className="icon-button subtle" aria-label="Ver lembrete">
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </>
          )}

          {page === 'animales' && (
            <>
              <section className="directory-heading">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    GESTÃO DO ABRIGO
                  </div>
                  <div className="directory-title-row">
                    <h1>Animais do abrigo</h1>
                    <span className="directory-total">{animals.length} cadastrados</span>
                  </div>
                  <p className="page-subtitle">Acompanhe os cadastros, os cuidados e a preparação para adoção.</p>
                </div>
                <div className="directory-actions">
                  <label className="stage-filter">
                    <span>Etapa</span>
                    <select
                      value={stageFilter}
                      onChange={(event) => {
                        setStageFilter(event.target.value)
                        setCurrentPage(1)
                      }}
                    >
                      <option>Todos</option>
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stageLabel(stage)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} />
                  </label>
                  <button className="primary-button" onClick={() => openAnimalForm()}>
                    <Plus size={17} />
                    Novo animal
                  </button>
                </div>
              </section>
              <div className="directory-toolbar">
                <div className="directory-filters" aria-label="Filtros de animais">
                  {(['Todos', 'Sob cuidados', 'Prontos para adoção'] as const).map((filter) => (
                    <button
                      key={filter}
                      className={animalFilter === filter ? 'filter-chip selected' : 'filter-chip'}
                      onClick={() => {
                        setAnimalFilter(filter)
                        setCurrentPage(1)
                      }}
                    >
                      {filter}
                      <span>{filter === 'Todos' ? animals.length : filter === 'Sob cuidados' ? animals.filter((animal) => animal.stage !== 'Castrado').length : countFor('Castrado')}</span>
                    </button>
                  ))}
                </div>
                <label className="directory-search">
                  <Search size={17} />
                  <input
                    aria-label="Pesquisar animal"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder="Pesquisar por nome ou raça..."
                  />
                </label>
              </div>
              <AnimalCards animals={visibleAnimals} onAdvance={advanceAnimal} onDetails={setSelectedAnimal} onEdit={openAnimalForm} />
              <footer className="directory-footer">
                <p>
                  Exibindo{' '}
                  <strong>
                    {filteredAnimals.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredAnimals.length)}
                  </strong>{' '}
                  de <strong>{filteredAnimals.length}</strong> animais
                </p>
                <div className="directory-pagination">
                  <button aria-label="Página anterior" disabled={currentPage <= 1} onClick={() => setCurrentPage((current) => current - 1)}>
                    <ChevronLeft size={17} />
                  </button>
                  <span>
                    {currentPage} / {pageCount}
                  </span>
                  <button aria-label="Página seguinte" disabled={currentPage >= pageCount} onClick={() => setCurrentPage((current) => current + 1)}>
                    <ChevronRight size={17} />
                  </button>
                </div>
              </footer>
            </>
          )}

          {page === 'gastos' && (
            <>
              <section className="welcome-row page-title-row">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    TRANSPARÊNCIA E CUIDADO
                  </div>
                  <h1>Despesas do abrigo</h1>
                  <p className="page-subtitle">Cada contribuição se transforma em cuidado.</p>
                </div>
                <button className="primary-button" onClick={() => setShowExpenseForm(true)}>
                  <Plus size={17} />
                  Registrar despesa
                </button>
              </section>
              <section className="summary-grid expense-summary">
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Total registrado</span>
                    <span className="summary-icon green">
                      <Activity size={17} />
                    </span>
                  </div>
                  <div className="summary-value value-currency">{money(totalExpenses)}</div>
                  <div className="summary-foot">
                    <span className="summary-small">{expenses.length} lançamentos registrados</span>
                  </div>
                </article>
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Maior despesa</span>
                    <span className="summary-icon orange">
                      <Dog size={17} />
                    </span>
                  </div>
                  <div className="summary-value">{topCategory.value ? categoryLabel(topCategory.name) : 'Nenhuma despesa'}</div>
                  <div className="summary-foot">
                    <span className="summary-small">Por valor acumulado</span>
                  </div>
                </article>
                <article className="summary-card">
                  <div className="summary-top">
                    <span>Animais cuidados</span>
                    <span className="summary-icon blue">
                      <Heart size={17} />
                    </span>
                  </div>
                  <div className="summary-value">
                    {animals.length}
                    <span className="summary-unit"> cães</span>
                  </div>
                  <div className="summary-foot">
                    <span className="summary-small">Agradecemos cada contribuição</span>
                  </div>
                </article>
              </section>
              <section className="dashboard-grid expense-dashboard">
                <article className="panel spend-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">EVOLUÇÃO</span>
                      <h2>Despesas por mês</h2>
                    </div>
                    <button className="period-button">
                      Últimos 6 meses <ChevronDown size={15} />
                    </button>
                  </div>
                  <div className="bar-chart large-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySpend} margin={{ top: 10, right: 8, bottom: 0, left: -8 }}>
                        <CartesianGrid vertical={false} stroke="#e9ece6" strokeDasharray="3 5" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8a9189', fontSize: 12 }} tickFormatter={monthLabel} dy={9} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9aa097', fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} />
                        <Tooltip
                          formatter={(value) => [money(Number(value)), 'Despesas']}
                          contentStyle={{
                            border: '1px solid #e5e9e1',
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="amount" fill="#78947b" radius={[5, 5, 0, 0]} maxBarSize={48} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>
                <article className="panel category-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="section-kicker">DISTRIBUIÇÃO</span>
                      <h2>Por categoria</h2>
                    </div>
                  </div>
                  <div className="category-chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="90%" paddingAngle={4} stroke="none">
                          {categoryData.map((category) => (
                            <Cell key={category.name} fill={category.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [money(Number(value)), categoryLabel(String(name))]}
                          contentStyle={{
                            border: '1px solid #e5e9e1',
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="category-center">
                      <span>Total</span>
                      <strong>{money(totalExpenses)}</strong>
                    </div>
                  </div>
                  <div className="category-legend">
                    {categoryData.map((category) => (
                      <div className="category-legend-row" key={category.name}>
                        <span className="legend-color" style={{ background: category.color }} />
                        {categoryLabel(category.name)}
                        <strong>{money(category.value)}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
              <section className="panel expense-list-panel">
                <div className="panel-heading">
                  <div>
                    <span className="section-kicker">DESPESAS RECENTES</span>
                    <h2>Histórico de despesas</h2>
                  </div>
                  <span className="expense-count">{expenses.length} lançamentos</span>
                </div>
                <div className="expense-list">
                  {expenses.map((expense) => {
                    const meta = categoryMeta.find((category) => category.name === expense.category) ?? categoryMeta[0]
                    const Icon = meta.icon
                    return (
                      <div className="expense-row" key={expense.id}>
                        <span
                          className="expense-icon"
                          style={{
                            color: meta.color,
                            background: `${meta.color}18`,
                          }}
                        >
                          <Icon size={17} />
                        </span>
                        <span className="expense-title">
                          <strong>{expense.title}</strong>
                          <small>
                            {categoryLabel(expense.category)} · {dateLabel(expense.date)}
                          </small>
                        </span>
                        <strong className="expense-amount">{money(expense.amount)}</strong>
                      </div>
                    )
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {showAnimalForm && (
        <Modal
          title={editingAnimal ? 'Editar ficha' : 'Cadastrar animal'}
          subtitle={editingAnimal ? 'Atualize os dados do animal.' : 'Um novo começo começa com cuidado.'}
          onClose={() => {
            setShowAnimalForm(false)
            setEditingAnimal(null)
          }}
        >
          <form className="entry-form" onSubmit={saveAnimal}>
            <label>
              Nome
              <input name="name" defaultValue={editingAnimal?.name} placeholder="Que nome vamos dar a ele?" required autoFocus />
            </label>
            <div className="form-row">
              <label>
                Idade aproximada
                <input name="age" defaultValue={editingAnimal?.age === 'Sin dato' || editingAnimal?.age === 'Não informado' ? '' : editingAnimal?.age} placeholder="Ex.: 6 meses" />
              </label>
              <label>
                Sexo
                <select name="sex" defaultValue={editingAnimal?.sex ?? 'Macho'}>
                  <option>Macho</option>
                  <option value="Hembra">Fêmea</option>
                </select>
              </label>
            </div>
            <label>
              Raça ou descrição
              <input name="breed" defaultValue={editingAnimal ? breedLabel(editingAnimal.breed) : undefined} placeholder="Ex.: sem raça definida, porte médio" />
            </label>
            <button className="primary-button form-submit" type="submit">
              {editingAnimal ? <Check size={17} /> : <Plus size={17} />}
              {editingAnimal ? 'Salvar alterações' : 'Adicionar ao abrigo'}
            </button>
          </form>
        </Modal>
      )}
      {selectedAnimal && (
        <Modal title={selectedAnimal.name} subtitle={`${breedLabel(selectedAnimal.breed)} · ${ageLabel(selectedAnimal.age)}`} onClose={() => setSelectedAnimal(null)}>
          <div className="record-sheet">
            <img src={selectedAnimal.image} alt={`Foto de ${selectedAnimal.name}`} />
            <dl>
              <div>
                <dt>Sexo</dt>
                <dd>{sexLabel(selectedAnimal.sex)}</dd>
              </div>
              <div>
                <dt>Resgatado em</dt>
                <dd>{dateLabel(selectedAnimal.rescued)}</dd>
              </div>
              <div>
                <dt>Etapa atual</dt>
                <dd>{stageLabel(selectedAnimal.stage)}</dd>
              </div>
              <div>
                <dt>Próxima etapa</dt>
                <dd>{stages[stages.indexOf(selectedAnimal.stage) + 1] ? stageLabel(stages[stages.indexOf(selectedAnimal.stage) + 1] as Stage) : 'Pronto para adoção'}</dd>
              </div>
            </dl>
            <div className="record-progress">
              {stages.map((stage, index) => (
                <span className={index <= stages.indexOf(selectedAnimal.stage) ? 'complete' : ''} key={stage}>
                  <i>{index < stages.indexOf(selectedAnimal.stage) ? <Check size={12} /> : index + 1}</i>
                  {stageLabel(stage)}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {showExpenseForm && (
        <Modal title="Registrar despesa" subtitle="Registre o cuidado que transformou uma história." onClose={() => setShowExpenseForm(false)}>
          <form className="entry-form" onSubmit={addExpense}>
            <label>
              Descrição
              <input name="title" placeholder="Ex.: ração para filhotes" required autoFocus />
            </label>
            <div className="form-row">
              <label>
                Categoria
                <select name="category">
                  {categoryMeta.map((category) => (
                    <option key={category.name} value={category.name}>
                      {categoryLabel(category.name)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Valor em ARS
                <input name="amount" type="number" min="1" placeholder="25000" required />
              </label>
            </div>
            <button className="primary-button form-submit" type="submit">
              <Plus size={17} />
              Salvar despesa
            </button>
          </form>
        </Modal>
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={16} />
          {notice}
          <button aria-label="Fechar aviso" onClick={() => setNotice('')}>
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  )
}

function AnimalTable({ animals, onAdvance }: { animals: Animal[]; onAdvance: (animal: Animal) => void }) {
  return (
    <div className="animal-table">
      <div className="table-header">
        <span>ANIMAL</span>
        <span>STATUS ATUAL</span>
        <span>RESGATE</span>
        <span>PRÓXIMA ETAPA</span>
        <span />
      </div>
      {animals.length === 0 ? (
        <div className="empty-state">
          <PawPrint size={24} />
          <strong>Nenhum animal encontrado</strong>
          <span>Tente outro nome ou status.</span>
        </div>
      ) : (
        animals.map((animal) => {
          const stageIndex = stages.indexOf(animal.stage)
          const isReady = stageIndex === stages.length - 1
          return (
            <div className="animal-row" key={animal.id}>
              <div className="animal-profile">
                <img className="animal-photo" src={animal.image} alt={`Foto de ${animal.name}`} />
                <span className="animal-info">
                  <strong>{animal.name}</strong>
                  <small>
                    {breedLabel(animal.breed)} · {ageLabel(animal.age)}
                  </small>
                </span>
              </div>
              <span>
                <span className={`status-pill status-${stageIndex}`}>{stageLabel(animal.stage)}</span>
              </span>
              <span className="rescued-date">{dateLabel(animal.rescued)}</span>
              <span>
                {isReady ? (
                  <span className="ready-badge">
                    <Heart size={13} />
                    Pronto para adoção
                  </span>
                ) : (
                  <button className="advance-button" onClick={() => onAdvance(animal)}>
                    Avançar etapa <ArrowRight size={13} />
                  </button>
                )}
              </span>
              <button className="row-more" aria-label={`Mais opções para ${animal.name}`}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          )
        })
      )}
      <div className="table-footer">
        <span>Exibindo {animals.length} animais</span>
        <div className="pagination">
          <button aria-label="Página anterior" disabled>
            <ChevronLeft size={15} />
          </button>
          <button className="page-number">1</button>
          <button aria-label="Página siguiente" disabled>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
        <span className="modal-icon">
          <PawPrint size={20} />
        </span>
        <h2 id="modal-title">{title}</h2>
        <p>{subtitle}</p>
        {children}
      </section>
    </div>
  )
}

export default App

function AnimalCards({ animals: cardAnimals, onAdvance, onDetails, onEdit }: { animals: Animal[]; onAdvance: (animal: Animal) => void; onDetails: (animal: Animal) => void; onEdit: (animal: Animal) => void }) {
  if (!cardAnimals.length)
    return (
      <div className="resident-empty">
        <PawPrint size={26} />
        <strong>Nenhum animal encontrado</strong>
        <span>Ajuste os filtros ou cadastre um novo residente.</span>
      </div>
    )
  return (
    <div className="resident-grid">
      {cardAnimals.map((animal) => {
        const stageIndex = stages.indexOf(animal.stage)
        const nextStage = stages[stageIndex + 1]
        return (
          <article className="resident-card" key={animal.id}>
            <div className="resident-image-frame">
              <img src={animal.image} alt={`Foto de ${animal.name}`} />
              <span className={`resident-status status-${stageIndex}`}>{stageLabel(animal.stage)}</span>
              <span className="resident-rescue">Resgatado {dateLabel(animal.rescued)}</span>
            </div>
            <div className="resident-card-content">
              <div className="resident-identity">
                <div>
                  <h2>{animal.name}</h2>
                  <p>Cão · {breedLabel(animal.breed)}</p>
                </div>
                <span className="resident-age">{ageLabel(animal.age)}</span>
              </div>
              <div className="resident-metadata">
                <div>
                  <span>ETAPA ATUAL</span>
                  <strong>{stageLabel(animal.stage)}</strong>
                </div>
                <div>
                  <span>PRÓXIMA ETAPA</span>
                  {nextStage ? (
                    <button onClick={() => onAdvance(animal)}>
                      {stageLabel(nextStage)}
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <strong className="adoptable-label">Pronto para adoção</strong>
                  )}
                </div>
              </div>
            </div>
            <footer className="resident-card-actions">
              <button className="card-details-button" onClick={() => onDetails(animal)}>
                <FileText size={16} />
                Prontuário completo
              </button>
              <button className="card-edit-button" onClick={() => onEdit(animal)} aria-label={`Editar dados de ${animal.name}`} title="Editar dados">
                <Pencil size={16} />
              </button>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
