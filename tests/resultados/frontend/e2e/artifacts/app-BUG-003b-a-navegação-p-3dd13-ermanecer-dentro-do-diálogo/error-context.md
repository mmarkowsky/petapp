# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> BUG-003b: a navegação por Tab deve permanecer dentro do diálogo
- Location: tests/frontend/e2e/app.spec.ts:205:1

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
  201 |   await expect(page.getByRole('dialog')).toBeHidden()
  202 |   await expect(openButton).toBeFocused()
  203 | })
  204 | 
  205 | test('BUG-003b: a navegação por Tab deve permanecer dentro do diálogo', async ({ page }) => {
  206 |   test.fail(true, 'Bug conhecido: o foco sai do diálogo pelo botão de envio.')
  207 |   await page.getByRole('button', { name: 'Animais 3' }).click()
  208 |   await page.getByRole('button', { name: 'Novo animal' }).click()
  209 |   for (let index = 0; index < 5; index += 1) await page.keyboard.press('Tab')
> 210 |   expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
      |                                                                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
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