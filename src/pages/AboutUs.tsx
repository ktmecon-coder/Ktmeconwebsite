import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Sprout, 
  Globe2, 
  Shuffle, 
  Database,
  Layers,
  ChevronRight,
  Maximize2
} from "lucide-react";
import Lenis from "lenis";
import ScrollReveal from "../components/ScrollReveal";

export default function AboutUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      // Clean up on component unmount
      lenis.destroy();
    };
  }, []);

  const narrative = [
    "Kathmandu Economics (KE) is an independent research and policy advisory firm dedicated to closing the gap between ideas, evidence, and action. KE operates at the intersection of economic rigour and real-world institutional complexity, producing analysis that is both technically sound and practically fit for purpose.",
    "KE's work spans the full spectrum of applied economics. It conducts original academic research involving advanced econometric and economic modelling. It builds bespoke socioeconomic impact frameworks for governments and multilateral agencies seeking to evaluate what policies, investments, and interventions truly cost, and deliver. It provides tailored economic and financial advisory to private sector clients who need decision-grade analysis.",
    "The firm's approach is consistent across all engagements: evidence first, method second, conclusion last. The firm does not arrive at findings in search of supporting analysis. It builds the analysis and follows where it leads.",
    "Kathmandu Economics works with central and provincial governments, multilateral development organisations, international NGOs, development finance institutions, academic institutions, and private enterprises across finance, industry, and infrastructure."
  ];

  const coreAreas = [
    {
      id: "01",
      title: "Economic Policy & Public Finance",
      icon: TrendingUp,
      desc: "Structuring sovereign fiscal pathways and econometric policy models."
    },
    {
      id: "02",
      title: "Evaluation & Impact",
      icon: Sparkles,
      desc: "Quantifying project outcomes with rigorous causal inference and impact frameworks."
    },
    {
      id: "03",
      title: "Agriculture, Climate & Digital Transformation",
      icon: Sprout,
      desc: "Advising on green transition and high-impact digital socioeconomic systems."
    },
    {
      id: "04",
      title: "Political Economy & Development Economics",
      icon: Globe2,
      desc: "Deconstructing institutional complexities to spark resilient structural growth."
    },
    {
      id: "05",
      title: "Governance & Service Design",
      icon: Shuffle,
      desc: "Optimizing institutional mechanisms and high-performing citizen delivery portals."
    },
    {
      id: "06",
      title: "Research Design, Data Systems & Monitoring",
      icon: Database,
      desc: "Engineering dynamic field monitoring mechanisms and reliable data ecosystems."
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id="about-us-page">
      {/* HEADER COMPENSATION */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* SECTION 1: ELEGANT ARCHITECTURAL HERO & NARRATIVE */}
      <section className="py-12 sm:py-20 lg:py-28 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Main Title Header */}
          <div className="mb-12 lg:mb-20 space-y-4">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#B91C1C]"></span>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B91C1C] font-extrabold">
                  WHO WE ARE
                </span>
              </div>
            </ScrollReveal>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-[#111111] leading-none">
              <ScrollReveal variant="words" stagger={0.03}>
                About us
              </ScrollReveal>
              <span className="text-[#B91C1C]">.</span>
            </h1>
          </div>

          {/* Asymmetric Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Box: High-impact Narrative Columns */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Bold Quote Introductory Statement */}
              <ScrollReveal variant="fade-up" duration={0.8}>
                <div className="relative pl-6 border-l-2 border-[#B91C1C] py-2">
                  <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-relaxed font-light italic">
                    &ldquo;Closing the gap between ideas, evidence, and action.&rdquo;
                  </p>
                </div>
              </ScrollReveal>

              {/* Unified Narrative Copy */}
              <div className="space-y-8 font-serif text-lg sm:text-xl text-neutral-700 leading-relaxed font-light">
                {narrative.map((para, pIdx) => (
                  <ScrollReveal key={pIdx} variant="fade-up" delay={pIdx * 0.1} duration={0.8}>
                    <p>{para}</p>
                  </ScrollReveal>
                ))}
              </div>

            </div>

            {/* Right Box: Floating Art Frame & Technical Grid Overlay */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal variant="fade-up" delay={0.2} duration={1}>
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 aspect-[4/5] border border-neutral-200/20">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                    alt="Kathmandu Economics Collaborative Research"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Premium Dark Gradient & Grid Watermark */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  
                  {/* Floating Meta */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] animate-pulse" />
                    <span className="font-mono text-[9px] text-white tracking-widest uppercase">
                      KE PORTFOLIO STUDY
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                    <p className="font-serif text-lg font-light tracking-wide">
                      Evidence first, method second, conclusion last.
                    </p>
                    <span className="text-[10px] font-mono text-neutral-300 tracking-wider block uppercase">
                      KATHMANDU ECONOMICS STUDIO
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Decorative Geometric Block behind image */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F3EFE6] -z-10 rounded-3xl border border-neutral-200/50 hidden sm:block" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CORE AREAS OF WORK (BENTO GRID WITH SHARP TYPOGRAPHIC CONTRAST) */}
      <section className="py-24 sm:py-32 bg-[#F3EFE6] border-t border-b border-neutral-300/30 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="flex items-center gap-3 text-[#B91C1C]">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em]">PRACTICE AREAS</span>
              </div>
            </ScrollReveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-950 tracking-tight leading-none">
              <ScrollReveal variant="words" stagger={0.03}>
                Core Areas of Work
              </ScrollReveal>
              <span className="text-[#B91C1C]">.</span>
            </h2>
            <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
              <p className="text-xs sm:text-sm text-neutral-500 font-sans max-w-xl leading-relaxed">
                Applying rigor, state-of-the-art methodology, and deep institutional insight across public, private, and development pathways.
              </p>
            </ScrollReveal>
          </div>

          {/* Premium Asymmetric Grid Layout (Stagger Animations, No Bullet Points) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreAreas.map((area, idx) => {
              const IconComp = area.icon;
              const isHovered = hoveredIndex === idx;

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.05 }}
                  className="bg-white border border-neutral-200/60 p-8 rounded-3xl relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group min-h-[300px]"
                >
                  {/* Background interactive animation block */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF8F5] via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-center">
                      <div className="p-4 bg-neutral-50 border border-neutral-100 text-neutral-800 rounded-2xl group-hover:bg-[#111111] group-hover:text-white transition-all duration-500 shadow-sm">
                        <IconComp className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                      
                      {/* Premium Accent Dot / Number */}
                      <span className="font-mono text-xs font-black text-neutral-300 group-hover:text-[#B91C1C] transition-colors duration-500 tracking-widest">
                        {area.id}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 tracking-tight group-hover:text-[#B91C1C] transition-colors duration-300 leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-700 transition-colors duration-300 leading-relaxed font-sans font-light">
                        {area.desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer Line with Interactive Shift */}
                  <div className="pt-6 mt-8 border-t border-neutral-100/60 flex justify-between items-center relative z-10">
                    <span className="text-[9px] font-mono font-bold text-neutral-400 group-hover:text-neutral-600 transition-colors uppercase tracking-widest">
                      DISCIPLINE STUDY
                    </span>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#111111] transition-colors" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM SECTION: ELEGANT NAVIGATION CONTINUATION (NEXT / PREVIOUS) */}
      <section className="border-t border-b border-neutral-200/80 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">
          
          {/* Card 1: Mission & Values */}
          <Link 
            to="/about/mission-values" 
            className="group p-10 sm:p-14 lg:p-20 flex flex-col justify-between hover:bg-[#F3EFE6]/30 transition-all duration-500 ease-in-out min-h-[280px] md:min-h-[340px]"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase block">
                CONTINUE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 group-hover:text-[#B91C1C] transition-colors duration-300 leading-tight">
                Mission &amp; Values
              </h3>
              <p className="font-serif text-neutral-500 text-sm sm:text-base leading-relaxed font-light max-w-md pt-1">
                The mission that anchors the firm &mdash; and the operating values that shape every engagement.
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#B91C1C] transition-all duration-300">
              <span>READ MORE</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </Link>

          {/* Card 2: The Team */}
          <Link 
            to="/about/team" 
            className="group p-10 sm:p-14 lg:p-20 flex flex-col justify-between hover:bg-[#F3EFE6]/30 transition-all duration-500 ease-in-out min-h-[280px] md:min-h-[340px]"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#B91C1C] font-extrabold uppercase block">
                CONTINUE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 group-hover:text-[#B91C1C] transition-colors duration-300 leading-tight">
                The Team
              </h3>
              <p className="font-serif text-neutral-500 text-sm sm:text-base leading-relaxed font-light max-w-md pt-1">
                Scholarship, institutional experience, and methodological discipline &mdash; meet the people behind the evidence.
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#B91C1C] transition-all duration-300">
              <span>MEET THE TEAM</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </Link>

        </div>
      </section>

      {/* SECTION 3: STATEMENT CALLOUT BAR */}
      <section className="bg-neutral-950 text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="inline-block bg-white/5 border border-white/15 px-4 py-1.5 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-300">
              CONNECT WITH KATHMANDU ECONOMICS
            </div>
          </ScrollReveal>
          
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-tight">
            <ScrollReveal variant="words" stagger={0.03}>
              Connecting economic rigour to real-world institutional complexity.
            </ScrollReveal>
          </h3>
          
          <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed font-light font-sans">
              Evidence first, method second, conclusion last. Partner with us to address critical economic challenges.
            </p>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.4} duration={0.6}>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#B91C1C] hover:bg-white hover:text-[#111111] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-500 rounded-full shadow-lg"
              >
                Initiate Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
