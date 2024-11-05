import { CoreMessage, streamText, tool } from "ai";
import { mistral } from "@ai-sdk/mistral";
import { systemPrompt } from "./prompt";
import { SearchTool, RetrieveTool } from "./tools";
import { searchSchema, retrieveSchema } from "./tools-schema";

type ModelType = 'mistral-small-latest' | 'mistral-medium-latest';

export async function AnswerAgent(messages: CoreMessage[], model: ModelType = 'mistral-small-latest') {

    let result = await streamText({
        model: mistral(model),
        system: systemPrompt,
        messages,
        tools: {
            "search": tool({
                description: "search the web",
                parameters: searchSchema,
                execute: SearchTool
            }),
            "retrieve": tool({
                description: "Retrieve content from the url",
                parameters: retrieveSchema,
                execute: RetrieveTool
            })
        },
        maxSteps: 5
    });

    return result;
}




