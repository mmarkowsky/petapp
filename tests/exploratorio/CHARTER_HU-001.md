# Charter exploratório: HU-001 Cadastrar um pet

**Fonte:** [HU-001: Cadastrar um pet](../historias/HU-001-cadastrar-pet.md)  
**Plano relacionado:** [PLANO_HU-001](../planos/PLANO_HU-001.md)  
**Status:** pronto para execução; preencher o relatório após explorar o ambiente.

## Missão

Explorar o fluxo de cadastro e a apresentação de animais, observando os pontos cobertos por CA-01 a CA-06 e identificando ambiguidades, falhas reproduzíveis e evidências para discussão com Produto.

## Preparação

- Iniciar a aplicação conforme as instruções de execução do README.
- Usar dados descartáveis e registrar se o ambiente é local, compartilhado ou integrado.
- Ter a HU-001 e este charter disponíveis durante a sessão.
- Não usar observações do código como substituto para expectativa de negócio.

## Roteiro de exploração

1. Abrir a tela de animais e localizar a opção de cadastro, filtros e busca (CA-01 a CA-03).
2. Observar quais informações aparecem em animais existentes e registrar perguntas sobre campos ausentes ou formatação (CA-04).
3. Abrir o formulário e conferir os textos e controles enumerados na história (CA-05).
4. Cadastrar um registro descartável, observar a resposta da interface e localizar o registro na lista (CA-06).
5. Explorar busca/filtros com dados disponíveis somente como observação, sem declarar resultado incorreto quando a HU não define o oráculo.

## Registro da sessão

Registrar horário, ambiente, build/commit quando disponível, dados usados, passos executados, resultado observado, screenshots/trace e dúvidas. Para cada possível defeito, incluir passos mínimos para reproduzir e separar fato observado de expectativa ainda não aprovada.

## Heurísticas e limites

- Priorizar consistência entre os dados informados no formulário e os dados observados na lista.
- Tratar campos, formatos, validações e resultados de busca/filtros não definidos como perguntas, não como bugs confirmados.
- Não registrar uma execução fictícia. Salvar o relatório em `tests/resultados/exploratorio/` somente após a sessão real.