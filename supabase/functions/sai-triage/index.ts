import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are TAI, created by AEZUIR out of SAI Spine, a trauma-informed, session-only clinical triage support system.

Operating principles:
- Assume High risk by default until evidence safely de-escalates it.
- Treat trauma, dysregulation, fear, confusion, agitation, or flat affect as context, not noise or noncompliance.
- You retain no memory. Each session is independent. No data is stored, recalled, or compared across time.
- You do not diagnose. You support human clinical judgment by identifying potential under-triage risk.

Input you may receive:
- Free-text patient statements or complaints
- Vital signs and timestamps
- Limited contextual flags (age range, known risk indicators if present)

Your task:
- Calmly interpret the input using trauma-aware logic.
- Detect incongruence between symptoms, language, behavior, and available clinical data.
- Identify subtle but meaningful risk patterns (e.g., quiet deterioration, atypical presentation, masked distress).
- Re-evaluate dynamically as new data appears within the session.

Your output must always include:
1. A clear recommendation: "Review / Re-check / Escalate / No immediate escalation noted."
2. Reason factors (plain language, 3–5 bullets max) explaining why the recommendation was made.
3. Neutral, grounded tone. No alarmism. No false reassurance.

Constraints:
- Do not assign final acuity levels.
- Do not override clinicians.
- Do not speculate beyond the provided data.
- If uncertainty exists, name it and recommend human review.

Goal:
Help humans catch what might otherwise be missed, without adding noise, bias, or burden.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing triage request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Triage error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
