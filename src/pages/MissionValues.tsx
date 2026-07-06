import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  BookOpen, 
  Award, 
  ChevronRight,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export default function MissionValues() {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const missionText = "Kathmandu Economics aims to advance evidence-based decision-making. Its mission is to deliver rigorous, independent, and decision-ready research and advisory, equipping governments, development partners, and enterprises to act with clarity, confidence, and accountability.";

  const values = [
    {
      id: "01",
      title: "Analytical Rigour",
      icon: Compass,
      desc: "Every engagement at Kathmandu Economics is held to the standards of contemporary economic science. Models are transparent. Assumptions are stated and tested. Conclusions are proportionate to the evidence. There are no shortcuts, and there is no room for analysis that cannot be defended."
    },
    {
      id: "02",
      title: "Independence",
      icon: ShieldCheck,
      desc: "Kathmandu Economics’ findings follow the evidence and not the agenda. Its analysis is free from institutional pressure, political convenience, or client preference. The value of independent economic advice lies precisely in its unconditional commitment to objectivity. KE is willing to produce findings that are inconvenient. That is the point."
    },
    {
      id: "03",
      title: "Relevance",
      icon: Target,
      desc: "Economic analysis is only valuable if it can be used. KE designs every engagement to be decision-ready, translating complex methodology into clear, contextual insight that directly serves the decisions its clients face."
    },
    {
      id: "04",
      title: "Bespoke Thinking",
      icon: Lightbulb,
      desc: "KE does not apply generic frameworks or repurpose prior work. Each engagement is approached with fresh thinking, purpose-built methods, and genuine intellectual investment in the specific question at hand."
    },
    {
      id: "05",
      title: "Intellectual Integrity",
      icon: BookOpen,
      desc: "KE is frank. Where evidence points away from a preferred conclusion, that is what will be said. Where a question does not admit of a clean answer, the uncertainty will be stated honestly."
    },
    {
      id: "06",
      title: "Impact Beyond Output",
      icon: Award,
      desc: "KE measures success not by the volume of reports delivered, but by the quality of decisions informed, the policies shaped, and the outcomes improved. The purpose of analysis is action. The purpose of action is impact."
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id="mission-values-page">
      {/* HEADER COMPENSATION */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* MISSION HERO HEADER */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-neutral-200/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            
            {/* Left Box: Titles */}
            <div className="lg:col-span-7 space-y-4">
              <ScrollReveal variant="fade-up" duration={0.6}>
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-[#B91C1C]"></span>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B91C1C] font-extrabold">
                    B. MISSION & VALUES
                  </span>
                </div>
              </ScrollReveal>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#111111] leading-none">
                <ScrollReveal variant="words" stagger={0.03}>
                  Mission & values
                </ScrollReveal>
                <span className="text-[#B91C1C]">.</span>
              </h1>
            </div>

            {/* Right Box: Minimal Subtitle description */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-light">
                  The core philosophy, operating models, and scientific criteria that hold us accountable to providing decision-ready independent advice.
                </p>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* PROMINENT PULL-QUOTE MISSION STATEMENT */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left: Giant Typographical Block */}
            <div className="lg:col-span-8 space-y-8">
              <ScrollReveal variant="fade-up" duration={0.6}>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase bg-[#F3EFE6] px-3.5 py-1.5 rounded-full border border-neutral-300/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] animate-pulse" />
                  MISSION STATEMENT
                </div>
              </ScrollReveal>

              {/* High-fashion quote typography */}
              <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-neutral-900">
                <ScrollReveal variant="words" stagger={0.015} delay={0.2}>
                  &ldquo;Kathmandu Economics aims to advance <span className="underline decoration-[#B91C1C] decoration-2 underline-offset-8">evidence-based decision-making</span>. Its mission is to deliver rigorous, independent, and decision-ready research and advisory, equipping governments, development partners, and enterprises to act with clarity, confidence, and accountability.&rdquo;
                </ScrollReveal>
              </blockquote>

              <div className="h-px bg-neutral-200 w-24" />
            </div>

            {/* Right: Architectural Image Frame (Matches True Staging style) */}
            <div className="lg:col-span-4">
              <ScrollReveal variant="fade-up" delay={0.4} duration={0.8}>
                <div className="relative aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] overflow-hidden rounded-[32px] border border-neutral-200/60 shadow-lg bg-zinc-950">
                  <img 
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" 
                    alt="Light architecture design focus"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-6 left-6 text-[10px] font-mono tracking-wider text-white uppercase bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/10 rounded-full">
                    ESTABLISHED INTEGRITY
                  </span>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* OUR VALUES SECTION (ALTERNATING / INTERACTIVE ACCORDION-LIST DESIGN) */}
      <section className="py-24 sm:py-32 bg-[#F3EFE6] border-t border-neutral-300/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Section title */}
          <div className="mb-16 lg:mb-24 space-y-4">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="flex items-center gap-3 text-[#B91C1C]">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em]">ETHICAL MATRIX</span>
              </div>
            </ScrollReveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-950 tracking-tight leading-none">
              <ScrollReveal variant="words" stagger={0.03}>
                Our values
              </ScrollReveal>
              <span className="text-[#B91C1C]">.</span>
            </h2>
          </div>

          {/* Large Interactive List with Alternating side-details instead of standard cards */}
          <div className="space-y-4">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              const isActive = activeValue === idx;

              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveValue(isActive ? null : idx)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={`border-b border-neutral-300/60 pb-8 pt-8 cursor-pointer group transition-all duration-500`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                    
                    {/* Identification & Large Number (Col 2) */}
                    <div className="lg:col-span-2 flex items-center gap-4">
                      <span className="font-mono text-xs text-neutral-400 group-hover:text-[#B91C1C] transition-colors duration-300">
                        {val.id}
                      </span>
                      <div className="p-2 bg-white/60 border border-neutral-200/40 text-neutral-800 rounded-lg group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title (Col 4) */}
                    <div className="lg:col-span-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-900 group-hover:text-[#B91C1C] group-hover:pl-2 transition-all duration-300">
                        {val.title}
                      </h3>
                    </div>

                    {/* Detailed description (Col 6) */}
                    <div className="lg:col-span-6 space-y-2">
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-light group-hover:text-neutral-900 transition-colors duration-300">
                        {val.desc}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PERSISTENT STATEMENT BANNER */}
      <section className="bg-neutral-950 text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-block bg-white/5 border border-white/15 px-4 py-1.5 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-300">
            CONNECT WITH KATHMANDU ECONOMICS
          </div>
          
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Connecting economic rigour to action.
          </h3>
          
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed font-light font-sans">
            Evidence first, method second, conclusion last. Partner with us to address critical economic challenges.
          </p>
          
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#B91C1C] hover:bg-white hover:text-[#111111] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-500 rounded-full shadow-lg"
            >
              Initiate Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
