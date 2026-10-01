# HU-001: Cadastrar um pet

> História de demonstração para o piloto de QA com IA. Validar com Produto antes de considerá-la requisito oficial.

## História de usuário

Como administrador, quero cadastrar animais no módulo de animais para gerenciar as entradas e manter os dados organizados.

## Critérios de aceitação

- **CA-01:** A tela de animais apresenta a opção de cadastro pelo botão “Novo Animal”.
- **CA-02:** A tela disponibiliza filtros por etapa, por cuidado e por prontos para adoção.
- **CA-03:** A tela disponibiliza busca por nome ou raça.
- **CA-04:** A tela mostra os animais com suas respectivas informações.
- **CA-05:** Ao clicar em “Novo animal”, abre um formulário com ícone da pegada, os títulos “Cadastrar animal” e “Um novo começo começa com cuidado.”, os campos “Nome”, “Idade aproximada”, “Sexo”, “Raça ou descrição” e o botão “Adicionar ao abrigo”.
- **CA-06:** Ao clicar no botão de adicionar, o pet aparece na lista do refúgio com as informações cadastradas previamente.

## Dúvidas em aberto

- Quais informações devem aparecer para cada animal na lista?
- Quais são os valores e resultados esperados dos filtros e da busca?
- Quais campos são obrigatórios e quais formatos/limites são válidos?
- Qual aparência ou posição é esperada para o ícone da pegada?

## Histórico e origem

Artefato de demonstração preparado para exercitar o fluxo de IA. Os critérios foram organizados a partir do exemplo de casos existente em `tests/resultados/casos-de-teste/CT_Cadastrar_um_pet_001.md`; as dúvidas continuam pendentes e não devem ser preenchidas por suposição.