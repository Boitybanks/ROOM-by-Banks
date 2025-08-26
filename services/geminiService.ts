
import { GoogleGenAI, Type } from "@google/genai";
import { Message, MessageSender } from '../types';

if (!process.env.API_KEY) {
  // In a real app, this would be handled more gracefully.
  // For this environment, we rely on the API key being pre-configured.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateChatResponse = async (chatHistory: Message[], userName: string, matchName: string): Promise<string> => {
    try {
        const formattedHistory = chatHistory.map(msg => {
            if (msg.sender === MessageSender.Narrator) return `[System]: ${msg.text}`;
            const speaker = msg.sender === MessageSender.Player ? userName : matchName;
            return `${speaker}: ${msg.text}`;
        }).join('\n');

        const prompt = `
            You are ${matchName}, a character in a dating app called 'Room'. Your personality is charming, a bit mysterious, and engaging.
            Continue the conversation naturally based on the chat history with ${userName}.
            Keep your response concise, like a real text message (1-2 sentences).
            Do not add quotation marks or your name at the beginning of your response.

            Chat History:
            ${formattedHistory}

            Your ( ${matchName}'s ) response:
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.85,
                topP: 0.9,
                maxOutputTokens: 60,
            }
        });

        return response.text.trim();

    } catch (error) {
        console.error("Error generating chat response:", error);
        return "I'm not sure what to say, but I'm enjoying this chat!";
    }
};


export const generateZodiacInsight = async (sign1: string, sign2: string): Promise<string> => {
    try {
        const prompt = `
            You are an astrologer for a queer-first dating app.
            Generate a short, fun, and slightly mystical compatibility insight for a ${sign1} and a ${sign2}.
            Keep it under 30 words. Focus on potential sparks or interesting dynamics.
            Example: "A Scorpio and Cancer? The stars suggest a deep, intuitive connection. Expect conversations that feel like coming home."
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text.trim();

    } catch (error) {
        console.error("Error generating zodiac insight:", error);
        return "The stars twinkle with possibility for the two of you. Let's see what unfolds.";
    }
};

export const analyzeChemistry = async (chatHistory: Message[]): Promise<number | null> => {
    try {
        const formattedHistory = chatHistory
            .filter(msg => msg.sender !== MessageSender.Narrator) // Filter out narrator messages
            .map(msg => `${msg.sender === MessageSender.Player ? 'User' : 'Match'}: ${msg.text}`)
            .join('\n');

        if (formattedHistory.length < 1) {
            return 20; // Default starting chemistry
        }

        const prompt = `
            Analyze the following chat history from a dating app. Based on the tone, vulnerability, flirtatiousness, and overall connection, provide a chemistry score from 0 to 100.
            - 0-20: Awkward or just started.
            - 21-40: Polite, but distant.
            - 41-60: Friendly, opening up.
            - 61-80: Clear romantic interest, good banter.
            - 81-100: Strong, palpable chemistry, deep connection.
            
            Chat History:
            ${formattedHistory}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        chemistryScore: {
                            type: Type.INTEGER,
                            description: 'A score from 0 to 100 representing the chemistry.'
                        }
                    },
                    required: ["chemistryScore"],
                },
            },
        });
        
        const json = JSON.parse(response.text);
        return json.chemistryScore;

    } catch (error) {
        console.error("Error analyzing chemistry:", error);
        return null; // Return null on error to indicate failure
    }
};