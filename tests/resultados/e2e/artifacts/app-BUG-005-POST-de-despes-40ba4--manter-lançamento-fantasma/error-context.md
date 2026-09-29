# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-005: POST de despesa rejeitado não deve manter lançamento fantasma
- Location: tests/e2e/app.spec.ts:197:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('dialog') with timeout 3000ms
  - waiting for getByRole('dialog')

```

```yaml
- complementary:
  - link "petapp. ABRIGO":
    - /url: "#inicio"
  - text: MENU PRINCIPAL
  - navigation "Navegação principal":
    - button "Visão geral"
    - button "Animais 3"
    - button "Despesas"
  - paragraph:
    - strong: Um lar começa aqui.
    - text: Cada cuidado faz diferença.
  - button "AM Andrea Méndez Administradora":
    - text: AM
    - strong: Andrea Méndez
    - text: Administradora
- main:
  - text: Abrigo
  - strong: Despesas
  - text: Conectado ao MySQL
  - button "Ajuda"
  - text: AM TRANSPARÊNCIA E CUIDADO
  - heading "Despesas do abrigo" [level=1]
  - paragraph: Cada contribuição se transforma em cuidado.
  - button "Registrar despesa"
  - article: Total registrado ARS 3.400 2 lançamentos registrados
  - article: Maior despesa Alimentação Por valor acumulado
  - article: Animais cuidados 3 cães Agradecemos cada contribuição
  - article:
    - text: EVOLUÇÃO
    - heading "Despesas por mês" [level=2]
    - button "Últimos 6 meses"
    - status:
      - paragraph: Sep
      - list:
        - listitem: "Despesas : ARS 2.500"
    - application: Set $0k $0.65k $1.3k $1.95k $2.6k
  - article:
    - text: DISTRIBUIÇÃO
    - heading "Por categoria" [level=2]
    - application
    - text: Total
    - strong: ARS 3.400
    - text: Alimentação
    - strong: ARS 3.400
    - text: Veterinário
    - strong: ARS 0
    - text: Vacinas
    - strong: ARS 0
    - text: Transporte
    - strong: ARS 0
  - text: DESPESAS RECENTES
  - heading "Histórico de despesas" [level=2]
  - text: 2 lançamentos
  - strong: Despesa que falha
  - text: Alimentação · Hoje
  - strong: ARS 900
  - strong: Ração · Milo
  - text: Alimentação · Hoje
  - strong: ARS 2.500
