# Plano de testes: HU-001 Cadastrar um pet

**Status:** exemplo para revisão humana  
**Fonte de requisitos:** [HU-001: Cadastrar um pet](../historias/HU-001-cadastrar-pet.md)

## Objetivo

Planejar a verificação dos critérios CA-01 a CA-06 sem definir comportamentos que a história não especifica.

## Escopo e cobertura

| Critério | Intenção de verificação | Limite conhecido |
|---|---|---|
| CA-01 | Confirmar a disponibilidade da opção de cadastro. | Texto/estado após outras interações não especificado. |
| CA-02 | Identificar os filtros apresentados e explorar seu uso. | Opções, combinações e resultados esperados não especificados. |
| CA-03 | Explorar busca por nome ou raça. | Correspondência, limpeza e combinação com filtros não especificadas. |
| CA-04 | Observar as informações apresentadas para animais. | Campos e formatação não especificados. |
| CA-05 | Conferir a abertura e os elementos nomeados do formulário. | Aparência/posição do ícone não especificada. |
| CA-06 | Cadastrar um pet e verificar sua presença e informações na lista. | Dados de exemplo e campos exibidos precisam de confirmação. |

## Abordagem

- Derivar casos funcionais somente dos critérios da HU-001.
- Usar exploração para observar a implementação e coletar evidência; não converter uma observação em requisito sem validação de Produto.
- Automatizar apenas casos revisados e com resultado esperado observável.
- Usar a suíte E2E com API simulada para evitar dependência de MySQL nos testes de interface.
- Manter rastreabilidade por HU, critério de aceitação e ID de caso nos títulos dos testes e relatórios.

## Dados e ambiente

Dados concretos, formatos válidos e pré-condições de persistência não foram definidos na história. Para o exemplo automatizado, valores fictícios podem ser usados como dados de execução, sem tratá-los como regras de negócio. A suíte Playwright inicia Vite em `127.0.0.1:4173` e simula a API.

## Riscos, dependências e perguntas

- CA-02, CA-03 e CA-04 não têm oráculos suficientes para verificar comportamento completo.
- CA-05 cita ícone, títulos e controles, mas não define o aspecto visual do ícone.
- A aprovação de Produto para os campos exibidos e regras do formulário é pré-condição para ampliar automação.

## Critério de saída

Plano revisado; perguntas de requisito encaminhadas; casos rastreáveis aprovados; execuções registradas com evidências; automação sem casos bloqueados apresentados como aprovados.