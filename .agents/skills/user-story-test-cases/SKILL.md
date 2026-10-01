---
name: user-story-test-cases
description: "Analisa uma história de usuário ou uma pasta de histórias para gerar casos de teste rastreáveis. Use quando pedirem casos de teste, cenários QA ou cobertura de critérios de aceitação baseados exclusivamente nas histórias e anexos fornecidos."
argument-hint: "Informe o arquivo da história ou a pasta que contém as histórias e anexos."
user-invocable: true
---

# Casos de Teste a Partir da História de Usuário

## Objetivo

Analisar em detalhe os requisitos de entrada e gerar casos de teste fundamentados exclusivamente na história de usuário e nos anexos fornecidos pelo usuário. Cada caso deve ser rastreável a uma evidência explícita dessas fontes.

## Regras de escopo

- Use somente a história de usuário e os anexos apresentados para esta solicitação. Não consulte nem infira requisitos a partir do código, do produto, de conversas anteriores ou de conhecimento externo.
- Não invente regras de negócio, comportamentos esperados, dados, permissões, mensagens, estados, pré-condições ou resultados.
- Preserve o sentido e a terminologia das fontes. Não transforme uma suposição em requisito.
- Se um arquivo ou trecho não estiver acessível ou legível, informe isso e não deduza seu conteúdo.
- Considere requisitos não funcionais apenas quando estiverem explicitamente descritos na história ou nos anexos.

## Procedimento

1. **Conferir as entradas.** Aceite um arquivo de história ou uma pasta. Para uma pasta, processe cada arquivo de história separadamente, associando apenas seus próprios critérios e anexos; não combine requisitos entre histórias. Identifique os arquivos fornecidos e verifique se estão completos e legíveis. Se faltar a história ou material essencial, peça somente o necessário.
2. **Extrair requisitos.** Liste os atores, objetivos, regras, condições, dados, estados, validações e resultados observáveis explicitamente descritos. Separe cada requisito testável e atribua uma referência estável, como `HU-01` ou `ANX-01, página 2`.
3. **Analisar a qualidade dos requisitos.** Detecte ambiguidades, contradições, lacunas, termos não definidos e critérios sem resultado observável. Cite a fonte e explique o que impede uma expectativa confiável. Não resolva essas questões por conta própria.
4. **Derivar cenários.** Gere casos positivos, negativos, de limite ou de transição somente quando a fonte justificar essas condições e seus resultados esperados. Evite duplicatas e mantenha cada caso focado em um objetivo verificável.
5. **Validar rastreabilidade.** Para cada caso, confira que passos, dados, pré-condições e resultado esperado são sustentados por uma ou mais referências da entrada. Remova ou marque como bloqueado qualquer detalhe sem suporte explícito.
6. **Apresentar lacunas e cobertura.** Registre requisitos sem caso, requisitos não testáveis e perguntas pendentes. Não declare cobertura completa quando houver lacunas ou ambiguidades relevantes.
7. **Gerar o relatório Markdown.** Crie um arquivo `.md` em `tests/resultados/casos-de-teste/` com o resumo das fontes, requisitos extraídos, todos os casos de teste, requisitos sem cobertura e dúvidas/bloqueios quando aplicável. Use a mesma estrutura da resposta em Markdown e o formato `CT_<historia-normalizada>_001.md`, por exemplo `CT_Validar_cadastro_animal_001.md`. Ao processar uma pasta, gere um par de relatórios independente para cada história.
8. **Gerar o relatório HTML.** Crie um relatório HTML em `tests/resultados/casos-de-teste/` com o mesmo conteúdo e nome-base do relatório Markdown, usando a extensão `.html` (por exemplo, `CT_Validar_cadastro_animal_001.html`). Normalize o título da história para o nome do arquivo, removendo caracteres inválidos e substituindo espaços por `_`. Escolha um único índice (`001`, `002`, `003`...) para os dois arquivos; se qualquer dos caminhos `.md` ou `.html` já existir, incremente o índice até que ambos os caminhos estejam livres, sem sobrescrever relatórios anteriores. Gere um HTML completo e autossuficiente, sem dependências externas, e escape o conteúdo fornecido pelo usuário antes de inseri-lo no HTML.

## Formato da resposta

Comece com um resumo breve das fontes analisadas. Em seguida, apresente os requisitos extraídos e os casos de teste em tabelas Markdown.

Use estas colunas para os casos:

| ID | Referência | Cenário | Pré-condições | Dados | Passos | Resultado esperado |
|---|---|---|---|---|---|---|

- Numere os casos como `CT-001`, `CT-002` e assim por diante.
- Use uma referência precisa para cada caso: identificador do requisito, critério de aceitação ou localização no anexo. Se a fonte não tiver paginação, descreva o nome do arquivo e o trecho/seção identificável.
- Escreva passos reproduzíveis e um resultado esperado observável, sem acrescentar conteúdo não especificado.
- Quando uma informação necessária não estiver definida, escreva `Não especificado na entrada` e registre a questão em **Dúvidas e bloqueios**; não preencha por suposição.
- Inclua **Requisitos sem cobertura** e **Dúvidas e bloqueios** quando aplicável. Se não houver casos confiáveis por falta de informação, explique o bloqueio em vez de fabricar casos.
- Ao concluir, informe os caminhos dos relatórios `.md` e `.html` criados. A resposta e ambos os relatórios devem apresentar os mesmos casos e resultados, sem divergências.

## Verificação final

Antes de responder, confirme que:

- Cada caso tem evidência explícita na história ou em um anexo.
- Cada resultado esperado pode ser ligado à fonte citada.
- Nenhuma regra ou comportamento foi inferido de fora das entradas.
- Ambiguidades, contradições e requisitos sem cobertura estão visíveis.
- Os casos são claros, não redundantes e executáveis com as informações disponíveis.
- Os relatórios `.md` e `.html` foram salvos em `tests/resultados/casos-de-teste/`, têm o mesmo nome-base e índice, seguem o padrão de nome definido e contêm os mesmos casos apresentados na resposta.
