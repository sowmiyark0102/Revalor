import type { ScanResult, Condition, RecommendedAction } from "@/types";

/**
 * AI Service abstraction.
 *
 * Revalor's scanner is provider-agnostic. In production, set AI_PROVIDER to
 * "anthropic" or "openai" and provide AI_API_KEY — analyzeImage() will call
 * a real vision model and parse structured JSON from it.
 *
 * With no key configured (AI_PROVIDER="demo", the default), analyzeImage()
 * returns a clearly-labeled mock result so the full product flow can be
 * demoed end to end without any external credentials. Nothing here
 * fabricates a false sense of measured accuracy — demo confidence values
 * are illustrative, not a real model's output, and every ScanResult sets
 * isDemo accordingly.
 */

const PROVIDER = (process.env.AI_PROVIDER || "demo") as "demo" | "anthropic" | "openai";
const API_KEY = process.env.AI_API_KEY || "";

interface DemoProfile {
  label: string;
  category: string;
  materials: string[];
  condition: Condition;
  action: RecommendedAction;
  valueMin: number | null;
  valueMax: number | null;
}

// A small, representative library of demo outcomes. In demo mode we pick
// one deterministically-ish (weighted random) so repeated scans feel varied
// but plausible, matching common e-waste categories from the product brief.
const DEMO_PROFILES: DemoProfile[] = [
  {
    label: "Used Laptop",
    category: "Laptops",
    materials: ["Aluminum", "Plastic", "Copper", "Lithium battery", "Circuit board"],
    condition: "PARTIALLY_WORKING",
    action: "REPAIR",
    valueMin: 80000,
    valueMax: 150000,
  },
  {
    label: "Smartphone (cracked screen)",
    category: "Smartphones",
    materials: ["Glass", "Aluminum", "Lithium battery", "Circuit board", "Rare earth elements"],
    condition: "PARTIALLY_WORKING",
    action: "REPAIR",
    valueMin: 150000,
    valueMax: 400000,
  },
  {
    label: "Wired Charger / Power Adapter",
    category: "Chargers",
    materials: ["Plastic", "Copper", "Circuit board"],
    condition: "WORKING",
    action: "REUSE",
    valueMin: 0,
    valueMax: 5000,
  },
  {
    label: "Mechanical Keyboard",
    category: "Keyboards",
    materials: ["Plastic", "Copper", "Steel"],
    condition: "WORKING",
    action: "RESELL",
    valueMin: 30000,
    valueMax: 90000,
  },
  {
    label: "Tangled Cable Bundle",
    category: "Cables",
    materials: ["Copper", "PVC insulation"],
    condition: "UNKNOWN",
    action: "RECYCLE",
    valueMin: null,
    valueMax: null,
  },
  {
    label: "Non-functional Tablet",
    category: "Tablets",
    materials: ["Glass", "Aluminum", "Lithium battery", "Circuit board"],
    condition: "NON_FUNCTIONAL",
    action: "SAFE_DISPOSAL",
    valueMin: null,
    valueMax: null,
  },
  {
    label: "Desktop Computer Tower",
    category: "Computer components",
    materials: ["Steel", "Aluminum", "Copper", "Gold-plated connectors", "Circuit board"],
    condition: "WORKING",
    action: "RESELL",
    valueMin: 100000,
    valueMax: 350000,
  },
];

function pickDemoProfile(seed: string): DemoProfile {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return DEMO_PROFILES[hash % DEMO_PROFILES.length];
}

export async function analyzeImage(imageRef: string): Promise<ScanResult> {
  if (PROVIDER === "demo" || !API_KEY) {
    return runDemoAnalysis(imageRef);
  }

  if (PROVIDER === "anthropic") {
    return runAnthropicAnalysis(imageRef);
  }

  if (PROVIDER === "openai") {
    return runOpenAiAnalysis(imageRef);
  }

  // Fallback safety net — never leave the UI without a result.
  return runDemoAnalysis(imageRef);
}

async function runDemoAnalysis(imageRef: string): Promise<ScanResult> {
  // Simulate realistic analysis latency for a believable demo.
  await new Promise((r) => setTimeout(r, 1400));

  const profile = pickDemoProfile(imageRef + Date.now().toString().slice(-3));
  const confidence = 0.86 + (Math.abs(hashCode(imageRef)) % 12) / 100; // 0.86–0.97

  return {
    id: `scan_${Date.now()}`,
    detectedLabel: profile.label,
    confidence: Number(confidence.toFixed(2)),
    category: profile.category,
    materials: profile.materials,
    condition: profile.condition,
    recommendedAction: profile.action,
    estValueMin: profile.valueMin,
    estValueMax: profile.valueMax,
    aiProvider: "demo",
    isDemo: true,
    createdAt: new Date().toISOString(),
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return hash;
}

/**
 * Real provider implementations. These are intentionally thin — swap in
 * your actual vision-model call and JSON-schema parsing here. They are not
 * wired to fake data; if AI_API_KEY is unset these paths are never reached
 * (see analyzeImage above).
 */
async function runAnthropicAnalysis(imageRef: string): Promise<ScanResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: imageRef },
            },
            {
              type: "text",
              text: "Identify this waste item. Respond with ONLY JSON matching: {label, category, materials: string[], condition: WORKING|PARTIALLY_WORKING|NON_FUNCTIONAL|UNKNOWN, recommendedAction: REPAIR|REUSE|RESELL|RECYCLE|SAFE_DISPOSAL, confidence: number 0-1, estValueMinPaise: number|null, estValueMaxPaise: number|null}",
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`AI provider error: ${res.status}`);
  const data = await res.json();
  const text = data.content?.map((c: any) => c.text || "").join("") ?? "{}";
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

  return {
    id: `scan_${Date.now()}`,
    detectedLabel: parsed.label,
    confidence: parsed.confidence,
    category: parsed.category,
    materials: parsed.materials || [],
    condition: parsed.condition,
    recommendedAction: parsed.recommendedAction,
    estValueMin: parsed.estValueMinPaise ?? null,
    estValueMax: parsed.estValueMaxPaise ?? null,
    aiProvider: "anthropic",
    isDemo: false,
    createdAt: new Date().toISOString(),
  };
}

async function runOpenAiAnalysis(imageRef: string): Promise<ScanResult> {
  // Implement using the OpenAI vision API in production; structure mirrors
  // runAnthropicAnalysis above. Left as a clear extension point rather than
  // a second fabricated mock path.
  throw new Error("OpenAI provider not yet configured. Set AI_PROVIDER=anthropic or demo.");
}
