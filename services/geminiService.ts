import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, LocationData } from "../types";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    disease: {
      type: Type.STRING,
      description: "The name of the identified crop disease, or 'Healthy' if none.",
    },
    severity: {
      type: Type.STRING,
      description: "The severity of the disease (e.g., Low, Moderate, High, Critical).",
    },
    trust_score: {
      type: Type.STRING,
      description: "Confidence level of the analysis based on image clarity and metadata consistency (e.g., High, Medium, Low).",
    },
    claim_eligible: {
      type: Type.BOOLEAN,
      description: "Whether the crop is likely eligible for a claim under Pradhan Mantri Fasal Bima Yojana (PMFBY).",
    },
    reason: {
      type: Type.STRING,
      description: "A detailed technical explanation for the insurance auditor.",
    },
    summary_for_speech: {
      type: Type.STRING,
      description: "A short, simple, 2-sentence summary of the diagnosis and eligibility in English, suitable for reading aloud to a farmer.",
    },
    remedy: {
      type: Type.STRING,
      description: "Step-by-step practical advice on how to treat the disease immediately.",
    },
    recommended_product: {
      type: Type.STRING,
      description: "Generic name of a fertilizer, pesticide, or organic solution to buy (e.g., 'Mancozeb 75 WP' or 'Neem Oil').",
    },
  },
  required: ["disease", "severity", "trust_score", "claim_eligible", "reason", "summary_for_speech", "remedy", "recommended_product"],
};

export const analyzeCropImage = async (
  base64Image: string,
  location: LocationData | null
): Promise<AnalysisResult> => {
  try {
    const timestamp = new Date().toISOString();
    const dateReadable = new Date().toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const locationStr = location
      ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
      : "Location not provided (Trust Score will be lower)";

    const prompt = `
      You are 'Dr. Gemini', the personal companion for an Indian farmer. You are also an authorized auditor for 'Pradhan Mantri Fasal Bima Yojana' (PMFBY).

      **Input Metadata:**
      - Image: [Attached]
      - Timestamp: ${timestamp} (${dateReadable})
      - GPS Coordinates: ${locationStr}

      **Your Mission:**
      1. **Diagnose:** Identify the crop and disease.
      2. **Verify:** Check if this crop belongs in this region/season (Fraud Detection).
      3. **Insurance Check:** Is the damage severe enough for a PMFBY claim?
      4. **Solve the Problem:** Provide an immediate remedy. What should the farmer spray or do *today* to save the crop? Suggest a specific generic product.

      Return the result strictly in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are a helpful, empathetic, and knowledgeable agricultural expert.",
        temperature: 0.3,
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(textResponse) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};