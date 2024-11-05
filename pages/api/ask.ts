import type { NextApiRequest, NextApiResponse } from "next";
import { AnswerAgent } from "../../lib/answer-agent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.body;

    // Validate the query parameter
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "Invalid query parameter" });
    }

    try {
        const result = await AnswerAgent([{ role: 'user', content: query }]);
        result.pipeTextStreamToResponse(res);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}