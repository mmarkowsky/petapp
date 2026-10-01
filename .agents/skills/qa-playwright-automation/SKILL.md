---
name: qa-playwright-automation
description: "Implementa automação Playwright rastreável para casos de teste revisados e aprovados."
argument-hint: "Informe as histórias e os casos aprovados que serão automatizados."
user-invocable: true
---

# Automação Playwright de casos aprovados

## Regras

- Automatize somente casos aprovados com resultado esperado sustentado por história/critério.
- A história e os critérios são a fonte do comportamento esperado. Consulte o código e a aplicação apenas para selecionar locators, setup e estratégia técnica.
- Não transforme comportamento atual do produto em requisito nem crie dados como regra de negócio.
- Preserve os padrões existentes de `tests/e2e/`, use locators acessíveis e mantenha a suíte independente de serviços externos quando possível.
- Associe o teste à HU e ao ID do caso no título, por exemplo `@HU-001 @CT-003`.

## Procedimento

1. Leia a história, o relatório de CTs aprovado e os fixtures/configuração E2E necessários.
2. Faça um mapa caso → critério → teste. Liste os casos bloqueados e não os automatize.
3. Implemente somente o menor conjunto de testes aprovado, sem editar requisitos para fazê-los passar.
4. Execute os testes pelo comando documentado no README e corrija falhas locais sem ocultar defeitos com expectativas frouxas.
5. Informe arquivos alterados, cobertura parcial, casos bloqueados e resultado real da execução; peça aprovação antes de expandir cobertura.