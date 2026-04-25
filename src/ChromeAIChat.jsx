import { useEffect, useRef, useState, useCallback } from "react";

/**
 * ChromeAIChat — Portfolio chatbot using Chrome's built-in Gemini Nano
 *
 * SETUP:
 *  1. Drop this file into your project (e.g. src/components/ChromeAIChat.jsx)
 *  2. Import and use: <ChromeAIChat systemPrompt="..." />
 *
 * REQUIREMENTS (for visitors):
 *  - Chrome 138+ on desktop (Windows 10/11, macOS 13+, Linux)
 *  - 22 GB+ free storage (for Gemini Nano model)
 *  - 4 GB+ VRAM  OR  16 GB RAM + 4 CPU cores
 *
 * CUSTOMIZATION:
 *  - Pass `systemPrompt` prop to set the AI's persona/context
 *  - Pass `welcomeMessage` prop to change the first message
 *  - Pass `placeholder` prop to change input placeholder text
 *  - Adjust the CSS variables at the top of the <style> block below
 */

const STYLES = `
  .caic-wrapper {
    --caic-radius: 14px;
    --caic-radius-sm: 8px;
    --caic-border: 1px solid rgba(128,128,128,0.18);
    --caic-bg: #ffffff;
    --caic-surface: #f7f7f5;
    --caic-text: #1a1a1a;
    --caic-text-muted: #6b6b6b;
    --caic-user-bg: #1a56db;
    --caic-user-text: #ffffff;
    --caic-dot-ready: #1D9E75;
    --caic-dot-loading: #EF9F27;
    --caic-dot-error: #E24B4A;
    --caic-accent: #1a56db;
    --caic-font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-family: var(--caic-font);
    background: var(--caic-bg);
    border: var(--caic-border);
    border-radius: var(--caic-radius);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    height: 520px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  }

  @media (prefers-color-scheme: dark) {
    .caic-wrapper {
      --caic-bg: #1c1c1e;
      --caic-surface: #2c2c2e;
      --caic-text: #f2f2f7;
      --caic-text-muted: #8e8e93;
      --caic-border: 1px solid rgba(255,255,255,0.1);
    }
  }

  .caic-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 16px;
    border-bottom: var(--caic-border);
    background: var(--caic-surface);
    flex-shrink: 0;
  }

  .caic-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: background 0.3s ease;
  }
  .caic-dot--ready   { background: var(--caic-dot-ready); }
  .caic-dot--loading { background: var(--caic-dot-loading); animation: caic-pulse 1s ease infinite; }
  .caic-dot--error   { background: var(--caic-dot-error); }

  @keyframes caic-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }

  .caic-header-info { flex: 1; min-width: 0; }
  .caic-header-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--caic-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .caic-header-sub {
    font-size: 11px;
    color: var(--caic-text-muted);
    margin-top: 1px;
  }

  .caic-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 20px;
    background: rgba(26, 86, 219, 0.12);
    color: var(--caic-accent);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .caic-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-behavior: smooth;
  }

  .caic-messages::-webkit-scrollbar { width: 4px; }
  .caic-messages::-webkit-scrollbar-track { background: transparent; }
  .caic-messages::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.25); border-radius: 2px; }

  .caic-msg {
    display: flex;
    flex-direction: column;
    max-width: 82%;
    animation: caic-fadein 0.18s ease;
  }
  @keyframes caic-fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

  .caic-msg--user { align-self: flex-end; align-items: flex-end; }
  .caic-msg--ai   { align-self: flex-start; align-items: flex-start; }

  .caic-bubble {
    padding: 9px 13px;
    font-size: 14px;
    line-height: 1.55;
    border-radius: 16px;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .caic-msg--user .caic-bubble {
    background: var(--caic-user-bg);
    color: var(--caic-user-text);
    border-bottom-right-radius: 4px;
  }

  .caic-msg--ai .caic-bubble {
    background: var(--caic-surface);
    color: var(--caic-text);
    border: var(--caic-border);
    border-bottom-left-radius: 4px;
  }

  .caic-bubble--streaming::after {
    content: '▋';
    display: inline-block;
    animation: caic-blink 0.65s ease infinite;
    font-size: 11px;
    margin-left: 2px;
    vertical-align: middle;
  }

  @keyframes caic-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .caic-timestamp {
    font-size: 11px;
    color: var(--caic-text-muted);
    margin-top: 3px;
    padding: 0 2px;
  }

  .caic-notice {
    align-self: center;
    font-size: 13px;
    color: var(--caic-text-muted);
    background: var(--caic-surface);
    border: var(--caic-border);
    border-radius: var(--caic-radius-sm);
    padding: 12px 16px;
    line-height: 1.6;
    text-align: center;
    max-width: 90%;
    animation: caic-fadein 0.2s ease;
  }
  .caic-notice a {
    color: var(--caic-accent);
    text-decoration: none;
  }
  .caic-notice a:hover { text-decoration: underline; }

  .caic-input-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 10px 12px;
    border-top: var(--caic-border);
    background: var(--caic-bg);
    flex-shrink: 0;
  }

  .caic-textarea {
    flex: 1;
    resize: none;
    border: var(--caic-border);
    border-radius: var(--caic-radius-sm);
    padding: 8px 12px;
    font-size: 14px;
    font-family: var(--caic-font);
    background: var(--caic-surface);
    color: var(--caic-text);
    outline: none;
    line-height: 1.4;
    min-height: 36px;
    max-height: 100px;
    transition: border-color 0.15s;
    overflow-y: auto;
  }
  .caic-textarea:focus {
    border-color: var(--caic-accent);
  }
  .caic-textarea::placeholder { color: var(--caic-text-muted); }
  .caic-textarea:disabled { opacity: 0.5; cursor: not-allowed; }

  .caic-send {
    width: 36px;
    height: 36px;
    border-radius: var(--caic-radius-sm);
    border: var(--caic-border);
    background: var(--caic-surface);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s, transform 0.1s;
    color: var(--caic-text);
  }
  .caic-send:hover:not(:disabled) { background: rgba(128,128,128,0.15); }
  .caic-send:active:not(:disabled) { transform: scale(0.95); }
  .caic-send:disabled { opacity: 0.35; cursor: not-allowed; }

  .caic-footer {
    font-size: 11px;
    color: var(--caic-text-muted);
    text-align: center;
    padding: 0 12px 9px;
    flex-shrink: 0;
  }
`;

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M1 7.5L14 1L7.5 14L6.5 8.5L1 7.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const STATUS_LABELS = {
  init:     "Initializing…",
  checking: "Checking Chrome AI…",
  download: "Downloading model…",
  ready:    "Ready · Gemini Nano",
  thinking: "Thinking…",
  error:    "Unavailable",
};

