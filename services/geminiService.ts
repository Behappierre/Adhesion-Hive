import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const askArchitect = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not detected. Please provide a valid API_KEY in your environment to consult the Architect AI. (Simulated response: To visualize this, consider using a Hierarchical pattern if clear delegation is needed, or a Network pattern if collaboration is unstructured.)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `
      You are an expert AI Architect specializing in visualizing multi-agent systems. 
      You adhere strictly to the framework "Architecting the Invisible".
      
      Your advice should cover:
      1. The recommended topology (Sequential, Hierarchical, or Network).
      2. Specific nodes required (Agents, Tools, Routers).
      3. How to handle state/memory visualization.
      4. A semiotic recommendation (e.g., "Use dashed lines for feedback loops").
      
      Keep the response concise and structured, suitable for a tooltip or sidebar advisor.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "The Architect is silent.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the Architect. Please check your connection or API key.";
  }
};