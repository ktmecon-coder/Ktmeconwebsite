import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Project } from "../types";
import ScrollReveal from "../components/ScrollReveal";
import InteractiveAdvisoryShowcase from "../components/InteractiveAdvisoryShowcase";
import { DB } from "../supabaseService";

const getAsymmetricCardClasses = (idx: number) => {
  const pattern = idx % 5; // Clean 5-item asymmetrical loop
  switch (pattern) {
    case 0:
      // Featured Landscape (Left-Heavy)
      return {
        colSpan: "md:col-span-12 lg:col-span-8",
        layout: "flex flex-col lg:flex-row gap-8 lg:items-center w-full",
        imgSize: "w-full lg:w-1/2 aspect-[16/10] lg:aspect-[4/3] shrink-0",
        contentSize: "w-full flex-1",
      };
    case 1:
      // Standard Portrait
      return {
        colSpan: "md:col-span-6 lg:col-span-4",
        layout: "flex flex-col gap-6 w-full",
        imgSize: "w-full aspect-[16/10]",
        contentSize: "w-full",
      };
    case 2:
      // Standard Portrait
      return {
        colSpan: "md:col-span-6 lg:col-span-4",
        layout: "flex flex-col gap-6 w-full",
        imgSize: "w-full aspect-[16/10]",
        contentSize: "w-full",
      };
    case 3:
      // Featured Landscape (Right-Heavy)
      return {
        colSpan: "md:col-span-12 lg:col-span-8",
        layout: "flex flex-col lg:flex-row-reverse gap-8 lg:items-center w-full",
        imgSize: "w-full lg:w-1/2 aspect-[16/10] lg:aspect-[4/3] shrink-0",
        contentSize: "w-full flex-1",
      };
    case 4:
      // Full Width Centerpiece / Dramatic Callout (12 columns)
      return {
        colSpan: "md:col-span-12",
        layout: "flex flex-col lg:flex-row gap-10 lg:items-center w-full",
        imgSize: "w-full lg:w-1/2 aspect-[16/10] lg:aspect-[21/9] shrink-0",
        contentSize: "w-full flex-1",
      };
    default:
      return {
        colSpan: "md:col-span-6 lg:col-span-4",
        layout: "flex flex-col gap-6 w-full",
        imgSize: "w-full aspect-[16/10]",
        contentSize: "w-full",
      };
  }
};

interface PracticeAreaData {
  title: string;
  primaryTagline: string;
  heroSubtext: string;
  narrativeImage: string;
  narrativeParagraphs: string[];
  delivers: Array<{
    num: string;
    category: string;
    title: string;
    description: string;
  }>;
}

