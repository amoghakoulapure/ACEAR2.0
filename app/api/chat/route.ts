


import { NextRequest, NextResponse } from 'next/server';
import { initialDepartments } from '@/data/departments';


export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Check if prompt is a department funding question
    const lowerPrompt = prompt.toLowerCase();
    const deptMatch = initialDepartments.find(
      (dept: { name: string; code: string; allocated: number; spent: number; description: string }) =>
        lowerPrompt.includes(dept.name.toLowerCase()) || lowerPrompt.includes(dept.code.toLowerCase())
    );

    if (
      deptMatch &&
      (lowerPrompt.includes('funding') || lowerPrompt.includes('allocated') || lowerPrompt.includes('budget') || lowerPrompt.includes('spent'))
    ) {
      // Compose answer for department funding
      const answer = `The current funding portfolio for the ${deptMatch.name} department is as follows:\n\n` +
        `Allocated: $${deptMatch.allocated.toLocaleString()}\n` +
        `Spent: $${deptMatch.spent.toLocaleString()}\n` +
        `Description: ${deptMatch.description}`;
      return NextResponse.json({ response: answer });
    }

    // Fallback to LLM for other questions
    const gorqApiKey = process.env.GORQ_API_KEY;
    if (!gorqApiKey) {
      throw new Error('GORQ API key not configured');
    }
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gorqApiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: 'You are an assistant that answers questions about the ACEAR Institute website.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 256,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Gorq');
    }
    const data = await response.json();
    const botResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


