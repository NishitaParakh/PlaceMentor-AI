import { useState } from "react";
import {
  Target,
  GitBranch,
  Route as RouteIcon,
  MessagesSquare,
  FileSearch,
  Building2,
  ChevronDown,
  Quote,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import DashboardPreview from "../components/DashboardPreview.jsx";
import {
  heroStats,
  features,
  howItWorks,
  benefits,
  aiCapabilities,
  impact,
  faqs,
} from "../data/landingData.js";
import "./Landing.css";

const FEATURE_ICONS = [Target, GitBranch, RouteIcon, MessagesSquare, FileSearch, Building2];

export default function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Benefits />
      <AiCapabilities />
      <Impact />
      <Faq />
      <ClosingCta />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>
            Know where you stand.
            <br />
            Know what to improve.
            <br />
            Get placement ready.
          </h1>
          <p>
            PlaceMentor AI turns scattered placement prep — skills, resume, mock interviews,
            company research — into one readiness score and a clear plan to raise it.
          </p>
          <div className="hero-actions">
            <Button to="/login" size="lg">
              Check your readiness score
            </Button>
            <Button to="/login" variant="secondary" size="lg">
              See a demo dashboard
            </Button>
          </div>
          <p className="hero-note">Used across engineering colleges as part of placement cell preparation.</p>
        </div>

        <div className="hero-visual">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {heroStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-heading">
          <h2>Everything placement prep actually requires</h2>
          <p>Six tools that normally live in six different places, brought into one dashboard.</p>
        </div>

        <div className="feature-grid">
          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-heading center">
          <h2>How PlaceMentor AI works</h2>
          <p>Four steps between creating your profile and walking into an interview prepared.</p>
        </div>

        <div className="steps-row">
          {howItWorks.map((item, i) => (
            <div className="step-item" key={item.step}>
              <div className="step-number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {i < howItWorks.length - 1 && <div className="step-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section">
      <div className="container benefits-inner">
        <div className="benefits-visual">
          <div className="benefits-card">
            <span className="benefits-card-label">Skill gap analysis</span>
            <BenefitRow label="DSA" current={55} required={80} />
            <BenefitRow label="System design" current={40} required={75} />
            <BenefitRow label="Communication" current={70} required={85} />
            <BenefitRow label="Cloud basics" current={35} required={65} />
          </div>
        </div>

        <div className="benefits-copy">
          <div className="section-heading">
            <h2>Built around what actually moves the needle</h2>
            <p>Not another checklist — a system that tells you what to do next, and why.</p>
          </div>
          <ul className="benefits-list">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BenefitRow({ label, current, required }) {
  return (
    <div className="benefit-row">
      <div className="benefit-row-top">
        <span>{label}</span>
        <span className="benefit-row-values">
          {current}% <span className="benefit-row-required">/ {required}% needed</span>
        </span>
      </div>
      <div className="benefit-row-track">
        <div className="benefit-row-required-marker" style={{ left: `${required}%` }} />
        <div className="benefit-row-fill" style={{ width: `${current}%` }} />
      </div>
    </div>
  );
}

function AiCapabilities() {
  return (
    <section className="ai-capabilities" id="ai-capabilities">
      <div className="container">
        <div className="section-heading center light">
          <h2>Where the AI actually helps</h2>
          <p>Four places PlaceMentor AI does real work instead of showing another chart.</p>
        </div>

        <div className="capabilities-grid">
          {aiCapabilities.map((cap) => (
            <div className="capability-card" key={cap.title}>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>What students say after using it</h2>
          <p>Sample feedback collected during pilot use — shown here as demo content.</p>
        </div>

        <div className="impact-grid">
          {impact.map((item) => (
            <div className="impact-card" key={item.name}>
              <Quote size={20} className="impact-quote-icon" />
              <p className="impact-quote">{item.quote}</p>
              <div className="impact-person">
                <span className="impact-name">{item.name}</span>
                <span className="impact-role">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container faq-inner">
        <div className="section-heading">
          <h2>Frequently asked questions</h2>
          <p>Everything students usually ask before their first week on the platform.</p>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                {isOpen && <p className="faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="closing-cta">
      <div className="container closing-cta-inner">
        <h2>See your placement readiness score in under five minutes</h2>
        <p>No setup for your college required to try the student experience.</p>
        <Button to="/login" size="lg">
          Get started for free
        </Button>
      </div>
    </section>
  );
}
