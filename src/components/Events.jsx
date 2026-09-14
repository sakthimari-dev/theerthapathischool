import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight, X } from "lucide-react";
import "./Events.css";

// ---- Events data ----
// Images live in public/images; swap any src/text below with real content anytime.
const EVENTS = [
  {
    id: 1,
    category: "Assembly",
    title: "Morning Assembly & School Gathering",
    excerpt:
      "Daily assembly with prayers, announcements, and a moment of togetherness for the whole school.",
    description:
      "Every school day begins with our morning assembly — prayers, the national anthem, and important announcements bring the whole student body together before classes start. It's a moment of discipline, unity, and reflection that sets the tone for the day.",
    image: "/images/Assembly.webp",
    featured: true,
  },
  {
    id: 2,
    category: "Assembly",
    title: "Special Assembly Program",
    excerpt: "A themed assembly session with student performances and speeches.",
    description:
      "This special assembly featured student-led speeches, short performances, and recognitions, giving children a platform to build confidence in front of the whole school.",
    image: "/images/Assembly2.webp",
  },
  {
    id: 3,
    category: "NSS",
    title: "National Service Scheme - Community Activity",
    excerpt:
      "NSS volunteers taking part in a community service and awareness initiative.",
    description:
      "Our National Service Scheme (NSS) unit organized a community outreach activity, encouraging students to contribute to society through service, awareness drives, and teamwork beyond the classroom.",
    image: "/images/National_Service_Scheme.webp",
  },
  {
    id: 4,
    category: "NSS",
    title: "National Service Scheme - Camp Day",
    excerpt: "Students engaging in NSS camp activities and group tasks.",
    description:
      "During the NSS camp, students took part in group activities, discussions, and hands-on service tasks that build a sense of social responsibility and leadership from a young age.",
    image: "/images/Awareness.webp",
  },

   {
    id: 5,
    category: "NSS",
    title: "National Service Scheme - Camp Day",
    excerpt: "Students engaging in NSS camp activities and group tasks.",
    description:
      "During the NSS camp, students took part in group activities, discussions, and hands-on service tasks that build a sense of social responsibility and leadership from a young age.",
    image: "/images/Awareness1.webp",
  },

  {
    id: 6,
    category: "Parents Meeting",
    title: "Parent-Teacher Meeting",
    excerpt: "Parents meeting with teachers to discuss student progress.",
    description:
      "Our Parent-Teacher Meeting gave families the chance to sit with teachers one-on-one, review academic progress, and discuss how best to support each child's learning journey at home and at school.",
    image: "/images/Parents_meeting.webp",
  },
  {
    id: 7,
    category: "Parents Meeting",
    title: "Parents Meeting - Open Session",
    excerpt: "An open session with parents on school updates and feedback.",
    description:
      "This open parents' session covered upcoming school plans, academic updates, and gave parents an opportunity to share feedback directly with the school administration.",
    image: "/images/Parents_meeting2.webp",
  },
  {
    id: 8,
    category: "Yoga",
    title: "Yoga & Wellness Day",
    excerpt: "Students practicing yoga for fitness, focus, and well-being.",
    description:
      "Yoga & Wellness Day encouraged students to slow down and focus on breathing, posture, and mindfulness. The session promoted physical fitness alongside mental well-being, led by trained instructors.",
    image: "/images/Yoga.webp",
  },
  {
    id: 9,
    category: "Yoga",
    title: "Yoga Session - Group Practice",
    excerpt: "A group yoga session focused on posture and breathing techniques.",
    description:
      "Students came together for a guided group yoga session, practicing asanas and breathing exercises that build flexibility, focus, and a calm mind alongside physical fitness.",
    image: "/images/Yoga2.webp",
  },
  {
    id: 10,
    category: "NSS",
    title: "National Service Scheme - Volunteer Drive",
    excerpt: "NSS volunteers taking part in another round of service activities.",
    description:
      "Our NSS volunteers came together for a dedicated service drive, working on campus and community initiatives that build teamwork, discipline, and a spirit of social responsibility.",
    image: "/images/NSS.webp",
  },
  {
    id: 11,
    category: "Book Distribution",
    title: "Free Textbook Distribution",
    excerpt: "Textbooks and study materials distributed to students.",
    description:
      "As part of our commitment to accessible education, free textbooks and study materials were distributed to students, ensuring every child starts the academic year fully prepared.",
    image: "/images/Book_Provide.webp",
  },
  {
    id: 12,
    category: "Census",
    title: "School Census Program",
    excerpt: "Students and staff taking part in the annual census activity.",
    description:
      "Our school participated in the census program, with staff and student volunteers helping record and verify data as part of this important civic exercise.",
    image: "/images/Census.webp",
  },
  {
    id: 13,
    category: "Government Scheme",
    title: "Free Bicycle Distribution Scheme",
    excerpt:
      "Free bicycles distributed to students under the Tamil Nadu Government scheme.",
    description:
      "The Tamil Nadu Government's free bicycle distribution scheme was launched at our school. School Committee Chairman Mr. A.K. Chidambaranathan inaugurated the program and shared his good wishes with the students.",
    image: "/images/Free_Cycle_Provie.png",
  },
  {
    id: 14,
    category: "NSS",
    title: "NSS & NCC Anti-Drug Awareness Rally",
    excerpt:
      "NSS and NCC students led an anti-drug awareness rally from the Ambasamudram court to the school.",
    description:
      "Students from the NSS and NCC units organized an anti-drug awareness rally starting from the Ambasamudram court and ending at the school. Judges, lawyers, and teachers from Ambasamudram joined the rally in large numbers. School Secretary Mr. S. Kandasamy welcomed the rally on its arrival, and Headmaster Mr. A. Azhagiya Nambi delivered the vote of thanks.",
    image: "/images/2025_drugs.png",
  },
  {
    id: 15,
    category: "Achievements",
    title: "Pavai Vizha Competition Winners Felicitated",
    excerpt:
      "Students who won prizes at the Pavai Vizha competitions were honoured with certificates.",
    description:
      "Students who secured prizes in the Pavai Vizha competitions were felicitated and presented with certificates for their achievements.",
    image: "/images/Livi.png",
  },
  {
    id: 16,
    category: "Celebrations",
    title: "Samathuva Pongal Vizha",
    excerpt:
      "Equality Pongal festival celebrated with sweet pongal, competitions, and prizes for all.",
    description:
      "The Samathuva Pongal Vizha (Equality Pongal Festival) was celebrated in a grand manner, presided over by Thirthapathi Education Trust Secretary and advocate Mr. S. Kandasamy. Sweet pongal was served to all students, teachers, and office staff, and several competitions were held. Winners were awarded prizes by Mr. S. Kandasamy, and the event was well organized by teachers and staff under Headmaster Mr. A. Azhagiya Nambi.",
    image: "/images/Pongal.png",
  },
  {
    id: 17,
    category: "Academic",
    title: "English Expo",
    excerpt: "A grand English Expo showcasing student projects and language skills.",
    description:
      "The English Expo held at our school was a great success. We extend our heartfelt thanks to the school management for granting permission, to the students who took part, the teachers who trained them, and the office staff who arranged everything.",
    image: "/images/English_Expo.png",
  },
  {
    id: 18,
    category: "Academic",
    title: "Social Science Forum Meeting",
    excerpt: "A meeting of the Social Science Forum held with active student participation.",
    description:
      "A meeting of the Social Science Forum was conducted at our school with enthusiastic participation from students, encouraging discussion and interest in the subject.",
    image: "/images/Social.png",
  },
  {
    id: 19,
    category: "Academic",
    title: "One Day, One Book — Reading Movement",
    excerpt: "A reading movement encouraging students to read one book every day.",
    description:
      "As part of the 'One Day, One Book' reading movement, our school encouraged students to build a daily reading habit, promoting a love for books and lifelong learning.",
    image: "/images/Book_Expo.png",
  },
  {
    id: 20,
    category: "Academic",
    title: "Mathematics Forum Meeting",
    excerpt: "The Mathematics Forum meeting held successfully with student participation.",
    description:
      "The Mathematics Forum meeting was conducted successfully, with students actively contributing ideas and taking part in mathematics-related activities.",
    image: "/images/Science_expo.png",
  },
  {
    id: 21,
    category: "Academic",
    title: "Nellai Book Festival & District Science Centre Visit",
    excerpt:
      "Students visited the Nellai Book Festival and the District Science Centre.",
    description:
      "Our students happily visited the Nellai Puthaga Thiruvizha (Book Festival), purchasing books for the school library as well as for themselves. On the same day, students also visited the District Science Centre and enjoyed the experience.",
    image: "/images/Porunai.png",
  },
  {
    id: 22,
    category: "Awareness",
    title: "Child Safety & Anti-Drug Awareness Program",
    excerpt:
      "District Child Protection Unit officials spoke to students on child safety, protection from abuse, and a drug-free India.",
    description:
      "On behalf of the District Child Protection Unit, officials including Ms. Helina, along with representatives from the Panchayat Rainbow Gender Centre, Social Welfare Department, and Police Department, addressed students on child protection, prevention of child marriage, drug prevention, and cyber crime awareness. Students also took a pledge against drug abuse as part of the anti-drug forum's initiative.",
    image: "/images/No_Drugs.png",
  },
  {
    id: 23,
    category: "Achievements",
    title: "NMMS Exam Success",
    excerpt: "Three students of our school qualified in the NMMS examination.",
    description:
      "We are happy to announce that three of our students qualified in the NMMS (National Means-cum-Merit Scholarship) examination. Congratulations to the successful students and the teachers who trained them.",
    image: "/images/NMMS.png",
  },
  {
    id: 24,
    category: "Achievements",
    title: "NMMS Felicitation Ceremony",
    excerpt: "A felicitation event honoured students who qualified in the NMMS exam.",
    description:
      "A felicitation ceremony was held for students who qualified in the NMMS examination. Headmaster Mr. A. Azhagiya Nambi delivered the welcome address, and Thirthapathi Education Trust Secretary Mr. S. Kandasamy presided over the event. Judges from Ambasamudram — Mr. Marudhupandi, Mr. Praveen Jeeva, and Mr. Avina Karthik — presented prizes to the successful students and honoured the teachers who trained them. Parents, teachers, and lawyers attended the event.",
    image: "/images/Certificate.png",
  },
  {
    id: 25,
    category: "Achievements",
    title: "12th Public Exam Results — 97.4% Pass",
    excerpt:
      "76 out of 78 students passed the Class 12 public exams, achieving a 97.4% pass rate.",
    description:
      "Out of 78 students who wrote the Class 12 public examinations, 76 students passed, achieving a pass percentage of 97.4%. Student Sivasubramanian topped the school with 499 marks. We thank the successful students, the teachers who guided them, and the school management for their support.",
    image: "/images/Exam_percentage.png",
  },
  {
    id: 26,
    category: "Book Distribution",
    title: "Free Textbook Distribution by Hon'ble MP",
    excerpt:
      "Tirunelveli MP Mr. Robert Bruce distributed free government textbooks to students.",
    description:
      "Tirunelveli Member of Parliament Mr. Robert Bruce distributed free Tamil Nadu Government textbooks to our students and shared his good wishes. Uniforms were also given to underprivileged students on behalf of the school management. School Secretary Mr. S. Kandasamy delivered the welcome address, and Headmaster Mr. A. Azhagiya Nambi gave the vote of thanks. Parents, teachers, office staff, and students attended the event.",
    image: "/images/Robbert_sir.png",
  },
  {
    id: 27,
    category: "Environment",
    title: "Urban Greening — Tree Plantation Drive",
    excerpt:
      "Saplings were planted at our school under the Ambasamudram Municipality's Urban Greening scheme.",
    description:
      "Saplings were planted at our school as part of the Ambasamudram Municipality's Urban Greening programme. Green Corps and NSS students took part in the plantation drive.",
    image: "/images/Urben_Green.png",
  },
  {
    id: 28,
    category: "Celebrations",
    title: "Independence Day Celebration",
    excerpt: "Flag hoisting, NCC march-past, and cultural performances marked the day.",
    description:
      "Independence Day was celebrated with great enthusiasm at our school. Thirthapathi Education Trust Secretary Mr. S. Kandasamy hoisted the national flag and received the NCC march-past salute. Headmaster Mr. A. Azhagiya Nambi delivered the welcome address, and Mr. S. Kandasamy presided over the event. Students presented eye-catching cultural performances. Assistant Headmaster Mr. S. Murugan proposed the vote of thanks, and sweets and tea were served to all.",
    image: "/images/Independent_Day.png",
  },
  {
    id: 29,
    category: "Awareness",
    title: "Police Awareness Talk on Discipline & Anti-Drug Abuse",
    excerpt:
      "Ambasamudram Police Inspector addressed students on drug prevention and discipline during morning assembly.",
    description:
      "Ambasamudram Police Inspector Mr. Shanmugavel addressed students during the morning prayer meeting on the prevention of drug abuse and the importance of discipline. Headmaster Mr. Azhagiya Nambi presided over the session. All students took a pledge against drug abuse on behalf of the Anti-Drug Forum, with the Makkal Muttram organization, the Anti-Drug Forum, and the NSS unit's staff and students taking part.",
    image: "/images/Police_Drugs.png",
  },
  {
    id: 30,
    category: "Achievements",
    title: "Tamil Ilakkiya Peravai Competition Winners",
    excerpt:
      "Students won prizes in speech and essay competitions organised by the Ambasamudram Tamil Literary Assembly.",
    description:
      "Our students took part in competitions organised by the Ambasamudram Tamil Ilakkiya Peravai. Indhumathi (11B) secured third place in the speech competition, and Thamizharasi (9B) secured third place in the essay competition. Ambasamudram Police Inspector Mr. Shanmugavel presented prizes and certificates to the winning students.",
    image: "/images/Tamil_prize.png",
  },
  {
    id: 31,
    category: "Achievements",
    title: "Personality Development Forum — Special Training & Competitions",
    excerpt:
      "Special training sessions by the Papanasam Pothigai Manavalakalai Mandram concluded with competitions and prizes.",
    description:
      "Special training sessions were conducted for our students by the Papanasam Pothigai Manavalakalai Mandram (Personality Development Forum), followed by competitions. Inchuya (7B) won the essay competition, Illakkiya (7B) won the singing competition, and Karthika (7B) won the fitness competition. The winning students were awarded prizes, shields, and certificates at the morning assembly, and all participants received certificates for taking part.",
    image: "/images/Pothigai_prize.png",
  },
  {
    id: 32,
    category: "Infrastructure",
    title: "New Modern Toilet Facility for Girls",
    excerpt:
      "A fully equipped, modern toilet facility for girl students was built by the school management.",
    description:
      "We extend our heartfelt thanks, on behalf of the girl students, to the school management for constructing a modern toilet facility with all necessary amenities for our girl students.",
    image: "/images/Toilet.png",
  },
  {
    id: 33,
    category: "NSS",
    title: "NSS Special Camp — Plantation & Farming Activities",
    excerpt:
      "NSS special camp days featured tree plantation, a nursery and herbal farm demonstration, and a waste management awareness session.",
    description:
      "During the NSS special camp, School Secretary Mr. S. Kandasamy inaugurated Day 2 by planting a sapling. On another day, Dr. Subburaj, founder of the Pasumai Thozhargal Trust, demonstrated how to set up a nursery and herbal farm, giving students hands-on experience. The Ambasamudram Municipality Health Inspector, Mr. Chidambara Ramalingam, also explained how solid waste management is carried out at the micro-composting centre, giving students a first-hand understanding of the process.",
    image: "/images/NSS Camp.png",
  },
  {
    id: 34,
    category: "Awareness",
    title: "Food Adulteration Awareness — Mobile Food Lab",
    excerpt:
      "A mobile food analysis lab from Palayamkottai created awareness about food adulteration among students.",
    description:
      "A team from the Palayamkottai Mobile Food Analysis Lab visited our school with their van and created awareness among students about food adulteration and how to identify it.",
    image: "/images/Adulteration.png",
  },
  {
    id: 35,
    category: "Awareness",
    title: "Anti-Drug & Tobacco Awareness Exhibition",
    excerpt:
      "An awareness exhibition on drug and tobacco eradication was held with a short film for students.",
    description:
      "The Tirunelveli District Prohibition and Excise Department, together with the District Brahma Kumaris organisation, jointly conducted an awareness exhibition on drug and tobacco eradication at our school. An awareness short film was screened for the students.",
    image: "/images/About_Drugs.png",
  },
  {
    id: 36,
    category: "Awareness",
    title: "Road Safety Awareness Meeting",
    excerpt: "A road safety awareness meeting was conducted for students.",
    description:
      "A road safety awareness meeting was held at our school to educate students on safe practices on the road and the importance of following traffic rules.",
    image: "/images/road_safety.png",
  },
  {
    id: 37,
    category: "Achievements",
    title: "Abdul Kalam Birth Anniversary Competition Winners",
    excerpt:
      "Students were honoured for winning prizes in essay, speech, and drawing competitions held by the Ambasamudram Lovely Friends Trust.",
    description:
      "To mark the birth anniversary of Dr. A.P.J. Abdul Kalam, the Ambasamudram Lovely Friends Trust organised essay, speech, and drawing competitions. Students of our school who won prizes were honoured by the Headmaster with certificates, medals, and shields.",
    image: "/images/Livi.png",
  },
  {
    id: 38,
    category: "Awareness",
    title: "Fire Safety Awareness Talk",
    excerpt:
      "The Ambasamudram Fire Service Inspector addressed students on safety measures during the rainy season.",
    description:
      "Ambasamudram Fire Service Inspector Mr. Balavesam addressed students during the morning assembly on precautions to be taken during the rainy season. The programme was coordinated by the Headmaster along with the scheme officer and students.",
    image: "/images/Fire_service.png",
  },
  {
    id: 39,
    category: "Celebrations",
    title: "Children's Day Celebration",
    excerpt: "Children's Day was celebrated with joy and enthusiasm across the school.",
    description:
      "Children's Day was celebrated at Thirthapathi Higher Secondary School with games, cultural activities, and festivities, bringing smiles to every student on campus.",
    image: "/images/Childer_day.png",
  },
];