const practiceAreaConfigs: Record<string, PracticeAreaData> = {
  "economic-modelling": {
    title: "Economic Modelling & Quantitative Research",
    primaryTagline: "Practice Division",
    heroSubtext: "Economic decisions of consequence require evidence of consequence. Kathmandu Economics conducts original, rigorous quantitative research, producing analysis that holds up under scrutiny from governments, peer reviewers, and institutional funders alike.",
    narrativeImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    narrativeParagraphs: [
      "KE's economic modelling and quantitative research practice operates at the frontier of applied economic methodology. The work ranges from structural macroeconomic modelling and advanced econometrics to causal inference, randomised experimentation, and data-driven analysis. It is research designed to answer hard questions: not what correlates, but what causes; not what the data shows, but what it means.",
      "Kathmandu Economics operates at the intersection of academic scholarship and institutional practice. Its research meets the standards of peer-reviewed publication while remaining oriented toward real-world policy and market questions. This dual orientation, rigorous enough for academic scrutiny, relevant enough to inform decisions, is what defines KE's quantitative practice.",
      "KE does not outsource intellectual judgement. Its researchers are involved at every stage, from question formulation and research design through data collection, modelling, and interpretation. The result is analysis with a clear, accountable chain of reasoning from evidence to conclusion."
    ],
    delivers: [
      {
        num: "01",
        category: "RESEARCH",
        title: "Original Economic Research",
        description: "KE conducts independent research in development economics, political economy, public finance, agricultural economics, and related fields. Its research is designed to contribute to knowledge and inform policy simultaneously."
      },
      {
        num: "02",
        category: "ESTIMATION",
        title: "Econometric Modelling",
        description: "KE builds and estimates econometric models appropriate to the question at hand: panel data, time series, instrumental variables, regression discontinuity, difference-in-differences, and synthetic control methods among them. Models are specified with care, estimated with precision, and interpreted with intellectual honesty."
      },
      {
        num: "03",
        category: "IDENTIFICATION",
        title: "Causal Impact Estimation",
        description: "KE applies rigorous identification strategies to isolate causal effects from correlation and confounding. Where experimental methods are feasible, KE designs and executes them. Where they are not, KE deploys the strongest available quasi-experimental approach."
      },
      {
        num: "04",
        category: "PROTOCOL",
        title: "Research Design",
        description: "KE designs research programmes from the ground up: sampling frameworks, measurement strategies, survey instruments, experimental protocols, pre-registration documentation, and quality assurance systems. Strong inference begins with strong design."
      },
      {
        num: "05",
        category: "SYSTEMS",
        title: "Data Systems & Analytics",
        description: "KE builds and manages data systems for research, programme monitoring, and institutional use. This includes survey design and administration, administrative data linkage, analytical dashboards, and data infrastructure for organisations that need to move from raw data to usable insight."
      }
    ]
  },
  "socioeconomic-impact-assessment": {
    title: "Socioeconomic Impact Assessment",
    primaryTagline: "Quantify What Decisions Truly Cost, and Deliver.",
    heroSubtext: "Every significant policy, investment, or regulatory decision has consequences that extend well beyond the balance sheet. Kathmandu Economics builds the rigorous analytical frameworks to make those consequences visible, measurable, and comparable.",
    narrativeImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    narrativeParagraphs: [
      "KE's Socioeconomic Impact Assessment (SEIA) practice develops bespoke analytical models to evaluate the economic and social consequences of proposed or enacted policies, public investments, development programmes, and regulatory changes.",
      "These are not off-the-shelf templates or repurposed frameworks. Each model is designed from first principles, grounded in economic theory, calibrated to the institutional and national context, and structured to answer the specific question the client needs answered. The result is analysis that is technically defensible, publicly accountable, and built to serve real decisions.",
      "KE's SEIA work is particularly valuable where conventional financial appraisal is insufficient, and where the full value of an intervention (or the full cost of inaction) is distributed across households, communities, labour markets, and public systems in ways that standard financial analysis will not capture. These are precisely the situations in which the quality of economic analysis matters most, and where the consequences of poor analysis are most consequential.",
      "KE's models are built to be transparent, auditable, and robustly defensible under scrutiny from technical reviewers, oversight bodies, multilateral institutions, and the public."
    ],
    delivers: [
      {
        num: "01",
        category: "POLICY",
        title: "Policy Impact Assessment",
        description: "KE quantifies the distributional, fiscal, and social consequences of proposed or enacted policy reforms — including subsidy restructuring, taxation and tariff changes, trade policy, labour market regulation, and social protection programmes. Analysis addresses not only aggregate welfare effects but their distribution: who bears the costs, who captures the benefits, and how those effects evolve over time."
      },
      {
        num: "02",
        category: "APPRAISAL",
        title: "Investment & Programme Appraisal",
        description: "KE conducts structured cost-benefit analysis of proposed public and development investments, drawing on shadow pricing, economic rates of return, distributional weighting, and welfare analysis. These appraisals are designed to meet the analytical standards of multilateral development banks, government investment review processes, and independent oversight bodies."
      },
      {
        num: "03",
        category: "INACTION",
        title: "Cost of Inaction Analysis",
        description: "Kathmandu Economics models what happens if nothing changes. Cost of inaction analysis rigorously quantifies the economic and social consequences of maintaining the status quo, making it one of the most powerful tools available for building the evidence base for reform, investment, or institutional change. For decision-makers who need to make the case for action, this is where that case begins."
      },
      {
        num: "04",
        category: "REGULATION",
        title: "Regulatory Impact Assessment",
        description: "KE assesses the economic and social implications of proposed regulatory changes for affected industries, consumer groups, and public institutions. This provides decision-makers and regulators with an independent, evidence-based view of the full consequences of proposed rules before they take effect."
      },
      {
        num: "05",
        category: "EVALUATION",
        title: "Development Programme Evaluation",
        description: "KE conducts retrospective and prospective evaluations of development programmes and public interventions, combining quantitative impact modelling with qualitative contextualisation. These evaluations meet the requirements of international development funders and government accountability frameworks, and are designed to generate genuine learning, and not validation."
      }
    ]
  },
  "economic-financial-advisory": {
    title: "Economic & Financial Advisory",
    primaryTagline: "Private Sector Advisory",
    heroSubtext: "The analytical depth of a serious economics research house, applied to the specific questions facing your business, industry, or investment. Independent. Rigorous. Bespoke.",
    narrativeImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    narrativeParagraphs: [
      "Kathmandu Economics' advisory offer to the private sector is built on a clear distinction: this is not management consulting. KE does not offer benchmarking decks, generic strategic frameworks, or market reports assembled from secondary data and industry databases.",
      "What it offers is something rarer and considerably harder to find: independent, rigorous economic and financial analysis, purpose-built for the specific question a client needs answered. The intellectual starting point is always the same: what does the evidence actually show, and what does it mean for this decision?",
      "KE works with financial institutions, insurers, industrial enterprises, regulators, and investors who require decision-grade analysis. Its private sector engagements span economic and financial modelling, actuarial and risk analysis, regulatory economics, market intelligence, economic due diligence, and bespoke research of any kind.",
      "KE brings no conflicts of interest. It holds no advisory relationships with competing firms. It does not produce analysis in search of a predetermined conclusion. Its value to private sector clients is identical to its value to governments and development partners: evidence that can be trusted, because the process that produced it can be trusted."
    ],
    delivers: [
      {
        num: "01",
        category: "MODELLING",
        title: "Economic & Financial Modelling",
        description: "KE builds custom economic and financial models grounded in economic fundamentals for business planning, capital allocation, investment appraisal, scenario analysis, or regulatory submission. Models are built for scrutiny: documented, auditable, and designed to hold up under independent review by counterparties, investors, or regulators."
      },
      {
        num: "02",
        category: "RISK",
        title: "Actuarial & Risk Analysis",
        description: "KE provides quantitative risk modelling and actuarial analysis to support pricing, provisioning, reserving, and strategic risk management. This includes probabilistic scenario planning, stress testing, and risk framework design for insurance, financial services, and infrastructure sectors where rigorous quantification of uncertainty is essential."
      },
      {
        num: "03",
        category: "REGULATION",
        title: "Regulatory Economics & Compliance Advisory",
        description: "KE analyses regulatory environments, tariff and pricing structures, competition economics, and the economic implications of compliance obligations. For businesses seeking to understand, anticipate, or engage constructively with regulatory processes, KE provides the independent economic evidence to do so credibly, whether for a regulatory submission, a legal proceeding, or an internal strategy review."
      },
      {
        num: "04",
        category: "ANALYSIS",
        title: "Market & Sector Analysis",
        description: "KE conducts rigorous, data-driven analysis of market structures, demand dynamics, competitive conditions, and sector-level trends. This is economic intelligence designed to inform decisions — going well beyond surface-level commercial research to provide structural insight into how markets work, how they are changing, and what that means for strategy."
      },
      {
        num: "05",
        category: "DUE DILIGENCE",
        title: "Economic Due Diligence",
        description: "For investors, acquirers, lenders, or market entrants, KE provides independent economic assessment of the underlying fundamentals — the structural drivers, demand conditions, competitive risks, and macroeconomic sensitivities that financial models alone may not fully capture. Where financial due diligence asks whether the numbers add up, economic due diligence asks whether the story behind the numbers is credible."
      },
      {
        num: "06",
        category: "BUSINESS CASE",
        title: "Business Case Development",
        description: "KE constructs the economic and financial case for investments, commercial propositions, and institutional initiatives. This includes structuring the evidence base, quantifying economic and financial returns, modelling risk scenarios, and framing the argument for boards, funders, regulators, or government counterparts. A well-built business case is an analytical document before it is a persuasive one."
      },
      {
        num: "07",
        category: "BESPOKE",
        title: "Bespoke Research & Advisory",
        description: "KE takes on custom research and advisory engagements on any economic, financial, or policy question relevant to a client's organisation, sector, or decision context. The scope is defined by the question, not by a predetermined service catalogue. If it requires serious economic thinking, KE can deliver it."
      }
    ]
  }
};

