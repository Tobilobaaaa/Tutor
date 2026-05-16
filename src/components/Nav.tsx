import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  variant?: "default" | "minimal";
}

export function Nav({ variant = "default" }: NavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">🔥</span>
          Phoenix Academy
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {variant === "default" && isHome ? (
            <>
              <li>
                <a href="#subjects" onClick={() => setOpen(false)}>
                  Subjects
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={() => setOpen(false)}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={() => setOpen(false)}>
                  Pricing
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
          )}
          <li>
            <Link to="/booking" onClick={() => setOpen(false)}>
              Book a Session
            </Link>
          </li>
          <li>
            <Link
              to="/subscribe"
              className="btn btn-primary btn-sm"
              onClick={() => setOpen(false)}
            >
              Subscribe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
