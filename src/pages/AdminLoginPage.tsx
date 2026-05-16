import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/plans";

const AUTH_KEY = "phoenix_admin_auth";

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function AdminLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid credentials");
      return;
    }
    setAdminAuthenticated(true);
    navigate("/admin");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="logo" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
          <span className="logo-icon">🔥</span> Phoenix Academy
        </Link>
        <h1>Admin Dashboard</h1>
        <p>Sign in to manage bookings, classes & payments</p>
        {error && <Alert type="error" message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
