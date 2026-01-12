
import { GoogleGenAI, Type } from "@google/genai";
import { WeeklyData, AIInsight } from "../types";

export const getAIInsights = async (data: WeeklyData): Promise<AIInsight> => {
  // Initialize GoogleGenAI strictly using the environment variable
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY });

  const prompt = `
    Analyze the following weekly productivity data. 
    The data is formatted as day-of-week and a map of 24 hours with their activity status (Productive, Unproductive, Sleep, Untracked) and ratings (1-5).
    
    Data: ${JSON.stringify(data)}
    
    Provide:
    1. An accountability score (0-100).
    2. A brief, punchy, "tough love" critique of the user's time management.
    3. 3 specific, actionable recommendations to improve productivity or sleep.
    
    Format the response as JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            critique: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "critique", "recommendations"]
        }
      }
    });

    // Extract text from GenerateContentResponse using the property access
    const resultText = response.text || "";
    return JSON.parse(resultText) as AIInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch AI insights");
  }
};
