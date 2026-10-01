# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-003: Escape deve fechar o diálogo e devolver foco
- Location: tests/frontend/e2e/app.spec.ts:195:1

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  getByRole('dialog')
Expected: hidden
Received: visible
Timeout:  3000ms

Call log:
  - Expect "toBeHidden" getByRole('dialog') with timeout 3000ms
  - waiting for getByRole('dialog')
    10 × locator resolved to <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">…</section>
       - unexpected value "visible"

```

```yaml
- dialog "Cadastrar animal":
  - button "Fechar"
  - heading "Cadastrar animal" [level=2]
  - paragraph: Um novo começo começa com cuidado.
  - text: Nome
  - textbox "Nome":
    - /placeholder: Que nome vamos dar a ele?
  - text: Idade aproximada
  - textbox "Idade aproximada":
    - /placeholder: "Ex.: 6 meses"
  - text: Sexo
  - combobox "Sexo"
  - text: Raça ou descrição
  - textbox "Raça ou descrição":
    - /placeholder: "Ex.: sem raça definida, porte médio"
  - button "Adicionar ao abrigo"
```

# Test source

```ts
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
  137 | test('HU-001 CT-003 @HU-001 @CT-003 cadastro inclui o pet na lista', async ({ page }) => {
  138 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  139 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  140 |   await page.getByRole('textbox', { name: 'Nome' }).fill('Amora QA')
  141 |   await page.getByRole('textbox', { name: 'Idade aproximada' }).fill('4 meses')
  142 |   await page.getByRole('combobox', { name: 'Sexo' }).selectOption('Fêmea')
  143 |   await page.getByRole('textbox', { name: 'Raça ou descrição' }).fill('Sem raça definida')
  144 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  145 | 
  146 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'Amora QA' }) })
  147 |   await expect(card).toBeVisible()
  148 | })
  149 | 
  150 | test('registra uma despesa válida e mostra categoria traduzida', async ({ page }) => {
  151 |   await page.getByRole('button', { name: 'Despesas' }).click()
  152 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  153 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Consulta de teste')
  154 |   await page.getByRole('combobox', { name: 'Categoria' }).selectOption('Veterinario')
  155 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('1800')
  156 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  157 | 
  158 |   await expect(page.getByRole('dialog')).toBeHidden()
  159 |   await expect(page.getByText('Consulta de teste')).toBeVisible()
  160 |   await expect(page.getByText('Veterinário · Hoje')).toBeVisible()
  161 | })
  162 | 
  163 | test('bloqueia despesa com valor zero antes de chamar a API', async ({ page }) => {
  164 |   await page.getByRole('button', { name: 'Despesas' }).click()
  165 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  166 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Valor inválido')
  167 |   const amount = page.getByRole('spinbutton', { name: 'Valor em ARS' })
  168 |   await amount.fill('0')
  169 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  170 |   await expect(page.getByRole('dialog')).toBeVisible()
  171 |   expect(await amount.evaluate((element: HTMLInputElement) => element.validity.rangeUnderflow)).toBe(true)
  172 | })
  173 | 
  174 | test('BUG-001: viewport estreito não deve gerar overflow horizontal', async ({ page }) => {
  175 |   test.fail(true, 'Bug conhecido: body mantém min-width: 360px em telas de 320px.')
  176 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  177 |   await page.setViewportSize({ width: 320, height: 740 })
  178 |   const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  179 |   expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  180 | })
  181 | 
  182 | test('BUG-002: rejeição de nome só com espaços deve ser comunicada', async ({ page }) => {
  183 |   test.fail(true, 'Bug conhecido: POST 400 é ignorado e a UI mostra sucesso otimista.')
  184 |   await page.route('**/api/animals', async (route) => {
  185 |     if (route.request().method() === 'POST') return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: 'O nome é obrigatório.' }) })
  186 |     return route.fallback()
  187 |   })
  188 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  189 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  190 |   await page.getByRole('textbox', { name: 'Nome' }).fill('   ')
  191 |   await page.getByRole('button', { name: 'Adicionar ao abrigo' }).click()
  192 |   await expect(page.getByRole('status')).toContainText('O nome é obrigatório.')
  193 | })
  194 | 
  195 | test('BUG-003: Escape deve fechar o diálogo e devolver foco', async ({ page }) => {
  196 |   test.fail(true, 'Bug conhecido: o diálogo não trata Escape nem restaura o foco.')
  197 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  198 |   const openButton = page.getByRole('button', { name: 'Novo animal' })
  199 |   await openButton.click()
  200 |   await page.keyboard.press('Escape')
> 201 |   await expect(page.getByRole('dialog')).toBeHidden()
      |                                          ^ Error: expect(locator).toBeHidden() failed
  202 |   await expect(openButton).toBeFocused()
  203 | })
  204 | 
  205 | test('BUG-003b: a navegação por Tab deve permanecer dentro do diálogo', async ({ page }) => {
  206 |   test.fail(true, 'Bug conhecido: o foco sai do diálogo pelo botão de envio.')
  207 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  208 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  209 |   for (let index = 0; index < 5; index += 1) await page.keyboard.press('Tab')
  210 |   expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
  211 | })
  212 | 
  213 | test('BUG-005: POST de despesa rejeitado não deve manter lançamento fantasma', async ({ page }) => {
  214 |   test.fail(true, 'Bug conhecido: o formulário fecha e mantém estado otimista mesmo com HTTP 500.')
  215 |   await page.route('**/api/expenses', async (route) => {
  216 |     if (route.request().method() === 'POST') return route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) })
  217 |     return route.fallback()
  218 |   })
  219 |   await page.getByRole('button', { name: 'Despesas' }).click()
  220 |   await page.getByRole('button', { name: 'Registrar despesa' }).click()
  221 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('Despesa que falha')
  222 |   await page.getByRole('spinbutton', { name: 'Valor em ARS' }).fill('900')
  223 |   await page.getByRole('button', { name: 'Salvar despesa' }).click()
  224 |   await page.screenshot({ path: 'tests/resultados/exploratorio/vibe-testing/evidence/expense-500-false-success.png', fullPage: false })
  225 |   await expect(page.getByRole('dialog')).toBeVisible()
  226 |   await expect(page.getByText('Despesa que falha')).toHaveCount(0)
  227 | })
  228 | 
  229 | test('BUG-005b: PATCH rejeitado deve reverter avanço otimista da etapa', async ({ page }) => {
  230 |   test.fail(true, 'Bug conhecido: a etapa avança na UI mesmo com HTTP 500.')
  231 |   await page.route('**/api/animals/*/stage', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Falha simulada.' }) }))
  232 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  233 |   const card = page.locator('.resident-card').filter({ has: page.getByRole('heading', { name: 'Milo' }) })
  234 |   await card.getByRole('button', { name: 'Tosa' }).click()
  235 |   await page.screenshot({ path: 'tests/resultados/exploratorio/vibe-testing/evidence/stage-500-false-success.png', fullPage: false })
  236 |   await expect(card.locator('.resident-status')).toHaveText('Novo')
  237 | })
  238 | 
  239 | test('layouts principais não transbordam em desktop, tablet e celular comum', async ({ page }) => {
  240 |   for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  241 |     await page.setViewportSize(viewport)
  242 |     const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
  243 |     expect(dimensions.document, `overflow em ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport)
  244 |   }
  245 | })
  246 | 
```