"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, GripVertical, Volume2, Clock, Smile } from "lucide-react";
import {
  SelectionPopup,
  EmotionHoverPopup,
  FocusOverlay,
  EMOTIONS,
  getEmotion,
} from "./selection-popups";

// ============================================
// CONFIGURATION
// ============================================

const SFX_ITEMS = [
  { id: 1, name: "SFX #1", tag: "<effect=1001>", type: "effect" },
  { id: 2, name: "SFX #2", tag: "<effect=1002>", type: "effect" },
  { id: 3, name: "SFX #3", tag: "<effect=1003>", type: "effect" },
  { id: 4, name: "SFX #4", tag: "<effect=1004>", type: "effect" },
  { id: 5, name: "SFX #5", tag: "<effect=1005>", type: "effect" },
  { id: 6, name: "SFX #6", tag: "<effect=1006>", type: "effect" },
  { id: 7, name: "5s", tag: "<s=5>", type: "silence" },
  { id: 8, name: "10s", tag: "<s=10>", type: "silence" },
];

const EXAMPLE_SCRIPT = `『歡迎收聽今天的播客，我是你的主持人，今天我們要講述一個關於貪心與分享的故事』

從前有一個國王，他擁有全天下最多的禮物，卻一點也不快樂。他的心中似乎總是缺少了什麼。直到有一天，他遇到了一位拼被人。

拼被人擁有一床美麗的拼被，國王想要得到它，卻遭到了拒絕。<angry>國王非常生氣，決定懲罰拼被人</angry>。

他把拼被人送到深山，想讓大熊吃掉他，但大熊卻邀請拼被人共進早餐。國王又把拼被人送到小島，結果被一群麻雀救回。

國王無奈，只好答應拼被人的要求，把皇宮裡的禮物送給別人。於是，國王開始了他的分享之旅。

他先送出一顆彈珠，得到小男孩燦爛的微笑。又送出一些衣服，讓窮人在街上展示。<happy>國王的心情逐漸變得愉快</happy>。

接著，國王把自己的馬當作旋轉木馬，讓小朋友們玩得開心。<happy>這時，國王終於露出了笑容</happy>。

國王開始四處旅行，將所有的禮物送給最需要的人。他的心裡感到充實與滿足。

雖然他的皇袍破爛，鞋子也露出腳趾，但他的眼中充滿了光彩。<excited>他的笑聲如雷，寶物變成了世界各地的微笑</excited>。

最後，拼被人織了一床世界上最美麗的拼被給國王。國王披上它，感受到無與倫比的幸福。

這個故事告訴我們，真正的快樂來自於分享，而不是佔有。樂善好施，才是真正的幸福之道。

今天的故事就到這裡，謝謝你的收聽。我們下次再見。`;

// ============================================
// HELPERS
// ============================================

function getCaretPositionFromPoint(x: number, y: number): { node: Node; offset: number } | null {
  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(x, y);
    if (range) return { node: range.startContainer, offset: range.startOffset };
  }
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  };
  if (doc.caretPositionFromPoint) {
    const pos = doc.caretPositionFromPoint(x, y);
    if (pos) return { node: pos.offsetNode, offset: pos.offset };
  }
  return null;
}

// ============================================
// COMPONENTS
// ============================================

