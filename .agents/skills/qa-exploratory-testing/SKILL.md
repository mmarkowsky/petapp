---
name: qa-exploratory-testing
description: "Prepara e apoia sessões exploratórias baseadas em histórias e planos aprovados, registrando apenas observações reais."
argument-hint: "Informe a pasta de histórias, os planos aprovados e o ambiente a explorar."
user-invocable: true
---

# Teste exploratório orientado por histórias

## Regras

- Use história e plano aprovados para delimitar a sessão; código pode ajudar a operar a aplicação, mas não é fonte de requisito.
- Nunca declare uma sessão, observação, evidência ou resultado que não tenha sido realmente executado/observado.
- Separe resultado observado de resultado esperado. Se a história não define o oráculo, registre dúvida em vez de classificar como falha.
- Não execute ações destrutivas em ambiente compartilhado sem autorização explícita.

## Procedimento

1. Confirme história, critérios, plano, URL/ambiente, dados descartáveis e limites de execução.
2. Se a sessão ainda não ocorreu, crie/revise um charter em `tests/exploratorio/CHARTER_<ID>.md`; não gere relatório com resultado inventado.
3. Durante a exploração, registre ações reproduzíveis, estado observado, critério relacionado e evidência disponível.
4. Classifique possíveis defeitos apenas quando houver expectativa explícita; caso contrário, liste como observação/pergunta para Produto.
5. Após execução real, salve `tests/resultados/exploratorio/EXEC_<ID>_<AAAA-MM-DD>.md`, relacionando evidências e limitando as conclusões ao que foi observado.
6. Peça revisão humana dos achados e dos requisitos antes de atualizar casos ou automação.