```

# Test source

```ts
  109 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  110 |   await expect(page.getByRole('dialog')).toBeVisible()
  111 |   await expect(name).toBeFocused()
  112 | })
  113 | 
  114 | test('cria, avança etapa e edita um animal', async ({ page }) => {
  115 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  116 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  117 |   await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal <tag>')
  118 |   await page.getByRole('textbox', { name: 'Idade aproximada' }).fill('999 anos')
  119 |   await page.getByRole('combobox', { name: 'Sexo' }).selectOption('Macho')
  120 |   await page.getByRole('textbox', { name: 'Raça ou descrição' }).fill('SRD & companhia')
  121 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  122 | 
  123 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'QA animal <tag>' }) })
  124 |   await expect(card).toBeVisible()
  125 |   await expect(card.locator('.resident-status')).toHaveText('Novo')
  126 |   await card.getByRole('button', { name: 'Tosa' }).click()
  127 |   await expect(card.locator('.resident-status')).toHaveText('Tosa')
  128 |   await card.getByRole('button', { name: 'Editar dados de QA animal <tag>' }).click()
  129 |   await page.getByRole('textbox', { name: 'Nome' }).fill('QA animal editado')
  130 |   await page.getByRole('button', { name: 'Salvar alterações' }).click()
  131 |   await expect(page.getByRole('heading', { name: 'QA animal editado' })).toBeVisible()
  132 | })
  133 | 
  134 | test('registra uma despesa válida e mostra categoria traduzida', async ({ page }) => {
  135 |   await page.getByRole('button', { name: 'Despesas' }).click()
  136 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  137 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Consulta de teste')
  138 |   await page.getByRole('combobox', { name: 'Categoria' }).selectOption('Veterinario')
  139 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('1800')
  140 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  141 | 
  142 |   await expect(page.getByRole('dialog')).toBeHidden()
  143 |   await expect(page.getByText('Consulta de teste')).toBeVisible()
  144 |   await expect(page.getByText('Veterinário · Hoje')).toBeVisible()
  145 | })
  146 | 
  147 | test('bloqueia despesa com valor zero antes de chamar a API', async ({ page }) => {
  148 |   await page.getByRole('button', { name: 'Despesas' }).click()
  149 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  150 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Valor inválido')
  151 |   const amount = page.getByRole('spinbutton', { name: 'Valor em ARS' })
  152 |   await amount.fill('0')
  153 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  154 |   await expect(page.getByRole('dialog')).toBeVisible()
  155 |   expect(await amount.evaluate((element: HTMLInputElement) => element.validity.rangeUnderflow)).toBe(true)
  156 | })
  157 | 
  158 | test('BUG-001: viewport estreito não deve gerar overflow horizontal', async ({ page }) => {
  159 |   test.fail(true, 'Bug conhecido: body mantém min-width: 360px em telas de 320px.')
  160 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  161 |   await page.setViewportSize({ width: 320, height: 740 })
  162 |   const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  163 |   expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  164 | })
  165 | 
  166 | test('BUG-002: rejeição de nome só com espaços deve ser comunicada', async ({ page }) => {
  167 |   test.fail(true, 'Bug conhecido: POST 400 é ignorado e a UI mostra sucesso otimista.')
  168 |   await page.route('**/api/animals', async (route) => {
  169 |     if (route.request().method() === 'POST') return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'O nome é obrigatório.' }) })
  170 |     return route.fallback()
  171 |   })
  172 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  173 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  174 |   await page.getByRole('textbox', { name: 'Nome' }).fill('   ')
  175 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  176 |   await expect(page.getByRole('status')).toContainText('O nome é obrigatório.')
  177 | })
  178 | 
  179 | test('BUG-003: Escape deve fechar o diálogo e devolver foco', async ({ page }) => {
  180 |   test.fail(true, 'Bug conhecido: o diálogo não trata Escape nem restaura o foco.')
  181 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  182 |   const openButton = page.getByRole('button', { name: 'Novo animal' })
  183 |   await openButton.click()
  184 |   await page.keyboard.press('Escape')
  185 |   await expect(page.getByRole('dialog')).toBeHidden()
  186 |   await expect(openButton).toBeFocused()
  187 | })
  188 | 
  189 | test('BUG-003b: a navegação por Tab deve permanecer dentro do diálogo', async ({ page }) => {
  190 |   test.fail(true, 'Bug conhecido: o foco sai do diálogo pelo botão de envio.')
  191 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  192 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  193 |   for (let index = 0; index < 5; index += 1) await page.keyboard.press('Tab')
  194 |   expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
  195 | })
  196 | 
  197 | test('BUG-005: POST de despesa rejeitado não deve manter lançamento fantasma', async ({ page }) => {
  198 |   test.fail(true, 'Bug conhecido: o formulário fecha e mantém estado otimista mesmo com HTTP 500.')
  199 |   await page.route('**/api/expenses', async (route) => {
  200 |     if (route.request().method() === 'POST') return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) })
  201 |     return route.fallback()
  202 |   })
  203 |   await page.getByRole('button', { name: 'Despesas' }).click()
  204 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  205 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Despesa que falha')
  206 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('900')
  207 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  208 |   await page.screenshot({ path: 'tests/vibe-testing/evidence/expense-500-false-success.png', fullPage: false })
> 209 |   await expect(page.getByRole('dialog')).toBeVisible()
      |                                          ^ Error: expect(locator).toBeVisible() failed
  210 |   await expect(page.getByText('Despesa que falha')).toHaveCount(0)
  211 | })
  212 | 
  213 | test('BUG-005b: PATCH rejeitado deve reverter avanço otimista da etapa', async ({ page }) => {
  214 |   test.fail(true, 'Bug conhecido: a etapa avança na UI mesmo com HTTP 500.')
  215 |   await page.route('**/api/animals/*/stage', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) }))
  216 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  217 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'Milo' }) })
  218 |   await card.getByRole('button', { name: 'Tosa' }).click()
  219 |   await page.screenshot({ path: 'tests/vibe-testing/evidence/stage-500-false-success.png', fullPage: false })
  220 |   await expect(card.locator('.resident-status')).toHaveText('Novo')
  221 | })
  222 | 
  223 | test('layouts principais não transbordam em desktop, tablet e celular comum', async ({ page }) => {
  224 |   for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  225 |     await page.setViewportSize(viewport)
  226 |     const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  227 |     expect(dimensions.document, `overflow em ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport)
  228 |   }
  229 | })
  230 | 
```