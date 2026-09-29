# Relatório de casos de teste: Cadastrar um pet

**Fontes analisadas:** História de usuário e critérios de aceite fornecidos na solicitação. Nenhum anexo foi fornecido.

## Requisitos extraídos

| ID | Requisito | Referência |
|---|---|---|
| HU-01 | O administrador quer cadastrar animais no módulo de animais para gerenciar as entradas e manter os dados organizados. | História de usuário |
| CA-01 | A tela de animais apresenta a opção de cadastro pelo botão “Novo Animal”. | Critério de aceite, tela de animais |
| CA-02 | A tela disponibiliza filtros por etapa, por cuidado e por prontos para adoção. | Critério de aceite, tela de animais |
| CA-03 | A tela disponibiliza busca por nome ou raça. | Critério de aceite, tela de animais |
| CA-04 | A tela mostra os animais com suas respectivas informações. | Critério de aceite, tela de animais |
| CA-05 | Ao clicar em “Novo Animal”, abre um formulário com ícone da pegada, os títulos “Sumar un animal” e “Un nuevo comienzo empieza con cuidado.”, os campos “Nombre”, “Edad”, “Sexo”, “Raza o descripción” e o botão “Agregar al refugio”. | Critério de aceite, formulário |
| CA-06 | Ao clicar no botão de adicionar, o pet aparece na lista do refúgio com as informações cadastradas previamente. | Critério de aceite, inclusão do pet |

## Casos de teste

| ID | Referência | Cenário | Pré-condições | Dados | Passos | Resultado esperado |
|---|---|---|---|---|---|---|
| CT-001 | CA-01, CA-02, CA-03 | Controles disponíveis na tela de animais | A tela de animais está acessível. | Não especificado na entrada. | 1. Acessar a tela de animais. | A tela apresenta o botão “Novo Animal”, filtros por etapa, cuidado e prontos para adoção, e busca por nome ou raça. Este caso verifica a disponibilidade dos controles, não os resultados da filtragem ou da busca. |
| CT-002 | CA-05 | Abertura e conteúdo do formulário de cadastro | A tela de animais está acessível. | Não especificado na entrada. | 1. Clicar em “Novo Animal”. | Abre um formulário que apresenta o ícone da pegada, o título “Sumar un animal”, o texto “Un nuevo comienzo empieza con cuidado.”, os campos “Nombre”, “Edad”, “Sexo”, “Raza o descripción” e o botão “Agregar al refugio”. |
| CT-003 | CA-04, CA-06 | Inclusão do pet e conferência das informações na lista | O formulário de cadastro está aberto. | Valores de teste para os campos do formulário, definidos para a execução; a história não especifica valores, formatos ou regras de validação. | 1. Preencher os campos do formulário com os valores de teste definidos. 2. Clicar em “Agregar al refugio”. 3. Consultar a lista de animais do refúgio. | O pet aparece na lista com as informações cadastradas previamente. Conferir que as informações apresentadas correspondem aos valores preenchidos, sem presumir quais outros campos ou formatos a lista deve exibir. |

## Requisitos sem cobertura completa

- **CA-02:** a presença dos filtros está coberta em CT-001, mas os valores disponíveis, a lógica e os resultados esperados de cada filtro não foram especificados.
- **CA-03:** a disponibilidade da busca está coberta em CT-001, mas o comportamento de busca, critérios de correspondência e resultados esperados não foram especificados.
- **CA-04:** a exibição do pet recém-cadastrado está coberta em CT-003. A lista de campos que deve apresentar para cada animal não foi especificada.
- **CA-05:** a presença do ícone da pegada está coberta em CT-002; aparência, posição e comportamento do ícone não foram especificados.

## Dúvidas e bloqueios

- Quais etapas e opções de cuidado devem estar disponíveis nos filtros? “Prontos para adoção” é um filtro separado? Quais resultados cada opção deve produzir?
- Como a busca por nome ou raça deve funcionar (por exemplo, correspondência parcial ou exata)? Há regras de combinação com filtros?
- Quais informações devem aparecer para cada animal na lista?
- Quais campos são obrigatórios? Quais formatos, limites e opções são válidos para idade, sexo, nome e raça/descrição?
- Qual aparência ou posição é esperada para o ícone da pegada?
- A história não fornece dados concretos para o cadastro. CT-003 requer valores de teste definidos para a execução; não presume regras de validade.

## Observação de escopo

Os casos foram derivados exclusivamente da história e dos critérios de aceite fornecidos. Não foram inferidas regras de validação, estados vazios, mensagens, ordenação ou comportamento detalhado de filtros e busca.
