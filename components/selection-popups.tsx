/**
 * Selection Popups - Reusable popup components for text selection
 * ================================================================
 *
 * Components:
 * - SelectionPopup: Shows when user selects text (Copy, Cut, Emotion, Focus)
 * - EmotionHoverPopup: Shows when hovering over emotion-tagged text
 *
 * Usage:
 * import { SelectionPopup, EmotionHoverPopup, EMOTIONS, getEmotion } from "./selection-popups"
 */

import * as React from "react";
import { Copy, Scissors, Smile, ChevronDown, X, Focus } from "lucide-react";

// ============================================
// EMOTIONS CONFIGURATION
// ============================================

export const EMOTIONS = [
  { id: "happy", name: "Happy", color: "#22c55e", bgColor: "rgba(34, 197, 94, 0.2)" },
  { id: "sad", name: "Sad", color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.2)" },
  { id: "angry", name: "Angry", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.2)" },
  { id: "tired", name: "Tired", color: "#a855f7", bgColor: "rgba(168, 85, 247, 0.2)" },
  { id: "excited", name: "Excited", color: "#f97316", bgColor: "rgba(249, 115, 22, 0.2)" },
  { id: "scared", name: "Scared", color: "#6366f1", bgColor: "rgba(99, 102, 241, 0.2)" },
];

export function getEmotion(id: string) {
  return EMOTIONS.find((e) => e.id === id);
}

// ============================================
// SELECTION POPUP
// Shows when user selects text in the editor
// ============================================

interface SelectionPopupProps {
  position: { x: number; y: number };
  onCopy: () => void;
  onCut: () => void;
  onSelectEmotion: (emotionId: string) => void;
  onFocus: () => void;
  onClose: () => void;
}

export function SelectionPopup({
  position,
  onCopy,
  onCut,
  onSelectEmotion,
  onFocus,
  onClose,
}: SelectionPopupProps) {
  const [isEmotionOpen, setIsEmotionOpen] = React.useState(false);

  return (
    <div
      className="fixed z-50 flex items-center gap-1 px-2 py-1.5 bg-foreground text-background rounded-full shadow-xl animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: position.x,
        top: position.y - 50,
        transform: "translateX(-50%)",
      }}
    >
      {/* Copy Button */}
      <button
        onClick={onCopy}
        className="p-2 rounded-full hover:bg-background/20 transition-colors"
        title="Copy"
      >
        <Copy className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-background/30" />

      {/* Cut Button */}
      <button
        onClick={onCut}
        className="p-2 rounded-full hover:bg-background/20 transition-colors"
        title="Cut"
      >
        <Scissors className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-background/30" />

      {/* Emotion Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsEmotionOpen(!isEmotionOpen)}
          className="flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-background/20 transition-colors"
        >
          <Smile className="w-4 h-4" />
          <span className="text-xs font-medium">Emotion</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isEmotionOpen ? "rotate-180" : ""}`} />
        </button>

        {isEmotionOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-foreground rounded-lg shadow-xl p-1 min-w-[140px] animate-in fade-in slide-in-from-bottom-2 duration-150">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => {
                  onSelectEmotion(emotion.id);
                  setIsEmotionOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-background/20 transition-colors text-left"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: emotion.color }}
                />
                <span className="text-sm">{emotion.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-background/30" />

      {/* Focus Button */}
      <button
        onClick={onFocus}
        className="flex items-center gap-1 px-2 py-1.5 rounded-full hover:bg-background/20 transition-colors"
        title="Focus on this text"
      >
        <Focus className="w-4 h-4" />
        <span className="text-xs font-medium">Focus</span>
      </button>
    </div>
  );
}

// ============================================
// EMOTION HOVER POPUP
// Shows when hovering over emotion-tagged text
// ============================================

interface EmotionHoverPopupProps {
  position: { x: number; y: number };
  currentEmotion: string;
  onSelectEmotion: (emotionId: string) => void;
  onRemove: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function EmotionHoverPopup({
  position,
  currentEmotion,
  onSelectEmotion,
  onRemove,
  onMouseEnter,
  onMouseLeave,
}: EmotionHoverPopupProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const current = getEmotion(currentEmotion);

  return (
    <div
      className="fixed z-50 flex items-center gap-1 px-2 py-1.5 bg-foreground text-background rounded-full shadow-xl animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: position.x,
        top: position.y - 50,
        transform: "translateX(-50%)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Current emotion & dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-background/20 transition-colors"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: current?.color }}
          />
          <span className="text-xs font-medium">{current?.name}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-foreground rounded-lg shadow-xl p-1 min-w-[140px] animate-in fade-in slide-in-from-bottom-2 duration-150">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => {
                  onSelectEmotion(emotion.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-background/20 transition-colors text-left ${
                  emotion.id === currentEmotion ? "bg-background/10" : ""
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: emotion.color }}
                />
                <span className="text-sm">{emotion.name}</span>
                {emotion.id === currentEmotion && (
                  <span className="ml-auto text-xs opacity-60">Current</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-background/30" />

      {/* Remove emotion button */}
      <button
        onClick={onRemove}
        className="p-2 rounded-full hover:bg-background/20 transition-colors text-red-400"
        title="Remove emotion"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============================================
// FOCUS OVERLAY
// Dark overlay with spotlight on focused text
// ============================================

interface FocusOverlayProps {
  focusRect: { top: number; left: number; width: number; height: number };
  onClose: () => void;
}

export function FocusOverlay({ focusRect, onClose }: FocusOverlayProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 cursor-pointer"
      onClick={onClose}
    >
      {/* Spotlight effect using box-shadow */}
      <div
        className="absolute rounded-lg pointer-events-none"
        style={{
          top: focusRect.top - 8,
          left: focusRect.left - 8,
          width: focusRect.width + 16,
          height: focusRect.height + 16,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      />

      {/* Close hint */}
      <div className="absolute top-4 right-4 text-white/70 text-sm flex items-center gap-2">
        <span>Click anywhere or press</span>
        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
        <span>to exit</span>
      </div>
    </div>
  );
}
