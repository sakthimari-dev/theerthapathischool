import React, { useEffect, useRef, useState } from "react";
import "./Administration.css";

/* ---------- DATA ---------- */

const currentCommittee = {
  chairman: "திரு. A.K. சிதம்பரநாதன் அவர்கள்",
  secretary: "திரு. S. கந்தசாமி அவர்கள்",
  members: [
    "திரு. A. கணபதி அவர்கள்",
    "திரு. S. அருணாசலம் அவர்கள்",
    "திரு. S.R. லெட்சுமிநாராயணராஜா அவர்கள்",
    "திரு. S. நம்பிசாமி அவர்கள்",
    "திரு. A.R. ராஜாங்கம் அவர்கள்",
    "திரு. A. அழகியநம்பி அவர்கள் (தலைமை ஆசிரியர்)",
  ],
};

const staffRepresentatives = [
  { name: "திரு. S. முருகன்", role: "பெற்றோர் ஆசிரியர் கழக பிரதிநிதி" },
  { name: "திரு. N. பரமகண்ணன்", role: "ப.ஆ.  ஆசிரியர் பிரதிநிதி" },
  { name: "திருமதி. N. மரகதலெட்சுமி", role: "பெற்றோர் ஆசிரியர் கழக பிரதிநிதி" },
  { name: "திரு. K. சொக்கலிங்கபூபதி", role: "அலுவலக உறுப்பினர்" },
];

const committeeChairmen = [
  { name: "திரு. T.N.S. தீர்த்தபதி மகாராஜா அவர்கள்", years: "1914-1935" },
  { name: "திரு. A. நடேச அய்யர் அவர்கள்", years: "1935-1939" },
  { name: "திரு. K.A. சிவஞானம்பிள்ளை B.A. அவர்கள்", years: "1939-1941" },
  { name: "திரு. K.V. அனந்தநாராயணஐயர் B.A. அவர்கள்", years: "1941-1943" },
  { name: "திரு. A. நடேச அய்யர் அவர்கள்", years: "1943-1945" },
  { name: "திரு. A. சேதுராமலிங்க முதலியார் அவர்கள்", years: "1945-1947" },
  { name: "திரு. Dr. L. லட்சுமண ஐயர் Ln.P. அவர்கள்", years: "1947-1949" },
  { name: "திரு. P.A. கணபதி முதலியார் B.A.B.L. அவர்கள்", years: "1949-1952" },
  { name: "திரு. K. இராமலிங்கஅய்யர் அவர்கள்", years: "1952-1953" },
  { name: "திரு. P.A. கணபதி முதலியார் B.A.L.T. அவர்கள்", years: "1953-1960" },
  { name: "திரு. T.S. ராமநாதன் B.A.LT அவர்கள்", years: "1960-1961" },
  { name: "திரு. P.A. கணபதி முதலியார் B.A.L.T அவர்கள்", years: "1961-1965" },
  { name: "திரு. K.M. செல்லையாபிள்ளை அவர்கள்", years: "1965-1967" },
  { name: "திரு. S.V.RmA. நடராஜமுதலியார் அவர்கள்", years: "1967-1970" },
  { name: "திரு. P.A. கணபதி முதலியார் B.A.L.T. அவர்கள்", years: "1970-1972" },
  { name: "திரு. K. கணேசன் B.A.B.L. அவர்கள்", years: "1972-1981" },
  { name: "திரு. R. முத்துராமன் B.A.B.L. அவர்கள்", years: "1981-2006" },
  { name: "திரு. K.S. மாணிக்கம் M.A.B.Ed. அவர்கள்", years: "2006-2011" },
  { name: "திரு. T.N.S. தீர்த்தபதி மகாராஜா அவர்கள்", years: "2011-2020" },
  { name: "திரு. K. செல்வராஜ் B.A.B.L. அவர்கள்", years: "2020-2023" },
  { name: "திரு. S. அருணாசலம் அவர்கள்", years: "2023-2024" },
  { name: "திரு. A.K. சிதம்பரநாதன் அவர்கள்", years: "2024 முதல்" },
];

