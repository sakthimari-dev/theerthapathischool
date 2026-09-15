import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const stats = [
  { icon: IconTrophy, value: 140, suffix: "+", label: "Years of Excellence" },
  { icon: IconStudents, value: 2000, suffix: "+", label: "Students" },
  { icon: IconTeacher, value: 40, suffix: "+", label: "Teachers" },
  { icon: IconGraph, value: 100, suffix: "%", label: "Pass Percentage" },
];

const features = [
  { icon: IconCap, title: "Quality Education", desc: "Focus on academic excellence" },
  { icon: IconPeople, title: "Experienced Teachers", desc: "Well qualified and dedicated faculty" },
{
  icon: IconTrophy,
  title: "Sports & Games",
  desc: "Encouraging physical fitness, teamwork and discipline",
},
  { icon: IconShield, title: "Safe Environment", desc: "Secure and friendly campus" },
  { icon: IconBuilding, title: "Modern Facilities", desc: "Well equipped labs and classrooms" },
];

const newsItems = [
  { day: "15", month: "APR", title: "Admissions Open", desc: "Admissions open for classes till 8th, academic year 2026-27." },
  { day: "01", month: "JUN", title: "School Reopens", desc: "School reopens for the academic year 2026-27." },
  { day: "15", month: "JUN", title: "Sports Day Celebration", desc: "Annual Sports Day will be held on 15th June 2026." },
  { day: "05", month: "JUL", title: "Annual Day Celebration", desc: "Join us for the Annual Day Celebration on 5th July 2026." },
  { day: "15", month: "AUG", title: "Independence Day", desc: "Independence Day celebration and flag hoisting at school." },
  { day: "20", month: "OCT", title: "Vijayadasami Celebration", desc: "Saraswathi Pooja and Vijayadasami celebrations at school." },
  { day: "05", month: "NOV", title: "Half-Yearly Exams Begin", desc: "Half-yearly examinations for all classes commence." },
  { day: "14", month: "NOV", title: "Children's Day Celebration", desc: "Special programs and activities to celebrate Children's Day." },
  { day: "14", month: "JAN", title: "Pongal Celebration", desc: "Pongal festival celebrations with traditional cultural events." },
  { day: "26", month: "JAN", title: "Republic Day", desc: "Republic Day celebration and flag hoisting at school." },
];

