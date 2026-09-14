import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Gallery.css";

// ---- Real school photos from /public/images ----
const PHOTOS = [
  {
    id: 1,
    category: "Campus",
    caption: "School gate",
    src: "/images/Gate1.webp",
    tall: true,
  },
  
  {
    id: 2,
    category: "Campus",
    caption: "School environment",
    src: "/images/environment2.webp",
    tall: true,
  },
  {
    id: 3,
    category: "Campus",
    caption: "Memorial block",
    src: "/images/Memorial_Block.webp",
  },
  {
    id: 4,
    category: "Campus",
    caption: "Ground",
    src: "/images/ground.webp",
    tall: true,
  },
  {
    id: 5,
    category: "Campus",
    caption: "Temple",
    src: "/images/temple.webp",
  },
  {
    id: 6,
    category: "Campus",
    caption: "Photo spot",
    src: "/images/photo_spot.webp",
  },
  {
    id: 7,
    category: "Campus",
    caption: "Space corner",
    src: "/images/space_corner.webp",
    tall: true,
  },
  {
    id: 8,
    category: "Campus",
    caption: "Bike stand",
    src: "/images/bikestand.webp",
  },
  {
    id: 9,
    category: "ClassRooms",
    caption: "Classroom",
    src: "/images/classroom.webp",
    tall: true,
  },
  {
    id: 10,
    category: "ClassRooms",
    caption: "Smart classroom",
    src: "/images/smartclass.webp",
  },
  {
    id: 11,
    category: "ClassRooms",
    caption: "HM room",
    src: "/images/hmroom.webp",
    tall: true,
  },
  {
    id: 12,
    category: "ClassRooms",
    caption: "Office",
    src: "/images/office.webp",
  },
  {
    id: 13,
    category: "Lab",
    caption: "Science lab",
    src: "/images/science.webp",
    tall: true,
  },
  {
    id: 14,
    category: "Lab",
    caption: "Student projects",
    src: "/images/projects.webp",
  },
  {
    id: 15,
    category: "Events",
    caption: "Vivekananda celebration",
    src: "/images/vivekanada.webp",
    tall: true,
  },
  {
    id: 16,
    category: "Events",
    caption: "Auditorium",
    src: "/images/auditorium.webp",
  },
  {
    id: 17,
    category: "Events",
    caption: "Achievements",
    src: "/images/achivements.webp",
    tall: true,
  },
  {
    id: 18,
    category: "Sports",
    caption: "Game activities",
    src: "/images/game.webp",
  },
  {
    id: 19,
    category: "Sports",
    caption: "Game activities",
    src: "/images/game2.webp",
    tall: true,
  },
    {
    id: 20,
    category: "Campus",
    caption: "Blog",
    src: "/images/block.webp",
    tall: true,
  },
];
const FILTERS = ["All", "Campus", "ClassRooms", "Lab", "Events", "Sports"];

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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function GalleryTile({ photo, index, onOpen }) {
  const [ref, visible] = useReveal();

  return (
    <figure
      ref={ref}
      className={`gallery-tile${photo.tall ? " gallery-tile--tall" : ""}${
        visible ? " gallery-tile--visible" : ""
      }`}
      style={{ "--delay": `${(index % 6) * 70}ms` }}
      onClick={() => onOpen(photo)}
    >
      <img src={photo.src} alt={photo.caption} loading="lazy" />
      <div className="gallery-tile__overlay">
        <span className="gallery-tile__category">{photo.category}</span>
        <span className="gallery-tile__caption">{photo.caption}</span>
        <span className="gallery-tile__expand">
          <Expand size={16} />
        </span>
      </div>
    </figure>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return PHOTOS;
    return PHOTOS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback(
    (photo) => {
      const idx = filtered.findIndex((p) => p.id === photo.id);
      setLightboxIndex(idx);
    },
    [filtered]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));
  }, [filtered.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activePhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="gallery-page">
      {/* ---------------- HERO ---------------- */}
      <section className="gallery-hero">
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="hero-inner">
          <h1 className="hero-title">Gallery</h1>
          <p className="hero-subtitle">
            A glimpse into everyday life at Thirthapathi Higher Secondary
            School — campus, classrooms, labs, and celebrations.
          </p>
        </div>
      </section>

      {/* ---------------- FILTERS ---------------- */}
      <section className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-pill${activeFilter === f ? " filter-pill--active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* ---------------- MASONRY GRID ---------------- */}
      <section className="gallery-grid" key={activeFilter}>
        {filtered.map((photo, i) => (
          <GalleryTile key={photo.id} photo={photo} index={i} onOpen={openLightbox} />
        ))}
        {filtered.length === 0 && (
          <p className="gallery-empty">No photos in this category yet.</p>
        )}
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} />
          </button>

          <div
            className="lightbox-content"
            key={activePhoto.id}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activePhoto.src} alt={activePhoto.caption} />
            <div className="lightbox-caption">
              <span className="lightbox-category">{activePhoto.category}</span>
              <span>{activePhoto.caption}</span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={26} />
          </button>

          <span className="lightbox-counter">
            {lightboxIndex + 1} / {filtered.length}
          </span>
        </div>
      )}
    </div>
  );
}