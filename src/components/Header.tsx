import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"about" | "work" | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (menu: "about" | "work") => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FCFAF6]/95 border-b border-[#E2E8F0] py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <Link to="/" className="flex items-center" id="header-logo-link">
            <Logo size="md" />
          </Link>

          {/* Center / Right Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-tight" id="desktop-nav">
            {/* About Dropdown */}
            <div className="relative group">
              <button
                id="about-menu-btn"
                onClick={() => toggleDropdown("about")}
                onMouseEnter={() => setActiveDropdown("about")}
                className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
                  location.pathname.startsWith("/about") ? "text-[#B91C1C]" : "text-[#374151] hover:text-[#B91C1C]"
                }`}
              >
                About
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "about" && (
                <div
                  id="about-dropdown"
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-2 w-56 bg-[#FCFAF6] border border-[#E2E8F0] shadow-lg rounded-none z-50 p-1 animate-fade-in"
                >
                  <Link
                    to="/about"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold border-b border-[#E5E7EB] last:border-0"
                  >
                    ABOUT US
                  </Link>
                  <Link
                    to="/about/mission-values"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold border-b border-[#E5E7EB] last:border-0"
                  >
                    MISSION & VALUES
                  </Link>
                  <Link
                    to="/about/team"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold last:border-0"
                  >
                    OUR TEAM
                  </Link>
                </div>
              )}
            </div>

            {/* Our Work Dropdown */}
            <div className="relative group">
              <button
                id="work-menu-btn"
                onClick={() => toggleDropdown("work")}
                onMouseEnter={() => setActiveDropdown("work")}
                className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
                  location.pathname.startsWith("/our-work") || location.pathname.startsWith("/projects")
                    ? "text-[#B91C1C]"
                    : "text-[#374151] hover:text-[#B91C1C]"
                }`}
              >
                Our Work
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "work" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "work" && (
                <div
                  id="work-dropdown"
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-2 w-72 bg-[#FCFAF6] border border-[#E2E8F0] shadow-lg rounded-none z-50 p-1"
                >
                  <Link
                    to="/our-work/economic-modelling"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold border-b border-[#E5E7EB]"
                  >
                    ECONOMIC MODELLING
                  </Link>
                  <Link
                    to="/our-work/socioeconomic-impact-assessment"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold border-b border-[#E5E7EB]"
                  >
                    SOCIOECONOMIC IMPACT ASSESSMENT
                  </Link>
                  <Link
                    to="/our-work/economic-financial-advisory"
                    className="block px-4 py-3 text-xs text-[#374151] hover:bg-[#F3F4F6] hover:text-[#B91C1C] font-semibold"
                  >
                    ECONOMIC & FINANCIAL ADVISORY
                  </Link>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`transition-colors ${
                location.pathname === "/contact" ? "text-[#B91C1C]" : "text-[#374151] hover:text-[#B91C1C]"
              }`}
            >
              Contact
            </Link>

            {/* Institutional CTA Link */}
            <Link
              to="/contact"
              className="border border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Request Advisory
            </Link>
          </nav>

          {/* Hamburger Menu Icon (Mobile) */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#374151] hover:text-[#B91C1C] focus:outline-none p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFAF6] border-b border-[#E2E8F0] py-4 px-6 shadow-md" id="mobile-nav">
          <div className="flex flex-col space-y-4">
            {/* About Subsection */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About</div>
              <div className="pl-4 flex flex-col space-y-3 border-l border-red-200">
                <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  About Us
                </Link>
                <Link to="/about/mission-values" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  Mission & Values
                </Link>
                <Link to="/about/team" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  Our Team
                </Link>
              </div>
            </div>

            {/* Our Work Subsection */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Our Work</div>
              <div className="pl-4 flex flex-col space-y-3 border-l border-red-200">
                <Link to="/our-work/economic-modelling" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  Economic Modelling
                </Link>
                <Link to="/our-work/socioeconomic-impact-assessment" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  Socioeconomic Impact Assessment
                </Link>
                <Link to="/our-work/economic-financial-advisory" className="text-sm font-medium text-gray-700 hover:text-[#B91C1C]">
                  Economic & Financial Advisory
                </Link>
              </div>
            </div>

            {/* Other */}
            <div className="pt-2">
              <Link to="/contact" className="block text-sm font-semibold text-gray-700 hover:text-[#B91C1C] py-1">
                Contact Us
              </Link>
            </div>

            <Link
              to="/contact"
              className="block text-center bg-[#B91C1C] text-white py-2 text-xs font-semibold uppercase tracking-wider"
            >
              Request Advisory
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
