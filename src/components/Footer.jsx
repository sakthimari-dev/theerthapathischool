import React from "react";
import "./Footer.css";

const PHONES = ["9344278055", "9345258241"];

const Divider = () => (
  <span className="footer-divider" aria-hidden="true">✦</span>
);

const PhoneIcon = () => (
  <svg className="footer-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
    />
  </svg>
);

function FooterItems() {
  return (
    <>
      <span className="footer-label">Website Designed &amp; Developed by</span>
      <span className="footer-brand">VIVEKA COMPUTERS</span>
      <Divider />
      {PHONES.map((p) => (
        <a key={p} href={`tel:${p}`} className="footer-contact">
          <PhoneIcon />
          {p}
        </a>
      ))}
      <Divider />
      <span className="footer-school">THEERTHAPATHI HIGHER SECONDARY SCHOOL</span>
      <Divider />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee">
        <div className="footer-track">
          {[0, 1, 2, 3].map((i) => (
            <div className="footer-group" key={i} aria-hidden={i > 0 ? "true" : undefined}>
              <FooterItems />
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Theerthapathi Higher Secondary School. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;