const wings = [
  {
    code: "NCC",
    title: "தேசிய மாணவர் படை",
    tag: "NCC",
    desc: "ஒழுக்கம், தேசபக்தி, தலைமைத்துவம் மற்றும் சமூகப் பொறுப்புணர்வை வளர்த்து மாணவர்களை சிறந்த குடிமக்களாக உருவாக்கும் அணி."
  },
  {
    code: "NSS",
    title: "நாட்டுநலப் பணித் திட்டம்",
    tag: "NSS",
    desc: "சமூக சேவை, தன்னார்வப் பணிகள் மற்றும் பொதுநலச் செயல்பாடுகள் மூலம் மாணவர்களின் பொறுப்புணர்வை மேம்படுத்தும் திட்டம்."
  },
  {
    code: "JRC",
    title: "ஜூனியர் ரெட் கிராஸ்",
    tag: "JRC",
    desc: "முதலுதவி, ஆரோக்கியம் மற்றும் மனிதநேய சேவை பற்றிய அறிவை வளர்த்து சமூக நலப்பணிகளில் ஈடுபடச் செய்யும் அணி."
  },
  {
    code: "SC",
    title: "சாரணர் படை",
    tag: "SCOUT",
    desc: "சாகசப் பயிற்சி, ஒழுக்கம், சுயசார்பு மற்றும் குழு ஒருங்கிணைப்பு திறன்களை வளர்க்கும் மாணவர் இயக்கம்."
  },
  {
    code: "GD",
    title: "சாரணியர் படை",
    tag: "GUIDES",
    desc: "பெண் மாணவியரின் தலைமைத்துவம், தன்னம்பிக்கை மற்றும் சமூகப் பொறுப்புணர்வை மேம்படுத்தும் அணி."
  },
  {
    code: "CC",
    title: "நுகர்வோர் மன்றம்",
    tag: "Consumer Club",
    desc: "நுகர்வோர் உரிமைகள், பொறுப்புகள் மற்றும் விழிப்புணர்வை மாணவர்களிடம் ஏற்படுத்தும் மன்றம்."
  },
  {
    code: "NGC",
    title: "தேசிய பசுமைப் படை",
    tag: "National Green Club",
    desc: "சுற்றுச்சூழல் பாதுகாப்பு, மரநடுகை மற்றும் இயற்கை வளங்களை பாதுகாக்கும் விழிப்புணர்வை உருவாக்கும் அணி."
  },
  {
    code: "RRC",
    title: "செஞ்சுருள் கழகம்",
    tag: "Red Ribbon Club",
    desc: "இரத்த தானம், சுகாதார விழிப்புணர்வு மற்றும் மனிதநேய சேவைகளை ஊக்குவித்து சமூக அக்கறையை வளர்க்கும் மாணவர் அணி."
  },
  {
    code: "RSP",
    title: "சாலைப் பாதுகாப்புப் படை",
    tag: "RSP",
    desc: "சாலை விதிகள், போக்குவரத்து ஒழுங்கு மற்றும் பாதுகாப்பான பயண முறைகள் குறித்த விழிப்புணர்வை ஏற்படுத்தும் அணி."
  },
  {
    code: "RC",
    title: "இந்திய செஞ்சிலுவைச் சங்கம்",
    tag: "Red Cross Society",
    desc: "முதலுதவி, ஆரோக்கிய பராமரிப்பு மற்றும் மனிதநேய சேவைகளில் மாணவர்களைப் பயிற்றுவிக்கும் அமைப்பு."
  },
  {
    code: "IC",
    title: "இண்ட்ராக்ட் சங்கம்",
    tag: "Interact Club",
    desc: "தலைமைத்துவம், சமூக சேவை மற்றும் குழு ஒருங்கிணைப்பு திறன்களை வளர்க்கும் இளையோர் அமைப்பு."
  },
  {
    code: "HC",
    title: "தொன்மை மன்றம்",
    tag: "Heritage Club",
    desc: "நமது பாரம்பரியம், கலாச்சாரம் மற்றும் வரலாற்றுச் சிறப்புகளை மாணவர்களுக்கு அறிமுகப்படுத்தும் மன்றம்."
  },
  {
    code: "LA",
    title: "இலக்கிய மன்றம்",
    tag: "Literary Association",
    desc: "தமிழ் மொழி, இலக்கியம், பேச்சுத்திறன் மற்றும் படைப்பாற்றலை வளர்க்கும் இலக்கிய அமைப்பு."
  },
  {
    code: "ELA",
    title: "English Literary",
    tag: "Association",
    desc: "ஆங்கில மொழித் திறன், வாசிப்பு பழக்கம், பேச்சுத்திறன் மற்றும் இலக்கிய ஆர்வத்தை மேம்படுத்தும் மன்றம்."
  },
  {
    code: "ADC",
    title: "போதை ஒழிப்பு மன்றம்",
    tag: "Anti-Drug Club",
    desc: "போதைப் பழக்கத்தின் தீமைகள் குறித்து விழிப்புணர்வு ஏற்படுத்தி ஆரோக்கியமான வாழ்க்கை முறையை ஊக்குவிக்கும் அணி."
  }
];

