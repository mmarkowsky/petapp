# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-002: rejeição de nome só com espaços deve ser comunicada
- Location: tests/e2e/app.spec.ts:169:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('status')
Expected substring: "O nome é obrigatório."
Received string:    " agora está na lista de cuidados"
Timeout: 3000ms

Call log:
  - Expect "toContainText" getByRole('status') with timeout 3000ms
  - waiting for getByRole('status')
    10 × locator resolved to <div class="toast" role="status">…</div>
       - unexpected value " agora está na lista de cuidados"

```

```yaml
- status:
  - text: agora está na lista de cuidados
  - button "Fechar aviso"
```

# Test source

```ts
  79  |     }
  80  | 
  81  |     return respond(404, { error: 'Endpoint de teste desconhecido.' })
  82  |   })
  83  | }
  84  | 
  85  | test.beforeEach(async ({ page }) => {
  86  |   await mockApi(page)
  87  |   await page.goto('/')
  88  | })
  89  | 
  90  | test('navega, filtra e busca texto especial sem quebrar a listagem', async ({ page }) => {
  91  |   await expect(page.getByRole('heading', { name: 'Olá, Andrea' })).toBeVisible()
  92  |   await page.getByRole('button', { name: 'Animais 3' }).click()
  93  | 
  94  |   const search = page.getByRole('textbox', { name: 'Pesquisar animal' })
  95  |   await expect(search).toBeVisible()
  96  |   await search.fill('"<>& 🐾')
  97  |   await expect(page.locator('.resident-empty')).toBeVisible()
  98  |   const resetSearch = page.locator('input[aria-label="Pesquisar animal"]')
  99  |   await expect(resetSearch).toBeVisible()
  100 |   await resetSearch.fill('')
  101 |   await page.getByRole('button', { name: 'Prontos para adoção 1' }).click()
  102 | 
  103 |   await expect(page.locator('.resident-card')).toHaveCount(1)
  104 |   await expect(page.locator('.resident-status')).toHaveText('Castrado')
  105 | })
  106 | 
  107 | test('o cadastro bloqueia nome realmente vazio pelo atributo required', async ({ page }) => {
  108 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  109 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  110 |   const name = page.getByRole('textbox', { name: 'Nome' })
  111 |   await expect(name).toHaveAttribute('required', '')
  112 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  113 |   await expect(page.getByRole('dialog')).toBeVisible()
  114 |   await expect(name).toBeFocused()
  115 | })
  116 | 
  117 | test('cria, avança etapa e edita um animal', async ({ page }) => {
  118 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  119 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  120 |   await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal <tag>')
  121 |   await page.getByRole('textbox', { name: 'Idade aproximada' }).fill('999 anos')
  122 |   await page.getByRole('combobox', { name: 'Sexo' }).selectOption('Macho')
  123 |   await page.getByRole('textbox', { name: 'Raça ou descrição' }).fill('SRD & companhia')
  124 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  125 | 
  126 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'QA animal <tag>' }) })
  127 |   await expect(card).toBeVisible()
  128 |   await expect(card.locator('.resident-status')).toHaveText('Novo')
  129 |   await card.getByRole('button', { name: 'Tosa' }).click()
  130 |   await expect(card.locator('.resident-status')).toHaveText('Tosa')
  131 |   await card.getByRole('button', { name: 'Editar dados de QA animal <tag>' }).click()
  132 |   await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal editado')
  133 |   await page.getByRole('button', { name: 'Salvar alterações' }).click()
  134 |   await expect(page.getByRole('heading', { name: 'QA animal editado' })).toBeVisible()
  135 | })
  136 | 
  137 | test('registra uma despesa válida e mostra categoria traduzida', async ({ page }) => {
  138 |   await page.getByRole('button', { name: 'Despesas' }).click()
  139 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  140 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Consulta de teste')
  141 |   await page.getByRole('combobox', { name: 'Categoria' }).selectOption('Veterinario')
  142 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('1800')
  143 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  144 | 
  145 |   await expect(page.getByRole('dialog')).toBeHidden()
  146 |   await expect(page.getByText('Consulta de teste')).toBeVisible()
  147 |   await expect(page.getByText('Veterinário · Hoje')).toBeVisible()
  148 | })
  149 | 
  150 | test('bloqueia despesa com valor zero antes de chamar a API', async ({ page }) => {
  151 |   await page.getByRole('button', { name: 'Despesas' }).click()
  152 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  153 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Valor inválido')
  154 |   const amount = page.getByRole('spinbutton', { name: 'Valor em ARS' })
  155 |   await amount.fill('0')
  156 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  157 |   await expect(page.getByRole('dialog')).toBeVisible()
  158 |   expect(await amount.evaluate((element: HTMLInputElement) => element.validity.rangeUnderflow)).toBe(true)
  159 | })
  160 | 
  161 | test('BUG-001: viewport estreito não deve gerar overflow horizontal', async ({ page }) => {
  162 |   test.fail(true, 'Bug conhecido: body mantém min-width: 360px em telas de 320px.')
  163 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  164 |   await page.setViewportSize({ width: 320, height: 740 })
  165 |   const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  166 |   expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  167 | })
  168 | 
  169 | test('BUG-002: rejeição de nome só com espaços deve ser comunicada', async ({ page }) => {
  170 |   test.fail(true, 'Bug conhecido: POST 400 é ignorado e a UI mostra sucesso otimista.')
  171 |   await page.route('**/api/animals', async (route) => {
  172 |     if (route.request().method() === 'POST') return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'O nome é obrigatório.' }) })
  173 |     return route.fallback()
  174 |   })
  175 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  176 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  177 |   await page.getByRole('textbox', { name: 'Nome' }).fill('   ')
  178 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
