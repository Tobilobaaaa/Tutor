import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { PLANS } from "../config/plans";
import { createSubscription } from "../lib/storage";
import type { SubscribeFormData, SubscriptionPlan } from "../types";

const planCards: { id: SubscriptionPlan; featured?: boolean; tag?: string }[] = [
  { id: "essential" },
  { id: "standard", featured: true, tag: "Popular" },
  { id: "premium" },
];

export function SubscribePage() {
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan") as SubscriptionPlan | null;

  const [form, setForm] = useState<SubscribeFormData>({
    student_name: "",
    email: "",
    plan: planFromUrl && planFromUrl in PLANS ? planFromUrl : "essential",
  });
  const [highlighted, setHighlighted] = useState<SubscriptionPlan>(form.plan);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (planFromUrl && planFromUrl in PLANS) {
      setForm((f) => ({ ...f, plan: planFromUrl }));
      setHighlighted(planFromUrl);
    }
  }, [planFromUrl]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const sub = createSubscription(form);
      const planName = PLANS[sub.plan].name;
      setAlert({
        type: "success",
        message: `Welcome to Phoenix Academy! Your ${planName} plan is now active.`,
      });
      setForm({ student_name: "", email: "", plan: form.plan });
    } catch {
      setAlert({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Nav variant="minimal" />
      <div className="page-hero">
        <div className="container">
          <h1>Monthly subscription</h1>
          <p>
            Consistent tutoring with flexible monthly plans. Billed monthly — cancel with 7
            days notice.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: "3rem" }}>
        <div className="pricing-grid">
          {planCards.map(({ id, featured, tag }) => {
            const plan = PLANS[id];
            const isHighlighted = highlighted === id;
            return (
              <article
                key={id}
                className={`price-card${isHighlighted || featured ? " featured" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setForm((f) => ({ ...f, plan: id }));
                  setHighlighted(id);
                  document.getElementById("subscribe-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setForm((f) => ({ ...f, plan: id }));
                    setHighlighted(id);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {tag && <span className="tag">{tag}</span>}
                <h3>{plan.name}</h3>
                <div className="price-amount">
                  ${plan.price} <small>/ month</small>
                </div>
                <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
                  {plan.sessions} sessions · {plan.description.split("·")[1]?.trim() ?? ""}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="form-card" id="subscribe-form">
          {alert && <Alert type={alert.type} message={alert.message} />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="plan">Selected plan *</label>
              <select
                id="plan"
                required
                value={form.plan}
                onChange={(e) => {
                  const plan = e.target.value as SubscriptionPlan;
                  setForm((f) => ({ ...f, plan }));
                  setHighlighted(plan);
                }}
              >
                <option value="essential">Essential — $149/month</option>
                <option value="standard">Standard — $279/month</option>
                <option value="premium">Premium — $449/month</option>
              </select>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="student_name">Full name *</label>
                <input
                  id="student_name"
                  type="text"
                  required
                  value={form.student_name}
                  onChange={(e) => setForm((f) => ({ ...f, student_name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              By subscribing you agree to monthly billing. Payment is processed securely. You
              will receive a confirmation email with next steps.
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Start my subscription"}
            </button>
          </form>
        </div>
      </div>

      <Footer minimal />
    </>
  );
}
