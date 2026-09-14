import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Staffs from "./components/Staffs";
import Administration from "./components/Administration";
import Facilities from "./components/Facilities";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import Events from "./components/Events";


// SEO Component
function SEO() {
  const location = useLocation();

  useEffect(() => {
    const seoData = {
      "/": {
        title:
          "Theerthapathi Higher Secondary School | Official Website",
        description:
          "Official website of Theerthapathi Higher Secondary School. Explore school information, staff, administration, facilities, events, gallery and contact details.",
      },

      "/about": {
        title:
          "About Theerthapathi Higher Secondary School",
        description:
          "Learn about Theerthapathi Higher Secondary School, its history, vision, mission and educational activities.",
      },

      "/staff": {
        title:
          "Teaching Staff | Theerthapathi Higher Secondary School",
        description:
          "Meet the teaching staff and faculty members of Theerthapathi Higher Secondary School.",
      },

      "/administration": {
        title:
          "School Administration | Theerthapathi Higher Secondary School",
        description:
          "Learn about the administration and leadership of Theerthapathi Higher Secondary School.",
      },

      "/facilities": {
        title:
          "School Facilities | Theerthapathi Higher Secondary School",
        description:
          "Explore the facilities and learning resources available at Theerthapathi Higher Secondary School.",
      },

      "/gallery": {
        title:
          "School Gallery | Theerthapathi Higher Secondary School",
        description:
          "View photos and memorable moments from Theerthapathi Higher Secondary School.",
      },

      "/events": {
        title:
          "School Events | Theerthapathi Higher Secondary School",
        description:
          "Explore events, activities and special programs conducted at Theerthapathi Higher Secondary School.",
      },

      "/contact": {
        title:
          "Contact Theerthapathi Higher Secondary School",
        description:
          "Find contact information and get in touch with Theerthapathi Higher Secondary School.",
      },
    };

    const currentSEO = seoData[location.pathname] || seoData["/"];

    // Change page title
    document.title = currentSEO.title;

    // Change meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      currentSEO.description
    );

    // Canonical URL
    const canonicalURL =
      `https://www.thsschool.com${location.pathname}`;

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalURL);

  }, [location.pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>

      <SEO />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/staff" element={<Staffs />} />
        <Route
          path="/administration"
          element={<Administration />}
        />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;