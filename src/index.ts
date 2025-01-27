import OpenAI from "openai";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	OPENAI_API_KEY: string;
	AI: Ai;
};

const app = new Hono<{ Bindings: Bindings}>();

// Middleware for CORS
app.use(
	'/*',
	cors({
		origin: '*',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/chatToDocument', async (c) => {
    try {
        const { documentData, question } = await c.req.json();

       // Validate input
	   if (!documentData || typeof documentData !== 'string') {
		return c.json({ error: "Invalid or missing 'documentData'." }, 400);
	}

	if (!question || typeof question !== 'string') {
		return c.json({ error: "Invalid or missing 'question'." }, 400);
	}

        const openai = new OpenAI({
            apiKey: c.env.OPENAI_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are an assistant helping the user to chat to a document. Here is the document data: ' + JSON.stringify(documentData),
                },
                {
                    role: 'user',
                    content: 'My Question is: ' + question,
                },
            ],
			model: "gpt-3.5-turbo",
            temperature: 0.5,
        });

		console.log("OpenAI API response:", chatCompletion);
        const response = chatCompletion.choices[0]?.message?.content;

        if (!response) {
            throw new Error("No response from OpenAI");
        }

        return c.json({ message: response });
    } catch (error) {
        console.error("Error in /chatToDocument:", error);
        return c.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, 500);
    }
});

app.post('/translateDocument', async (c) => {
	const { documentData, targetLang } = await c.req.json();
	const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
		input_text: documentData,
		max_length: 1000,
	});

	const response = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
		text: summaryResponse.summary,
		source_lang: 'english',
		target_lang: targetLang,
	})
	return new Response(JSON.stringify(response));
});

export default app;