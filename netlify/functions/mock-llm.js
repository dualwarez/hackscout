// OpenAI-compatible mock LLM endpoint — deterministic demo responses (keyless judging)
export default async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  const body = await req.json().catch(() => ({}));
  const msgs = body.messages || [];
  const last = [...msgs].reverse().find(m => m.role === 'user')?.content || '';
  const reply = `[Hack Scout mock demo] You asked: "${String(last).slice(0,140)}". This network is running in your browser with the published mock router. For real answers, add your OpenAI-compatible key in AI model settings (BYOK) - it never leaves your browser.`;
  return new Response(JSON.stringify({ id:'mock-1', object:'chat.completion', choices:[{ index:0, message:{ role:'assistant', content: reply }, finish_reason:'stop' }] }), { status:200, headers:{ 'Content-Type':'application/json', ...cors } });
};
const cors = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods':'POST,OPTIONS', 'Access-Control-Allow-Headers':'Content-Type,Authorization' };
