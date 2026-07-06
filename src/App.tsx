import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MissionValues from "./pages/MissionValues";
import Team from "./pages/Team";
import TeamMemberProfile from "./pages/TeamMemberProfile";
import PracticeArea from "./pages/PracticeArea";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

// ScrollToTop component to reset page scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#FCFAF6] font-sans text-[#111111]" id="app-root-shell">
        {/* Navigation bar */}
        <Header />

        {/* Core page views */}
        <main className="flex-grow" id="main-content-rail">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* About Views */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about/mission-values" element={<MissionValues />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/team/:slug" element={<TeamMemberProfile />} />

            {/* Our Work / Practice Areas */}
            <Route path="/our-work/:areaId" element={<PracticeArea />} />

            {/* Project Dynamic Routing */}
            <Route path="/projects/:slug" element={<ProjectDetail />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Hidden Administrative Control Portal */}
            <Route path="/admin26" element={<Admin />} />
          </Routes>
        </main>

        {/* Institutional footer */}
        <Footer />
      </div>
    </Router>
  );
}
