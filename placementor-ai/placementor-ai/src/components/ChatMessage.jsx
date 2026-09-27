import { Bot } from "lucide-react";
import studentData from "../data/studentData.js";
import "./ChatMessage.css";

/**
 * One message bubble in the AI Career Mentor conversation.
 *
 * Props:
 * - role:      "user" | "mentor"
 * - text:      the message body
 * - tips:      optional string[] rendered as a bullet list (mentor only)
 * - timestamp: display string, e.g. "10:42 AM"
 * - isDemo:    when true, shows the "Prototype Response" tag so a mentor
 *              reply is never mistaken for real AI output
 */
export default function ChatMessage({ role, text, tips = [], timestamp, isDemo = false }) {
  const isUser = role === "user";

  return (
    <div className={isUser ? "chat-msg chat-msg-user" : "chat-msg chat-msg-mentor"}>
      <div className="chat-msg-avatar" aria-hidden="true">
        {isUser ? studentData.name.charAt(0) : <Bot size={16} />}
      </div>

      <div className="chat-msg-content">
        <div className="chat-msg-meta">
          <span className="chat-msg-author">{isUser ? "You" : "PlaceMentor AI"}</span>
          {isDemo && <span className="demo-tag">Prototype Response</span>}
          {timestamp && <span className="chat-msg-time">{timestamp}</span>}
        </div>

        <div className="chat-msg-bubble">
          <p>{text}</p>

          {tips.length > 0 && (
            <ul className="chat-msg-tips">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
