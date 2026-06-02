export async function onRequest(context) {
  const key = context.env.AUDIT_API_SECRET;
  
  const response = await fetch('https://api.anthropic.com/v1/models', {
    headers: { 'x-api-key': key }
  });
  
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
