import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Target, 
  Award, 
  BookOpen, 
  Sparkles, 
  Database, 
  Cpu, 
  LineChart, 
  Layers, 
  CheckCircle2,
  Users,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Sliders
} from "lucide-react";
import { motion } from "motion/react";
import Lenis from "lenis";
import { Project, TeamMember } from "../types";
import ScrollReveal from "../components/ScrollReveal";
import InteractiveAdvisoryShowcase from "../components/InteractiveAdvisoryShowcase";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activeValue, setActiveValue] = useState<number | null>(0);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState<number>(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Live clock for the masthead
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    // Fetch dynamic project dispatches
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data.filter((p) => p.featured).slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to load projects", err));

    // Fetch elite board members
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTeam(data.slice(0, 3)); // Display top 3
        }
      })
      .catch((err) => console.error("Failed to load team", err));

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (team.length > 0) {
      setMobileSlideIndex((prev) => (prev + 1) % team.length);
    }
  };

  const handlePrev = () => {
    if (team.length > 0) {
      setMobileSlideIndex((prev) => (prev - 1 + team.length) % team.length);
    }
  };

  const values = [
    {
      id: "01",
      title: "Analytical Rigour",
      icon: Compass,
      desc: "Every engagement is held to the standards of contemporary economic science. Models are fully transparent. Assumptions are stated and tested. Conclusions are strictly proportionate to the empirical evidence."
    },
    {
      id: "02",
      title: "Absolute Independence",
      icon: ShieldCheck,
      desc: "Our findings follow the evidence, never the agenda. Free from institutional pressure or political convenience, our advisory is unconditionally committed to scientific objectivity."
    },
    {
      id: "03",
      title: "Contextual Relevance",
      icon: Target,
      desc: "Economic analysis is only valuable if it can be deployed. We translate complex econometric methodology into clear, contextual insights that directly inform high-level decisions."
    },
    {
      id: "04",
      title: "Bespoke Methodology",
      icon: Cpu,
      desc: "We do not apply generic, outsourced templates. Each project is approached with custom models, genuine intellectual investment, and deep local parameterization."
    }
  ];

  return (
    <div className="bg-[#FCFAF6] text-[#111111] font-sans overflow-x-hidden" id="home-page-root">
      
      {/* 1. HERO LANDING WITH LIGHT MOUNTAIN PHOTO BACKGROUND, HERO TEXT, AND CTA */}
      <section 
        id="home-hero-showcase" 
        className="relative min-h-screen flex flex-col justify-between pt-24 pb-16 overflow-hidden bg-[#FAF8F5] text-[#111111]"
      >
        {/* Atmospheric light photo background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-15 filter grayscale contrast-[0.85] scale-105"
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
            alt="Kathmandu valley mountain panorama"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette and color overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-transparent to-[#FCFAF6]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.02)_0%,transparent_70%)]" />
          {/* Precision guidelines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>



        {/* Hero Central Grid */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 w-full mt-auto mb-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            {/* Left Portion: Heading text & Badges */}
            <div className="lg:col-span-12 space-y-6">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#111111] leading-[1.05] tracking-tight max-w-[1350px]">
                <ScrollReveal variant="words" stagger={0.03}>
                  Rigorous Economic Analysis. Transformative Policy Design
                </ScrollReveal>
                <span className="text-[#B91C1C] font-semibold">.</span>
              </h1>
            </div>

            {/* Bottom Left: Paragraph description */}
            <div className="lg:col-span-7">
              <ScrollReveal variant="fade-up" delay={0.3} duration={0.7}>
                <p className="font-serif text-neutral-600 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                  Kathmandu Economics (KE) is a premier research and advisory firm providing quantitative modelling, socioeconomic impact assessments, and independent financial advisory to governments and international institutions.
                </p>
              </ScrollReveal>
            </div>

            {/* Bottom Right: Clean Premium Call-to-actions */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
              <ScrollReveal variant="fade-up" delay={0.5} duration={0.7}>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Link
                    to="/our-work/economic-modelling"
                    className="bg-[#B91C1C] hover:bg-[#9E0113] text-white px-8 py-5 text-xs font-mono font-bold uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2.5 rounded-lg shadow-lg group"
                  >
                    Our Practices
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-[#111111]/30 text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] px-8 py-5 text-xs font-mono font-bold uppercase tracking-widest text-center transition-all duration-300 rounded-lg"
                  >
                    Brief Our Advisors
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US WITH IMAGE - AS REQUESTED BY USER */}
      <section id="home-about-section" className="py-24 sm:py-32 bg-white relative border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-8">
              <ScrollReveal variant="fade-up" duration={0.6}>
                <div className="space-y-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase block">
                    ABOUT
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] leading-[1.12] tracking-tight">
                    Kathmandu Economics is an independent research and policy advisory firm dedicated to closing the gap between <span className="italic font-serif text-[#B91C1C]">ideas, evidence, and action</span>.
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.2} duration={0.7}>
                <p className="text-neutral-600 font-serif font-light text-base sm:text-lg leading-relaxed">
                  We work at the intersection of academic scholarship and institutional practice — producing analysis that is technically defensible, decision-ready, and unflinchingly independent.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.3} duration={0.8}>
                <div>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#B91C1C] hover:text-[#9E0113] group"
                  >
                    LEARN MORE
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Relevant Image */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="fade-up" delay={0.2} duration={0.8}>
                <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-sm rounded-none">
                  <img
                    src="https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1200&auto=format&fit=crop"
                    alt="Kathmandu Economics academic library and research facility"
                    className="w-full h-full object-cover filter grayscale contrast-125 saturate-150 transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* 2.25 WHAT DEFINES KATHMANDU ECONOMICS (VALUES GRID SECTION) */}
      <section id="home-values-grid-section" className="py-24 sm:py-32 bg-[#FCFAF6] border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          {/* Header */}
          <div className="mb-16">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B91C1C] rounded-full" />
                  <span className="text-[11px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase">
                    VALUES
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] leading-[1.12] tracking-tight max-w-4xl">
                  What defines <span className="italic font-serif text-[#B91C1C]">Kathmandu Economics</span>.
                </h2>
              </div>
            </ScrollReveal>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200/60">
            {[
              {
                id: "01",
                title: "Analytical Rigour",
                desc: "Methodologies that withstand scrutiny — from peer review to public debate."
              },
              {
                id: "02",
                title: "Independence",
                desc: "Conclusions follow evidence, never the convenience of the brief."
              },
              {
                id: "03",
                title: "Relevance",
                desc: "Research designed for the decisions actually being made."
              },
              {
                id: "04",
                title: "Bespoke Thinking",
                desc: "Frameworks built for the question, not retrieved from a shelf."
              },
              {
                id: "05",
                title: "Intellectual Integrity",
                desc: "We say what the data supports — including what it does not."
              },
              {
                id: "06",
                title: "Impact Beyond Output",
                desc: "Work measured by the decisions it changes, not the pages it fills."
              }
            ].map((val, idx) => {
              let borderClasses = "border-neutral-200/60 ";
              if (idx !== 5) {
                borderClasses += "border-b ";
              }
              if (idx % 3 !== 2) {
                borderClasses += "md:border-r ";
              }
              if (idx >= 3) {
                borderClasses += "md:border-b-0 ";
              } else {
                borderClasses += "md:border-b ";
              }

              return (
                <ScrollReveal 
                  key={val.id} 
                  variant="fade-up" 
                  delay={idx * 0.05} 
                  duration={0.6}
                  className={`${borderClasses} h-full`}
                >
                  <Link
                    to="/about/mission-values"
                    className="p-8 sm:p-12 xl:p-14 flex flex-col justify-start space-y-5 transition-all duration-300 hover:bg-[#F5F2EC] group h-full w-full"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B91C1C]">
                      <span>—</span>
                      <span>{val.id}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#111111] group-hover:text-[#B91C1C] transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-sm font-serif font-light text-neutral-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2.5 OUR WORK SECTION (DARK THEMED) */}
      <section id="home-our-work-section" className="py-24 sm:py-32 bg-[#0A0A0A] text-white relative overflow-hidden border-b border-neutral-900">
        
        {/* Subtle aesthetic background architectural pattern */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.05] mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            alt="Subtle abstract architectural background texture"
            className="w-full h-full object-cover filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Gradients to smooth and anchor edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.06)_0%,transparent_80%)] z-0" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-12 border-b border-neutral-900">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase block">
                PRACTICE
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl font-light text-white tracking-tight">
                Our Work
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-neutral-400 font-serif font-light text-base sm:text-lg leading-relaxed max-w-lg lg:text-right lg:ml-auto">
                Three interconnected practice areas, anchored in the same foundation of methodological rigour and institutional understanding.
              </p>
            </div>
          </div>

          {/* Cards Grid with lines ONLY between the cards, and RED only on hover */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            
            {/* Practice 01 */}
            <Link 
              to="/our-work/economic-modelling"
              className="p-8 sm:p-12 xl:p-16 flex flex-col justify-start min-h-[420px] transition-all duration-500 ease-in-out group relative hover:bg-[#B91C1C] border-b lg:border-b-0 lg:border-r border-neutral-800/60"
            >
              <div className="flex items-center justify-between w-full mb-10 lg:mb-14">
                <span className="text-sm font-mono font-bold text-[#B91C1C] group-hover:text-white/85 transition-colors duration-300">
                  01
                </span>
                <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight text-white min-h-[80px] sm:min-h-[90px] lg:min-h-[120px] xl:min-h-[100px] mb-6">
                Economic Modelling &<br />Quantitative Research
              </h3>
              <p className="text-sm font-serif font-light leading-relaxed text-neutral-400 group-hover:text-white/90 transition-colors duration-300">
                Original economic and econometric research. Causal inference. Experimental design. Data systems. Built to the standards of academic scholarship and institutional decision-making.
              </p>
            </Link>

            {/* Practice 02 */}
            <Link 
              to="/our-work/socioeconomic-impact"
              className="p-8 sm:p-12 xl:p-16 flex flex-col justify-start min-h-[420px] transition-all duration-500 ease-in-out group relative hover:bg-[#B91C1C] border-b lg:border-b-0 lg:border-r border-neutral-800/60"
            >
              <div className="flex items-center justify-between w-full mb-10 lg:mb-14">
                <span className="text-sm font-mono font-bold text-[#B91C1C] group-hover:text-white/85 transition-colors duration-300">
                  02
                </span>
                <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight text-white min-h-[80px] sm:min-h-[90px] lg:min-h-[120px] xl:min-h-[100px] mb-6">
                Socioeconomic Impact<br />Assessment
              </h3>
              <p className="text-sm font-serif font-light leading-relaxed text-neutral-400 group-hover:text-white/90 transition-colors duration-300">
                Bespoke analytical frameworks to quantify the economic and social consequences of policies, investments, and regulatory decisions.
              </p>
            </Link>

            {/* Practice 03 */}
            <Link 
              to="/our-work/financial-advisory"
              className="p-8 sm:p-12 xl:p-16 flex flex-col justify-start min-h-[420px] transition-all duration-500 ease-in-out group relative hover:bg-[#B91C1C]"
            >
              <div className="flex items-center justify-between w-full mb-10 lg:mb-14">
                <span className="text-sm font-mono font-bold text-[#B91C1C] group-hover:text-white/85 transition-colors duration-300">
                  03
                </span>
                <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight text-white min-h-[80px] sm:min-h-[90px] lg:min-h-[120px] xl:min-h-[100px] mb-6">
                Economic & Financial<br />Advisory
              </h3>
              <p className="text-sm font-serif font-light leading-relaxed text-neutral-400 group-hover:text-white/90 transition-colors duration-300">
                Economic and financial rigour applied to business, investment, regulation, risk analysis, and strategic decision-making.
              </p>
            </Link>

          </div>

        </div>
      </section>

      {/* 3. FEATURED WORKS */}
      <section id="home-featured-works" className="py-28 sm:py-36 bg-[#151311] text-white border-b border-[#221E1B]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          {/* Section Header */}
          <div className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-12 sm:mb-16">
            FEATURED WORK
          </div>

          {/* Featured Project Split Layout */}
          {projects.length > 0 ? (() => {
            const featuredProject = projects[0];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left Side: Large landscape image frame */}
                <div className="lg:col-span-7">
                  <ScrollReveal variant="fade-up" duration={0.8}>
                    <Link to={`/projects/${featuredProject.slug}`} className="block group">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#1E1A17] border border-[#2D2622]">
                        <img
                          src={featuredProject.featured_image}
                          alt={featuredProject.title}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle dark vignette overlay */}
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>

                {/* Right Side: High contrast minimal serif details */}
                <div className="lg:col-span-5">
                  <ScrollReveal variant="fade-up" delay={0.15} duration={0.8}>
                    <div className="space-y-6 lg:space-y-8">
                      {/* Metadata */}
                      <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-400 uppercase flex flex-wrap gap-2 items-center">
                        <span>CONFIDENTIAL</span>
                        <span className="text-neutral-700">—</span>
                        <span>{featuredProject.practice_area.replace("-", " ").toUpperCase()}</span>
                        <span className="text-neutral-700">·</span>
                        <span>NEPAL</span>
                        <span className="text-neutral-700">·</span>
                        <span>{new Date().getFullYear()}</span>
                      </div>

                      {/* Heading */}
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.15] tracking-tight">
                        {featuredProject.title}
                      </h3>

                      {/* Summary */}
                      <p className="font-serif text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-lg">
                        {featuredProject.summary}
                      </p>

                      {/* Elegant Underlined Link */}
                      <div className="pt-2">
                        <Link
                          to={`/projects/${featuredProject.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white hover:text-[#B91C1C] pb-2 border-b-2 border-white/20 hover:border-[#B91C1C] transition-all duration-300 group"
                        >
                          READ THE ENGAGEMENT
                          <span className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })() : (
            // Dynamic Seeding fallback
            <div className="py-24 text-center border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50">
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Loading featured work from the economic research database...</p>
            </div>
          )}

        </div>
      </section>

      {/* 4. ACADEMIC & ADVISORY TEAM */}
      <section id="home-team-section" className="py-24 sm:py-32 bg-[#FCFAF6] border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          
          {/* Header */}
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-neutral-200/60">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase block">
                TEAM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] leading-tight tracking-tight">
                Leadership and research team
              </h2>
            </div>
            
            <div className="flex items-center">
              <Link
                to="/about/team"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#B91C1C] hover:text-[#9E0113] transition-colors duration-300 whitespace-nowrap group"
              >
                View All Team
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Desktop creative grid layout */}
          <div className="hidden lg:grid grid-cols-3 gap-8 items-stretch">
            {team.length > 0 ? (
              team.slice(0, 3).map((member) => (
                <div 
                  key={member.id}
                  className="bg-white border border-neutral-200/80 rounded-[24px] overflow-hidden flex flex-col justify-between hover:border-[#B91C1C] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
                >
                  {/* Image portion with filter */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Content body */}
                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 group-hover:text-[#B91C1C] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest font-semibold group-hover:text-[#B91C1C]/80 transition-colors duration-300">
                        {member.title}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/team/${member.slug}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-[#B91C1C] transition-colors duration-300"
                      >
                        Read Profile
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center text-xs font-mono text-neutral-400 bg-white border border-neutral-200 rounded-[32px]">
                Loading faculty profiles...
              </div>
            )}
          </div>

          {/* Mobile responsive carousel layout */}
          <div className="block lg:hidden">
            {team.length > 0 && team[mobileSlideIndex] ? (
              <div className="relative">
                {/* Carousel Card Slider */}
                <div className="bg-white border border-neutral-200 rounded-[28px] overflow-hidden flex flex-col shadow-md relative min-h-[440px] group">
                  {/* Slide Image */}
                  <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={team[mobileSlideIndex].photo_url}
                      alt={team[mobileSlideIndex].name}
                      className="w-full h-full object-cover filter grayscale"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Aesthetic Navigation Buttons inside the carousel image area */}
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md hover:bg-[#B91C1C] hover:text-white text-neutral-800 border border-neutral-200/40 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 active:scale-90"
                      aria-label="Previous profile"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md hover:bg-[#B91C1C] hover:text-white text-neutral-800 border border-neutral-200/40 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 active:scale-90"
                      aria-label="Next profile"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content (Just name and position) */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900">
                        {team[mobileSlideIndex].name}
                      </h3>
                      <p className="text-xs font-mono text-[#B91C1C] uppercase tracking-widest font-semibold">
                        {team[mobileSlideIndex].title}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                      <Link
                        to={`/team/${team[mobileSlideIndex].slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-[#B91C1C] transition-colors duration-200"
                      >
                        Read Profile
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      
                      {/* Indicators inside the card */}
                      <div className="flex items-center gap-1.5">
                        {team.slice(0, 3).map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setMobileSlideIndex(dotIdx)}
                            className={`transition-all duration-300 h-1 rounded-full ${
                              mobileSlideIndex === dotIdx ? "w-4 bg-[#B91C1C]" : "w-1 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-xs font-mono text-neutral-400 bg-white border border-neutral-200 rounded-[32px]">
                Loading faculty profiles...
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Embedded interactive sandbox within featured works context */}
      <InteractiveAdvisoryShowcase />

      {/* 5. ENGAGEMENT PROTOCOL LEAD-IN (CTA FOR GLOBAL FOOTER) */}
      <section id="home-engagement-section" className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-12 text-center z-10 space-y-12">
          <div className="space-y-4">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-mono uppercase tracking-[0.2em] rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]"></span>
                Advisory Consultation Protocol
              </div>
            </ScrollReveal>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight max-w-3xl mx-auto leading-tight">
              Brief Our Economists On Your Policy Objectives
            </h2>

            <p className="text-neutral-400 font-serif font-light text-xs sm:text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
              Kathmandu Economics delivers customized quantitative forecasting models, regulatory utility pricing calculators, and independent causal field evaluations tailored to state institutions and multinational lenders.
            </p>
          </div>

          <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#B91C1C] hover:bg-[#9E0113] text-white px-8 py-4.5 text-xs font-mono font-bold uppercase tracking-widest w-full sm:w-auto transition-all duration-300 text-center rounded-lg shadow-lg"
              >
                Initiate Consultation Protocol
              </Link>
              <Link
                to="/about"
                className="border border-neutral-700 text-neutral-300 hover:text-white hover:border-white px-8 py-4.5 text-xs font-mono font-bold uppercase tracking-widest w-full sm:w-auto transition-all duration-300 text-center rounded-lg"
              >
                Institutional Profile
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
