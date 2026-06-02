export async function onRequest(context) {
  return new Response(JSON.stringify({ 
    message: "API working",
    secret_loaded: !!context.env.AUDIT_API_SECRET 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
