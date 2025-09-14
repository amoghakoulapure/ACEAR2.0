
import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const project = process.env.GOOGLE_CLOUD_PROJECT;
    const location = process.env.GOOGLE_CLOUD_LOCATION;

    if (!project || !location) {
      throw new Error('Google Cloud project or location not configured');
    }

    const vertex_ai = new VertexAI({ project, location });

    const generativeModel = vertex_ai.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });

    const resp = await generativeModel.generateContent(prompt);

    if (!resp.response || !resp.response.candidates || resp.response.candidates.length === 0) {
        throw new Error("No response content from the model.");
    }
    
    // Aggregate the text from all parts of the response for robustness.
    const botResponse = resp.response.candidates[0].content.parts
      .map(part => part.text)
      .join(''); 

    return NextResponse.json({ response: botResponse });

  } catch (error) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
