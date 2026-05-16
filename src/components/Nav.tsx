import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  variant?: "default" | "minimal";
}

export function Nav({ variant = "default" }: NavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="nav-header">
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-shell">
          <div className="nav-inner">
            <Link to="/" className="logo" onClick={close}>
              <span className="logo-icon">🔥</span>
              Phoenix Academy
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={close}
        />
      )}

      <ul className={`nav-links${open ? " open" : ""}`} id="mobile-nav">
        {variant === "default" && isHome ? (
          <>
            <li>
              <a href="#subjects" onClick={close}>
                Subjects
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={close}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={close}>
                Pricing
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link to="/" onClick={close}>
              Home
            </Link>
          </li>
        )}
        <li>
          <Link to="/booking" onClick={close}>
            Book a Session
          </Link>
        </li>
        <li className="nav-cta">
          <Link to="/subscribe" className="btn btn-primary btn-sm" onClick={close}>
            Subscribe
          </Link>
        </li>
      </ul>
    </header>
  );
}
