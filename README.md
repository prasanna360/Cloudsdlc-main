
# Cloud SDLC Intelligence

A research prototype for evaluating cloud service providers against project requirements, SDLC phase priorities, and ranked decision parameters. It compares AWS, Azure, and Google Cloud Platform using the PRPLW weighting approach and provides a recommendation dashboard.

> This project uses demonstration/evaluation data. Scores and predictive charts are not live cloud-provider benchmarks.

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Available commands

```sh
npm run build      # Build for production
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm run preview    # Preview the production build
```

## Evaluation flow

1. Select an SDLC phase.
2. Choose an application scenario, or enter a project name for a custom project.
3. Rank evaluation parameters and calculate PRPLW weights.
4. Review cloud-provider scores and the recommendation.

The interface also includes comparison, methodology, architecture, and predictive-analysis views.
