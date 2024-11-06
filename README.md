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

## Design Decisions, Challenges, and Solutions

### 1. Overall Architecture
   - **What We Did**: Set up the backend agent with a server system that combines Next.js for the frontend and a research agent backend powered by a large language model (LLM). Used Tavily API and readability parsers for web content fetching and extraction.
   - **Why**: Keeping the frontend and backend separate means each piece can be scaled on its own, giving more control over performance and response times.
   - **Challenges**: Needed smooth, real-time back-and-forth between server and agent, plus handling lots of data streaming without slowing down.
   - **How We Solved It**: Leveraged Node.js for non-blocking I/O, which was a perfect fit to handle asynchronous data processing efficiently, especially when we started streaming responses.

### 2. Text Extraction and Readability
   - **What We Did**: Used JSDOM and Mozilla's Readability library to parse and cleanly extract readable text from HTML, filtering out ads, navigation bars, and other unnecessary content.
   - **Challenges**: Not all web pages play nicely with readability extraction – different layouts, ads, and dynamic content can interfere.
   - **How We Solved It**: We adjusted the CSS selectors to include only the main content we wanted, so the extraction was much cleaner and more focused. Built fallback methods, so even if readability parsing failed, we had a way to get something usable.

### 3. Token and Prompt Management with Function Calling
   - **What We Did**: Managed prompt size within the token limit of the `mistral-small-latest` model (4,096 tokens). Balanced the prompt complexity, user question, and available tokens for the most efficient answer.
   - **Challenges**: We had to keep enough tokens for both prompt and response while also supporting function calls to pull web content when necessary.
   - **How We Solved It**: Fine-tuned prompts to make sure we were only using tokens on essential parts. Also tuned the function-calling behavior so it only kicked in when we actually needed it, keeping the process smooth and minimizing unnecessary data handling.

### 4. Model Selection
   - **What We Did**: Picked the `mistral-small-latest` model, which has a good token limit and supports function calls—key for handling complex Q&A with web searches.
   - **Challenges**: Finding a model that could handle both conversational Q&A and the more complex tasks like searching and pulling URLs without hitting token limits.
   - **How We Solved It**: Mistral-small-latest gave a good balance of power and efficiency, so we didn’t hit issues on more complex queries. We configured the model to only use function calls when it’s actually needed, which kept response times fast and the output reliable.

## Areas for Future Improvement

### Enhancing AI Agent with Data Storage & Retrieval
- **Vector Store for Fast Query Matching**: Adding a vector store, like Pinecone, could let us store embeddings of past queries and quickly match them to new questions, making responses faster and more relevant without redundant searches.
- **Retrieval-Augmented Generation (RAG)**: Using RAG would make the AI smarter by pulling specific data from stored content, which could lead to more accurate, context-rich answers, especially for complex queries.
- **Persistent Memory for User Sessions**: Implementing memory for ongoing user sessions could improve continuity in responses, helping the agent give contextually aware answers in repeated interactions.

### App Improvements
- **Better UI on Mobile/Desktop**: Tweaks to the UI for a more polished experience would go a long way. This could include optimized layouts for tablets and mobile, more engaging visuals, and indicators for loading or streaming states.
- **Query History and Saved Responses**: Adding features to save past answers or organize responses by topic would be great for users who revisit certain info regularly.
- **Real-Time Query Suggestions**: Interactive suggestions based on similar past queries or popular questions could help users refine their input and get better answers.
   