const treasurersSecretaries = [
  { name: "திரு. லெட்சுமண ஐயங்கார் அவர்கள்", years: "1896" },
  { name: "திரு. G.P. நீலகண்ட ஐயர் அவர்கள்", years: "1896-1899" },
  { name: "திரு. ராவ்சாகிப் R. சுப்பையர் அவர்கள்", years: "1899-1915" },
  { name: "திரு. D.S. சதாசிவ ஐயர் B.A.L.T. அவர்கள்", years: "1915-1916" },
  { name: "திரு. K.A. சிவஞானம்பிள்ளை அவர்கள்", years: "1916-1917" },
  { name: "திரு. T.S. சேஷய்யர் அவர்கள்", years: "1917-1921" },
  { name: "திரு. K.A. சிவஞானம்பிள்ளை அவர்கள்", years: "1921-1921" },
  { name: "திரு. H.N. திருமலைசுவாமிஐயர் B.A. அவர்கள்", years: "1921-1929" },
  { name: "திரு. A.S. மரகதசுந்தரம்பிள்ளை அவர்கள்", years: "1929-1931" },
  { name: "திரு. K.V. அனந்தநாராயணஐயர் B.A. அவர்கள்", years: "1931-1939" },
  { name: "திரு. P.S. சங்கரய்யர் அவர்கள்", years: "1939-1941" },
  { name: "திரு. P.A. சுப்பிரமணியமுதலியார் அவர்கள்", years: "1941-1943" },
  { name: "திரு. A. நடேச அய்யர் அவர்கள்", years: "1943-1945" },
  { name: "திரு. K.M. லட்சுமண ஐயர் B.A.B.L. அவர்கள்", years: "1945-1947" },
  { name: "திரு. N. முத்துகுமாரசாமிபிள்ளை அவர்கள்", years: "1947-1949" },
  { name: "திரு. P.A. கணபதி முதலியார் அவர்கள்", years: "1949-1951" },
  { name: "திரு. K.M. லட்சுமண ஐயர் B.A.B.L. அவர்கள்", years: "1949-1951" },
  { name: "திரு. K. இராமலிங்கஅய்யர் அவர்கள்", years: "1951-1952" },
  { name: "திரு. P.A. கணபதி முதலியார் அவர்கள்", years: "1952-1953" },
  { name: "திரு. A.N. ராஜாங்கம் அய்யர் அவர்கள்", years: "1953-1955" },
  { name: "திரு. N. முத்துகுமாரசாமிபிள்ளை அவர்கள்", years: "1955-1957" },
  { name: "திரு. T.S. ராமநாதன் B.A.B.L. அவர்கள்", years: "1957-1960" },
  { name: "திரு. S.V.RmA. நடராஜமுதலியார் அவர்கள்", years: "1960-1961" },
  { name: "திரு. K.M. செல்லையாபிள்ளை அவர்கள்", years: "1961-1961" },
  { name: "திரு. பண்ணை. N. சங்கர ஐயர் அவர்கள்", years: "1961-1971" },
  { name: "திரு. R. முத்துராமன் B.A.B.L. அவர்கள்", years: "1971-1981" },
  { name: "திரு. K. கணேசன் B.A.B.L. அவர்கள்", years: "1981-2011" },
  { name: "திரு. K.S. மாணிக்கம் M.A.B.Ed. அவர்கள்", years: "2011-2013" },
  { name: "திரு. K.P. பாலசுப்பிரமணியன் B.Com அவர்கள்", years: "2013-2015" },
  { name: "திரு. K.S. சங்கரசுப்பிரமணியன் அவர்கள்", years: "2015-2021 ஜன" },
  { name: "திரு. K. சுப்பிரமணியன் அவர்கள்", years: "பிப்2021-2023" },
  { name: "திரு. K.P. பாலசுப்பிரமணியன் B.Com அவர்கள்", years: "2023-2024" },
  { name: "திரு. S. கந்தசாமி B.A.B.L. அவர்கள்", years: "2023 முதல்" },
];

const headmasters = [
  { name: "திரு. S. கோபால ஐயர் அவர்கள்", years: "1895-1897" },
  { name: "திரு. S. நாராயண அய்யர் அவர்கள்", years: "1897-1897" },
  { name: "திரு. N. கிருஷ்ணசாமி ராவ் அவர்கள்", years: "1898-1898" },
  { name: "திரு. T.S. சதாசிவ ஐயர் அவர்கள்", years: "1898-1929" },
  { name: "திரு. S.S. வெங்கட்ராமஐயங்கார் அவர்கள்", years: "1929-1930" },
  { name: "திரு. N.S. வெங்கடேஸ்வரஐயர் B.A.L.T. அவர்கள்", years: "1930-1931" },
  { name: "திரு. E.H. பரமேஸ்வரன் M.A.L.T. அவர்கள்", years: "1931-1954" },
  { name: "திரு. A. காந்திமதிநாதபிள்ளை B.A.L.T. அவர்கள்", years: "1954-1968" },
  { name: "திரு. K.S. கிருஷ்ணன் M.A.B.T அவர்கள்", years: "1968-1974" },
  { name: "திரு. H. தியாகராஜன் B.A.L.T. அவர்கள்", years: "1974-1978" },
  { name: "திரு. V. சண்முகசுந்தரம் B.A.LT அவர்கள்", years: "1978-1985" },
  { name: "திரு. K.S. மாணிக்கம் M.A., M.Ed. அவர்கள்", years: "1985-2004" },
  { name: "திரு. S. சிவசைலம் M.Com., M.Ed. அவர்கள்", years: "2004-2014" },
  { name: "திரு. G. சுந்தரமகாலிங்கம் M.Sc., M.Ed., M.Phil. அவர்கள்", years: "2014-2016" },
  { name: "திரு. V. சீனிவாசன் M.Sc., M.Ed., M.Phil. அவர்கள்", years: "2016-2023" },
  { name: "திரு. A. அழகியநம்பி M.Sc., B.Ed., M.Phil. அவர்கள்", years: "2023 முதல்" },
];