export default function ChromeAIChat({
  systemPrompt = "You are a helpful, friendly AI assistant embedded in a developer's portfolio website. Keep responses concise and conversational. You can help with questions about web development, programming, and general topics.",
  welcomeMessage = "Hi! I'm running entirely in your browser using Chrome's built-in Gemini Nano — no server, no API key, no data leaves your device. Ask me anything!",
  placeholder = "Ask me anything…",
}) {
  const [status, setStatus] = useState("init");
  const [statusDot, setStatusDot] = useState("loading");
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [footerNote, setFooterNote] = useState("");

  const sessionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const addMessage = useCallback((role, text) => {
    const id = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id, role, text, time: getTime(), streaming: false }]);
    return id;
  }, []);

  const addNotice = useCallback((html) => {
    const id = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id, role: "notice", html }]);
  }, []);

  const updateMessage = useCallback((id, text, streaming = false) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text, streaming } : m))
    );
  }, []);

  useEffect(() => {
    (async () => {
      setStatus("checking");
      setStatusDot("loading");

      if (!window.ai?.languageModel) {
        setStatus("error");
        setStatusDot("error");
        addNotice(
          `Chrome's built-in AI (Prompt API) is not available in this browser.<br/>` +
          `Requires <strong>Chrome 138+</strong> on desktop with Gemini Nano installed.<br/>` +
          `<a href="https://developer.chrome.com/docs/ai/get-started" target="_blank" rel="noopener">Learn how to enable it →</a>`
        );
        setFooterNote("Open in Chrome 138+ on desktop to use this feature.");
        return;
      }

      try {
        const cap = await window.ai.languageModel.capabilities();

        if (cap.available === "no") {
          setStatus("error");
          setStatusDot("error");
          addNotice(
            `Gemini Nano is not available on this device.<br/>` +
            `Check you have 22 GB+ free storage and meet the hardware requirements.`
          );
          return;
        }

        if (cap.available === "after-download") {
          setStatus("download");
          setStatusDot("loading");
          addNotice("Gemini Nano is downloading for the first time. Please wait…");
        }

        sessionRef.current = await window.ai.languageModel.create({ systemPrompt });

        setMessages([]);
        setStatus("ready");
        setStatusDot("ready");
        setFooterNote("Runs locally · No data leaves your device");
        addMessage("ai", welcomeMessage);
      } catch (e) {
        setStatus("error");
        setStatusDot("error");
        addNotice(`Could not initialize AI session: ${e.message}`);
      }
    })();

    return () => { sessionRef.current?.destroy?.(); };
  }, [systemPrompt, welcomeMessage, addMessage, addNotice]);

  const handleSend = useCallback(async () => {
    const text = inputVal.trim();
    if (!text || busy || !sessionRef.current) return;

    setBusy(true);
    setInputVal("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    addMessage("user", text);

    const aiId = Date.now() + Math.random();
    setMessages((prev) => [
      ...prev,
      { id: aiId, role: "ai", text: "", time: getTime(), streaming: true },
    ]);
    setStatus("thinking");
    setStatusDot("loading");

    try {
      const stream = sessionRef.current.promptStreaming(text);
      for await (const chunk of stream) {
        updateMessage(aiId, chunk, true);
        scrollToBottom();
      }
      updateMessage(aiId, await stream, false);
    } catch (e) {
      updateMessage(aiId, `Error: ${e.message}`, false);
    }

    setStatus("ready");
    setStatusDot("ready");
    setBusy(false);
    textareaRef.current?.focus();
  }, [inputVal, busy, addMessage, updateMessage, scrollToBottom]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInput = useCallback((e) => {
    setInputVal(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  }, []);

  const canSend = inputVal.trim().length > 0 && !busy && !!sessionRef.current;

  return (
    <>
      <style>{STYLES}</style>
      <div className="caic-wrapper" role="region" aria-label="Chrome AI Chat">
        {/* Header */}
        <div className="caic-header">
          <div className={`caic-dot caic-dot--${statusDot}`} aria-hidden="true" />
          <div className="caic-header-info">
            <div className="caic-header-title">{STATUS_LABELS[status] ?? status}</div>
            <div className="caic-header-sub">Powered by Gemini Nano</div>
          </div>
          <span className="caic-badge">Chrome AI</span>
        </div>

        {/* Messages */}
        <div className="caic-messages" aria-live="polite" aria-label="Chat messages">
          {messages.map((m) => {
            if (m.role === "notice") {
              return (
                <div
                  key={m.id}
                  className="caic-notice"
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              );
            }
            return (
              <div key={m.id} className={`caic-msg caic-msg--${m.role}`}>
                <div className={`caic-bubble${m.streaming ? " caic-bubble--streaming" : ""}`}>
                  {m.text}
                </div>
                <div className="caic-timestamp">{m.time}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="caic-input-row">
          <textarea
            ref={textareaRef}
            className="caic-textarea"
            value={inputVal}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={busy || status === "error" || status === "init" || status === "checking" || status === "download"}
            aria-label="Message input"
          />
          <button
            className="caic-send"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>

        {footerNote && <div className="caic-footer">{footerNote}</div>}
      </div>
    </>
  );
}
