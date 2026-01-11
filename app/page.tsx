import { SfxScriptEditor } from "@/components/sfx-script-editor";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-muted/30 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">SFX Script Editor</h1>
            <p className="text-sm text-muted-foreground">
              Drag effects into your script
            </p>
          </div>
        </div>
      </header>
      <SfxScriptEditor />
    </main>
  );
}
