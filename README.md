# LimQA: A Minimalist, Search-Powered Q&A System

### Real-Time Answers with Relevant Souces

## Overview

LimQA is a compact, search-powered Q&A system inspired by Perplexity AI. It is designed to deliver concise, accurate answers to user queries by combining the strengths of a language model (LLM) with real-time web search capabilities. LimQA processes user questions, intelligently determines whether external search data is required, and presents a response with relevant citations, making it both informative and credible.

## Setup and Installation

To get LimQA running locally or on a server, follow these steps:

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

   