export default function PracticeArea() {
  const { areaId } = useParams();
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine the current practice area configuration from path
  const path = location.pathname;
  let currentAreaId = areaId;
  if (!currentAreaId) {
    if (path.includes("economic-modelling")) currentAreaId = "economic-modelling";
    else if (path.includes("socioeconomic-impact-assessment")) currentAreaId = "socioeconomic-impact-assessment";
    else if (path.includes("economic-financial-advisory")) currentAreaId = "economic-financial-advisory";
  }

  const activeAreaId = (currentAreaId && currentAreaId in practiceAreaConfigs)
    ? currentAreaId
    : "socioeconomic-impact-assessment";

  const config = practiceAreaConfigs[activeAreaId];

  // Split title to prevent full stop from wrapping to next line alone
  const titleWords = config.title.split(" ");
  const lastTitleWord = titleWords.pop() || "";
  const mainTitleWords = titleWords.join(" ");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError(null);
      try {
        const data = await DB.getProjects();
        const filtered = data.filter((p) => p.practice_area === activeAreaId);
        setProjects(filtered);
      } catch (err: any) {
        console.error("Failed to fetch projects for practice area", err);
        setError(err.message || "Failed to retrieve projects.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [activeAreaId]);

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id={`${activeAreaId}-page`}>
      {/* Header Spacer */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* PAGE HERO - MASSIVE SOPHISTICATED EDITORIAL HEADER */}
      <header className="py-24 sm:py-32 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="space-y-12">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-[#B91C1C]" />
                <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#B91C1C] font-extrabold">
                  Practice Division
                </span>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              {/* Giant Title */}
              <h1 className="lg:col-span-8 font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#111111] leading-tight">
                <ScrollReveal variant="words" stagger={0.03} className="inline">
                  {mainTitleWords}
                </ScrollReveal>
                {" "}
                <span className="inline-block whitespace-nowrap">
                  <ScrollReveal variant="words" delay={titleWords.length * 0.03} className="inline">
                    {lastTitleWord}
                  </ScrollReveal>
                  <span className="text-[#B91C1C] select-none">.</span>
                </span>
              </h1>
              
              {/* Intro Prose */}
              <div className="lg:col-span-4 lg:pt-4 space-y-5">
                <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
                  <p className="font-mono text-xs text-[#B91C1C] tracking-[0.15em] uppercase font-bold leading-relaxed">
                    {config.primaryTagline}
                  </p>
                </ScrollReveal>
                <ScrollReveal variant="words" stagger={0.015} delay={0.4}>
                  <p className="font-serif text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                    {config.heroSubtext}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NARRATIVE EXPOSITION - ASYMMETRICAL COLUMN STRIP */}
      <section className="py-24 bg-[#F3EFE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Atmospheric Grayscale Photo */}
            <div className="lg:col-span-4 rounded-[32px] overflow-hidden shadow-sm aspect-[4/3] lg:aspect-[3/4]">
              <ScrollReveal variant="fade-up" duration={0.8}>
                <img 
                  src={config.narrativeImage} 
                  alt={config.title}
                  className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </ScrollReveal>
            </div>

            {/* Right Column: Narrative Copy with high contrast typography hierarchy */}
            <div className="lg:col-span-8 space-y-10 font-serif text-lg sm:text-xl text-neutral-800 leading-relaxed font-light">
              {config.narrativeParagraphs.map((para, i) => (
                <ScrollReveal key={i} variant="fade-up" delay={0.2 + i * 0.1} duration={0.8}>
                  <p>{para}</p>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* WHAT KATHMANDU ECONOMICS DELIVERS - MINIMAL SOPHISTICATED PANELS */}
      <section className="py-28 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-20">
          
          {/* Header Accent */}
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B91C1C] font-extrabold block">
                DELIVERABLE MODULES
              </span>
            </ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] tracking-tight">
              <ScrollReveal variant="words" stagger={0.03}>
                What Kathmandu Economics Delivers
              </ScrollReveal>
            </h2>
          </div>

          {/* Expansive Horizontal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {config.delivers.map((item, idx) => (
              <ScrollReveal 
                key={idx} 
                variant="fade-up" 
                delay={(idx % 3) * 0.1} 
                duration={0.8} 
                className={idx === 4 && config.delivers.length === 5 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className="space-y-4 p-8 bg-[#F3EFE6]/40 rounded-[24px] hover:bg-[#F3EFE6]/80 transition-all duration-300 h-full">
                  <span className="font-mono text-xs text-[#B91C1C] font-bold block">{item.num} / {item.category}</span>
                  <h3 className="font-serif text-xl font-light text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="font-serif text-neutral-600 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}

          </div>

        </div>
      </section>

      {/* INTERACTIVE ANALYTICS SIMULATION CASE */}
      {activeAreaId === "economic-financial-advisory" && (
        <InteractiveAdvisoryShowcase />
      )}

      {/* PROJECTS IN THIS SECTOR */}
      <section className="py-28 bg-[#FCFAF6] relative overflow-hidden border-t border-b border-[#E2E8F0]">
        {/* Subtle architect guidelines / background grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#11111108_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />
        <div className="absolute top-0 left-[10%] w-px h-full bg-neutral-200/40 pointer-events-none" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-neutral-200/40 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
          
          <div className="mb-16 border-b border-neutral-200 pb-8">
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#111111] tracking-tight">
              <ScrollReveal variant="words" stagger={0.03}>
                Projects in this Sector
              </ScrollReveal>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-6 h-6 border-2 border-[#B91C1C] border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-xs text-neutral-400 tracking-widest uppercase">Querying files...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24 font-mono text-xs text-red-500">
              {error}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              {projects.map((project, idx) => {
                const cardDesign = getAsymmetricCardClasses(idx);
                return (
                  <ScrollReveal
                    key={project.id}
                    variant="fade-up"
                    delay={idx * 0.12}
                    duration={0.8}
                    className={cardDesign.colSpan}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="bg-white border border-[#E2E8F0] hover:border-[#B91C1C] hover:shadow-[0_20px_50px_rgba(185,28,28,0.06)] hover:-translate-y-2 transition-all duration-500 ease-out p-7 sm:p-9 rounded-[32px] h-full flex flex-col justify-between group block relative"
                      id={`project-card-${project.slug}`}
                    >
                      <div className={cardDesign.layout}>
                        {/* Styled Image Canvas with Overlay */}
                        <div className={`relative overflow-hidden rounded-[20px] bg-neutral-100 border border-neutral-200/50 ${cardDesign.imgSize}`}>
                          <img
                            src={project.featured_image}
                            alt={project.title}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <span className="absolute bottom-3 left-3 bg-[#111111] text-white font-mono text-[8px] uppercase px-2.5 py-1 tracking-[0.15em] rounded-[4px] opacity-90">
                            {project.practice_area.replace("-", " ")}
                          </span>
                        </div>

                        {/* Content Box */}
                        <div className={`flex flex-col justify-between ${cardDesign.contentSize}`}>
                          <div className="space-y-3">
                            {/* Case briefing metadata */}
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${project.status.toLowerCase() === 'active' ? 'bg-amber-500 animate-pulse' : 'bg-green-600'}`} />
                              <div className="text-[10px] font-mono text-[#B91C1C] font-extrabold uppercase tracking-[0.2em]">
                                {project.status}
                              </div>
                            </div>

                            {/* Dynamic high contrast heading */}
                            <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#B91C1C] transition-colors duration-300 line-clamp-2 leading-tight tracking-tight">
                              {project.title}
                            </h4>

                            {/* Refined excerpt block with bespoke typography */}
                            <p className="text-xs sm:text-sm text-neutral-600 font-serif leading-relaxed line-clamp-3 font-light">
                              {project.summary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Animated bottom evidence tab */}
                      <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono font-extrabold tracking-[0.15em] text-neutral-400 group-hover:text-[#B91C1C] transition-colors duration-300 uppercase">
                        <span className="relative overflow-hidden inline-block">
                          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                            Explore Case Study
                          </span>
                          <span className="absolute top-0 left-0 inline-block text-[#B91C1C] transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                            Explore Case Study
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#B91C1C] group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-[#E2E8F0] rounded-[32px] p-8 max-w-lg mx-auto shadow-sm">
              <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
                No published projects currently registered in this sector.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
