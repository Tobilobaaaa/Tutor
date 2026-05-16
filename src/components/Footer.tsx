import { Link } from "react-router-dom";

interface FooterProps {
  minimal?: boolean;
}

export function Footer({ minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="footer">
        <div className="container footer-bottom">© 2026 Phoenix Academy</div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">
              <span className="logo-icon">🔥</span>
              Phoenix Academy
            </Link>
            <p>
              World-class online tutoring for international students. Mathematics, Further
              Math, English, and Sciences.
            </p>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li>
                <Link to="/booking">Book a session</Link>
              </li>
              <li>
                <Link to="/subscribe">Subscribe</Link>
              </li>
              <li>
                <a href="/#pricing">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:hello@phoenixacademy.com">hello@phoenixacademy.com</a>
              </li>
              <li>Google Meet & online platforms</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Phoenix Academy. All rights reserved.</div>
      </div>
    </footer>
  );
}
