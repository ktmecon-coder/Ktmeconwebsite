import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 border-t border-[#333333] pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-1" id="footer-brand-col">
            <Link to="/" className="inline-block mb-4">
              <Logo size="md" showText={true} />
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 mt-4 max-w-sm">
              Kathmandu Economics (KE) is a professional research, quantitative modeling, and strategic advisory firm delivering institutional-quality empirical insights.
            </p>
          </div>

          {/* About Col */}
          <div id="footer-about-col">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-6">About the Firm</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/about/mission-values" className="hover:text-white transition-colors">Mission & Values</Link>
              </li>
              <li>
                <Link to="/about/team" className="hover:text-white transition-colors">Expert Team</Link>
              </li>
            </ul>
          </div>

          {/* Our Work Col */}
          <div id="footer-work-col">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-6">Advisory Practices</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li>
                <Link to="/our-work/economic-modelling" className="hover:text-white transition-colors">Quantitative & Econometric Modelling</Link>
              </li>
              <li>
                <Link to="/our-work/socioeconomic-impact-assessment" className="hover:text-white transition-colors">Socioeconomic Impact Assessment</Link>
              </li>
              <li>
                <Link to="/our-work/economic-financial-advisory" className="hover:text-white transition-colors">Economic & Financial Advisory</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div id="footer-contact-col">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-6">Institutional Inquiries</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Our specialists are ready to address sovereign, regulatory, or organizational research briefs.
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-gray-500 font-mono text-[10px] block">OFFICE</span>
                <span className="text-gray-300 font-medium">Level 4, Corporate Plaza, Kathmandu, Nepal</span>
              </li>
              <li>
                <span className="text-gray-500 font-mono text-[10px] block">COMMUNICATIONS</span>
                <span className="text-gray-300 font-medium">advisory@kathmandueconomics.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Muted lower bar with Administrative Link */}
        <div className="border-t border-[#222222] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" id="footer-lower-bar">
          <div className="text-[10px] font-mono text-gray-600">
            &copy; {new Date().getFullYear()} Kathmandu Economics. All rights reserved. Registered research institution.
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-mono">
            <Link to="/about/team" className="hover:text-white text-gray-600 transition-colors">Registry</Link>
            <Link to="/contact" className="hover:text-white text-gray-600 transition-colors">Legal</Link>
            <Link to="/admin26" className="text-gray-700 hover:text-[#B91C1C] transition-colors border-l border-gray-800 pl-6">
              Administrative Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
