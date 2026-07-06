import { supabase } from "./supabase";
import { TeamMember, Project, SiteContent } from "./types";

// Seed data from db.json to act as an out-of-the-box fallback
const initialSeedData = {
  team_members: [
    {
      id: "t1",
      name: "Sushant Vaidik",
      slug: "sushant-vaidik",
      title: "Chair",
      expertise: "Development Policy, Sovereign Strategy & Institutional Governance",
      biography: "Sushant Vaidik is the Chair of Kathmandu Economics. He steers the firm's strategic direction and high-level sovereign advisory channels. With over two decades of experience in policy design and institutional development across South Asia, Sushant focuses on building long-term evidence-to-action frameworks. His leadership shapes KE's vision of delivering independent, rigorous research that informs critical public and private investment decisions.",
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      created_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "t2",
      name: "Ashish Niraula",
      slug: "ashish-niraula",
      title: "Executive Director",
      expertise: "Socioeconomic Impact Modelling, Cost-Benefit Analysis & Applied Economics",
      biography: "Ashish leads the research and advisory function at Kathmandu Economics. He holds a Master of Public Administration with a specialisation in economic policy from the London School of Economics and Political Science, and brings over five years of experience in applied economic research, impact modelling, and policy advisory.\n\nBefore joining KE, Ashish worked at Economist Impact, where he led economic, health, and social impact modelling across more than 100 countries. His work spanned the full range of applied economic analysis: from quantifying the burden of disease and the economic costs of systemic failures in health systems, to modelling the macroeconomic effects of regulatory reform and the returns to public investment across health, climate, energy, and water sectors. Alongside his modelling work, he has led multiple expert advisory panels, conducted over 50 senior stakeholder interviews, and developed country scorecards and composite indicators to make complex research findings actionable for policymakers and investors.\n\nAt Kathmandu Economics, Ashish leads the firm's research engagements and client advisory work, bringing particular depth in socioeconomic impact modelling, cost-benefit analysis, and the translation of rigorous economic evidence into policy-relevant insight across a range of sectors and geographies.",
      photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      created_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "t3",
      name: "Parash Shrestha",
      slug: "parash-shrestha",
      title: "Research Officer",
      expertise: "Data Analytics, Survey Operations & Financial Sector Research",
      biography: "Parash is a Research Officer at Kathmandu Economics, where he supports research design, field operations, data analysis, and policy-oriented evidence generation. He holds a Master's degree in Business Studies from Tribhuvan University and has completed the Applied Data Science Lab program at WorldQuant University, building expertise in data analytics, statistical analysis, and decision-support systems.\n\nPrior to joining Kathmandu Economics, Parash worked as a Research Associate at the Nepal Bankers' Association, where he contributed to the development of sector-wide financial data platforms, analytical dashboards, stakeholder surveys, and banking sector research. His professional experience spans economic and financial analysis, large-scale survey implementation, data visualization, and the translation of complex datasets into actionable insights for institutional and policy audiences. Earlier in his career, he helped lead data management and digitization initiatives at the National Archives of Nepal, supporting the preservation and organization of historical records through large-scale digital systems.\n\nAt Kathmandu Economics, Parash supports research projects spanning agriculture, governance, and socioeconomic development. His work includes survey and experimental design, field operations management, data processing, and quantitative analysis.",
      photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      created_at: "2026-06-29T00:00:00.000Z"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Nepal Macro-Fiscal Model (NMFM)",
      slug: "nepal-macro-fiscal-model",
      summary: "Development of a customized, multi-sector macro-fiscal forecasting model to simulate trade policies and medium-term growth projections.",
      practice_area: "economic-modelling",
      featured_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      challenge: "The Ministry of Finance required a cohesive, rigorous framework to simulate the effects of external tariff adjustments and domestic revenue mobilisation policies. Existing projection systems were highly fragmented, spreadsheet-based, and unable to capture inter-sectoral feedback effects or structural macroeconomic adjustments.",
      methodology: "Kathmandu Economics developed a multi-sector, structural macro-fiscal model incorporating dynamic feedback loops between fiscal deficits, monetary transmission, and real-sector growth. The team estimated a system of behavioral equations using time-series econometrics (Vector Autoregression and Error Correction Models) calibrated specifically to national accounts data.",
      findings: "The model demonstrated that a 5% increase in public capital expenditure, financed through targeted customs modernization, yields a 1.2% increase in real GDP growth over a 3-year horizon, while mitigating inflationary pressures. Conversely, uncoordinated deficit spending increases crowding-out effects on private investment by 18%.",
      impact: "The NMFM was formally adopted by the national planning commission and the Ministry of Finance as the primary analytical tool for preparing the Medium-Term Expenditure Framework (MTEF) and estimating fiscal space for national pride projects.",
      status: "Completed",
      featured: true,
      created_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "p2",
      title: "Socioeconomic Impact Assessment of the Trishuli Hydroelectric Expansion",
      slug: "trishuli-hydroelectric-expansion-assessment",
      summary: "A comprehensive evaluation of the resettlement, livelihood restoration, and community-level economic multipliers of a 216MW run-of-the-river hydroelectric project.",
      practice_area: "socioeconomic-impact-assessment",
      featured_image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
      challenge: "The expansion of the Trishuli hydroelectric infrastructure required a credible, independent, and socially robust assessment of livelihood disruption, land acquisition compensation rates, and regional economic benefits to secure multilateral development bank funding.",
      methodology: "We deployed a mixed-methods research framework combining a randomized household survey (n=1,200 households) with spatial econometrics to map agricultural output disruptions. Control groups were selected from adjacent river basins using propensity score matching to isolate the true causal impact of project-induced employment.",
      findings: "The assessment revealed that localized procurement and construction employment increased median household income in the project impact zone by 34% during peak construction. However, agricultural income for displaced families fell by 14% due to delayed land reclamation, highlighting a critical gap in livelihood restoration timelines.",
      impact: "Our actionable recommendations led to the redesign of the resettlement action plan, including the establishment of a $2.5M micro-entrepreneurship seed fund. This revised plan fully satisfied international environmental and social standards (including IFC Performance Standard 5), clearing the path for financial close.",
      status: "Completed",
      featured: true,
      created_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "p3",
      title: "Regulatory Economics Advisory & Tariff Reform for the Telecommunications Sector",
      slug: "telecom-regulatory-economics-tariff-reform",
      summary: "An economic due diligence and price-elasticity advisory to modernize wholesale pricing and interconnection tariffs.",
      practice_area: "economic-financial-advisory",
      featured_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      challenge: "As high-speed data demand surged, legacy voice-centric wholesale interconnection tariffs were creating market distortions, discouraging infrastructure sharing, and driving up retail prices for remote communities.",
      methodology: "We constructed a forward-looking long-run incremental cost (FL-LRIC) model to determine the efficient costs of network service provision. We conducted econometric estimation of mobile data demand elasticity across income deciles using household utility survey data.",
      findings: "The analysis established that wholesale pricing was overstating network capital costs by 22%, creating an artificial barrier to entry for smaller digital service providers. The estimated price elasticity of demand for mobile broadband in rural areas was -1.45, indicating that tariff reductions would be highly stimulative to total sector revenue.",
      impact: "The national regulatory authority utilized our FL-LRIC model to mandate a phased 25% reduction in wholesale mobile termination rates over 24 months, accelerating rural mobile internet penetration by 16% and expanding digital commerce options.",
      status: "Completed",
      featured: true,
      created_at: "2026-06-29T00:00:00.000Z"
    }
  ],
  site_content: [
    {
      id: "sc1",
      page: "home",
      section: "hero",
      content: {
        headline: "Where Evidence Drives Decisions.",
        subheadline: "Kathmandu Economics is an independent research and policy advisory firm. It translates economic evidence into decisions that shape policy, investment, and institutions."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc2",
      page: "home",
      section: "about_preview",
      content: {
        title: "About KE",
        text: "Kathmandu Economics (KE) is an independent research and policy advisory firm dedicated to closing the gap between ideas, evidence, and action. KE operates at the intersection of economic rigour and real-world institutional complexity, producing analysis that is both technically sound and practically fit for purpose."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc3",
      page: "about",
      section: "introduction",
      content: {
        title: "About KE",
        text: "Kathmandu Economics (KE) is an independent research and policy advisory firm dedicated to closing the gap between ideas, evidence, and action. KE operates at the intersection of economic rigour and real-world institutional complexity, producing analysis that is both technically sound and practically fit for purpose.\n\nKE's work spans the full spectrum of applied economics. It conducts original academic research involving advanced econometric and economic modelling. It builds bespoke socioeconomic impact frameworks for governments and multilateral agencies seeking to evaluate what policies, investments, and interventions truly cost, and deliver. It provides tailored economic and financial advisory to private sector clients who need decision-grade analysis."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc4",
      page: "about",
      section: "who_we_are",
      content: {
        title: "Core Areas of Work",
        text: "Our practice operates with strict focus on high-impact disciplines:\n\n• Economic Policy & Public Finance\n• Evaluation & Impact\n• Agriculture, Climate & Digital Transformation\n• Political Economy & Development Economics\n• Governance & Service Design\n• Research Design, Data Systems & Monitoring"
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc5",
      page: "about",
      section: "core_areas",
      content: {
        title: "Our Rigorous Approach",
        text: "The firm's approach is consistent across all engagements: evidence first, method second, conclusion last. The firm does not arrive at findings in search of supporting analysis. It builds the analysis and follows where it leads."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc6",
      page: "about",
      section: "who_we_serve",
      content: {
        title: "Our Partnerships & Clients",
        text: "Kathmandu Economics works with central and provincial governments, multilateral development organisations, international NGOs, development finance institutions, academic institutions, and private enterprises across finance, industry, and infrastructure."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc7",
      page: "mission_values",
      section: "mission",
      content: {
        title: "Our Institutional Mission",
        text: "Kathmandu Economics aims to advance evidence-based decision-making. Its mission is to deliver rigorous, independent, and decision-ready research and advisory, equipping governments, development partners, and enterprises to act with clarity, confidence, and accountability."
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    },
    {
      id: "sc8",
      page: "mission_values",
      section: "values",
      content: {
        values: [
          {
            title: "Analytical Rigour",
            desc: "Every engagement at Kathmandu Economics is held to the standards of contemporary economic science. Models are transparent. Assumptions are stated and tested. Conclusions are proportionate to the evidence. There are no shortcuts, and there is no room for analysis that cannot be defended."
          },
          {
            title: "Independence",
            desc: "Kathmandu Economics’ findings follow the evidence and not the agenda. Its analysis is free from institutional pressure, political convenience, or client preference. The value of independent economic advice lies precisely in its unconditional commitment to objectivity. KE is willing to produce findings that are inconvenient. That is the point."
          },
          {
            title: "Relevance",
            desc: "Economic analysis is only valuable if it can be used. KE designs every engagement to be decision-ready, translating complex methodology into clear, contextual insight that directly serves the decisions its clients face."
          },
          {
            title: "Bespoke Thinking",
            desc: "KE does not apply generic frameworks or repurpose prior work. Each engagement is approached with fresh thinking, purpose-built methods, and genuine intellectual investment in the specific question at hand."
          },
          {
            title: "Intellectual Integrity",
            desc: "KE is frank. Where evidence points away from a preferred conclusion, that is what will be said. Where a question does not admit of a clean answer, the uncertainty will be stated honestly."
          },
          {
            title: "Impact Beyond Output",
            desc: "KE measures success not by the volume of reports delivered, but by the quality of decisions informed, the policies shaped, and the outcomes improved. The purpose of analysis is action. The purpose of action is impact."
          }
        ]
      },
      updated_at: "2026-06-29T00:00:00.000Z"
    }
  ]
};

// Local storage storage keys
const L_TEAM = "ke_local_team_members";
const L_PROJECTS = "ke_local_projects";
const L_SITE_CONTENT = "ke_local_site_content";

// Helper to initialize local storage
function initializeLocalStorage() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(L_TEAM)) {
    localStorage.setItem(L_TEAM, JSON.stringify(initialSeedData.team_members));
  }
  if (!localStorage.getItem(L_PROJECTS)) {
    localStorage.setItem(L_PROJECTS, JSON.stringify(initialSeedData.projects));
  }
  if (!localStorage.getItem(L_SITE_CONTENT)) {
    localStorage.setItem(L_SITE_CONTENT, JSON.stringify(initialSeedData.site_content));
  }
}

// Check if credentials exist for Supabase
export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key);
};

// Load helper
function getLocal<T>(key: string): T[] {
  initializeLocalStorage();
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function saveLocal<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Unify team member mapping so it works with uppercase/lowercase column names if needed
function mapTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    title: row.title,
    expertise: row.expertise,
    biography: row.biography,
    photo_url: row.photo_url || "",
    created_at: row.created_at
  };
}

function mapProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    content: row.content || "",
    practice_area: row.practice_area,
    featured_image: row.featured_image || "",
    challenge: row.challenge,
    methodology: row.methodology,
    findings: row.findings,
    impact: row.impact,
    status: row.status || "Completed",
    featured: row.featured !== false,
    created_at: row.created_at
  };
}

