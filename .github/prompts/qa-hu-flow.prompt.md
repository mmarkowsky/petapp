---
name: qa-hu-flow
description: Conduz o piloto de QA de uma história, com validação humana entre etapas.
---

Conduza o fluxo de QA da história indicada pelo usuário usando as skills locais correspondentes. Não presuma que uma skill foi executada só por mencioná-la: complete a etapa atual, mostre o artefato e aguarde aprovação antes de avançar.

Ordem:

1. Validar história e critérios em `tests/historias/`.
2. Aplicar `qa-test-plan` e solicitar aprovação do plano.
3. Aplicar `qa-exploratory-testing`; preparar charter ou executar a exploração somente quando houver acesso ao ambiente e autorização. Registrar apenas resultados observados e solicitar revisão.
4. Aplicar `user-story-test-cases` às histórias aprovadas; mostrar lacunas e aguardar aprovação dos casos.
5. Aplicar `qa-playwright-automation` apenas aos casos aprovados; executar o teste focado e relatar o resultado.

Mantenha rastreabilidade entre HU, critério, plano, sessão, CT e teste Playwright. Não chame um provedor de IA externo nem altere workflows/secrets. Se uma etapa depender de informação ou aprovação, pare nela e explique o bloqueio.