# petapp

Panel responsive para gestionar animales rescatados, su preparación para adopción y los gastos del refugio.

## Requisitos

- Node.js 20 o superior
- MySQL 8 en `localhost:3306` (opcional para el modo local)

## Ejecutar

```sh
npm install
set -a
. ./.env
set +a
mysql -u "$DB_USER" -p < database.sql
npm run dev:all
```

Completa `DB_USER` y `DB_PASSWORD` en `.env` con las credenciales de MySQL. La URL JDBC `jdbc:mysql://localhost:3306/` es para clientes Java; petapp usa su backend Node y el driver MySQL, configurados con los mismos host y puerto.

Abre la URL que muestra Vite (normalmente `http://localhost:5173`). Si MySQL no está disponible, petapp funciona en modo local y conserva animales y gastos en el navegador.

## Funciones

- Panel con cantidad de animales, distribución por etapas y gráficos de gastos.
- Alta de animales y avance secuencial: Nuevo → Corte de pelo → Bañado → Revisión veterinaria → Vacunado → Castrado.
- Registro y desglose de gastos por comida, veterinario, vacunas y traslados.
- API local en el puerto 3001, con estado disponible en `/api/health`.

## Pruebas E2E

Las pruebas usan Playwright con Chromium y una API simulada; no modifican la base de datos MySQL.

```sh
npx playwright install chromium
npm run test:e2e
```

El informe HTML de Playwright se genera en `tests/resultados/e2e/playwright-report`. El informe de QA manual, con hallazgos y capturas, se sirve en `/tests/vibe-testing` cuando Vite está en ejecución.

## Piloto de QA com IA

O piloto usa uma história de demonstração em `tests/historias/`. Os artefatos são exemplos para validar o fluxo; revise a história e os critérios com Produto antes de tratá-los como requisitos oficiais. A IA deve derivar resultados esperados somente das fontes fornecidas, apontar lacunas e pedir revisão humana entre etapas.

### Fluxo recomendado

1. **História e critérios:** revise `tests/historias/HU-001-cadastrar-pet.md` e esclareça as dúvidas antes de gerar cobertura. Não use o código do produto para preencher requisitos ausentes.
2. **Plano de testes:** no Copilot Chat, peça “Use a skill `qa-test-plan` para analisar `tests/historias/` e salvar o plano”. Consulte o exemplo em `tests/planos/PLANO_HU-001.md`.
3. **Exploratório:** após aprovar o plano, peça “Use a skill `qa-exploratory-testing` para explorar a HU-001 no ambiente local”. Registre charter, sessão, evidências e defeitos em `tests/exploratorio/` e `tests/resultados/exploratorio/`. Observações de execução devem ser reais, não geradas por inferência.
4. **Casos de teste:** peça “Use a skill `user-story-test-cases` para processar as histórias de `tests/historias/`”. Compare os casos em `tests/resultados/CTs/` com a história; não automatize casos bloqueados por ambiguidades.
5. **Automação:** após revisão/aprovação dos casos, peça “Use a skill `qa-playwright-automation` para automatizar os casos aprovados da HU-001”. O exemplo rastreável está em `tests/e2e/app.spec.ts`, identificado por `@HU-001` e `@CT-003`.
6. **Execução:** rode `npm run test:e2e -- --grep @HU-001`. Na CI, os testes aprovados executam em pull requests e pushes para `main`; o relatório Playwright e traces ficam como artefatos do job.

As skills ficam em `.agents/skills/` e são acionadas pelo Copilot Chat por nome. Para uma primeira adoção, mantenha uma aprovação humana entre cada etapa: história → plano → exploratório → casos → automação. O prompt `.github/prompts/qa-hu-flow.prompt.md` orienta esse fluxo, mas não substitui as aprovações nem executa skills por conta própria.

### GitHub Actions e limites do piloto

O workflow `.github/workflows/e2e.yml` executa a automação existente em pushes de qualquer branch e pull requests; ele não chama um modelo de IA. Isso evita introduzir custos, segredos de provedor e geração não revisada no pipeline. Depois de estabilizar o processo, a geração por IA pode ser adicionada em um job separado, com provedor escolhido, segredo em GitHub Actions Secrets, saída em branch/artefato e aprovação obrigatória antes de merge ou execução.

Estrutura inicial: histórias em `tests/historias/`, planos em `tests/planos/`, charters em `tests/exploratorio/`, execuções em `tests/resultados/exploratorio/`, casos em `tests/resultados/CTs/` e automação em `tests/e2e/`.


