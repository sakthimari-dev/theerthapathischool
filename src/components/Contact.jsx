import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  PhoneCall,
  MapPinned,
} from "lucide-react";
import "./Contact.css";
import schoolLogo from "../assets/logo.webp";

// ---- Dummy data (swap with real school data) ----
const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Phone",
    lines: ["04634-250946", "Main Office"],
    href: "tel:04634-250946",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["thsschool@yahoo.com"],
    href: "mailto:thsschool@yahoo.com",
  },
  {
    icon: MapPin,
    label: "Address",
    lines: ["PF54+QRX, College Rd,", "New Colony, Ambasamudram, TN 627401"],
    href: "https://www.google.com/maps/search/?api=1&query=PF54%2BQRX%2C+College+Rd%2C+New+Colony%2C+Ambasamudram%2C+Tamil+Nadu+627401",
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Mon - Fri: 9:00 AM - 4:30 PM", "Sat - Sun: Closed"],
    href: null,
  },
];

const SCHOOL_ADDRESS_QUERY =
  "PF54+QRX, College Rd, New Colony, Ambasamudram, Tamil Nadu 627401";
const SCHOOL_PHONE = "+916385654159";
const SCHOOL_EMAIL = "info@thirthapathihss.edu";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [visibleCards, setVisibleCards] = useState(() =>
    CONTACT_CARDS.map(() => false)
  );
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your backend / email service.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="contact-page">
      {/* ---------------- HERO ---------------- */}
      <section className="contact-hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Get In Touch</p>
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            We&apos;d love to hear from you. Feel free to contact our school
            anytime to discuss admissions, campus life, or any inquiries.
          </p>
        </div>
      </section>

      {/* ---------------- INFO CARDS ---------------- */}
      <section className="info-cards">
        {CONTACT_CARDS.map((card, i) => {
          const Icon = card.icon;
          const content = (
            <>
              <span className="info-card__icon">
                <Icon size={22} strokeWidth={2} />
              </span>
              <span className="info-card__label">{card.label}</span>
              <span className="info-card__lines">
                {card.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </>
          );

          const cardClass = `info-card${card.href ? " info-card--link" : ""}${
            visibleCards[i] ? " info-card--visible" : ""
          }`;
          const cardStyle = { "--delay": `${i * 110}ms` };
          const setRef = (el) => {
            cardRefs.current[i] = el;
          };

          return card.href ? (
            <a
              key={card.label}
              ref={setRef}
              data-index={i}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              className={cardClass}
              style={cardStyle}
            >
              {content}
            </a>
          ) : (
            <div
              key={card.label}
              ref={setRef}
              data-index={i}
              className={cardClass}
              style={cardStyle}
            >
              {content}
            </div>
          );
        })}
      </section>

      {/* ---------------- MAP ---------------- */}
      <section className="map-section">
        <div className="map-frame">
          <iframe
            title="Thirthapathi Higher Secondary School campus map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8109014245965!2d77.45452497352478!3d8.709499893911428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b043959f4d9de3f%3A0x847c97d09a788c40!2sThirthapathi%20Higher%20Secondary%20School%2C%20Ambasamudram!5e0!3m2!1sen!2sin!4v1784910417660!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      {/* ---------------- MESSAGE FORM ---------------- */}
      <section className="message-section">
        <div className="message-left">
          <h2 className="message-heading">Send Us a Message</h2>

          <div className="illustration-card">
           <img
  src={schoolLogo}
  alt="Thirthapathi Higher Secondary School Logo"
  className="illustration-logo"
/>
          </div>

          <blockquote className="message-quote">
            &quot;Choosing the right environment for your child&apos;s growth
            is a monumental decision. We are here to guide you through every
            step of the journey.&quot;
          </blockquote>
        </div>

        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-field">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-field">
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="form-field">
            <span>Email Address</span>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Your Message</span>
            <textarea
              name="message"
              rows={4}
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-btn">
            <Send size={16} />
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </section>

      {/* ---------------- QUICK ACTIONS ---------------- */}
      <section className="quick-actions">
        <a href={`tel:${SCHOOL_PHONE}`} className="quick-card quick-card--dark">
          <span className="quick-card__text">
            <span className="quick-card__label">Instant Support</span>
            <span className="quick-card__cta">Call Now</span>
          </span>
          <PhoneCall size={22} />
        </a>

        <a href={`mailto:${SCHOOL_EMAIL}`} className="quick-card quick-card--gold">
          <span className="quick-card__text">
            <span className="quick-card__label">Send a Mail</span>
            <span className="quick-card__cta">Email Us</span>
          </span>
          <Mail size={22} />
        </a>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            SCHOOL_ADDRESS_QUERY
          )}`}
          target="_blank"
          rel="noreferrer"
          className="quick-card quick-card--light"
        >
          <span className="quick-card__text">
            <span className="quick-card__label">Visit Campus</span>
            <span className="quick-card__cta">Get Directions</span>
          </span>
          <MapPin size={22} />
        </a>
      </section>
    </div>
  );
}