# Hono-based Document Interaction API

This project is an **API for document interaction**, built with **Hono, OpenAI, and Cloudflare Workers AI**. It enables:
- **Chat with documents** via GPT-3.5-Turbo.
- **Document translation and summarization** using BART and M2M100.
- **CORS support** for secure cross-origin requests.

This project was developed as part of **backend Astralis application**, to demonstrate the integration of AI-powered document processing in a serverless environment.

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root of the project and add the necessary API keys:

```env
OPENAI_API_KEY=your-openai-api-key
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
```

### 3. Run the Development Server
```bash
npm run dev
```

## Deployment
To deploy the API using Cloudflare Workers, run:
```bash
npm run deploy
```

## Scripts

- `npm run dev` - Starts the development server.
- `npm run deploy` - Deploys the API to Cloudflare Workers.
- `npm run test` - Runs tests using Vitest.
- `npm run cf-typegen` - Generates Cloudflare type definitions.

## Dependencies

- `hono` - Lightweight framework for building Cloudflare Workers APIs.
- `openai` - OpenAI API client for document interaction.
- `wrangler` - Cloudflare Workers development tool.

## Development

- **TypeScript** is used for type safety.
- **Vitest** is used for testing.
- **Wrangler** is used for Cloudflare deployment.

## Acknowledgments

- **Hono** for providing a fast and lightweight framework.
- **OpenAI** for enabling AI-powered document interaction.
- **Cloudflare Workers** for scalable serverless deployment.

---
