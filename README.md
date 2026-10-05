## Screenshots
![Dashboard](docs/dashboard.png)

## PRPLW methodology
1. The user ranks N evaluation parameters (1 = most important).
2. Ranks are converted to weights: <INSERT YOUR EXACT FORMULA HERE>
3. Each provider's score per parameter is multiplied by its weight and summed.
4. The provider with the highest weighted score is recommended.

**Worked example:** 3 parameters (Cost, Security, Scalability) ranked 1, 2, 3
→ weights = <show numbers> → scores = <show AWS/Azure/GCP totals>.

## Data and limitations
Scores are demonstration values, not live benchmarks. Sources used to
derive them: <pricing pages / SLAs / papers>.

## Development tools
Built with React, TypeScript, Vite, Tailwind and Recharts.
AI-assisted tools (<name them>) were used for <scaffolding / UI code>;
the PRPLW logic and evaluation data were designed and verified by the authors.

## Environment
Copy `.env.example` to `.env` and fill in values (see below).
