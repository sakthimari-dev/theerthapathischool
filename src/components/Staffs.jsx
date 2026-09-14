import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Staffs.css";

const staffGroups = [
  {
    title: "தலைமை ஆசிரியர்",
    members: [
      { name: "திரு. A. அழகியநம்பி", qual: "M.Sc., B.Ed., M.Phil." },
    ],
  },
  {
    title: "உதவி தலைமை ஆசிரியர்கள்",
    members: [
      { name: "திரு. S. முருகன்", qual: "M.Sc., B.Ed., M.Phil." },
      { name: "திரு. N. பரமகண்ணன்", qual: "B.Sc.,B.Ed.,PGDCA.,(NCC)" },
    ],
  },
  {
    title: "மேனிலை ஆசிரியர்கள்",
    members: [
      { name: "திரு. M. ஐயப்பன்", qual: "M.Com., B.Ed.,M.Phil." },
      { name: "திருமதி. S. முத்தம்மாள்", qual: "M.A., B.Ed., M.Phil." },
      { name: "திரு. V. சங்கரராமன்", qual: "M.A., B.Ed., M.Sc. (Yoga)" },
      { name: "திருமதி. S. சிதம்பரம்", qual: "M.A., M.Phil." },
      { name: "திருமதி. Y.S. உமா", qual: "M.Sc., B.Ed., M.Phil., PGDCA" },
      { name: "திரு. V.P. சண்முகையா", qual: "B.Sc., B.Lit., M.A., B.Ed., M.Phil." },
      { name: "திரு. A. சந்தனகுமார்", qual: "M.Sc., M.Ed.,(NSS)" },
      { name: "திருமதி. B. மீனா", qual: "M.A., M.Sc., B.Ed., M.Phil." },
      { name: "திரு. A. அந்தோணி கிறிஸ்டியன்ராஜா ", qual: "M.Sc., B.Ed., M.Phil." },
    ],
  },
  {
    title: "பட்டதாரி ஆசிரியர்கள்",
    members: [
      { name: "திருமதி. C. சுமதி", qual: "M.A., B.Ed., M.Phil." },
      { name: "திருமதி. B. விஜயலெட்சுமி", qual: "M.A., B.Ed., M.Phil." },
      { name: "திருமதி. S. பிரபா", qual: "M.A., B.Ed., M.Phil." },
      { name: "திருமதி. S. செண்பகாதேவி ", qual: "B.Sc, B.Ed.," },
      { name: "திரு. R. விக்னேஷ் ", qual: "M.A, B.Ed.," },
    ],
  },
  {
    title: "தமிழாசிரியர்கள்",
    members: [
      { name: "திருமதி. S.P. பிரேமா", qual: "M.A., B.Ed., M.Phil." },
    ],
  },
  {
    title: "இடைநிலை ஆசிரியர்கள்",
    members: [
      { name: "திருமதி. K. மீனாட்சி", qual: "" },
      { name: "திருமதி. N. மரகத லெட்சுமி", qual: "M.A., B.Ed." },
    ],
  },
  {
    title: "கலை ஆசிரியர்கள்",
    members: [
      { name: "திரு. சு. ஆனந்தன்", qual: "B.Lit. (ஓவிய ஆசிரியர்)" },
      { name: "திரு. K. அங்கய சுந்தரம்", qual: "B.Sc., M.P.Es., M.Phil. (உடற்கல்வி ஆசிரியர்)" },
      { name: "திரு. P.K. பொன்மகேஷ்", qual: "M.A. (தையல் ஆசிரியர்)" },
    ],
  },
  {
    title: "அலுவலர்கள்",
    members: [
      { name: "திரு. K. சொக்கலிங்க பூபதி", qual: "B.A., PGDCA. (இளநிலை உதவியாளர்)" },
      { name: "திருமதி. V. செந்தில்உமா", qual: "B.A., B.LISC (நூலகர்)" },
      { name: "திருமதி. N. புஷ்கலா", qual: "M.Com., B.Ed. (நூலக உடனாள்)" },
      { name: "திரு. D. சூரியா", qual: "M.Sc., B.Ed., M.Phil. (இளநிலை உதவியாளர்)" },
      { name: "திருமதி. G. திரிபுரசுந்தரி", qual: "M.A. (பதிவறை எழுத்தர்)" },
        { name: "திரு. M. ராமசுப்பிரமணியன்", qual: "B.A. (ஆய்வக உதவியாளர்)" },
      { name: "திரு. மா.தெ. வேல்முருகன்", qual: "M.A. (நீர் வழங்குபவர்)" },
      { name: "திரு. M. பிரபாகரன்", qual: "(இரவு காவலர்)" },
    ],
  },
];

function getInitial(name) {
  const parts = name.trim().split(" ");
  const nameWord =
    parts.find((p) => !p.includes(".") && p.length > 0) ||
    parts[parts.length - 1];

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const firstSegment = segmenter.segment(nameWord)[Symbol.iterator]().next().value;
    return firstSegment ? firstSegment.segment : "";
  }

  // Fallback: match base code point plus any trailing combining marks
  // (covers Tamil vowel signs / matras which combine with the base consonant)
  const match = nameWord.match(/^\P{M}\p{M}*/u);
  return match ? match[0] : nameWord.charAt(0);
}

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

