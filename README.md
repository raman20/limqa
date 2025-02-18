# LimQA: A Minimalist, Search-Powered Q&A System

### Real-Time Answers with Relevant Souces

<a href="https://ibb.co/yFjZ2955"><img src="https://i.ibb.co/HT8bZSYY/Screenshot-2025-02-19-000014.png" alt="Screenshot-2025-02-19-000014" border="0"></a>

## Overview

LimQA is a compact, search-powered Q&A system inspired by Perplexity AI. It is designed to deliver concise, accurate answers to user queries by combining the strengths of a language model (LLM) with real-time web search capabilities. LimQA processes user questions, intelligently determines whether external search data is required, and presents a response with relevant citations, making it both informative and credible.

## Setup and Installation

To get LimQA running locally, follow these steps:

### Prerequisites

- **Node.js**: Ensure that Node.js (version 18 or later) is installed.
- **API Keys**: get your api keys from [Mistral](https://mistral.ai) and [Tavily](https://tavily.com).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/raman20/limqa.git
   cd limqa
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Environment Variables** create a `.env` file and ur api keys
   ```bash
   MISTRAL_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TAVILY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. **Run**
   ```bash
   pnpm dev
   ```
   after this visit http://localhost:3000 and your local setup is ready.

## Usage Guidelines

LimQA is designed to be an intuitive, minimalistic Q&A system that delivers real-time answers with sources. Follow these steps to use LimQA effectively:

1. **Ask a Question**:
   - Navigate to the main page at `https://limqa.vercel.app` and enter your query in the input field.
   - Click **Enter**.

2. **Receiving Responses**:
   - LimQA will analyze your question and decide whether it requires external search results.
   - For queries requiring external data, LimQA performs a real-time search and then summarizes the top results, displaying a concise answer with citations.
   - For straightforward or conversational questions, LimQA may provide an answer directly from the language model without additional sources.

3. **Interpreting Citations**:
   - When search results are used, citations are included to indicate the sources of the information.
   - These citations link back to the original sources, providing transparency and credibility for each answer.

### Best Practices

- **Be Specific**: For complex topics, providing specific terms or context can improve response accuracy.
- **Use Clear Language**: Simple, direct language helps LimQA understand your question better.

LimQA is intended for quick, informed answers rather than extensive research.

## Navigating the project

### Directory Structure

``` bash
├── lib
│   ├── answer-agent.ts
│   ├── prompt.ts
│   ├── tools-schema.ts
│   └── tools.ts
├── pages
│   ├── _app.tsx
│   ├── api
│   │   └── ask.ts
│   └── index.tsx
├── styles
│   └── global.css
├── .env
└── package.json
└── tsconfig.json
└── README.md
```

### `lib/`
This directory contains utility functions and schemas used throughout the application.

- **`answer-agent.ts`**: Implements the `AnswerAgent` function, which processes user queries and interacts with external tools for searching and retrieving content.
- **`prompt.ts`**: Contains the system prompt used to guide the behavior of the AI model.
- **`tools-schema.ts`**: Defines schemas for validating input parameters for the search and retrieve tools using Zod.
- **`tools.ts`**: Implements the `SearchTool` and `RetrieveTool` functions for searching the web and retrieving content from URLs.

### `pages/`
This directory contains the application's pages and API routes.

- **`_app.tsx`**: Custom App component for Next.js, which wraps all pages and includes global styles and analytics.
- **`index.tsx`**: The main page of the application, which includes the chat interface for user interaction.
- **`api/ask.ts`**: API route that handles incoming requests for user queries, validates them, and processes them using the `AnswerAgent`.

### `styles/`
This directory contains global styles for the application.

- **`global.css`**: Contains the CSS styles that apply to the entire application, including layout and component styles.

### `.env`
This file contains environment variables used in the application, such as API keys for external services.

### `package.json`
This file contains metadata about the project, including dependencies, scripts, and version information.