const FILTERS = [
  "All",
  "Assembly",
  "NSS",
  "Parents Meeting",
  "Yoga",
  "Book Distribution",
  "Census",
  "Government Scheme",
  "Achievements",
  "Celebrations",
  "Academic",
  "Awareness",
  "Infrastructure",
  "Environment",
];

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function EventCard({ item, index, onRead }) {
  const [ref, visible] = useReveal();

  return (
    <article
      ref={ref}
      className={`event-card${visible ? " event-card--visible" : ""}`}
      style={{ "--delay": `${(index % 3) * 100}ms` }}
    >
      <div className="event-card__media">
        <img src={item.image} alt={item.title} loading="lazy" />
        <span className="event-card__tag">{item.category}</span>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{item.title}</h3>

        <p className="event-card__excerpt">{item.excerpt}</p>

        <button
          type="button"
          className="event-card__link"
          onClick={() => onRead(item)}
        >
          Read More <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default function Events() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedItem, setSelectedItem] = useState(null);

  const featured = useMemo(() => EVENTS.find((e) => e.featured), []);
  const rest = useMemo(() => EVENTS.filter((e) => !e.featured), []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return rest;
    return rest.filter((e) => e.category === activeFilter);
  }, [activeFilter, rest]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    if (!selectedItem) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <div className="events-page">
      {/* ---------------- HERO ---------------- */}
      <section className="events-hero">
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="hero-inner">
          <h1 className="hero-title">Events</h1>
          <p className="hero-subtitle">
            Upcoming and recent events at Thirthapathi Higher Secondary
            School — assemblies, NSS activities, awareness programs,
            achievements, celebrations, and community initiatives.
          </p>
        </div>
      </section>

      {/* ---------------- FEATURED ---------------- */}
      {featured && (
        <section className="featured-section">
          <article className="featured-card">
            <div className="featured-card__media">
              <img src={featured.image} alt={featured.title} />
              <span className="event-card__tag event-card__tag--floating">
                {featured.category}
              </span>
            </div>
            <div className="featured-card__body">
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <button
                type="button"
                className="featured-card__cta"
                onClick={() => setSelectedItem(featured)}
              >
                Read More <ArrowRight size={16} />
              </button>
            </div>
          </article>
        </section>
      )}

      {/* ---------------- FILTERS ---------------- */}
      <section className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-pill${activeFilter === f ? " filter-pill--active" : ""}`}
            onClick={() => {
              setActiveFilter(f);
              setVisibleCount(6);
            }}
          >
            {f}
          </button>
        ))}
      </section>

      {/* ---------------- GRID ---------------- */}
      <section className="events-grid">
        {visibleItems.map((item, i) => (
          <EventCard key={item.id} item={item} index={i} onRead={setSelectedItem} />
        ))}
        {visibleItems.length === 0 && (
          <p className="events-empty">No {activeFilter.toLowerCase()} events yet. Check back soon.</p>
        )}
      </section>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="load-more-btn"
            onClick={() => setVisibleCount((c) => c + 3)}
          >
            Load More
          </button>
        </div>
      )}

      {/* ---------------- READ MORE MODAL ---------------- */}
      {selectedItem && (
        <div className="event-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event-modal__close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="event-modal__media">
              <img src={selectedItem.image} alt={selectedItem.title} />
              <span className="event-card__tag event-card__tag--floating">
                {selectedItem.category}
              </span>
            </div>

            <div className="event-modal__body">
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description || selectedItem.excerpt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}