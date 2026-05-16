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

  const homeLinks = (
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
  );

  return (
    <>
      <header className="nav-header">
        <nav className="nav-bar" aria-label="Main navigation">
          <div className="nav-shell">
            <div className="nav-inner">
              <Link to="/" className="logo" onClick={close}>
                <span className="logo-icon">🔥</span>
                Phoenix Academy
              </Link>

              <div className="nav-actions">
                <ul className="nav-links nav-links--desktop">
                  {variant === "default" && isHome ? homeLinks : (
                    <li>
                      <Link to="/" onClick={close}>
                        Home
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/booking">Book a Session</Link>
                  </li>
                  <li className="nav-cta">
                    <Link to="/subscribe" className="btn btn-primary btn-sm">
                      Subscribe
                    </Link>
                  </li>
                </ul>

                <button
                  type="button"
                  className="nav-toggle"
                  aria-label="Open menu"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`nav-drawer-root${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="nav-overlay"
          aria-label="Close menu"
          onClick={close}
          tabIndex={open ? 0 : -1}
        />

        <button
          type="button"
          className="nav-drawer-close"
          aria-label="Close menu"
          onClick={close}
          tabIndex={open ? 0 : -1}
        >
          ✕
        </button>

        <aside
          className="nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="nav-drawer-header">
            <span className="logo-icon">🔥</span>
            <div className="nav-drawer-header-text">
              <strong>Phoenix Academy</strong>
              <span>Menu</span>
            </div>
          </div>

          <nav className="nav-drawer-body">
            <ul className="nav-drawer-links">
              {variant === "default" && isHome ? homeLinks : (
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
            </ul>
          </nav>

          <div className="nav-drawer-footer">
            <Link to="/subscribe" className="btn btn-primary" onClick={close}>
              Subscribe
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
