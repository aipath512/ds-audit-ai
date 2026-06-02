export async function onRequest(context) {
  const API_KEY = context.env.AUDIT_API_SECRET;
  
  const body = await context.request.json();
  const url = body.url;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analyze ${url} for AI visibility. Return JSON only with: scores {AEO, GEO, AIO, SEO, AI_SIGNALS} each 0-100, composite 0-100, synthesis (one sentence), actionPlan (3 priorities).`
        }
      ]
    })
  });
  
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
