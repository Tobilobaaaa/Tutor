import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { heroFeatures, testimonials, upcomingSessions } from "../data/dummy";

const subjectCards = [
  { icon: "∑", title: "Mathematics", text: "Algebra, calculus, statistics, and exam preparation with clear, step-by-step guidance." },
  { icon: "∞", title: "Further Mathematics", text: "Advanced topics for A-Level, IB HL, and competitive university entrance requirements." },
  { icon: "✎", title: "English", text: "Essay writing, literature analysis, IELTS preparation, and academic communication skills." },
  { icon: "🔬", title: "Sciences", text: "Physics, Chemistry, Biology, and integrated science — theory and problem-solving mastery." },
];

const levelCards = [
  { icon: "🎓", title: "High School", text: "GCSE, IGCSE, A-Level, IB, and national curricula with structured revision plans." },
  { icon: "📚", title: "College", text: "Foundation courses, remedial support, and bridging programmes for academic success." },
  { icon: "🏛️", title: "University", text: "Undergraduate modules, dissertations support, and advanced STEM specialisations." },
];

const steps = [
  { num: 1, title: "Choose your path", text: "Book a single session or subscribe to a monthly plan." },
  { num: 2, title: "Schedule online", text: "Pick your subject, level, and preferred time slot." },
  { num: 3, title: "Join via Google Meet", text: "Receive your meeting link before each live class." },
  { num: 4, title: "Achieve your goals", text: "Track progress with personalised feedback every session." },
];

const plans = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Perfect for focused support",
    price: 149,
    featured: false,
    features: [
      "4 live sessions per month",
      "1 subject of your choice",
      "60-minute classes",
      "Session recordings on request",
      "Email support between classes",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Ideal for exam preparation",
    price: 279,
    featured: true,
    tag: "Most Popular",
    features: [
      "8 live sessions per month",
      "Up to 2 subjects",
      "60-minute classes",
      "Priority scheduling",
      "Progress reports monthly",
      "WhatsApp quick queries",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Maximum support & flexibility",
    price: 449,
    featured: false,
    features: [
      "12 live sessions per month",
      "All subjects included",
      "Priority booking",
      "Exam crash revision sessions",
      "Weekly progress reports",
      "24-hour response guarantee",
    ],
  },
] as const;

export function HomePage() {
  return (
    <>
      <Nav />
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Trusted by international students worldwide</span>
            <h1>
              Rise to excellence with <em>Phoenix Academy</em>
            </h1>
            <p className="hero-lead">
              Personalised one-on-one tutoring via Google Meet and leading platforms.
              Mathematics, Further Math, English, and Sciences — for high school, college,
              and university learners.
            </p>
            <ul className="hero-features">
              {heroFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">
                Book a Free Consultation
              </Link>
              <Link to="/subscribe" className="btn btn-outline">
                View Monthly Plans
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>500+</strong>
                <span>Students taught</span>
              </div>
              <div className="stat">
                <strong>98%</strong>
                <span>Satisfaction rate</span>
              </div>
              <div className="stat">
                <strong>15+</strong>
                <span>Countries served</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="hero-card-header">
                  <div className="hero-card-icon">📚</div>
                  <div>
                    <h3>Subjects we teach</h3>
                    <p className="hero-card-sub">Live online · All major curricula</p>
                  </div>
                </div>
                <div className="subject-pills">
                  <span className="pill">∑ Mathematics</span>
                  <span className="pill">∞ Further Math</span>
                  <span className="pill">✎ English</span>
                  <span className="pill">⚛ Physics</span>
                  <span className="pill">⚗ Chemistry</span>
                  <span className="pill">🧬 Biology</span>
                </div>
                <p className="hero-card-desc">
                  Live interactive classes tailored to your curriculum — IB, A-Level, AP,
                  GCSE, and university courses.
                </p>
                <div className="platform-row">
                  <span className="platform-badge">📹 Google Meet</span>
                  <span className="platform-note">Zoom & Teams also available</span>
                </div>
              </div>
            </div>

            <div className="sessions-preview">
              <h4>Upcoming sessions</h4>
              {upcomingSessions.map((s) => (
                <div key={s.student} className="session-item">
                  <div>
                    <strong>{s.student}</strong>
                    <br />
                    {s.subject}
                  </div>
                  <span>{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section id="subjects" className="section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Subjects & levels</h2>
            <p>Expert instruction across STEM and humanities, designed for learners at every stage.</p>
          </div>
          <div className="cards-grid">
            {subjectCards.map((c) => (
              <article key={c.title} className="card">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
          <div className="cards-grid cards-grid-3" style={{ marginTop: "1.25rem" }}>
            {levelCards.map((c) => (
              <article key={c.title} className="card">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What students say</h2>
            <p>Real results from learners across the globe.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <article key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{"★".repeat(t.rating)}</div>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>
                    {t.level} · {t.country}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How it works</h2>
            <p>From booking to your first class — simple, seamless, and fully online.</p>
          </div>
          <div className="process-steps">
            {steps.map((s) => (
              <div key={s.num} className="step">
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Monthly subscription plans</h2>
            <p>Flexible packages for consistent learning. Cancel anytime with 7 days notice.</p>
          </div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`price-card${plan.featured ? " featured" : ""}`}
              >
                {"tag" in plan && plan.tag && <span className="tag">{plan.tag}</span>}
                <h3>{plan.name}</h3>
                <p style={{ color: "var(--muted)" }}>{plan.tagline}</p>
                <div className="price-amount">
                  ${plan.price} <small>/ month</small>
                </div>
                <ul className="price-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  to={`/subscribe?plan=${plan.id}`}
                  className={`btn ${plan.featured ? "btn-primary" : "btn-outline"}`}
                  style={{ width: "100%" }}
                >
                  Get Started
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-band">
            <h2>Ready to rise like a phoenix?</h2>
            <p>
              Book your first session today or subscribe for ongoing support. Your academic
              breakthrough starts here.
            </p>
            <Link to="/booking" className="btn btn-primary">
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