/* ---------- shared reveal hook ---------- */
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

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

function getInitial(name) {
  const parts = name.trim().split(" ");
  const nameWord = parts.find((p) => !p.includes(".") && p.length > 0) || parts[parts.length - 1];
  return nameWord.charAt(0);
}

/* ---------- reusable history list with staggered row animation ---------- */
function HistoryList({ items }) {
  return (
    <div className="history-list">
      {items.map((item, i) => (
        <div
          className="history-row anim-fade-up"
          key={item.name + i}
          style={{ animationDelay: `${Math.min(i * 40, 600)}ms` }}
        >
          <span className="history-num">{i + 1}</span>
          <span className="history-name">{item.name}</span>
          <span className="history-years">{item.years}</span>
        </div>
      ))}
    </div>
  );
}

export default function Administration() {
  const [activeTab, setActiveTab] = useState("committee");

  const tabs = [
    { id: "committee", label: "நிர்வாகக் குழு வரலாறு" },
    { id: "treasurer", label: "தாளாளர் & செயலர் வரலாறு" },
    { id: "headmaster", label: "தலைமையாசிரியர்கள் வரலாறு" },
  ];

  return (
    <div className="admin-page" id="administration">
      {/* HERO */}
      <section className="admin-hero">
        <div className="admin-hero-overlay">
          <p className="admin-eyebrow anim-fade-up">பள்ளி நிர்வாகம்</p>
          <h1 className="admin-hero-title anim-fade-up">நிர்வாகக் குழு</h1>
          <p className="admin-hero-tagline anim-fade-up">
            1886 முதல் இன்று வரை பள்ளியை வழிநடத்திய நிர்வாக மரபு
          </p>
        </div>
      </section>

      {/* CURRENT COMMITTEE SPOTLIGHT */}
      <section className="current-committee">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>தற்போதைய நிர்வாகக் குழு</h2>
            <span className="rule" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="top-officials">
            <div className="official-card chairman">
              <span className="official-avatar">{getInitial(currentCommittee.chairman)}</span>
              <span className="official-label">தலைவர்</span>
              <h3>{currentCommittee.chairman}</h3>
            </div>
            <div className="official-card">
              <span className="official-avatar">{getInitial(currentCommittee.secretary)}</span>
              <span className="official-label">செயலர்</span>
              <h3>{currentCommittee.secretary}</h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h4 className="subgroup-title">உறுப்பினர்கள்</h4>
          <div className="member-grid">
            {currentCommittee.members.map((m, i) => (
              <div
                className="member-card anim-fade-up"
                key={m + i}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="member-avatar">{getInitial(m)}</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h4 className="subgroup-title">ஆசிரிய &amp; அலுவலக பிரதிநிதிகள்</h4>
          <div className="member-grid">
            {staffRepresentatives.map((r, i) => (
              <div
                className="member-card anim-fade-up"
                key={r.name + i}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="member-avatar">{getInitial(r.name)}</span>
                <div className="member-info">
                  <span className="member-name">{r.name}</span>
                  <span className="member-role">{r.role}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* HISTORY TABS */}
      <section className="admin-history-section">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>பள்ளி நிர்வாக வரலாறு</h2>
            <span className="rule" />
          </div>
          <p className="section-subheading">
            140 ஆண்டுகளுக்கும் மேலான தலைமையின் பட்டியல்
          </p>
        </Reveal>

        <div className="admin-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={activeTab === t.id ? "active" : ""}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* key={activeTab} forces remount on tab switch so the fade-in animation replays */}
        <div className="history-tab-panel anim-fade-up" key={activeTab}>
          {activeTab === "committee" && <HistoryList items={committeeChairmen} />}
          {activeTab === "treasurer" && <HistoryList items={treasurersSecretaries} />}
          {activeTab === "headmaster" && <HistoryList items={headmasters} />}
        </div>
      </section>
    </div>
  );
}