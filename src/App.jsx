import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Staffs from "./components/Staffs";
import Administration from "./components/Administration";
import Facilities from "./components/Facilities";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import Events from "./components/Events";


function App() {
 

  return (
    <BrowserRouter>
     
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/staff" element={<Staffs />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
     
    </BrowserRouter>
  );
}

export default App;