> 179 |   await expect(page.getByRole('status')).toContainText('O nome é obrigatório.')
      |                                          ^ Error: expect(locator).toContainText(expected) failed
  180 | })
  181 | 
  182 | test('BUG-003: Escape deve fechar o diálogo e devolver foco', async ({ page }) => {
  183 |   test.fail(true, 'Bug conhecido: o diálogo não trata Escape nem restaura o foco.')
  184 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  185 |   const openButton = page.getByRole('button', { name: 'Novo animal' })
  186 |   await openButton.click()
  187 |   await page.keyboard.press('Escape')
  188 |   await expect(page.getByRole('dialog')).toBeHidden()
  189 |   await expect(openButton).toBeFocused()
  190 | })
  191 | 
  192 | test('BUG-003b: a navegação por Tab deve permanecer dentro do diálogo', async ({ page }) => {
  193 |   test.fail(true, 'Bug conhecido: o foco sai do diálogo pelo botão de envio.')
  194 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  195 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  196 |   for (let index = 0; index < 5; index += 1) await page.keyboard.press('Tab')
  197 |   expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
  198 | })
  199 | 
  200 | test('BUG-005: POST de despesa rejeitado não deve manter lançamento fantasma', async ({ page }) => {
  201 |   test.fail(true, 'Bug conhecido: o formulário fecha e mantém estado otimista mesmo com HTTP 500.')
  202 |   await page.route('**/api/expenses', async (route) => {
  203 |     if (route.request().method() === 'POST') return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) })
  204 |     return route.fallback()
  205 |   })
  206 |   await page.getByRole('button', { name: 'Despesas' }).click()
  207 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  208 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Despesa que falha')
  209 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('900')
  210 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  211 |   await page.screenshot({ path: 'tests/vibe-testing/evidence/expense-500-false-success.png', fullPage: false })
  212 |   await expect(page.getByRole('dialog')).toBeVisible()
  213 |   await expect(page.getByText('Despesa que falha')).toHaveCount(0)
  214 | })
  215 | 
  216 | test('BUG-005b: PATCH rejeitado deve reverter avanço otimista da etapa', async ({ page }) => {
  217 |   test.fail(true, 'Bug conhecido: a etapa avança na UI mesmo com HTTP 500.')
  218 |   await page.route('**/api/animals/*/stage', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) }))
  219 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  220 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'Milo' }) })
  221 |   await card.getByRole('button', { name: 'Tosa' }).click()
  222 |   await page.screenshot({ path: 'tests/vibe-testing/evidence/stage-500-false-success.png', fullPage: false })
  223 |   await expect(card.locator('.resident-status')).toHaveText('Novo')
  224 | })
  225 | 
  226 | test('layouts principais não transbordam em desktop, tablet e celular comum', async ({ page }) => {
  227 |   for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  228 |     await page.setViewportSize(viewport)
  229 |     const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  230 |     expect(dimensions.document, `overflow em ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport)
  231 |   }
  232 | })
  233 | 
```