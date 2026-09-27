import { useEffect, useRef } from "react";
import { Send, Bot } from "lucide-react";
import ChatMessage from "./ChatMessage.jsx";
import SuggestedQuestions from "./SuggestedQuestions.jsx";
import { suggestedQuestions } from "../data/mentorData.js";
import "./MentorChat.css";

/**
 * The chat surface for the AI Career Mentor: scrollable transcript,
 * typing indicator, empty state, and the composer.
 *
 * Deliberately a "dumb" presentational component — all conversation state
 * lives in CareerMentor.jsx, so swapping the dummy reply generator for a
 * real backend call later needs no change here.
 *
 * Props:
 * - messages:  [{ id, role, text, tips, timestamp }]
 * - draft / onDraftChange: controlled composer value
 * - onSend:    called with the trimmed draft text
 * - onSelectSuggestion: called with a suggested question's text
 * - isTyping:  shows the animated typing indicator
 */
export default function MentorChat({
  messages,
  draft,
  onDraftChange,
  onSend,
  onSelectSuggestion,
  isTyping,
}) {
  const scrollRef = useRef(null);
  const endRef = useRef(null);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const canSend = draft.trim().length > 0 && !isTyping;

  function handleKeyDown(e) {
    // Enter sends; Shift+Enter inserts a newline (textarea default).
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="card mentor-chat">
      <div className="mentor-chat-scroll" ref={scrollRef}>
        {isEmpty ? (
          <div className="mentor-chat-empty">
            <div className="mentor-chat-empty-icon">
              <Bot size={24} />
            </div>
            <h3>Start a conversation</h3>
            <p>
              Ask about placement preparation, skills, interviews or your resume. Responses are sample
              guidance from a fixed demo script.
            </p>
          </div>
        ) : (
          <div
            className="mentor-chat-messages"
            role="log"
            aria-live="polite"
            aria-label="Conversation with the AI career mentor"
          >
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                role={m.role}
                text={m.text}
                tips={m.tips}
                timestamp={m.timestamp}
                isDemo={m.role === "mentor"}
              />
            ))}

            {isTyping && (
              <div className="mentor-typing" aria-label="Mentor is typing">
                <div className="mentor-typing-avatar" aria-hidden="true">
                  <Bot size={16} />
                </div>
                <div className="mentor-typing-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="mentor-typing-text">Mentor is typing…</span>
              </div>
            )}

            <div ref={endRef} />
          </div>
        )}
      </div>

      {isEmpty && (
        <div className="mentor-chat-starters">
          <SuggestedQuestions
            questions={suggestedQuestions}
            onSelect={onSelectSuggestion}
            disabled={isTyping}
            title="Try asking"
          />
        </div>
      )}

      <div className="mentor-composer">
        <label htmlFor="mentor-input" className="sr-only">
          Message the AI career mentor
        </label>
        <textarea
          id="mentor-input"
          className="mentor-composer-input"
          placeholder="Ask about skills, interviews, resume or preparation…"
          value={draft}
          rows={1}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn btn-primary mentor-send-btn"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          <Send size={16} />
          <span className="mentor-send-label">Send</span>
        </button>
      </div>

      <p className="mentor-composer-hint">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}
