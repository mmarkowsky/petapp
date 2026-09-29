# petapp

Panel responsive para gestionar animales rescatados, su preparación para adopción y los gastos del refugio.

## Requisitos

- Node.js 20 o superior
- MySQL 8 en `localhost:3306` (opcional para el modo local)

## Ejecutar

```sh
npm install
cp .env.example .env
mysql -u root -p < database.sql
npm run dev:all
```

Completa `DB_USER` y `DB_PASSWORD` en `.env` con las credenciales de MySQL. La URL JDBC `jdbc:mysql://localhost:3306/` es para clientes Java; petapp usa su backend Node y el driver MySQL, configurados con los mismos host y puerto.

Abre la URL que muestra Vite (normalmente `http://localhost:5173`). Si MySQL no está disponible, petapp funciona en modo local y conserva animales y gastos en el navegador.

## Funciones

- Panel con cantidad de animales, distribución por etapas y gráficos de gastos.
- Alta de animales y avance secuencial: Nuevo → Corte de pelo → Bañado → Revisión veterinaria → Vacunado → Castrado.
- Registro y desglose de gastos por comida, veterinario, vacunas y traslados.
- API local en el puerto 3001, con estado disponible en `/api/health`.

## Pruebas E2E

Las pruebas usan Playwright con Chromium y una API simulada; no modifican la base de datos MySQL.

```sh
npx playwright install chromium
npm run test:e2e
```

El informe HTML de Playwright se genera en `tests/resultados/e2e/playwright-report`. El informe de QA manual, con hallazgos y capturas, se sirve en `/tests/vibe-testing` cuando Vite está en ejecución.


