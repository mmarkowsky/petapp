import { expect, test, type Page, type Route } from '@playwright/test'

type Animal = {
  id: number
  name: string
  age: string
  breed: string
  sex: string
  stage: string
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

type ApiOptions = {
  animalPostStatus?: number
  expensePostStatus?: number
  stagePatchStatus?: number
}

async function mockApi(page: Page, options: ApiOptions = {}) {
  const animals: Animal[] = [
    { id: 1, name: 'Milo', age: '8 meses', breed: 'Sem raça definida', sex: 'Macho', stage: 'Nuevo', image: 'https://images.unsplash.com/test-milo', rescued: 'hoje' },
    { id: 2, name: 'Luna', age: '2 anos', breed: 'Labrador sem raça definida', sex: 'Hembra', stage: 'Revisión veterinaria', image: 'https://images.unsplash.com/test-luna', rescued: 'há 8 dias' },
    { id: 3, name: 'Nina', age: '4 meses', breed: 'Sem raça definida', sex: 'Hembra', stage: 'Castrado', image: 'https://images.unsplash.com/test-nina', rescued: 'há 2 dias' },
  ]
  const expenses: Expense[] = [
    { id: 1, title: 'Ração · Milo', category: 'Comida', date: 'hoje', amount: 2500 },
  ]

  await page.route('https://images.unsplash.com/**', (route) => route.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg"/>' }))
  await page.route('**/api/**', async (route: Route) => {
    const request = route.request()
    const url = new URL(request.url())
    const method = request.method()
    const respond = (status: number, body: unknown) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })

    if (url.pathname === '/api/health' && method === 'GET') return respond(200, { status: 'ok', storage: 'mysql', database: 'petapp-test' })
    if (url.pathname === '/api/animals' && method === 'GET') return respond(200, animals)
    if (url.pathname === '/api/expenses' && method === 'GET') return respond(200, expenses)
    if (url.pathname === '/api/expenses/monthly' && method === 'GET') return respond(200, [{ month: 'Sep', amount: 2500 }])

    if (url.pathname === '/api/animals' && method === 'POST') {
      const body = request.postDataJSON() as Omit<Animal, 'id'>
      if (options.animalPostStatus) return respond(options.animalPostStatus, { error: 'O nome é obrigatório.' })
      const animal = { ...body, id: 4 }
      animals.unshift(animal)
      return respond(201, animal)
    }

    const animalMatch = url.pathname.match(/^\/api\/animals\/(\d+)(?:\/(stage))?$/)
    if (animalMatch && method === 'PUT') {
      const body = request.postDataJSON() as Animal
      const index = animals.findIndex((animal) => animal.id === Number(animalMatch[1]))
      animals[index] = body
      return respond(200, body)
    }
    if (animalMatch && method === 'PATCH') {
      if (options.stagePatchStatus) return respond(options.stagePatchStatus, { error: 'Falha simulada.' })
      const body = request.postDataJSON() as { stage: string }
      const animal = animals.find((item) => item.id === Number(animalMatch[1]))
      if (animal) animal.stage = body.stage
      return respond(200, { id: Number(animalMatch[1]), stage: body.stage })
    }

    if (url.pathname === '/api/expenses' && method === 'POST') {
      const body = request.postDataJSON() as Omit<Expense, 'id' | 'date'>
      if (options.expensePostStatus) return respond(options.expensePostStatus, { error: 'Falha simulada.' })
      const expense = { ...body, id: 2, date: 'hoje' }
      expenses.unshift(expense)
      return respond(201, expense)
    }

    return respond(404, { error: 'Endpoint de teste desconhecido.' })
  })
}

test.beforeEach(async ({ page }) => {
  await mockApi(page)
  await page.goto('/')
})

test('navega, filtra e busca texto especial sem quebrar a listagem', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Olá, Andrea' })).toBeVisible()
  await page.getByRole('button', { name: 'Animais 3' }).click()

  const search = page.getByRole('textbox', { name: 'Pesquisar animal' })
  await expect(search).toBeVisible()
  await search.fill('"<>& 🐾')
  await expect(page.locator('.resident-empty')).toBeVisible()
  const resetSearch = page.locator('input[aria-label="Pesquisar animal"]')
  await expect(resetSearch).toBeVisible()
  await resetSearch.fill('')
  await page.getByRole('button', { name: 'Prontos para adoção 1' }).click()

  await expect(page.locator('.resident-card')).toHaveCount(1)
  await expect(page.locator('.resident-status')).toHaveText('Castrado')
})

test('o cadastro bloqueia nome realmente vazio pelo atributo required', async ({ page }) => {
  await page.getByRole('button', { name: 'Animais 3' }).click()
  await page.getByRole('button', { name: 'Novo animal' }).click()
  const name = page.getByRole('textbox', { name: 'Nome' })
  await expect(name).toHaveAttribute('required', '')
  await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(name).toBeFocused()
})