function IconTrophy(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconStudents(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15.5 20c.2-2.6 2-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconTeacher(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 3.5 12 6l3-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconGraph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m6 15 4-4 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m2 9 10-5 10 5-10 5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M21 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPeople(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="8.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M14.5 20c.2-2.6 2-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPalette(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3a9 8 0 1 0 0 16c1.4 0 2-.9 2-2 0-.6-.3-1-.6-1.4-.3-.4-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16a4 4 0 0 0 4-4c0-3.6-3.6-6.2-8-6.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="9.5" cy="7" r="1" fill="currentColor" />
      <circle cx="14" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3 4 6v6c0 5 3.4 7.9 8 9 4.6-1.1 8-4 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 21V7l8-4 8 4v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6M9 11h.01M15 11h.01M9 8h.01M15 8h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Hooks ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Single stat item (hook lives here, at top level of its own component) ---------- */
function StatItem({ stat, index, active, isLast }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, active, 1400 + index * 150);
  return (
    <div className="stat" style={{ transitionDelay: `${index * 90}ms` }}>
      <span className="stat-icon">
        <Icon width="26" height="26" />
      </span>
      <div className="stat-text">
        <span className="stat-value">
          {count}
          {stat.suffix}
        </span>
        <span className="stat-label">{stat.label}</span>
      </div>
      {!isLast && <span className="stat-divider" />}
    </div>
  );
}

/* ---------- Main component ---------- */
export default function Home() {
  const [statsRef, statsVisible] = useReveal();
    const navigate = useNavigate();

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
        <h1 className="hero-title">
  <div className="line anim-fade-up d2">
    THEERTHAPATHI
  </div>

  <div className="line hero-title-accent anim-fade-up d3">
    Higher Secondary School
  </div>


</h1>
            <p className="hero-tagline anim-fade-up d4">
                   
          140 Years of Academic Excellence
Building Character & Future Leaders
            </p>
            <div className="hero-actions anim-fade-up d5">
              <button className="btn btn-primary"onClick={() => navigate("/facilities")}> Explore Campus</button>
              <button className="btn btn-outline"onClick={() => navigate("/gallery")}>Our Moments</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-wrap">
        <div className="stats-bar" ref={statsRef}>
          {stats.map((s, i) => (
            <StatItem
              key={i}
              stat={s}
              index={i}
              active={statsVisible}
              isLast={i === stats.length - 1}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>Why Choose Us</h2>
            <span className="rule" />
          </div>
         
         <p className="section-subheading">
  Theerthapathi Higher Secondary School in Ambasamudram, Tirunelveli, Tamil Nadu
  provides a supportive learning environment focused on academic excellence,
  character development, sports and co-curricular activities.
</p>
        </Reveal>

        <div className="feature-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal delay={i * 90} key={i}>
                <div className="feature-card">
                  <span className="feature-icon">
                    <Icon width="26" height="26" />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <span className="feature-shine" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* OUR WINGS — co-curricular activities */}
      <section className="wings-section">
        <div className="wings-glow-a" />
        <div className="wings-glow-b" />
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>சேவை அமைப்புகள்</h2>
            <span className="rule" />
          </div>
          <p className="section-subheading">
            Beyond academics — building character, service and skill
          </p>
        </Reveal>

        <div className="wings-grid">
          {wings.map((w, i) => (
            <Reveal delay={i * 60} key={i}>
              <div className="wing-badge">
                <div className="wing-ring">
                  <span className="wing-code">{w.code}</span>
                </div>
                <h4>{w.title}</h4>
                <span className="wing-tag">{w.tag}</span>
                <p className="wing-desc">{w.desc}</p>
                <span className="wing-shine" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="news-section">
        <Reveal>
          <div className="news-card">
            <h3>Latest News &amp; Events</h3>
            <ul className="news-list">
              {newsItems.map((n, i) => (
                <li className="news-item" key={i}>
                  <div className="news-date">
                    <span className="news-day">{n.day}</span>
                    <span className="news-month">{n.month}</span>
                  </div>
                  <div className="news-info">
                    <h4>{n.title}</h4>
                    <p>{n.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
       
     
     <button className="view-all-btn" onClick={() => navigate("/events")}>
  View All News & Events
</button>
          </div>
        </Reveal>
      </section>

      {/* ADMISSIONS BANNER */}
      <Reveal>
        <section className="admissions-banner">
          <span className="admissions-glow" />
          <div className="admissions-text">
            <span className="admissions-icon">
              <IconCap width="32" height="32" />
            </span>
            <div>
              <h3>Admissions Open for 2026 - 27</h3>
              <p>Give your child the best start for a bright future</p>
            </div>
          </div>
          <button className="btn btn-primary btn-glow" onClick={() => navigate("/contact")}>Join Our School</button>
        </section>
      </Reveal>
    </div>
  );
}