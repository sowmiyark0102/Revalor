"use client";

import { useRef, useState } from "react";
import { Sidebar, MobileTabBar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, DemoBadge } from "@/components/ui/Badge";
import type { ScanResult } from "@/types";
import { ACTION_LABELS, CONDITION_LABELS, formatValueRange, cn } from "@/lib/utils";
import {
  Upload,
  Camera,
  X,
  Loader2,
  AlertTriangle,
  Wrench,
  Recycle,
  ShieldCheck,
  Repeat,
  Tag,
  ArrowRight,
} from "lucide-react";

type Stage = "idle" | "preview" | "analyzing" | "result" | "error";

const ACTION_ICON: Record<string, any> = {
  REPAIR: Wrench,
  REUSE: Repeat,
  RESELL: Tag,
  RECYCLE: Recycle,
  SAFE_DISPOSAL: ShieldCheck,
};

export default function ScanPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("That file doesn't look like an image. Please choose a photo (JPG, PNG, or HEIC).");
      setStage("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setStage("preview");
    };
    reader.onerror = () => {
      setErrorMsg("We couldn't read that image. Please try a different file.");
      setStage("error");
    };
    reader.readAsDataURL(file);
  }

  async function analyze() {
    setStage("analyzing");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ imageRef: imageSrc ?? "demo" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Analysis failed.");
      }
      const data: ScanResult = await res.json();
      setResult(data);
      setStage("result");
    } catch (err: any) {
      setErrorMsg(err.message || "AI analysis is temporarily unavailable. Please try again.");
      setStage("error");
    }
  }

  function reset() {
    setImageSrc(null);
    setResult(null);
    setErrorMsg("");
    setStage("idle");
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 pb-24 md:pb-0">
        <Topbar title="Scan waste" subtitle="Get an instant AI read on what to do with an item." />

        <div className="container-page max-w-2xl py-8">
          {stage === "idle" && (
            <UploadZone
              onFile={handleFile}
              fileInputRef={fileInputRef}
              cameraInputRef={cameraInputRef}
            />
          )}

          {stage === "preview" && imageSrc && (
            <Card className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] w-full bg-charcoal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Selected waste item" className="h-full w-full object-contain" />
                <button
                  onClick={reset}
                  aria-label="Remove image"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="text-sm text-muted">Ready to analyze this image?</p>
                <Button onClick={analyze}>
                  Analyze
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          {stage === "analyzing" && (
            <Card className="flex flex-col items-center gap-4 py-16 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-pine" />
              <div>
                <p className="font-medium">Analyzing your item…</p>
                <p className="mt-1 text-sm text-muted">
                  Identifying category, materials, and condition.
                </p>
              </div>
            </Card>
          )}

          {stage === "error" && (
            <Card className="flex flex-col items-center gap-4 py-14 text-center">
              <AlertTriangle className="h-7 w-7 text-copper" />
              <div>
                <p className="font-medium">{errorMsg}</p>
                <p className="mt-1 text-sm text-muted">Nothing was saved. You can try again.</p>
              </div>
              <Button onClick={reset} variant="secondary">
                Try again
              </Button>
            </Card>
          )}

          {stage === "result" && result && (
            <ResultView result={result} onRescan={reset} />
          )}
        </div>
      </div>
      <MobileTabBar />
    </div>
  );
}

function UploadZone({
  onFile,
  fileInputRef,
  cameraInputRef,
}: {
  onFile: (f: File | undefined) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  cameraInputRef: React.RefObject<HTMLInputElement>;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-6 border-2 border-dashed border-border py-16 text-center transition-colors",
        dragOver && "border-pine bg-pine/5"
      )}
      onDragOver={(e: any) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e: any) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pine/10">
        <Upload className="h-6 w-6 text-pine" strokeWidth={1.7} />
      </div>
      <div>
        <p className="font-display text-lg font-semibold">Upload or capture a photo</p>
        <p className="mt-1.5 max-w-xs text-sm text-muted">
          A clear, well-lit photo of the item gets the most accurate read.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4" />
          Upload image
        </Button>
        <Button onClick={() => cameraInputRef.current?.click()} variant="secondary">
          <Camera className="h-4 w-4" />
          Use camera
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </Card>
  );
}

function ResultView({ result, onRescan }: { result: ScanResult; onRescan: () => void }) {
  const ActionIcon = ACTION_ICON[result.recommendedAction] ?? Recycle;

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-xl font-semibold">{result.detectedLabel}</p>
              {result.isDemo && <DemoBadge />}
            </div>
            <p className="mt-1 text-sm text-muted">Category: {result.category}</p>
          </div>
          <Badge tone="pine">{Math.round(result.confidence * 100)}% confidence</Badge>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label="Condition" value={CONDITION_LABELS[result.condition]} />
          <Stat
            label="Recommended action"
            value={ACTION_LABELS[result.recommendedAction]}
            icon={<ActionIcon className="h-4 w-4 text-pine" />}
          />
          <Stat
            label="Est. recovery value"
            value={formatValueRange(result.estValueMin, result.estValueMax)}
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium">Possible materials</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.materials.map((m) => (
              <Badge key={m} tone="neutral">
                {m}
              </Badge>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Estimates are indicative only. Actual value depends on condition, model, location, and
          recycler pricing. Confidence reflects the AI model's certainty in item identification,
          not a guarantee of accuracy.
        </p>
      </Card>

      <Card className="bg-pine/5">
        <p className="text-sm font-medium">Why proper handling matters</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Electronic waste can contain materials that are valuable when recovered but harmful if
          discarded improperly — including heavy metals and batteries that require careful
          handling. Routing this item through a verified partner helps recover useful materials
          safely.
        </p>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button href="/recyclers" size="lg">
          Find recovery options
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button onClick={onRescan} variant="secondary" size="lg">
          Scan another item
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-3.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
        {icon}
        {value}
      </p>
    </div>
  );
}
