# LimQA: A Minimalist, Search-Powered Q&A System

### Real-Time Answers with Relevant Souces

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

   
