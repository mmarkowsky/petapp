# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-003b: a navegação por Tab deve permanecer dentro do diálogo
- Location: tests/e2e/app.spec.ts:189:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - link "petapp. ABRIGO" [ref=e5] [cursor=pointer]:
        - /url: "#inicio"
        - generic [ref=e12]:
          - text: petapp.
          - generic [ref=e13]: ABRIGO
      - generic [ref=e14]: MENU PRINCIPAL
      - navigation "Navegação principal" [ref=e15]:
        - button "Visão geral" [ref=e16] [cursor=pointer]
        - button "Animais 3" [ref=e22] [cursor=pointer]:
          - text: Animais
          - generic [ref=e28]: "3"
        - button "Despesas" [ref=e29] [cursor=pointer]
      - generic [ref=e32]:
        - paragraph [ref=e37]:
          - strong [ref=e38]: Um lar começa aqui.
          - generic [ref=e39]: Cada cuidado faz diferença.
        - button "AM Andrea Méndez Administradora" [ref=e43] [cursor=pointer]:
          - generic [ref=e44]: AM
          - generic [ref=e45]:
            - strong [ref=e46]: Andrea Méndez
            - generic [ref=e47]: Administradora
    - main [ref=e52]:
      - generic [ref=e53]:
        - generic [ref=e54]:
          - generic [ref=e55]: Abrigo
          - strong [ref=e58]: Animais
        - generic [ref=e59]:
          - generic [ref=e60]: Conectado ao MySQL
          - button "Ajuda" [ref=e62] [cursor=pointer]
          - generic [ref=e66]: AM
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]:
            - generic [ref=e70]: GESTÃO DO ABRIGO
            - generic [ref=e72]:
              - heading "Animais do abrigo" [level=1] [ref=e73]
              - generic [ref=e74]: 3 cadastrados
            - paragraph [ref=e75]: Acompanhe os cadastros, os cuidados e a preparação para adoção.
          - generic [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]: Etapa
              - combobox "Etapa" [ref=e79] [cursor=pointer]:
                - option "Todos" [selected]
                - option "Novo"
                - option "Tosa"
                - option "Banho"
                - option "Consulta veterinária"
                - option "Vacinado"
                - option "Castrado"
            - button "Novo animal" [ref=e80] [cursor=pointer]
        - generic [ref=e82]:
          - generic "Filtros de animais" [ref=e83]:
            - button "Todos 3" [ref=e84] [cursor=pointer]:
              - text: Todos
              - generic [ref=e85]: "3"
            - button "Sob cuidados 2" [ref=e86] [cursor=pointer]:
              - text: Sob cuidados
              - generic [ref=e87]: "2"
            - button "Prontos para adoção 1" [ref=e88] [cursor=pointer]:
              - text: Prontos para adoção
              - generic [ref=e89]: "1"
          - textbox "Pesquisar animal" [ref=e94]:
            - /placeholder: Pesquisar por nome ou raça...
        - generic [ref=e95]:
          - article [ref=e96]:
            - generic [ref=e97]:
              - img "Foto de Milo" [ref=e98]
              - generic [ref=e99]: Novo
              - generic [ref=e100]: Resgatado Hoje
            - generic [ref=e101]:
              - generic [ref=e102]:
                - generic [ref=e103]:
                  - heading "Milo" [level=2] [ref=e104]
                  - paragraph [ref=e105]: Cão · Sem raça definida
                - generic [ref=e106]: 8 meses
              - generic [ref=e107]:
                - generic [ref=e108]:
                  - generic [ref=e109]: ETAPA ATUAL
                  - strong [ref=e110]: Novo
                - generic [ref=e111]:
                  - generic [ref=e112]: PRÓXIMA ETAPA
                  - button "Tosa" [ref=e113] [cursor=pointer]
            - generic [ref=e116]:
              - button "Prontuário completo" [ref=e117] [cursor=pointer]
              - button "Editar dados de Milo" [ref=e121] [cursor=pointer]
          - article [ref=e125]:
            - generic [ref=e126]:
              - img "Foto de Luna" [ref=e127]
              - generic [ref=e128]: Consulta veterinária
              - generic [ref=e129]: Resgatado há 8 dias
            - generic [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]:
                  - heading "Luna" [level=2] [ref=e133]
                  - paragraph [ref=e134]: Cão · Labrador sem raça definida
                - generic [ref=e135]: 2 anos
              - generic [ref=e136]:
                - generic [ref=e137]:
                  - generic [ref=e138]: ETAPA ATUAL
                  - strong [ref=e139]: Consulta veterinária
                - generic [ref=e140]:
                  - generic [ref=e141]: PRÓXIMA ETAPA
                  - button "Vacinado" [ref=e142] [cursor=pointer]
            - generic [ref=e145]:
              - button "Prontuário completo" [ref=e146] [cursor=pointer]
              - button "Editar dados de Luna" [ref=e150] [cursor=pointer]
          - article [ref=e154]:
            - generic [ref=e155]:
              - img "Foto de Nina" [ref=e156]
              - generic [ref=e157]: Castrado
              - generic [ref=e158]: Resgatado há 2 dias
            - generic [ref=e159]:
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - heading "Nina" [level=2] [ref=e162]
                  - paragraph [ref=e163]: Cão · Sem raça definida
                - generic [ref=e164]: 4 meses
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - generic [ref=e167]: ETAPA ATUAL
                  - strong [ref=e168]: Castrado
                - generic [ref=e169]:
                  - generic [ref=e170]: PRÓXIMA ETAPA
                  - strong [ref=e171]: Pronto para adoção
            - generic [ref=e172]:
              - button "Prontuário completo" [ref=e173] [cursor=pointer]
              - button "Editar dados de Nina" [ref=e177] [cursor=pointer]
        - generic [ref=e181]:
          - paragraph [ref=e182]:
            - text: Exibindo
            - strong [ref=e183]: 1–3
            - text: de
            - strong [ref=e184]: "3"
            - text: animais
          - generic [ref=e185]:
            - button "Página anterior" [disabled] [ref=e186]
            - generic [ref=e189]: 1 / 1
            - button "Página seguinte" [disabled] [ref=e190]
    - dialog [ref=e194]:
      - button "Fechar" [ref=e195] [cursor=pointer]
      - heading "Cadastrar animal" [level=2] [ref=e205]
      - paragraph [ref=e206]: Um novo começo começa com cuidado.
      - generic [ref=e207]:
        - generic [ref=e208]:
          - text: Nome
          - textbox "Nome" [ref=e209]:
            - /placeholder: Que nome vamos dar a ele?
        - generic [ref=e210]:
          - generic [ref=e211]:
            - text: Idade aproximada
            - textbox "Idade aproximada" [ref=e212]:
              - /placeholder: "Ex.: 6 meses"
          - generic [ref=e213]:
            - text: Sexo
            - combobox "Sexo" [ref=e214]:
              - option "Macho" [selected]
              - option "Fêmea"
        - generic [ref=e215]:
          - text: Raça ou descrição
          - textbox "Raça ou descrição" [ref=e216]:
            - /placeholder: "Ex.: sem raça definida, porte médio"
        - button "Adicionar ao abrigo" [ref=e217] [cursor=pointer]
  - generic [aria-hidden] [ref=e219]: $0.65k
```

# Test source

```ts
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
> 194 |   expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
      |                                                                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
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