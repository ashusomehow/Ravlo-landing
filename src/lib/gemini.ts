// Gemini AI Integration for Ravlo
const GEMINI_API_KEY = 'AIzaSyBn9o2yyQ0YgeTlvO4_cFjPx36EernSMGg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeneratePostRequest {
  topic: string;
  tone: 'Professional' | 'Casual' | 'Motivational' | 'Analytical';
  hookCategory: 'curiosity' | 'story' | 'provoke';
  hookTemplate: string;
  description?: string;
}

export interface GeneratePostResponse {
  concise: string;
  storyRich: string;
}

export interface GenerateCommentRequest {
  postUrl: string;
  tone: 'Agree' | 'Challenge' | 'Seek Guidance' | 'Encourage';
  motive: 'Insight' | 'Question' | 'Humor' | 'Resource Share';
  length: number; // 50-300 characters
}

export async function callGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          topP: 0.95
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export async function generatePost(request: GeneratePostRequest): Promise<GeneratePostResponse> {
  const prompt = `You are a LinkedIn content expert. Create highly engaging, properly formatted LinkedIn posts using the following specifications:

Hook Template: "${request.hookTemplate}"
Topic: ${request.topic}
Tone: ${request.tone}
${request.description ? `Additional Context: ${request.description}` : ''}

CRITICAL FORMATTING REQUIREMENTS:
- Use line breaks (\n) to separate paragraphs
- Add proper spacing between sections
- Include relevant emojis (2-4 per post)
- Use bullet points (•) when listing items
- Add strategic line breaks for readability

Generate exactly 2 versions of LinkedIn posts:

1. CONCISE VERSION (≤150 words):
- Start with the provided hook template
- Keep it punchy and direct with proper line breaks
- Include 2-3 relevant emojis
- End with a clear call-to-action or question
- Use 2-3 paragraphs maximum

2. STORY-RICH VERSION (≤300 words):
- Begin with the hook template
- Develop with personal anecdotes or detailed examples
- Include multiple line breaks for easy reading
- Use emojis strategically (3-4 emojis)
- Create 4-5 short paragraphs
- End with an engaging question or call-to-action

FORMAT EXAMPLE:
"Hook line here... 🚀

Main content paragraph with insights.

Key points:
• Point 1
• Point 2  
• Point 3

Final thought with engagement question? 💭"

Return ONLY in this exact JSON format:
{"concise": "your properly formatted concise post with \\n line breaks", "storyRich": "your properly formatted story-rich post with \\n line breaks"}

Make the content sound natural, human-like, conversational, and optimized for maximum LinkedIn engagement.`;

  try {
    const response = await callGemini(prompt);
    
    // Clean the response - remove any markdown formatting or extra text
    let cleanResponse = response.trim();
    
    // Try to extract JSON if it's wrapped in markdown
    const jsonMatch = cleanResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                     cleanResponse.match(/```\s*([\s\S]*?)\s*```/) ||
                     cleanResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      cleanResponse = jsonMatch[1] || jsonMatch[0];
    }
    
    try {
      const parsed = JSON.parse(cleanResponse);
      
      // Ensure we have both required fields
      if (parsed.concise && parsed.storyRich) {
        return {
          concise: parsed.concise.trim(),
          storyRich: parsed.storyRich.trim()
        };
      }
    } catch (parseError) {
      console.log('JSON parse failed, trying alternative parsing');
    }
    
    // Fallback: try to parse manually
    const lines = response.split('\n').filter(line => line.trim());
    let concise = '';
    let storyRich = '';
    let currentSection = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.toLowerCase().includes('concise')) {
        currentSection = 'concise';
        continue;
      } else if (trimmedLine.toLowerCase().includes('story')) {
        currentSection = 'storyRich';
        continue;
      }
      
      if (currentSection === 'concise' && trimmedLine && !trimmedLine.startsWith('{') && !trimmedLine.startsWith('"')) {
        concise += trimmedLine + ' ';
      } else if (currentSection === 'storyRich' && trimmedLine && !trimmedLine.startsWith('{') && !trimmedLine.startsWith('"')) {
        storyRich += trimmedLine + ' ';
      }
    }
    
    // Final fallback - split the response in half
    if (!concise && !storyRich) {
      const halfLength = Math.floor(response.length / 2);
      concise = response.substring(0, halfLength).trim();
      storyRich = response.substring(halfLength).trim();
    }
    
    return {
      concise: concise.trim() || 'Unable to generate concise version',
      storyRich: storyRich.trim() || 'Unable to generate story-rich version'
    };
    
  } catch (error) {
    throw new Error(`Failed to generate post: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateComment(request: GenerateCommentRequest): Promise<string> {
  const prompt = `Generate a LinkedIn comment for a post at: ${request.postUrl}

Comment requirements:
- Tone: ${request.tone}
- Motive: ${request.motive}
- Length: Approximately ${request.length} characters
- Should be engaging and add value to the conversation
- Maintain professional LinkedIn etiquette

Generate a single, well-crafted comment that follows these guidelines.`;

  try {
    const response = await callGemini(prompt);
    return response.trim();
  } catch (error) {
    throw new Error(`Failed to generate comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}