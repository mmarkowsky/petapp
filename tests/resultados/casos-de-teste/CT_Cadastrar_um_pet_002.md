# Relatório de casos de teste: HU-001 Cadastrar um pet

**Fonte analisada:** `tests/historias/HU-001-cadastrar-pet.md`. Esta é uma história de demonstração; validar com Produto antes de assumir os critérios como oficiais.

## Requisitos extraídos

| ID | Requisito | Referência |
|---|---|---|
| HU-01 | Como administrador, quero cadastrar animais no módulo de animais para gerenciar as entradas e manter os dados organizados. | HU-001, História de usuário |
| CA-01 | A tela de animais apresenta a opção de cadastro pelo botão “Novo Animal”. | HU-001, CA-01 |
| CA-02 | A tela disponibiliza filtros por etapa, por cuidado e por prontos para adoção. | HU-001, CA-02 |
| CA-03 | A tela disponibiliza busca por nome ou raça. | HU-001, CA-03 |
| CA-04 | A tela mostra os animais com suas respectivas informações. | HU-001, CA-04 |
| CA-05 | Ao clicar em “Novo animal”, abre um formulário com ícone da pegada, os títulos “Cadastrar animal” e “Um novo começo começa com cuidado.”, os campos “Nome”, “Idade aproximada”, “Sexo”, “Raça ou descrição” e o botão “Adicionar ao abrigo”. | HU-001, CA-05 |
| CA-06 | Ao clicar no botão de adicionar, o pet aparece na lista do refúgio com as informações cadastradas previamente. | HU-001, CA-06 |

## Casos de teste

| ID | Referência | Cenário | Pré-condições | Dados | Passos | Resultado esperado |
|---|---|---|---|---|---|---|
| CT-001 | CA-01, CA-02, CA-03 | Controles disponíveis na tela de animais | A tela de animais está acessível. | Não especificado na HU. | 1. Acessar a tela de animais. | A tela apresenta a opção “Novo Animal”, filtros por etapa, cuidado e prontos para adoção, e busca por nome ou raça. Este caso verifica disponibilidade, não o resultado de busca ou filtragem. |
| CT-002 | CA-05 | Abertura e conteúdo do formulário de cadastro | A tela de animais está acessível. | Não especificado na HU. | 1. Clicar em “Novo animal”. | Abre o formulário com os textos, campos e botão enumerados em CA-05. A expectativa visual do ícone não está especificada. |
| CT-003 | CA-04, CA-06 | Inclusão do pet e conferência na lista | O formulário de cadastro está aberto. | Valores fictícios escolhidos para a execução; não definidos pela HU. | 1. Preencher o formulário com os valores escolhidos. 2. Clicar em “Adicionar ao abrigo”. 3. Consultar a lista do refúgio. | O pet aparece na lista com as informações cadastradas previamente. A HU não enumera quais informações devem ser apresentadas para cada animal. |

## Requisitos sem cobertura completa

- **CA-02:** a presença dos filtros está coberta em CT-001; as opções, regras e resultados esperados não foram especificados.
- **CA-03:** a presença da busca está coberta em CT-001; comportamento, correspondência e combinação com filtros não foram especificados.
- **CA-04:** CT-003 verifica a inclusão observável, mas a HU não enumera as informações que a lista deve mostrar.
- **CA-05:** os textos e controles estão cobertos em CT-002; aparência e posição do ícone não foram especificadas.
- **CA-06:** CT-003 deriva a presença do pet e a correspondência com dados cadastrados; dados e regras de validação não foram definidos.

## Dúvidas e bloqueios

- Quais etapas e opções de cuidado devem estar nos filtros, e quais resultados cada opção deve produzir?
- Como funciona a busca por nome ou raça? Há regras para combinar filtros e busca?
- Quais informações devem aparecer para cada animal na lista?
- Quais campos são obrigatórios? Quais formatos, limites e opções são válidos?
- Qual aparência ou posição é esperada para o ícone da pegada?

## Observação de escopo

Os casos foram derivados exclusivamente da HU-001. Nenhuma regra foi inferida do código ou da exploração do produto. A automação `@HU-001 @CT-003` cobre o aparecimento do pet na lista com API simulada; não valida persistência integrada nem resolve os critérios em aberto.