test('cria, avança etapa e edita um animal', async ({ page }) => {
  await page.getByRole('button', { name: 'Animais 3' }).click()
  await page.getByRole('button', { name: 'Novo animal' }).click()
  await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal <tag>')
  await page.getByRole('textbox', { name: 'Idade aproximada' }).fill('999 anos')
  await page.getByRole('combobox', { name: 'Sexo' }).selectOption('Macho')
  await page.getByRole('textbox', { name: 'Raça ou descrição' }).fill('SRD & companhia')
  await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()

  const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'QA animal <tag>' }) })
  await expect(card).toBeVisible()
  await expect(card.locator('.resident-status')).toHaveText('Novo')
  await card.getByRole('button', { name: 'Tosa' }).click()
  await expect(card.locator('.resident-status')).toHaveText('Tosa')
  await card.getByRole('button', { name: 'Editar dados de QA animal <tag>' }).click()
  await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal editado')
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect(page.getByRole('heading', { name: 'QA animal editado' })).toBeVisible()
})

test('registra uma despesa válida e mostra categoria traduzida', async ({ page }) => {
  await page.getByRole('button', { name: 'Despesas' }).click()
  await page.getByRole('button', { name: 'Registrar despesa' }).click()
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Consulta de teste')
  await page.getByRole('combobox', { name: 'Categoria' }).selectOption('Veterinario')
  await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('1800')
  await page.getByRole('button', { name: 'Salvar despesa' }).click()

  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByText('Consulta de teste')).toBeVisible()
  await expect(page.getByText('Veterinário · Hoje')).toBeVisible()
})

test('bloqueia despesa com valor zero antes de chamar a API', async ({ page }) => {
  await page.getByRole('button', { name: 'Despesas' }).click()
  await page.getByRole('button', { name: 'Registrar despesa' }).click()
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Valor inválido')
  const amount = page.getByRole('spinbutton', { name: 'Valor em ARS' })
  await amount.fill('0')
  await page.getByRole('button', { name: 'Salvar despesa' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await amount.evaluate((element: HTMLInputElement) => element.validity.rangeUnderflow)).toBe(true)
})

test('BUG-001: viewport estreito não deve gerar overflow horizontal', async ({ page }) => {
  test.fail(true, 'Bug conhecido: body mantém min-width: 360px em telas de 320px.')
  await page.getByRole('button', { name: 'Animais 3' }).click()
  await page.setViewportSize({ width: 320, height: 740 })
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
})

test('BUG-002: rejeição de nome só com espaços deve ser comunicada', async ({ page }) => {
  test.fail(true, 'Bug conhecido: POST 400 é ignorado e a UI mostra sucesso otimista.')
  await page.route('**/api/animals', async (route) => {
    if (route.request().method() === 'POST') return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'O nome é obrigatório.' }) })
    return route.fallback()
  })
  await page.getByRole('button', { name: 'Animais 3' }).click()
  await page.getByRole('button', { name: 'Novo animal' }).click()
  await page.getByRole('textbox', { name: 'Nome' }).fill('   ')
  await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  await expect(page.getByRole('status')).toContainText('O nome é obrigatório.')
})

test('BUG-003: Escape deve fechar o diálogo e devolver foco', async ({ page }) => {
  test.fail(true, 'Bug conhecido: o diálogo não trata Escape nem restaura o foco.')
  await page.getByRole('button', { name: 'Animais 3' }).click()
  const openButton = page.getByRole('button', { name: 'Novo animal' })
  await openButton.click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(openButton).toBeFocused()
})

test('BUG-003b: a navegação por Tab deve permanecer dentro do diálogo', async ({ page }) => {
  test.fail(true, 'Bug conhecido: o foco sai do diálogo pelo botão de envio.')
  await page.getByRole('button', { name: 'Animais 3' }).click()
  await page.getByRole('button', { name: 'Novo animal' }).click()
  for (let index = 0; index < 5; index += 1) await page.keyboard.press('Tab')
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
})

test('BUG-005: POST de despesa rejeitado não deve manter lançamento fantasma', async ({ page }) => {
  test.fail(true, 'Bug conhecido: o formulário fecha e mantém estado otimista mesmo com HTTP 500.')
  await page.route('**/api/expenses', async (route) => {
    if (route.request().method() === 'POST') return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) })
    return route.fallback()
  })
  await page.getByRole('button', { name: 'Despesas' }).click()
  await page.getByRole('button', { name: 'Registrar despesa' }).click()
  await page.getByRole('textbox', { name: 'Descrição' }).fill('Despesa que falha')
  await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('900')
  await page.getByRole('button', { name: 'Salvar despesa' }).click()
  await page.screenshot({ path: 'tests/vibe-testing/evidence/expense-500-false-success.png', fullPage: false })
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByText('Despesa que falha')).toHaveCount(0)
})

test('BUG-005b: PATCH rejeitado deve reverter avanço otimista da etapa', async ({ page }) => {
  test.fail(true, 'Bug conhecido: a etapa avança na UI mesmo com HTTP 500.')
  await page.route('**/api/animals/*/stage', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) }))
  await page.getByRole('button', { name: 'Animais 3' }).click()
  const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'Milo' }) })
  await card.getByRole('button', { name: 'Tosa' }).click()
  await page.screenshot({ path: 'tests/vibe-testing/evidence/stage-500-false-success.png', fullPage: false })
  await expect(card.locator('.resident-status')).toHaveText('Novo')
})

test('layouts principais não transbordam em desktop, tablet e celular comum', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
    expect(dimensions.document, `overflow em ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport)
  }
})
