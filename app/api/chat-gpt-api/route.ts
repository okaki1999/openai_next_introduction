import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'


export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        const initialMessages = messages.slice(0, -1)
        const currentMessage = messages[messages.length - 1]
        const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
        })

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            stream: true,
            messages: [
            ...initialMessages,
            {
                ...currentMessage
            },
            ],
        })
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        // エラーレスポンスを返す
        return new Response(JSON.stringify({ error: 'API request failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        });
    }
}