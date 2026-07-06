import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TeamMember } from "../types";

export default function TeamMemberProfile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/team/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setMember(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load team member profile", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-16 flex items-center justify-center">
        <p className="font-mono text-xs text-neutral-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-16 flex items-center justify-center text-center">
        <div className="space-y-4">
          <p className="font-mono text-sm text-[#B91C1C]">Profile not found.</p>
          <Link to="/about/team" className="text-xs font-bold text-neutral-700 underline uppercase font-mono">
            Return to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id="team-member-profile-page">
      {/* HEADER COMPENSATION */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* COMPACT BREADCRUMB */}
      <nav className="py-6 bg-[#FAF8F5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate("/about/team")}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-[#B91C1C] uppercase tracking-widest focus:outline-none transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Team
          </button>
        </div>
      </nav>

      {/* COMPACT TWO-COLUMN PROFILE */}
      <section className="bg-[#FAF8F5] pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Simple soft portrait without black strokes */}
            <div className="md:col-span-4 max-w-sm mx-auto md:mx-0 w-full">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-zinc-100 shadow-sm">
                <img
                  src={member.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Column: Complete details in a unified stack */}
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#B91C1C] font-semibold uppercase tracking-widest block">
                  {member.title}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] leading-none">
                  {member.name}<span className="text-[#B91C1C]">.</span>
                </h1>
              </div>

              {/* Italic statement / expertise quote */}
              <div className="relative pt-6 border-t border-neutral-200/60">
                <p className="font-serif text-xl sm:text-2xl text-neutral-800 leading-relaxed font-light italic">
                  &ldquo;{member.expertise}&rdquo;
                </p>
              </div>

              {/* Directly inline biography to be extremely compact */}
              <div className="text-neutral-600 leading-relaxed font-serif text-base sm:text-lg space-y-6 pt-4">
                <p>
                  {member.biography}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PERSISTENT STATEMENT BANNER */}
      <section className="bg-neutral-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <h3 className="font-serif text-2xl sm:text-4xl font-light tracking-tight text-white leading-tight">
            Connecting economic rigour to action.
          </h3>
          
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#B91C1C] hover:bg-white hover:text-[#111111] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-500 rounded-full shadow-lg"
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
