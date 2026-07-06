import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Tag, Globe, ArrowRight } from "lucide-react";
import { Project } from "../types";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        // Load other projects to filter for related ones
        return fetch("/api/projects");
      })
      .then((res) => res.json())
      .then((allProjects) => {
        if (Array.isArray(allProjects) && project) {
          // Filter out the current project, and keep projects from the same practice area or just take any other 2
          const filtered = allProjects
            .filter((p) => p.slug !== slug)
            .slice(0, 2);
          setRelated(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load project details", err);
        setLoading(false);
      });
  }, [slug, project?.id]);

  if (loading) {
    return (
      <div className="bg-[#FCFAF6] min-h-screen pt-32 pb-16 flex items-center justify-center">
        <p className="font-mono text-xs text-gray-400">Retrieving academic research report and empirical metrics...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-[#FCFAF6] min-h-screen pt-32 pb-16 flex items-center justify-center text-center">
        <div className="space-y-4">
          <p className="font-mono text-sm text-[#B91C1C]">Research report registry record not found.</p>
          <Link to="/our-work/economic-modelling" className="text-xs font-bold text-gray-700 underline uppercase font-mono">
            Return to Core Practices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF6] text-[#111111]" id="project-detail-page">
      {/* 1. ACADEMIC HEADER & TITLE */}
      <section className="bg-[#F2EFE9] pt-32 pb-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-[#B91C1C] uppercase tracking-wider mb-8 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to previous page
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-2.5 py-1 bg-[#B91C1C] text-white uppercase font-bold tracking-widest text-[9px]">
                {project.practice_area.replace("-", " ")}
              </span>
              <span className="text-gray-400">|</span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                REPORT STATUS: <span className="font-bold text-[#111111]">{project.status.toUpperCase()}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] leading-tight tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 font-serif italic border-l-2 border-[#B91C1C] pl-4 max-w-3xl pt-2">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN PUBLICATION BODY (Brookings / OECD layout) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column (Long-form content) */}
            <div className="lg:col-span-8 space-y-16" id="project-publication-body">
              
              {/* Optional Hero Image representing the layout */}
              <div className="border border-[#E2E8F0] p-2 bg-white shadow-md">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-[400px] object-cover filter grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-2 text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest">
                  PLATE 12 // DOCUMENTATION CAPTURE FOR PUBLIC REGISTRY
                </div>
              </div>

              {/* SECTION: Overview / Brief */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#111111] border-b border-gray-200 pb-2">
                  Executive Brief
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif space-y-4">
                  <p>{project.content || "This study forms part of Kathmandu Economics' ongoing advisory deployments, evaluating structural constraints, regional multipliers, and causal impacts."}</p>
                </div>
              </div>

              {/* SECTION: Challenge */}
              <div className="space-y-4 border-t border-gray-200 pt-10">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#111111]">
                  The Economic Challenge
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif">
                  <p>{project.challenge}</p>
                </div>
              </div>

              {/* SECTION: Methodology */}
              <div className="space-y-4 border-t border-gray-200 pt-10">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#111111]">
                  Methodological Framework
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif bg-[#FCFAF6] border-l-4 border-[#B91C1C] p-6 shadow-sm">
                  <p>{project.methodology}</p>
                </div>
              </div>

              {/* SECTION: Findings */}
              <div className="space-y-4 border-t border-gray-200 pt-10">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#111111]">
                  Key Empirical Findings
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif">
                  <p>{project.findings}</p>
                </div>
              </div>

              {/* SECTION: Impact */}
              <div className="space-y-4 border-t border-gray-200 pt-10">
                <h2 className="font-serif text-xl sm:text-2xl font-black text-[#111111]">
                  Policy & Sovereign Impact
                </h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed font-serif">
                  <p>{project.impact}</p>
                </div>
              </div>

            </div>

            {/* Right Meta Column (OECD / IMF style sidebar) */}
            <div className="lg:col-span-4" id="project-metadata-sidebar">
              <div className="bg-white border border-[#E2E8F0] p-8 space-y-8 sticky top-28 shadow-sm">
                
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-[#B91C1C]">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest">PUBLISHING AGENCY</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    Kathmandu Economics Advisory & Research Lab
                  </p>
                </div>

                <div className="space-y-4 pb-6 border-b border-gray-100">
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">PUBLICATION SPECS</h4>
                  <ul className="space-y-2 text-xs font-mono">
                    <li className="flex justify-between">
                      <span className="text-gray-400">REGISTRY:</span>
                      <span className="font-bold text-gray-800">KE-REP-{project.id.toUpperCase()}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">STATUS:</span>
                      <span className="font-bold text-green-700">{project.status}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">PRACTICE AREA:</span>
                      <span className="font-bold text-gray-800 uppercase text-[9px]">{project.practice_area.replace("-", " ")}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">METHOD PROTOCOL</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    This analysis was designed, simulated, and audited to align with the highest standards of international development practices.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. RELATED PROJECTS (Every project card must be fully clickable and navigate) */}
      {related.length > 0 && (
        <section className="py-20 bg-[#F9F6F0] border-t border-[#E2E8F0]" id="related-publications">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#111111] mb-10 border-b border-gray-200 pb-4">
              Related Sectorial Studies & Publications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="bg-white border border-[#E2E8F0] hover:border-[#B91C1C] p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
                  id={`related-project-card-${p.slug}`}
                >
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase block mb-1">
                      {p.practice_area.replace("-", " ")}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#111111] group-hover:text-[#B91C1C] transition-colors mb-2 line-clamp-1">
                      {p.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {p.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-gray-400 group-hover:text-[#B91C1C] transition-colors">
                    <span>EXPLORE EVIDENCE BASE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CONTACT CTA */}
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-mono uppercase tracking-widest">
            COMMISSION SIMILAR AUDIT
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Connect with our Economists
          </h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            Interested in modeling or socioeconomic appraisal of this level of precision for your ministry, institution, or project? Get in touch with our team.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#B91C1C] hover:bg-[#9E0113] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Request Research Briefing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
