import { JSDOM } from 'jsdom';
import { Readability } from "@mozilla/readability";
import { TavilyClient } from '@agentic/tavily';

const tavily = new TavilyClient();
export const SearchTool = async ({ query }: { query: string }) => {
    try {
        // Limit Tavily to top 2 results for speed
        return (await tavily.search({ query, max_results: 2 })).results.map((r) => r.url);
    } catch {
        return [];
    }
}

// Utility for fetch timeout
async function fetchWithTimeout(resource: string, options: any = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(resource, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

export const RetrieveTool = async ({ url }: { url: string }) => {
    try {
        // Add a 5-second timeout to avoid slow sites
        let html = await fetchWithTimeout(url, {}, 5000).then(res => res.text())
        let doc = new JSDOM(html, { url });

        let reader = new Readability(doc.window.document);
        let content = reader.parse();

        return {
            title: content?.title,
            content: content?.textContent.slice(0, 10000),
            url
        }
    } catch (error) {
        return {
            title: '',
            content: '',
            url
        }
    }
};

// NOTE: For even more speed, retrieval of multiple URLs should be parallelized if the agent supports it.
// This would require changes in the agent logic, not just here.