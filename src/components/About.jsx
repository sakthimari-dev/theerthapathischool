import React, { useEffect, useRef, useState } from "react";
import "./About.css";


const timeline = [
  {
    year: "1886",
    title: "பள்ளியின் தொடக்கம்",
    text: " தெய்வத்திரு.பன்னிருகை பெருமாள் பிள்ளை, மாதவசாமிராவ், செல்லம் அய்யங்கார், பார்த்தசாரதி ஆகிய நான்கு பேர் கொண்ட குழுவால் பள்ளி நிறுவப்பட்டது.",
  },
  {
    year: "1887",
    title: "நடுநிலைப் பள்ளியாக வளர்ச்சி",
    text: "இந்து ஆங்கில வெர்னாகுலர் நடுநிலைப் பள்ளியாக மாற்றம் பெற்று, மாணவர் எண்ணிக்கை படிப்படியாக உயர்ந்தது.",
  },
  {
    year: "1896",
    title: "உயர்நிலைப் பள்ளி அந்தஸ்து",
    text: "உயர்நிலைப் பள்ளி நிலையை எட்டி, 1899 முதல் மாணவர்கள் அரசுத் தேர்வுக்கு அனுப்பப்பட்டனர்.",
  },

  {
  year: "1911",
  title: "கட்டிட நிதி திரட்டல்",
  text: "திரு. A.R. நாணு ஜயர், திரு. S. சுந்தரம் ஜயர், திரு. R. லோகநாத ஜயர் மற்றும் திரு. L. கிருஷ்ணய்யர் ஆகியோரின் நன்கொடைகளால் புதிய பள்ளிக் கட்டிடத்திற்கான நிதி திரட்டும் பணி தொடங்கப்பட்டது."
},
  
{
  year: "1914",
  title: "புதிய பள்ளிக் கட்டிடம் திறப்பு",
  text: "பொதுமக்கள் மற்றும் நன்கொடையாளர்களின் ஆதரவுடன் ரூ.46,000 செலவில் கட்டப்பட்ட புதிய பள்ளிக் கட்டிடம் 21.10.1914 அன்று திரு. பென்ட்லண்டு பிரபுவால் திறந்து வைக்கப்பட்டது."
},
 
  
  {
  year: "1917",
  title: "ஆய்வகக் கட்டிடம் திறப்பு",
  text: "ஊர்க்காடு குறுநில மன்னர்  வழங்கிய ரூ.12,000 நன்கொடையால் புதிய ஆய்வகக் கட்டிடம் கட்டப்பட்டது. 31.10.1917 அன்று ஊர்க்காடு மன்னர் திறந்து வைத்த இக்கட்டிட விழாவில் மீனாட்சி சுந்தர விநாயகப்பெருமாள் சேதுராயர் உள்ளிட்ட முக்கிய பிரமுகர்கள் கலந்து கொண்டனர். இந்த கட்டிடம் மாணவர்களின் அறிவியல் கல்வி வளர்ச்சிக்கு முக்கிய பங்காற்றியது.",
},
  {
    year: "1929",
    title: "சதாசிவ ஐயர் நினைவு கட்டிடம்",
    text: "31 ஆண்டுகள் தலைமை ஆசிரியராகப் பணியாற்றிய திரு. சதாசிவ ஐயர் பெயரில், பழைய மாணவர்கள் அளித்த நன்கொடையால் புதிய கட்டிடம் எழுப்பப்பட்டது.",
  },
  
  {
    year: "1942",
    title: "ஸ்ரீலஸ்ரீ அம்பலவாண தேசிகர் ஹால்",
    text: "திருவாடுதுறை ஆதீனத்தால் ஐந்து வகுப்பறைகள் கொண்ட கட்டிடம் நன்கொடையாக வழங்கப்பட்டது.",
  },
{
  year: "1955",
  title: "பொன்விழா நினைவு கட்டிடம்",
  text: "பள்ளியின் பொன்விழாவை முன்னிட்டு ரூ.8,700 செலவில் புதிய கட்டிடம் கட்டப்பட்டது. 22.07.1955 அன்று பள்ளிக் கல்வி இயக்குநர் திரு. நெ.து. சுந்தரவடிவேலு அவர்களால் கட்டிடம் திறந்து வைக்கப்பட்டது. இக்கட்டிடத்திற்கான நிதியில் திரு. ஏ.வி. ஆர். எம்.வி. சங்கரநாராயணன் முதலியார் மற்றும் அவரது சகோதரர்கள் ரூ.7,500, திரு. ஆ.மு. கிருஷ்ணய்யர் ரூ.3,001, திரு. சிவனுபாண்டியன் தம் அன்னையார் நினைவாக ரூ.3,001 வழங்கினர். இந்த பொன்விழா கட்டிடம் பள்ளியின் வளர்ச்சியில் ஒரு முக்கிய மைல்கல்லாக அமைந்தது."
},

{
  year: "1975",
  title: "கூடைப்பந்து மைதான மேம்பாடு",
  text: "அம்பை உயர்திரு. மணிமுதலியார் சகோதரர்கள் வழங்கிய ரூ.10,000 நன்கொடையால் பள்ளியின் கூடைப்பந்து மைதானம் சிமெண்ட் தரை மைதானமாக அமைக்கப்பட்டது. இது விளையாட்டு வசதிகளை மேம்படுத்திய முக்கிய முன்னேற்றமாக அமைந்தது."
},
 
{
  year: "1978",
  title: "மேல்நிலைப் பள்ளியாக தரம் உயர்வு",
  text: "1978ஆம் ஆண்டு பள்ளி மேல்நிலைப் பள்ளியாக தரம் உயர்த்தப்பட்டது. இதனைத் தொடர்ந்து வேதியியல் மற்றும் இயற்பியல் ஆய்வகங்கள் அமைக்கப்பட்டு, உயர்கல்விக்கான அறிவியல் கற்பித்தல் வசதிகள் மேம்படுத்தப்பட்டன."
},

{
  year: "1994",
  title: "ஆய்வக மேம்பாடு",
  text: "வேதியியல் மற்றும் இயற்பியல் ஆய்வகங்கள் முழுமையாக செயல்படுத்தப்பட்டு, மேல்நிலை மாணவர்களுக்கான அறிவியல் கல்வி மற்றும் செய்முறைப் பயிற்சி மேலும் வலுப்படுத்தப்பட்டது."
},

{
  year: "2002",
  title: "புதிய வகுப்பறைகள்",
  text: "பள்ளி வளர்ச்சியை முன்னிட்டு புதிய வகுப்பறைகள் மற்றும் கல்வி உள்கட்டமைப்பு மேம்படுத்தப்பட்டு, மாணவர்களுக்கு சிறந்த கற்றல் சூழல் உருவாக்கப்பட்டது."
},

{
  year: "2010",
  title: "பழைய மாணவர்கள் பங்களிப்பு",
  text: "பழைய மாணவர்கள் கல்வி உதவித்தொகை, ஆய்வக உபகரணங்கள், Smart Board, விளையாட்டு வசதிகள் மற்றும் பள்ளி கட்டிட மேம்பாட்டிற்கு தொடர்ந்து நன்கொடைகள் வழங்கினர்."
},

{
  year: "2016",
  title: "கல்வி உதவித்தொகை திட்டங்கள்",
  text: "பல்வேறு பழைய மாணவர்கள் மற்றும் நலதாரர்களின் உதவியால் மாணவர்களுக்கு கல்வி உதவித்தொகைகள், பரிசுத்தொகைகள் மற்றும் கட்டண உதவிகள் வழங்கப்பட்டன."
},

{
  year: "2022",
  title: "Digital Equalizer திட்டம்",
  text: "American India Foundation (Boston) ஆதரவுடன் Digital Equalizer Way of Teaching திட்டம் அறிமுகப்படுத்தப்பட்டு, ஆசிரியர்களுக்கு டிஜிட்டல் கற்பித்தல் பயிற்சிகள் வழங்கப்பட்டன."
},

{
  year: "2022",
  title: "மாநில அளவிலான ஆசிரியர் விருதுகள்",
  text: "பள்ளியின் ஆசிரியர்கள் கல்வித் துறையில் சிறந்து விளங்கியதற்காக மாநில மற்றும் மாவட்ட அளவிலான விருதுகள் மற்றும் பாராட்டுகளைப் பெற்றனர்."
},

{
  year: "2024",
  title: "வளாக மேம்பாடு",
  text: "புதிய வகுப்பறைகள், Smart Board, ஆய்வக மேம்பாடு மற்றும் மாணவர்களுக்கான நவீன கல்வி வசதிகள் தொடர்ந்து விரிவுபடுத்தப்பட்டன."
},
  {
    year: "இன்று",
    title: "பழைய மாணவர்களின் அன்பளிப்பு",
    text: "நாடு விட்டு நாடு சென்ற பழைய மாணவர்கள் இன்றும் கல்வி உதவித்தொகை, ஆய்வக உபகரணங்கள், விளையாட்டு வசதிகள் என தொடர்ந்து பள்ளியை வளர்த்து வருகின்றனர்.",
  },
];

