---
name: qa-test-plan
description: "Cria planos de teste rastreáveis a partir de uma história de usuário ou de uma pasta de histórias."
argument-hint: "Informe o arquivo da história ou a pasta de histórias."
user-invocable: true
---

# Plano de testes a partir de histórias

## Regras

- Use exclusivamente as histórias, critérios e anexos indicados como fontes de requisitos. Não consulte código, produto, conversas anteriores ou conhecimento externo para preencher lacunas.
- Se receber uma pasta, processe cada história separadamente e não misture requisitos.
- Diferencie requisito explícito, estratégia de teste, observação e pergunta em aberto.
- Não invente regras, dados, oráculos, severidades ou critérios de saída de produto. Marque como não especificado o que faltar.

## Procedimento

1. Identifique as histórias e anexos legíveis; peça apenas entradas essenciais que estejam faltando.
2. Extraia objetivos, critérios, restrições e dúvidas sem reescrevê-los como novos requisitos.
3. Proponha escopo, rastreabilidade, abordagem, dados/ambiente necessários, riscos, dependências e perguntas.
4. Mostre cobertura e bloqueios por critério, distinguindo o que pode ser verificado do que precisa de decisão humana.
5. Salve um Markdown por história em `tests/resultados/planos-de-teste/PLANO_<ID>.md`; preserve arquivos existentes e incremente um sufixo se o destino já existir.
6. Resuma o plano e peça revisão humana antes de derivar casos ou automação.