/**
 * FIX SUMMARY (previous bug: clicking a nav button sometimes highlighted the
 * WRONG button while page scrolled to the correct section):
 *
 * 1. `ids` was passed as a freshly-created array on every render, so the
 *    IntersectionObserver effect re-ran (disconnect + re-observe) on every
 *    single state change, including mid-scroll. Now we key the effect off a
 *    stable joined string so it doesn't reset unnecessarily.
 *
 * 2. The "manual click" lock used to release after a FIXED 900ms timer.
 *    For sections further down the page, the smooth scroll animation could
 *    still be in progress when the lock released — so the observer would
 *    grab whatever section happened to be passing through the viewport at
 *    that instant and overwrite the highlight. Now the lock releases only
 *    once the page has actually settled near the target scroll position
 *    (polling scrollY), with a hard 2.5s safety fallback so it can never
 *    get stuck locked forever.
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const lockRef = useRef(false);
  const pollTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // Stable string key instead of the array reference itself, so this
    // effect only re-runs when the actual set of ids changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  const selectManually = (id) => {
    lockRef.current = true;
    setActive(id);

    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

    const el = document.getElementById(id);
    const target = el ? el.getBoundingClientRect().top + window.scrollY - 140 : 0;

    const checkScrollEnd = () => {
      if (Math.abs(window.scrollY - target) < 4) {
        lockRef.current = false;
      } else {
        pollTimerRef.current = setTimeout(checkScrollEnd, 100);
      }
    };
    pollTimerRef.current = setTimeout(checkScrollEnd, 150);

    // Safety net: never leave the lock stuck on if scrollY never settles
    // exactly on target (e.g. short page, overscroll clamping, etc).
    fallbackTimerRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 2500);
  };

  return [active, selectManually];
}

function StaffSubnavLink({ id, title, isActive, onSelect }) {
  return React.createElement(
    "a",
    {
      href: "#" + id,
      className: isActive ? "active" : "",
      onClick: (e) => {
        e.preventDefault();
        onSelect(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    title
  );
}

export default function Staffs() {
  const headmaster = staffGroups[0].members[0];
  const otherGroups = staffGroups.slice(1);

  // Memoized so this array keeps the same reference across re-renders —
  // staffGroups is static, so an empty dependency array is safe here.
  const sectionIds = useMemo(
    () => otherGroups.map((g) => `grp-${g.title}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [activeId, setActiveId] = useActiveSection(sectionIds);

  const navRowTop = otherGroups.slice(0, 4);
  const navRowBottom = otherGroups.slice(4);

  return (
    <div className="staff-page" id="staff">
      <section className="staff-hero">
        <div className="staff-hero-overlay">
          <p className="staff-eyebrow anim-fade-up">எங்கள் குழு</p>
          <h1 className="staff-hero-title anim-fade-up">
            ஆசிரியர்கள் &
            <br />
            பணியாளர்கள்
          </h1>
          <p className="staff-hero-tagline anim-fade-up">
            அர்ப்பணிப்புடன் மாணவர்களை வழிநடத்தும் எங்கள் அனுபவமிக்க குழு
          </p>
        </div>
      </section>

      <div className="hm-spotlight">
        <Reveal>
          <div className="hm-card">
            <span className="hm-avatar">{getInitial(headmaster.name)}</span>
            <div className="hm-info">
              <span className="hm-label">தலைமை ஆசிரியர்</span>
              <h2>{headmaster.name}</h2>
              <p>{headmaster.qual}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <nav className="staff-subnav">
        <div className="staff-subnav-row">
          {navRowTop.map((g) => {
            const id = "grp-" + g.title;
            return (
              <StaffSubnavLink
                key={g.title}
                id={id}
                title={g.title}
                isActive={activeId === id}
                onSelect={setActiveId}
              />
            );
          })}
        </div>
        <div className="staff-subnav-row">
          {navRowBottom.map((g) => {
            const id = "grp-" + g.title;
            return (
              <StaffSubnavLink
                key={g.title}
                id={id}
                title={g.title}
                isActive={activeId === id}
                onSelect={setActiveId}
              />
            );
          })}
        </div>
      </nav>

      <section className="staff-content">
        {otherGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 30} className="staff-group">
            <div id={`grp-${group.title}`} className="staff-group-heading">
              <span className="index">{String(gi + 1).padStart(2, "0")}</span>
              <h2>{group.title}</h2>
            </div>
            <div className="staff-grid">
              {group.members.map((m, mi) => (
                <div className="staff-card" key={m.name + mi}>
                  <span className="staff-avatar">{getInitial(m.name)}</span>
                  <div className="staff-info">
                    <h3>{m.name}</h3>
                    {m.qual && <p>{m.qual}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}