// SFX Item
function SfxItem({ sfx, onDragStart }: { sfx: (typeof SFX_ITEMS)[0]; onDragStart: (e: React.DragEvent, tag: string) => void }) {
  const getIcon = () => {
    if (sfx.type === "silence") return <Clock className="w-3.5 h-3.5" />;
    if (sfx.type === "effect") return <Volume2 className="w-3.5 h-3.5" />;
    return null;
  };

  const getStyles = () => {
    switch (sfx.type) {
      case "effect": return "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "silence": return "bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30";
      default: return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <div draggable onDragStart={(e) => onDragStart(e, sfx.tag)} className="cursor-grab active:cursor-grabbing select-none group">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md ${getStyles()}`}>
        <GripVertical className="w-3 h-3 opacity-40 group-hover:opacity-70" />
        {getIcon()}
        <span className="font-medium text-sm">{sfx.name}</span>
        <span className="text-xs opacity-50 font-mono ml-auto">{sfx.tag}</span>
      </div>
    </div>
  );
}

// Render script with highlighted emotions
function HighlightedContent({
  content,
  onEmotionHover,
  onEmotionLeave,
}: {
  content: string;
  onEmotionHover: (e: React.MouseEvent, emotionId: string, text: string) => void;
  onEmotionLeave: () => void;
}) {
  const parts: React.ReactNode[] = [];
  const emotionRegex = /<(happy|sad|angry|tired|excited|scared)>([\s\S]*?)<\/\1>/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = emotionRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{content.slice(lastIndex, match.index)}</span>);
    }
    const emotionId = match[1];
    const innerText = match[2];
    const emotion = getEmotion(emotionId);
    if (emotion) {
      parts.push(
        <span
          key={key++}
          className="rounded px-0.5 cursor-pointer transition-all hover:ring-2 hover:ring-offset-1"
          style={{ backgroundColor: emotion.bgColor, color: emotion.color }}
          onMouseEnter={(e) => onEmotionHover(e, emotionId, innerText)}
          onMouseLeave={onEmotionLeave}
          data-emotion={emotionId}
        >
          {innerText}
        </span>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push(<span key={key++}>{content.slice(lastIndex)}</span>);
  }
  return <>{parts}</>;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function SfxScriptEditor() {
  const [script, setScript] = React.useState(EXAMPLE_SCRIPT);
  const [isDragOver, setIsDragOver] = React.useState(false);

  // Selection popup state
  const [selectionPopup, setSelectionPopup] = React.useState<{
    position: { x: number; y: number };
    text: string;
    range: Range | null;
    rect: DOMRect | null;
  } | null>(null);

  // Hover popup state
  const [hoverPopup, setHoverPopup] = React.useState<{
    position: { x: number; y: number };
    emotionId: string;
    text: string;
  } | null>(null);

  // Focus mode state
  const [focusRect, setFocusRect] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const [isHoveringPopup, setIsHoveringPopup] = React.useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const updateEditorContent = React.useCallback(() => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    let cursorOffset = 0;
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      cursorOffset = preCaretRange.toString().length;
    }
    setTimeout(() => {
      if (!editorRef.current) return;
      try {
        const sel = window.getSelection();
        if (!sel) return;
        const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT, null);
        let currentOffset = 0;
        let node: Text | null = null;
        let nodeOffset = 0;
        while (walker.nextNode()) {
          const textNode = walker.currentNode as Text;
          if (currentOffset + textNode.length >= cursorOffset) {
            node = textNode;
            nodeOffset = cursorOffset - currentOffset;
            break;
          }
          currentOffset += textNode.length;
        }
        if (node) {
          const range = document.createRange();
          range.setStart(node, Math.min(nodeOffset, node.length));
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } catch {}
    }, 0);
  }, []);

  React.useEffect(() => { updateEditorContent(); }, []);

  const getEditorText = () => {
    if (!editorRef.current) return "";
    let text = "";
    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent || "";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const emotionId = el.dataset.emotion;
        if (emotionId) {
          text += `<${emotionId}>`;
          Array.from(node.childNodes).forEach(walkNodes);
          text += `</${emotionId}>`;
        } else {
          Array.from(node.childNodes).forEach(walkNodes);
        }
      }
    };
    Array.from(editorRef.current.childNodes).forEach(walkNodes);
    return text;
  };

  const handleInput = () => setScript(getEditorText());

  const handleMouseUp = () => {
    // Don't show selection popup in focus mode
    if (focusRect) return;

    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setSelectionPopup(null);
        return;
      }
      const anchorNode = selection.anchorNode;
      const focusNode = selection.focusNode;
      if (anchorNode?.parentElement?.closest("[data-emotion]") || focusNode?.parentElement?.closest("[data-emotion]")) return;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPopup({
        position: { x: rect.left + rect.width / 2, y: rect.top + window.scrollY },
        text: selection.toString(),
        range: range.cloneRange(),
        rect: rect,
      });
    }, 10);
  };

  const handleEmotionHover = (e: React.MouseEvent, emotionId: string, text: string) => {
    // Don't show hover popup in focus mode
    if (focusRect) return;

    clearHoverTimeout();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoverPopup({
      position: { x: rect.left + rect.width / 2, y: rect.top + window.scrollY },
      emotionId,
      text
    });
  };

  const handleEmotionLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopup) {
        setHoverPopup(null);
      }
    }, 150);
  };

  const handlePopupMouseEnter = () => {
    clearHoverTimeout();
    setIsHoveringPopup(true);
  };

  const handlePopupMouseLeave = () => {
    setIsHoveringPopup(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverPopup(null);
    }, 150);
  };

  const wrapWithEmotion = (emotionId: string) => {
    if (!selectionPopup?.range || !editorRef.current) return;
    const selection = window.getSelection();
    if (!selection) return;
    const selectedText = selectionPopup.text;
    const range = selectionPopup.range;
    range.deleteContents();
    const emotion = getEmotion(emotionId);
    if (!emotion) return;
    const span = document.createElement("span");
    span.className = "rounded px-0.5 cursor-pointer transition-all hover:ring-2 hover:ring-offset-1";
    span.style.backgroundColor = emotion.bgColor;
    span.style.color = emotion.color;
    span.dataset.emotion = emotionId;
    span.textContent = selectedText;
    range.insertNode(span);
    selection.removeAllRanges();
    setScript(getEditorText());
    setSelectionPopup(null);
  };

  const changeEmotion = (newEmotionId: string) => {
    if (!hoverPopup) return;
    const oldTag = `<${hoverPopup.emotionId}>${hoverPopup.text}</${hoverPopup.emotionId}>`;
    const newTag = `<${newEmotionId}>${hoverPopup.text}</${newEmotionId}>`;
    setScript(script.replace(oldTag, newTag));
    setHoverPopup(null);
    setIsHoveringPopup(false);
    setTimeout(updateEditorContent, 0);
  };

  const removeEmotion = () => {
    if (!hoverPopup) return;
    const oldTag = `<${hoverPopup.emotionId}>${hoverPopup.text}</${hoverPopup.emotionId}>`;
    setScript(script.replace(oldTag, hoverPopup.text));
    setHoverPopup(null);
    setIsHoveringPopup(false);
    setTimeout(updateEditorContent, 0);
  };

  // Focus mode handlers
  const handleFocus = () => {
    if (!selectionPopup?.rect) return;

    const rect = selectionPopup.rect;
    setFocusRect({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
    setSelectionPopup(null);

    // Clear the selection
    window.getSelection()?.removeAllRanges();
  };

  const handleCloseFocus = () => {
    setFocusRect(null);
  };

  const handleCopy = () => {
    if (selectionPopup?.text) {
      navigator.clipboard.writeText(selectionPopup.text);
      setSelectionPopup(null);
    }
  };

  const handleCut = () => {
    if (selectionPopup?.text && selectionPopup.range) {
      navigator.clipboard.writeText(selectionPopup.text);
      selectionPopup.range.deleteContents();
      setScript(getEditorText());
      setSelectionPopup(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, tag: string) => {
    e.dataTransfer.setData("text/plain", tag);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const tag = e.dataTransfer.getData("text/plain");
    if (!tag || !editorRef.current) return;
    const caretPos = getCaretPositionFromPoint(e.clientX, e.clientY);
    if (caretPos && editorRef.current.contains(caretPos.node)) {
      const range = document.createRange();
      range.setStart(caretPos.node, caretPos.offset);
      range.collapse(true);
      const tagNode = document.createTextNode(tag);
      range.insertNode(tagNode);
      range.setStartAfter(tagNode);
      range.collapse(true);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setScript(getEditorText());
    }
    editorRef.current.focus();
  };

  React.useEffect(() => {
    const prevent = (e: DragEvent) => { if (e.target !== editorRef.current) e.preventDefault(); };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Focus Overlay */}
      {focusRect && (
        <FocusOverlay focusRect={focusRect} onClose={handleCloseFocus} />
      )}

      {/* Selection Popup */}
      {selectionPopup && (
        <SelectionPopup
          position={selectionPopup.position}
          onCopy={handleCopy}
          onCut={handleCut}
          onSelectEmotion={wrapWithEmotion}
          onFocus={handleFocus}
          onClose={() => setSelectionPopup(null)}
        />
      )}

      {/* Hover Popup for emotions */}
      {hoverPopup && (
        <EmotionHoverPopup
          position={hoverPopup.position}
          currentEmotion={hoverPopup.emotionId}
          onSelectEmotion={changeEmotion}
          onRemove={removeEmotion}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Script Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">{script.length} chars</Badge>
                <button onClick={() => navigator.clipboard.writeText(script)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Copy all">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              onMouseUp={handleMouseUp}
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`w-full min-h-[500px] p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap bg-background text-foreground focus:outline-none transition-colors duration-200 ${isDragOver ? "bg-primary/5" : ""}`}
            >
              <HighlightedContent content={script} onEmotionHover={handleEmotionHover} onEmotionLeave={handleEmotionLeave} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3 border-b bg-muted/30">
              <CardTitle className="text-sm flex items-center gap-2"><Smile className="w-4 h-4" />Emotions</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {EMOTIONS.map((emotion) => (
                  <div key={emotion.id} className="flex items-center gap-2 px-2 py-1.5 rounded text-xs" style={{ backgroundColor: emotion.bgColor, color: emotion.color }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: emotion.color }} />
                    {emotion.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Select text to add emotion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 border-b bg-muted/30">
              <CardTitle className="text-sm flex items-center gap-2"><Volume2 className="w-4 h-4 text-blue-500" />Sound Effects</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {SFX_ITEMS.filter((s) => s.type === "effect").map((sfx) => <SfxItem key={sfx.id} sfx={sfx} onDragStart={handleDragStart} />)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3 border-b bg-muted/30">
              <CardTitle className="text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" />Silence / Pause</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {SFX_ITEMS.filter((s) => s.type === "silence").map((sfx) => <SfxItem key={sfx.id} sfx={sfx} onDragStart={handleDragStart} />)}
            </CardContent>
          </Card>

          <div className="p-3 rounded-lg bg-muted/50 border text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">How to use:</p>
            <p>• Drag SFX into the script</p>
            <p>• Select text → pick emotion</p>
            <p>• Hover emotion text to change</p>
            <p>• Select text → Focus to highlight</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="py-3 border-b bg-muted/30">
          <CardTitle className="text-base">Raw Output</CardTitle>
        </CardHeader>
        <CardContent className="p-4 max-h-[200px] overflow-auto">
          <pre className="whitespace-pre-wrap font-mono text-xs break-words text-muted-foreground">{script}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
