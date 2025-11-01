
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const PROMPT = `You are an expert AI nutrition and recipe assistant. Your task is to analyze the provided image of a food item and generate a comprehensive nutritional and culinary analysis.

Your response MUST be a single, valid JSON object. Do not include any text before or after the JSON object, including markdown fences like \`\`\`json.

- If the food in the image is unclear or not identifiable as a specific dish, set "isFoodUnclear" to true and return only that key in the JSON object: \`{"isFoodUnclear": true}\`. In this case, do not populate the other fields.
- For all other fields, provide accurate, concise, and helpful information.
- "calories" should be an estimated number per standard serving.
- "macros" values should be in grams (g).
- "healthBenefits" and "risks" should be arrays of short, bullet-point-style strings.
- "healthTip" should be a single, simple, actionable sentence.
- "recipe" should be a complete, easy-to-follow recipe for making the identified food. Include prep time and serving size.
`;


export const analyzeFoodImage = async (imageData: { mimeType: string; data: string }): Promise<AnalysisResult> => {
  // Assume process.env.API_KEY is available
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = {
    inlineData: {
      mimeType: imageData.mimeType,
      data: imageData.data,
    },
  };

  const textPart = {
    text: PROMPT
  };

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
        foodName: { type: Type.STRING },
        calories: { type: Type.NUMBER },
        macros: {
            type: Type.OBJECT,
            properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
            },
            required: ['protein', 'carbs', 'fats'],
        },
        healthBenefits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        risks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        healthTip: { type: Type.STRING },
        recipe: {
            type: Type.OBJECT,
            properties: {
                prepTime: { type: Type.STRING },
                servings: { type: Type.STRING },
                ingredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                },
                steps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                },
            },
            required: ['prepTime', 'servings', 'ingredients', 'steps'],
        },
        isFoodUnclear: { type: Type.BOOLEAN, nullable: true },
    },
    required: [
      'foodName', 'calories', 'macros', 'healthBenefits', 'risks', 'healthTip', 'recipe'
    ],
  };

  export async function analyzeFoodImage(base64Image: string, prompt: string) {
  const response = await fetch("/.netlify/functions/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image, prompt }),
  });

  if (!response.ok) {
    throw new Error("Server error: " + response.statusText);
  }

  const data = await response.json();
  return data.result;
}
};
