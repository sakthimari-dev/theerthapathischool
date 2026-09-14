import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaGraduationCap } from "react-icons/fa";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaFlask,
  FaBookOpen,
  FaBook,
  FaFutbol,
  FaBuilding,
  FaDoorOpen,
  FaUsers,
  FaBiking,
  FaParking,
  FaBasketballBall,
  FaRobot,
  FaSchool,
  FaUtensils,
  FaCoffee,
  FaTint,
  FaTableTennis,
  FaTree,
} from "react-icons/fa";

// Real campus photography — matches /src/assets exactly
import sskbuilding from "../assets/sskbuilding.webp";
import labbuilding from "../assets/labbuilding.webp";
import schoolentrance from "../assets/schoolentrance.webp";
import chemistrylab from "../assets/chemistrylab.webp";
import smartclass from "../assets/smartclass.webp";
import meetingroom from "../assets/meetingroom.webp";
import meetinghall from "../assets/meetinghall.webp";
import basketball from "../assets/basketball.webp";
import tennis from "../assets/tennis.webp";
import cyclestandboys from "../assets/cyclestandboys.webp";
import cyclestandgirls from "../assets/cyclestandgirls.webp";
import outside from "../assets/outside.webp";
import spacelap from "../assets/spacelap.webp";
import staffparking from "../assets/staffparking.webp";
import playground from "../assets/playground.webp";
import boyswater from "../assets/boyswater.webp";
import girlswater from "../assets/girlswater.webp";
import library from "../assets/library.webp";
import foodroom from "../assets/foodroom.webp";
import canteen from "../assets/canteen.webp";
import classroom from "../assets/classroom.webp";

import "./Facilities.css";

const facilities = [
  {
    icon: <FaDoorOpen />,
    title: "School Entrance",
    text: "A welcoming and secure entrance that creates a positive first impression for every visitor and student.",
    img: schoolentrance,
  },
  {
    icon: <FaBuilding />,
    title: "S.S.K. Building",
    text: "A spacious academic block providing a safe, comfortable, and productive learning environment.",
    img: sskbuilding,
  },
  {
    icon: <FaSchool />,
    title: "Lab Building",
    text: "A dedicated laboratory block equipped with modern science facilities for practical learning.",
    img: labbuilding,
  },
  {
    icon: <FaRobot />,
    title: "Robotics Lab",
    text: "An innovative laboratory where students explore robotics, coding, automation, and STEM projects.",
    img: spacelap,
  },
  {
    icon: <FaFlask />,
    title: "Chemistry Lab",
    text: "A fully equipped laboratory designed for safe and hands-on chemistry experiments.",
    img: chemistrylab,
  },
  {
    icon: <FaLaptopCode />,
    title: "Smart Classroom",
    text: "Technology-enabled classrooms with digital learning tools for interactive education.",
    img: smartclass,
  },
  {
    icon: <FaBook />,
    title: "Library",
    text: "A peaceful learning space with a rich collection of books, reference materials, and digital resources.",
    img: library,
  },
  {
    icon: <FaUsers />,
    title: "Meeting Room",
    text: "A dedicated space for staff meetings, parent interactions, and academic planning.",
    img: meetingroom,
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Meeting Hall",
    text: "A spacious hall used for assemblies, seminars, cultural programs, and school events.",
    img: meetinghall,
  },
  {
    icon: <FaSchool />,
    title: "Classroom",
    text: "Well-ventilated classrooms that provide a comfortable and engaging learning atmosphere.",
    img: classroom,
  },
  {
    icon: <FaUtensils />,
    title: "Nutritious Meal Centre",
    text: "A hygienic facility where nutritious mid-day meals are prepared and served to students.",
    img: foodroom,
  },
  {
    icon: <FaCoffee />,
    title: "Canteen",
    text: "A clean and student-friendly canteen serving fresh snacks and refreshments.",
    img: canteen,
  },
  {
    icon: <FaTint />,
    title: "Boys' Drinking Water",
    text: "Clean and purified drinking water facility exclusively for boys.",
    img: boyswater,
  },
  {
    icon: <FaTint />,
    title: "Girls' Drinking Water",
    text: "Safe and hygienic drinking water facility exclusively for girls.",
    img: girlswater,
  },
  {
    icon: <FaBiking />,
    title: "Boys' Cycle Stand",
    text: "A secure and organized cycle parking area for boy students.",
    img: cyclestandboys,
  },
  {
    icon: <FaBiking />,
    title: "Girls' Cycle Stand",
    text: "A safe and well-maintained cycle parking area for girl students.",
    img: cyclestandgirls,
  },
  {
    icon: <FaParking />,
    title: "Staff Parking",
    text: "A dedicated parking area for teaching and non-teaching staff.",
    img: staffparking,
  },
  {
    icon: <FaFutbol />,
    title: "Playground",
    text: "A spacious playground supporting cricket, football, volleyball, kho-kho, kabaddi, and athletics.",
    img: playground,
  },
  {
    icon: <FaBasketballBall />,
    title: "Basketball Court",
    text: "A dedicated basketball court that encourages fitness, teamwork, and sportsmanship.",
    img: basketball,
  },
  {
    icon: <FaTableTennis />,
    title: "Badminton Court",
    text: "A well-maintained badminton court where students practice and compete in indoor sports.",
    img: tennis,
  },

];

/** Adds `.is-visible` to any element with data-reveal once it enters the viewport. */
const useScrollReveal = () => {
  useEffect(() => {
    const nodes = document.querySelectorAll(".fac-section [data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
};

/** 3D tilt-on-hover wrapper, mirrors the interaction used on the About page. */
const TiltCard = ({ children, className, style, ...rest }) => {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  );
};

const Facilities = () => {
  const bannerRef = useRef(null);
  useScrollReveal();

  const handleBannerMove = useCallback((e) => {
    const el = bannerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  }, []);

  return (
    <section className="fac-section">
      {/* Header Banner */}
      <header
        className="fac-banner"
        ref={bannerRef}
        onMouseMove={handleBannerMove}
      >
        <div className="fac-banner__glow" aria-hidden="true" />
        <div className="fac-banner__particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="fac-banner__particle" style={{ "--i": i }} />
          ))}
        </div>
        <div className="fac-banner__content">
          <p className="fac-banner__breadcrumb">
           Facilities
          </p>
          <h1 className="fac-banner__title">Our Facilities</h1>
          <div className="fac-banner__underline" aria-hidden="true" />
        </div>
        <div className="fac-banner__curve" aria-hidden="true" />
      </header>

      {/* Facilities Grid */}
      <div className="fac-content container">
        <div className="fac-grid">
          {facilities.map((item, i) => (
            <TiltCard
              className="fac-card fac-reveal"
              style={{ "--delay": `${i * 0.09}s` }}
              key={item.title}
              data-reveal
            >
              <span className="fac-card__shine" aria-hidden="true" />
              <div className="fac-card__image">
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="fac-card__image-overlay" aria-hidden="true" />
              </div>
              <div className="fac-card__icon">{item.icon}</div>
              <h3 className="fac-card__title">{item.title}</h3>
              <p className="fac-card__text">{item.text}</p>
              <span className="fac-card__edge" aria-hidden="true" />
            </TiltCard>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="fac-cta fac-reveal" data-reveal>
          <span className="fac-cta__glow" aria-hidden="true" />
          <div className="fac-cta__particles" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="fac-cta__particle" style={{ "--si": i }} />
            ))}
          </div>
          <p className="fac-cta__text">
            We provide world-class facilities for the all-round development
            of students.
          </p>
          <FaGraduationCap className="fac-cta__icon" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Facilities;