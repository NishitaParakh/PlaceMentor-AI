import { useEffect, useRef, useState } from "react";
import { Bot, Trash2, MessageSquare } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import MentorChat from "../components/MentorChat.jsx";
import SuggestedQuestions from "../components/SuggestedQuestions.jsx";
import { mentorProfile, suggestedQuestions, getMentorReply } from "../data/mentorData.js";
import "./CareerMentor.css";

// How long the typing indicator shows before the reply appears. Purely
// cosmetic — it makes the demo feel like a real assistant rather than an
// instant lookup, which is what it actually is.
const TYPING_DELAY = 750;

function timeNow() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

let messageId = 0;
function nextId() {
  messageId += 1;
  return messageId;
}

export default function CareerMentor() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);

  // Clear any pending reply timer if the user navigates away mid-response,
  // so we never call setState on an unmounted component.
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  /**
   * Adds the user's message, then schedules the simulated mentor reply.
   * The reply text comes from getMentorReply() in src/data/mentorData.js —
   * that call is the seam where a real backend request will slot in later
   * (see sendMentorMessage() in src/services/api.js).
   */
  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: trimmed, tips: [], timestamp: timeNow() },
    ]);
    setDraft("");
    setIsTyping(true);

    timerRef.current = setTimeout(() => {
      const reply = getMentorReply(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "mentor", text: reply.text, tips: reply.tips, timestamp: timeNow() },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY);
  }

  function handleClear() {
    clearTimeout(timerRef.current);
    setIsTyping(false);
    setMessages([]);
    setDraft("");
  }

  const hasConversation = messages.length > 0;

  return (
    <DashboardLayout pageTitle="AI Career Mentor">
      <div className="mentor-content">
        <div className="mentor-header">
          <div className="page-intro">
            <div className="page-intro-badges">
              <span className="badge badge-neutral">AI Demo</span>
              <span className="demo-tag">Sample AI Guidance</span>
            </div>
            <h1>AI Career Mentor</h1>
            <p>Get personalized guidance for your placement preparation and career goals.</p>
          </div>

          {hasConversation && (
            <button className="btn btn-secondary btn-sm mentor-clear-btn" onClick={handleClear}>
              <Trash2 size={15} /> Clear conversation
            </button>
          )}
        </div>

        {/* ---- Mentor profile ---- */}
        <section className="card mentor-profile" aria-label="Mentor profile">
          <div className="mentor-profile-avatar" aria-hidden="true">
            <Bot size={22} />
          </div>
          <div className="mentor-profile-body">
            <div className="mentor-profile-top">
              <h3>{mentorProfile.name}</h3>
              <span className="badge badge-neutral">{mentorProfile.role}</span>
            </div>
            <p>{mentorProfile.tagline}</p>
            <span className="mentor-profile-status">
              <span className="mentor-status-dot" aria-hidden="true" />
              {mentorProfile.status}
            </span>
          </div>
          <div className="mentor-profile-meta">
            <MessageSquare size={15} />
            <span>
              {messages.filter((m) => m.role === "user").length} question
              {messages.filter((m) => m.role === "user").length === 1 ? "" : "s"} asked
            </span>
          </div>
        </section>

        {/* ---- Chat ---- */}
        <MentorChat
          messages={messages}
          draft={draft}
          onDraftChange={setDraft}
          onSend={() => sendMessage(draft)}
          onSelectSuggestion={sendMessage}
          isTyping={isTyping}
        />

        {/* Once the conversation has started the starter chips move out of
            the chat panel and sit below it, so they stay reachable without
            eating vertical space in the transcript. */}
        {hasConversation && (
          <section className="card mentor-suggestions-card">
            <SuggestedQuestions
              questions={suggestedQuestions}
              onSelect={sendMessage}
              disabled={isTyping}
              title="Suggested questions"
            />
          </section>
        )}

        <p className="mentor-disclaimer">
          This is a frontend prototype. Replies are chosen from a fixed set of sample answers by simple
          keyword matching — no AI model, database or external service is involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
