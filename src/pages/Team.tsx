import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Award, Globe, Shield, Star, BookOpen } from "lucide-react";
import { TeamMember } from "../types";
import ScrollReveal from "../components/ScrollReveal";

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTeam(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch team members", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id="team-list-page">
      {/* HEADER COMPENSATION */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* REGISTRY HERO HEADER */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-neutral-200/50 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            
            {/* Left Box: Titles */}
            <div className="lg:col-span-7 space-y-4">
              <ScrollReveal variant="fade-up" duration={0.6}>
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-[#B91C1C]"></span>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B91C1C] font-extrabold">
                    ACADEMIC & ADVISORY REGISTRY
                  </span>
                </div>
              </ScrollReveal>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#111111] leading-none">
                <ScrollReveal variant="words" stagger={0.03}>
                  Our team
                </ScrollReveal>
                <span className="text-[#B91C1C]">.</span>
              </h1>
            </div>

            {/* Right Box: Minimal Subtitle description */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-light font-sans">
                  Drawn from leading doctoral programs and global institutions, our directors combine academic rigour with extensive sovereign advisory experience.
                </p>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* TEAM LISTING SECTION (MODERN ASYMMETRIC PORTRAITS & BIO BLOCKS) */}
      <section className="py-24 bg-[#F4F1EA] border-b border-neutral-300/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {loading ? (
            <div className="text-center py-24 font-mono text-xs text-neutral-400">
              Retrieving Kathmandu Economics faculty records...
            </div>
          ) : (
            <div className="space-y-12" id="team-grid">
              {team.map((member, idx) => {
                const isEven = idx % 2 === 0;
                const isHovered = hoveredId === member.id;

                return (
                  <motion.div
                    key={member.id}
                    onMouseEnter={() => setHoveredId(member.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className={`bg-[#FAF8F5] border border-neutral-200/55 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 items-stretch group`}
                  >
                    
                    {/* Portrait Frame Section (Asymmetrical alternating position) */}
                    <div className={`lg:col-span-4 relative min-h-[400px] bg-neutral-900 overflow-hidden ${
                      isEven ? "lg:order-first" : "lg:order-last border-t lg:border-t-0 lg:border-l border-neutral-200/50"
                    }`}>
                      <img
                        src={member.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent pointer-events-none" />

                      {/* Bottom Image Overlay text */}
                      <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-[#B91C1C] uppercase font-bold">
                          KATHMANDU ECONOMICS
                        </span>
                        <h4 className="font-serif text-lg font-light tracking-wide text-neutral-100">
                          Primary Research Fellow
                        </h4>
                      </div>
                    </div>

                    {/* Detailed Bio / Narrative Section */}
                    <div className="lg:col-span-8 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#FAF8F5]">
                      
                      {/* Top Row: Meta and Title */}
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-extrabold tracking-widest text-neutral-400 uppercase">
                          <span className="text-[#B91C1C] bg-[#F3EFE6] px-3 py-1 rounded-md">
                            {member.title}
                          </span>
                        </div>

                        {/* Name and quotation */}
                        <div className="space-y-4">
                          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-tight group-hover:text-[#B91C1C] transition-colors leading-tight">
                            {member.name}
                          </h2>
                          <p className="font-serif text-lg text-neutral-700 italic border-l-2 border-[#B91C1C]/40 pl-4 leading-relaxed max-w-2xl">
                            &ldquo;{member.expertise}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Center paragraph narrative */}
                      <div className="my-8 text-neutral-500 font-sans text-xs sm:text-sm leading-relaxed max-w-3xl">
                        <p className="line-clamp-3">
                          {member.biography}
                        </p>
                      </div>

                      {/* Bottom Row with action button */}
                      <div className="pt-8 border-t border-neutral-200/60 flex flex-wrap gap-4 items-center justify-end">
                        <Link
                          to={`/team/${member.slug}`}
                          className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-[#B91C1C] text-white px-5 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg group-hover:translate-x-1"
                        >
                          Read Advisory Profile
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

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
            Our approach is consistent across all engagements: evidence first, method second, and conclusion last. Contact us today to collaborate.
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