/* ---------- shared hooks (same pattern as Home.jsx) ---------- */
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

/* ---------- small inline icons (kept local so file is self-contained) ---------- */
function IconCap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m2 9 10-5 10 5-10 5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M21 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCompass(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="m15 9-2 6-6 2 2-6 6-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function About({ onAdmissionClick }) {
  const [heroRef, heroVisible] = useReveal();

  const handleAdmission = () => {
    if (typeof onAdmissionClick === "function") {
      onAdmissionClick();
      return;
    }
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <div className="about-page" id="about">
      {/* ---------- HERO ---------- */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <p className="hero-eyebrow anim-fade-up d1">எங்களைப் பற்றி</p>
            <h1 className="hero-title">
              <div className="line anim-fade-up d2">தீர்த்தபதி</div>
              <div className="line hero-title-accent anim-fade-up d3">
                மேல்நிலைப் பள்ளி
              </div>
            </h1>
            <p className="hero-tagline anim-fade-up d4">
              1886 முதல் அம்பாசமுத்திரத்தில் அறிவூட்டும் ஒளியாக விளங்கும் பாரம்பரிய பள்ளி.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- HERITAGE HIGHLIGHT ---------- */}
      <section className="heritage-section">
      <Reveal className="section-heading-wrap">
  <div className="heritage-badge">
    <IconCap width="24" height="24" />
  </div>
  <div className="section-heading">
    <span className="rule" />
    <h2>தீர்த்தபதி மேல்நிலைப்பள்ளி மற்றும் அம்பை கலைக் கல்லூரி கல்விக் குழுமம்</h2>
    <span className="rule" />
  </div>
  <p className="section-subheading heritage-subheading">
    கல்விக் குழுமத்தின் கீழ் செயல்படும் கல்வி நிறுவனங்கள்
  </p>
</Reveal>

        <div className="heritage-steps">
          <Reveal delay={0}>
            <div className="heritage-step">
              <span className="step-no">01</span>
              <div className="step-icon"><IconCap width="26" height="26" /></div>
              <h4>இந்து தொடக்கப் பள்ளி</h4>
              <p className="step-tag">Primary Education</p>
            </div>
          </Reveal>

          <span className="heritage-arrow">➜</span>

          <Reveal delay={80}>
            <div className="heritage-step">
              <span className="step-no">02</span>
              <div className="step-icon"><IconCap width="26" height="26" /></div>
              <h4>தீர்த்தபதி மேல்நிலைப் பள்ளி</h4>
              <p className="step-tag">Higher Secondary</p>
            </div>
          </Reveal>

          <span className="heritage-arrow">➜</span>

          <Reveal delay={160}>
            <div className="heritage-step">
              <span className="step-no">03</span>
              <div className="step-icon"><IconCompass width="26" height="26" /></div>
              <h4>அம்பை கலைக் கல்லூரி</h4>
              <p className="step-tag">Arts College</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- HISTORY TIMELINE ---------- */}
      <section className="history-section">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>பள்ளி வரலாறு</h2>
            <span className="rule" />
          </div>
          <p className="section-subheading">
            140 ஆண்டுகளுக்கும் மேலான பாரம்பரியம், எண்ணற்ற அன்பர்களின் ஈகையால் கட்டப்பட்டது
          </p>
        </Reveal>

        <div className="timeline">
          <div className="timeline-spine" />
          {timeline.map((item, i) => (
            <Reveal
              delay={i * 70}
              key={item.year + i}
              className={`timeline-row ${i % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-node">
                <span>{item.year}</span>
              </div>
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="feature-shine" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- MISSION & VISION ---------- */}
      <section className="mv-section">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>நோக்கமும் தொலைநோக்கும்</h2>
            <span className="rule" />
          </div>
        </Reveal>

        <div className="mv-grid">
          <Reveal delay={0}>
            <div className="mv-card">
              <span className="mv-icon">
                <IconCap width="26" height="26" />
              </span>
              <h3>பணி நோக்கு</h3>
              <p>
                ஒவ்வொரு மாணவனுக்கும் தரமான கல்வி, ஒழுக்கம், தன்னம்பிக்கையை வளர்த்து,
                சமூகத்திற்குப் பயனுள்ள சிந்திக்கும் தலைமுறையை உருவாக்குவதே எங்கள் பணி.
              </p>
              <span className="feature-shine" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mv-card">
              <span className="mv-icon">
                <IconCompass width="26" height="26" />
              </span>
              <h3>தொலைநோக்குப் பார்வை</h3>
              <p>
                பாரம்பரியத்தையும் புதுமையையும் இணைத்து, கல்வியில் சிறப்பும் மனிதநேயமும்
                ஒன்றிணைந்த மாணவர்களை வடிவமைக்கும் மாநிலத்தின் முன்னணி பள்ளியாக
                விளங்குவதே எங்கள் இலக்கு.
              </p>
              <span className="feature-shine" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="gallery-section">
        <Reveal className="section-heading-wrap">
          <div className="section-heading">
            <span className="rule" />
            <h2>பள்ளி வளாகம்</h2>
            <span className="rule" />
          </div>
        </Reveal>

     <div className="photo-grid">
    {[
      { src: "/images/auditorium.webp", alt: "ஆடிட்டோரியம்" },
      { src: "/images/entrance.webp", alt: "பள்ளி நுழைவாயில்" },
      { src: "/images/officeroom.webp", alt: "அலுவலக அறை" },
    ].map((photo, i) => (
            <Reveal delay={i * 50} key={photo.src}>
              <figure className="photo-frame">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="wing-shine" />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- ADMISSIONS BANNER (matches Home's style) ---------- */}
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
          <button className="btn btn-primary btn-glow" onClick={handleAdmission}>
            Apply Now
          </button>
        </section>
      </Reveal>
    </div>
  );
}