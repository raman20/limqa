import { JSDOM } from 'jsdom';
import { Readability } from "@mozilla/readability";
import { TavilyClient } from '@agentic/tavily';

const tavily = new TavilyClient();
export const SearchTool = async ({ query }: { query: string }) => {
    try {
        return (await tavily.search({ query })).results.map((r) => r.url);
    } catch {
        return [];
    }
}

export const RetrieveTool = async ({ url }: { url: string }) => {
    try {
        let html = await fetch(url).then(res => res.text())
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