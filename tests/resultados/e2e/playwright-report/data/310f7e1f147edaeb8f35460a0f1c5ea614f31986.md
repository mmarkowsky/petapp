# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-001: viewport estreito não deve gerar overflow horizontal
- Location: tests/e2e/app.spec.ts:158:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 320
Received:    360
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - link "petapp." [ref=e5] [cursor=pointer]:
        - /url: "#inicio"
      - navigation "Navegação principal" [ref=e13]:
        - button "Visão geral" [ref=e14] [cursor=pointer]
        - button "Animais 3" [active] [ref=e20] [cursor=pointer]:
          - text: Animais
          - generic [ref=e26]: "3"
        - button "Despesas" [ref=e27] [cursor=pointer]
    - main [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]: Abrigo
          - strong [ref=e36]: Animais
        - generic [ref=e37]:
          - generic [ref=e38]: Conectado ao MySQL
          - generic [ref=e40]: AM
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: GESTÃO DO ABRIGO
            - generic [ref=e46]:
              - heading "Animais do abrigo" [level=1] [ref=e47]
              - generic [ref=e48]: 3 cadastrados
            - paragraph [ref=e49]: Acompanhe os cadastros, os cuidados e a preparação para adoção.
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Etapa
              - combobox "Etapa" [ref=e53] [cursor=pointer]:
                - option "Todos" [selected]
                - option "Novo"
                - option "Tosa"
                - option "Banho"
                - option "Consulta veterinária"
                - option "Vacinado"
                - option "Castrado"
            - button "Novo animal" [ref=e54] [cursor=pointer]
        - generic [ref=e56]:
          - generic "Filtros de animais" [ref=e57]:
            - button "Todos 3" [ref=e58] [cursor=pointer]:
              - text: Todos
              - generic [ref=e59]: "3"
            - button "Sob cuidados 2" [ref=e60] [cursor=pointer]:
              - text: Sob cuidados
              - generic [ref=e61]: "2"
            - button "Prontos para adoção 1" [ref=e62] [cursor=pointer]:
              - text: Prontos para adoção
              - generic [ref=e63]: "1"
          - textbox "Pesquisar animal" [ref=e68]:
            - /placeholder: Pesquisar por nome ou raça...
        - generic [ref=e69]:
          - article [ref=e70]:
            - generic [ref=e71]:
              - img "Foto de Milo" [ref=e72]
              - generic [ref=e73]: Novo
              - generic [ref=e74]: Resgatado Hoje
            - generic [ref=e75]:
              - generic [ref=e76]:
                - generic [ref=e77]:
                  - heading "Milo" [level=2] [ref=e78]
                  - paragraph [ref=e79]: Cão · Sem raça definida
                - generic [ref=e80]: 8 meses
              - generic [ref=e81]:
                - generic [ref=e82]:
                  - generic [ref=e83]: ETAPA ATUAL
                  - strong [ref=e84]: Novo
                - generic [ref=e85]:
                  - generic [ref=e86]: PRÓXIMA ETAPA
                  - button "Tosa" [ref=e87] [cursor=pointer]
            - generic [ref=e90]:
              - button "Prontuário completo" [ref=e91] [cursor=pointer]
              - button "Editar dados de Milo" [ref=e95] [cursor=pointer]
          - article [ref=e99]:
            - generic [ref=e100]:
              - img "Foto de Luna" [ref=e101]
              - generic [ref=e102]: Consulta veterinária
              - generic [ref=e103]: Resgatado há 8 dias
            - generic [ref=e104]:
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - heading "Luna" [level=2] [ref=e107]
                  - paragraph [ref=e108]: Cão · Labrador sem raça definida
                - generic [ref=e109]: 2 anos
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - generic [ref=e112]: ETAPA ATUAL
                  - strong [ref=e113]: Consulta veterinária
                - generic [ref=e114]:
                  - generic [ref=e115]: PRÓXIMA ETAPA
                  - button "Vacinado" [ref=e116] [cursor=pointer]
            - generic [ref=e119]:
              - button "Prontuário completo" [ref=e120] [cursor=pointer]
              - button "Editar dados de Luna" [ref=e124] [cursor=pointer]
          - article [ref=e128]:
            - generic [ref=e129]:
              - img "Foto de Nina" [ref=e130]
              - generic [ref=e131]: Castrado
              - generic [ref=e132]: Resgatado há 2 dias
            - generic [ref=e133]:
              - generic [ref=e134]:
                - generic [ref=e135]:
                  - heading "Nina" [level=2] [ref=e136]
                  - paragraph [ref=e137]: Cão · Sem raça definida
                - generic [ref=e138]: 4 meses
              - generic [ref=e139]:
                - generic [ref=e140]:
                  - generic [ref=e141]: ETAPA ATUAL
                  - strong [ref=e142]: Castrado
                - generic [ref=e143]:
                  - generic [ref=e144]: PRÓXIMA ETAPA
                  - strong [ref=e145]: Pronto para adoção
            - generic [ref=e146]:
              - button "Prontuário completo" [ref=e147] [cursor=pointer]
              - button "Editar dados de Nina" [ref=e151] [cursor=pointer]
        - generic [ref=e155]:
          - paragraph [ref=e156]:
            - text: Exibindo
            - strong [ref=e157]: 1–3
            - text: de
            - strong [ref=e158]: "3"
            - text: animais
          - generic [ref=e159]:
            - button "Página anterior" [disabled] [ref=e160]
            - generic [ref=e163]: 1 / 1
            - button "Página seguinte" [disabled] [ref=e164]
  - generic [aria-hidden] [ref=e167]: $0.65k
```

# Test source

```ts
  63  |       return respond(200, body)
  64  |     }
  65  |     if (animalMatch && method === 'PATCH') {
  66  |       if (options.stagePatchStatus) return respond(options.stagePatchStatus, { error: 'Falha simulada.' })
  67  |       const body = request.postDataJSON() as { stage: string }
  68  |       const animal = animals.find((item) => item.id === Number(animalMatch[1]))
  69  |       if (animal) animal.stage = body.stage
  70  |       return respond(200, { id: Number(animalMatch[1]), stage: body.stage })
  71  |     }
  72  | 
  73  |     if (url.pathname === '/api/expenses' && method === 'POST') {
  74  |       const body = request.postDataJSON() as Omit<Expense, 'id' | 'date'>
  75  |       if (options.expensePostStatus) return respond(options.expensePostStatus, { error: 'Falha simulada.' })
  76  |       const expense = { ...body, id: 2, date: 'hoje' }
  77  |       expenses.unshift(expense)
  78  |       return respond(201, expense)
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
  95  |   await search.fill('"<>& 🐾')
  96  |   await expect(page.getByText('Nenhum animal encontrado')).toBeVisible()
  97  |   await search.fill('')
  98  |   await page.getByRole('button', { name: 'Prontos para adoção 1' }).click()
  99  | 
  100 |   await expect(page.locator('.resident-card')).toHaveCount(1)
  101 |   await expect(page.locator('.resident-status')).toHaveText('Castrado')
  102 | })
  103 | 
  104 | test('o cadastro bloqueia nome realmente vazio pelo atributo required', async ({ page }) => {
  105 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  106 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  107 |   const name = page.getByRole('textbox', { name: 'Nome' })
  108 |   await expect(name).toHaveAttribute('required', '')
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
> 163 |   expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
      |                               ^ Error: expect(received).toBeLessThanOrEqual(expected)
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
  209 |   await expect(page.getByRole('dialog')).toBeVisible()
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