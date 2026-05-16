import { type FormEvent, useMemo, useState } from "react";
import { Alert } from "../components/Alert";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { createBooking } from "../lib/storage";
import type { BookingFormData, StudentLevel, Subject } from "../types";

const minDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0] ?? "";
})();

const initialForm: BookingFormData = {
  student_name: "",
  email: "",
  phone: "",
  subject: "" as Subject,
  level: "" as StudentLevel,
  preferred_date: "",
  preferred_time: "",
  duration_minutes: 60,
  notes: "",
};

export function BookingPage() {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  const dateMin = useMemo(() => minDate, []);

  function update<K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.subject || !form.level) {
      setAlert({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setSubmitting(true);
    try {
      createBooking(form);
      setAlert({
        type: "success",
        message:
          "Your booking request has been received! We will confirm via email shortly.",
      });
      setForm(initialForm);
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
          <h1>Book a tutoring session</h1>
          <p>
            Schedule a live one-on-one class via Google Meet. We&apos;ll confirm your booking
            within 24 hours.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="form-card">
          {alert && <Alert type={alert.type} message={alert.message} />}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="student_name">Full name *</label>
                <input
                  id="student_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.student_name}
                  onChange={(e) => update("student_name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone / WhatsApp *</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+1 234 567 8900"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="level">Student level *</label>
                <select
                  id="level"
                  required
                  value={form.level}
                  onChange={(e) => update("level", e.target.value as StudentLevel)}
                >
                  <option value="">Select level</option>
                  <option value="high-school">High School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                </select>
              </div>
              <div className="form-group full">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value as Subject)}
                >
                  <option value="">Select subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="further-math">Further Mathematics</option>
                  <option value="english">English</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="general-science">General Science</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="preferred_date">Preferred date *</label>
                <input
                  id="preferred_date"
                  type="date"
                  required
                  min={dateMin}
                  value={form.preferred_date}
                  onChange={(e) => update("preferred_date", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferred_time">Preferred time *</label>
                <input
                  id="preferred_time"
                  type="time"
                  required
                  value={form.preferred_time}
                  onChange={(e) => update("preferred_time", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration_minutes">Duration</label>
                <select
                  id="duration_minutes"
                  value={form.duration_minutes}
                  onChange={(e) => update("duration_minutes", Number(e.target.value))}
                >
                  <option value={60}>60 minutes — $75</option>
                  <option value={90}>90 minutes — $110</option>
                  <option value={120}>120 minutes — $140</option>
                </select>
              </div>
              <div className="form-group full">
                <label htmlFor="notes">Additional notes</label>
                <textarea
                  id="notes"
                  placeholder="Curriculum (e.g. IB, A-Level), topics to cover, timezone..."
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.5rem" }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit booking request"}
            </button>
          </form>
        </div>
      </div>

      <Footer minimal />
    </>
  );
}
