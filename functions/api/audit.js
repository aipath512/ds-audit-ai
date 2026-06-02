export async function onRequest(context) {
  const url = 'https://api.anthropic.com/v1/messages';
  const key = context.env.AUDIT_API_SECRET;
  
  const body = await context.request.json();
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [{ role: 'user', content: `Analyze ${body.url} for AI visibility. Return JSON only: {"score":0}` }]
    })
  });
  
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