function mapSiteContent(row: any): SiteContent {
  return {
    id: row.id,
    page: row.page,
    section: row.section,
    content: row.content,
    updated_at: row.updated_at
  };
}

// Unified Database Client
export const DB = {
  // ==========================================
  // TEAM MEMBERS
  // ==========================================
  async getTeamMembers(): Promise<TeamMember[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map(mapTeamMember);
        }
      } catch (err) {
        console.warn("[Supabase] Failed to fetch team members, falling back to local storage.", err);
      }
    }
    return getLocal<TeamMember>(L_TEAM);
  },

  async getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;
        if (data) return mapTeamMember(data);
      } catch (err) {
        console.warn(`[Supabase] Failed to fetch team member ${slug}, falling back to local storage.`, err);
      }
    }
    const local = getLocal<TeamMember>(L_TEAM);
    return local.find((t) => t.slug === slug) || null;
  },

  async addTeamMember(member: Omit<TeamMember, "id" | "created_at">): Promise<TeamMember> {
    const id = "t_" + Date.now();
    const newMember: TeamMember = {
      id,
      ...member,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .insert([newMember])
          .select();
        
        if (error) throw error;
        if (data && data[0]) {
          // Keep local storage synced
          const local = getLocal<TeamMember>(L_TEAM);
          local.push(mapTeamMember(data[0]));
          saveLocal(L_TEAM, local);
          return mapTeamMember(data[0]);
        }
      } catch (err) {
        console.error("[Supabase] Failed to add team member.", err);
        throw err;
      }
    }

    // Fallback/Local-Only
    const local = getLocal<TeamMember>(L_TEAM);
    local.push(newMember);
    saveLocal(L_TEAM, local);
    return newMember;
  },

  async updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .update(updates)
          .eq("id", id)
          .select();
        
        if (error) throw error;
        if (data && data[0]) {
          const updated = mapTeamMember(data[0]);
          const local = getLocal<TeamMember>(L_TEAM);
          const idx = local.findIndex((t) => t.id === id);
          if (idx !== -1) {
            local[idx] = updated;
            saveLocal(L_TEAM, local);
          }
          return updated;
        }
      } catch (err) {
        console.error(`[Supabase] Failed to update team member ${id}`, err);
        throw err;
      }
    }

    const local = getLocal<TeamMember>(L_TEAM);
    const idx = local.findIndex((t) => t.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      saveLocal(L_TEAM, local);
      return local[idx];
    }
    return null;
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("team_members")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        
        // Sync local storage
        const local = getLocal<TeamMember>(L_TEAM);
        saveLocal(L_TEAM, local.filter((t) => t.id !== id));
        return true;
      } catch (err) {
        console.error(`[Supabase] Failed to delete team member ${id}`, err);
        throw err;
      }
    }

    const local = getLocal<TeamMember>(L_TEAM);
    const filtered = local.filter((t) => t.id !== id);
    saveLocal(L_TEAM, filtered);
    return filtered.length < local.length;
  },

  // ==========================================
  // PROJECTS
  // ==========================================
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map(mapProject);
        }
      } catch (err) {
        console.warn("[Supabase] Failed to fetch projects, falling back to local storage.", err);
      }
    }
    return getLocal<Project>(L_PROJECTS);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;
        if (data) return mapProject(data);
      } catch (err) {
        console.warn(`[Supabase] Failed to fetch project ${slug}, falling back to local storage.`, err);
      }
    }
    const local = getLocal<Project>(L_PROJECTS);
    return local.find((p) => p.slug === slug) || null;
  },

  async addProject(project: Omit<Project, "id" | "created_at">): Promise<Project> {
    const id = "p_" + Date.now();
    const newProject: Project = {
      id,
      ...project,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .insert([newProject])
          .select();
        
        if (error) throw error;
        if (data && data[0]) {
          const created = mapProject(data[0]);
          const local = getLocal<Project>(L_PROJECTS);
          local.unshift(created);
          saveLocal(L_PROJECTS, local);
          return created;
        }
      } catch (err) {
        console.error("[Supabase] Failed to add project.", err);
        throw err;
      }
    }

    const local = getLocal<Project>(L_PROJECTS);
    local.unshift(newProject);
    saveLocal(L_PROJECTS, local);
    return newProject;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .update(updates)
          .eq("id", id)
          .select();
        
        if (error) throw error;
        if (data && data[0]) {
          const updated = mapProject(data[0]);
          const local = getLocal<Project>(L_PROJECTS);
          const idx = local.findIndex((p) => p.id === id);
          if (idx !== -1) {
            local[idx] = updated;
            saveLocal(L_PROJECTS, local);
          }
          return updated;
        }
      } catch (err) {
        console.error(`[Supabase] Failed to update project ${id}`, err);
        throw err;
      }
    }

    const local = getLocal<Project>(L_PROJECTS);
    const idx = local.findIndex((p) => p.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      saveLocal(L_PROJECTS, local);
      return local[idx];
    }
    return null;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        
        const local = getLocal<Project>(L_PROJECTS);
        saveLocal(L_PROJECTS, local.filter((p) => p.id !== id));
        return true;
      } catch (err) {
        console.error(`[Supabase] Failed to delete project ${id}`, err);
        throw err;
      }
    }

    const local = getLocal<Project>(L_PROJECTS);
    const filtered = local.filter((p) => p.id !== id);
    saveLocal(L_PROJECTS, filtered);
    return filtered.length < local.length;
  },

  // ==========================================
  // SITE CONTENT
  // ==========================================
  async getSiteContent(): Promise<SiteContent[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*");
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map(mapSiteContent);
        }
      } catch (err) {
        console.warn("[Supabase] Failed to fetch site content, falling back to local storage.", err);
      }
    }
    return getLocal<SiteContent>(L_SITE_CONTENT);
  },

  async updateSiteContent(page: string, section: string, content: any): Promise<SiteContent | null> {
    const updated_at = new Date().toISOString();
    
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .update({ content, updated_at })
          .match({ page, section })
          .select();
        
        if (error) throw error;
        if (data && data[0]) {
          const updated = mapSiteContent(data[0]);
          const local = getLocal<SiteContent>(L_SITE_CONTENT);
          const idx = local.findIndex((sc) => sc.page === page && sc.section === section);
          if (idx !== -1) {
            local[idx] = updated;
            saveLocal(L_SITE_CONTENT, local);
          }
          return updated;
        }
      } catch (err) {
        console.error(`[Supabase] Failed to update site content for ${page}/${section}`, err);
        throw err;
      }
    }

    const local = getLocal<SiteContent>(L_SITE_CONTENT);
    const idx = local.findIndex((sc) => sc.page === page && sc.section === section);
    if (idx !== -1) {
      local[idx].content = content;
      local[idx].updated_at = updated_at;
      saveLocal(L_SITE_CONTENT, local);
      return local[idx];
    }
    return null;
  }
};
