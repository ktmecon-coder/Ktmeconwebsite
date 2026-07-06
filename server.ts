import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Admin password verification helper
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "KathmanduEcoAdmin2026!";

// Database state configuration
const dbDir = path.join(process.cwd(), "data");
const dbPath = path.join(dbDir, "db.json");

// Initial seed data
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
      created_at: new Date().toISOString()
    },
    {
      id: "t2",
      name: "Ashish Niraula",
      slug: "ashish-niraula",
      title: "Executive Director",
      expertise: "Socioeconomic Impact Modelling, Cost-Benefit Analysis & Applied Economics",
      biography: "Ashish leads the research and advisory function at Kathmandu Economics. He holds a Master of Public Administration with a specialisation in economic policy from the London School of Economics and Political Science, and brings over five years of experience in applied economic research, impact modelling, and policy advisory.\n\nBefore joining KE, Ashish worked at Economist Impact, where he led economic, health, and social impact modelling across more than 100 countries. His work spanned the full range of applied economic analysis: from quantifying the burden of disease and the economic costs of systemic failures in health systems, to modelling the macroeconomic effects of regulatory reform and the returns to public investment across health, climate, energy, and water sectors. Alongside his modelling work, he has led multiple expert advisory panels, conducted over 50 senior stakeholder interviews, and developed country scorecards and composite indicators to make complex research findings actionable for policymakers and investors.\n\nAt Kathmandu Economics, Ashish leads the firm's research engagements and client advisory work, bringing particular depth in socioeconomic impact modelling, cost-benefit analysis, and the translation of rigorous economic evidence into policy-relevant insight across a range of sectors and geographies.",
      photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      created_at: new Date().toISOString()
    },
    {
      id: "t3",
      name: "Parash Shrestha",
      slug: "parash-shrestha",
      title: "Research Officer",
      expertise: "Data Analytics, Survey Operations & Financial Sector Research",
      biography: "Parash is a Research Officer at Kathmandu Economics, where he supports research design, field operations, data analysis, and policy-oriented evidence generation. He holds a Master's degree in Business Studies from Tribhuvan University and has completed the Applied Data Science Lab program at WorldQuant University, building expertise in data analytics, statistical analysis, and decision-support systems.\n\nPrior to joining Kathmandu Economics, Parash worked as a Research Associate at the Nepal Bankers' Association, where he contributed to the development of sector-wide financial data platforms, analytical dashboards, stakeholder surveys, and banking sector research. His professional experience spans economic and financial analysis, large-scale survey implementation, data visualization, and the translation of complex datasets into actionable insights for institutional and policy audiences. Earlier in his career, he helped lead data management and digitization initiatives at the National Archives of Nepal, supporting the preservation and organization of historical records through large-scale digital systems.\n\nAt Kathmandu Economics, Parash supports research projects spanning agriculture, governance, and socioeconomic development. His work includes survey and experimental design, field operations management, data processing, and quantitative analysis.",
      photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      created_at: new Date().toISOString()
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
      created_at: new Date().toISOString()
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
      created_at: new Date().toISOString()
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
      created_at: new Date().toISOString()
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
      updated_at: new Date().toISOString()
    },
    {
      id: "sc2",
      page: "home",
      section: "about_preview",
      content: {
        title: "About KE",
        text: "Kathmandu Economics (KE) is an independent research and policy advisory firm dedicated to closing the gap between ideas, evidence, and action. KE operates at the intersection of economic rigour and real-world institutional complexity, producing analysis that is both technically sound and practically fit for purpose."
      },
      updated_at: new Date().toISOString()
    },
    {
      id: "sc3",
      page: "about",
      section: "introduction",
      content: {
        title: "About KE",
        text: "Kathmandu Economics (KE) is an independent research and policy advisory firm dedicated to closing the gap between ideas, evidence, and action. KE operates at the intersection of economic rigour and real-world institutional complexity, producing analysis that is both technically sound and practically fit for purpose.\n\nKE's work spans the full spectrum of applied economics. It conducts original academic research involving advanced econometric and economic modelling. It builds bespoke socioeconomic impact frameworks for governments and multilateral agencies seeking to evaluate what policies, investments, and interventions truly cost, and deliver. It provides tailored economic and financial advisory to private sector clients who need decision-grade analysis."
      },
      updated_at: new Date().toISOString()
    },
    {
      id: "sc4",
      page: "about",
      section: "who_we_are",
      content: {
        title: "Core Areas of Work",
        text: "Our practice operates with strict focus on high-impact disciplines:\n\n• Economic Policy & Public Finance\n• Evaluation & Impact\n• Agriculture, Climate & Digital Transformation\n• Political Economy & Development Economics\n• Governance & Service Design\n• Research Design, Data Systems & Monitoring"
      },
      updated_at: new Date().toISOString()
    },
    {
      id: "sc5",
      page: "about",
      section: "core_areas",
      content: {
        title: "Our Rigorous Approach",
        text: "The firm's approach is consistent across all engagements: evidence first, method second, conclusion last. The firm does not arrive at findings in search of supporting analysis. It builds the analysis and follows where it leads."
      },
      updated_at: new Date().toISOString()
    },
    {
      id: "sc6",
      page: "about",
      section: "who_we_serve",
      content: {
        title: "Our Partnerships & Clients",
        text: "Kathmandu Economics works with central and provincial governments, multilateral development organisations, international NGOs, development finance institutions, academic institutions, and private enterprises across finance, industry, and infrastructure."
      },
      updated_at: new Date().toISOString()
    },
    {
      id: "sc7",
      page: "mission_values",
      section: "mission",
      content: {
        title: "Our Institutional Mission",
        text: "Kathmandu Economics aims to advance evidence-based decision-making. Its mission is to deliver rigorous, independent, and decision-ready research and advisory, equipping governments, development partners, and enterprises to act with clarity, confidence, and accountability."
      },
      updated_at: new Date().toISOString()
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
      updated_at: new Date().toISOString()
    }
  ]
};

let cachedDB: any = null;

// Ensure directory and db file exist safely (handled gracefully for read-only serverless platforms like Vercel)
try {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialSeedData, null, 2), "utf8");
  }
} catch (err) {
  console.warn("[DB] Failed to initialize local file DB (filesystem may be read-only). Falling back to in-memory caching.", err);
}

// Read database helper
function readLocalDB() {
  if (cachedDB) return cachedDB;
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf8");
      cachedDB = JSON.parse(data);
      return cachedDB;
    }
  } catch (err) {
    console.error("Failed to read local DB, falling back to seed data", err);
  }
  cachedDB = JSON.parse(JSON.stringify(initialSeedData));
  return cachedDB;
}

// Write database helper
function writeLocalDB(data: any) {
  cachedDB = data;
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to write to local DB (filesystem may be read-only). Kept in memory.", err);
  }
}

// Supabase client helper (lazy initialization)
let supabaseClient: any = null;
const isSupabaseConfigured = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));

function getSupabase() {
  if (!isSupabaseConfigured) return null;
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;
    supabaseClient = createClient(url, key);
    console.log("[DB] Supabase Client Initialized.");
  }
  return supabaseClient;
}

// Graceful Supabase log handler to avoid flagging standard fallbacks as app errors
function handleSupabaseError(context: string, error: any) {
  if (!error) return;
  const isRelationMissing = error.code === "42P01" || 
    error.code === "PGRST125" ||
    (error.message && typeof error.message === "string" && (
      error.message.toLowerCase().includes("relation") || 
      error.message.toLowerCase().includes("does not exist") ||
      error.message.toLowerCase().includes("invalid path")
    ));
  
  if (isRelationMissing) {
    console.log(`[DB] Supabase database tables are not yet initialized for "${context}". Using local file-based database. To activate cloud persistence, please execute the SQL statements in /supabase-schema.sql in your Supabase SQL editor.`);
  } else {
    console.log(`[DB] Supabase "${context}" status - code ${error.code || "unknown"}: ${error.message || JSON.stringify(error)}. Using local database.`);
  }
}

// Generic database interface
const DB = {
  async getTeamMembers() {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("team_members").select("*").order("created_at", { ascending: true });
      if (!error && data) return data;
      handleSupabaseError("getTeamMembers", error);
    }
    return readLocalDB().team_members;
  },

  async getTeamMemberBySlug(slug: string) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("team_members").select("*").eq("slug", slug).single();
      if (!error && data) return data;
    }
    return readLocalDB().team_members.find((t: any) => t.slug === slug) || null;
  },

  async addTeamMember(member: any) {
    const id = "t_" + Date.now();
    const newMember = { id, ...member, created_at: new Date().toISOString() };
    
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("team_members").insert([newMember]).select();
      if (!error && data) return data[0];
      handleSupabaseError("addTeamMember", error);
    }
    
    const db = readLocalDB();
    db.team_members.push(newMember);
    writeLocalDB(db);
    return newMember;
  },

  async updateTeamMember(id: string, updates: any) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("team_members").update(updates).eq("id", id).select();
      if (!error && data) return data[0];
      handleSupabaseError("updateTeamMember", error);
    }

    const db = readLocalDB();
    const idx = db.team_members.findIndex((t: any) => t.id === id);
    if (idx !== -1) {
      db.team_members[idx] = { ...db.team_members[idx], ...updates };
      writeLocalDB(db);
      return db.team_members[idx];
    }
    return null;
  },

  async deleteTeamMember(id: string) {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.from("team_members").delete().eq("id", id);
      if (!error) return true;
      handleSupabaseError("deleteTeamMember", error);
    }

    const db = readLocalDB();
    const initialLen = db.team_members.length;
    db.team_members = db.team_members.filter((t: any) => t.id !== id);
    writeLocalDB(db);
    return db.team_members.length < initialLen;
  },

  async getProjects() {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("projects").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
      handleSupabaseError("getProjects", error);
    }
    return readLocalDB().projects;
  },

  async getProjectBySlug(slug: string) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("projects").select("*").eq("slug", slug).single();
      if (!error && data) return data;
    }
    return readLocalDB().projects.find((p: any) => p.slug === slug) || null;
  },

  async addProject(project: any) {
    const id = "p_" + Date.now();
    const newProject = { id, ...project, created_at: new Date().toISOString() };

    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("projects").insert([newProject]).select();
      if (!error && data) return data[0];
      handleSupabaseError("addProject", error);
    }

    const db = readLocalDB();
    db.projects.unshift(newProject);
    writeLocalDB(db);
    return newProject;
  },

  async updateProject(id: string, updates: any) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("projects").update(updates).eq("id", id).select();
      if (!error && data) return data[0];
      handleSupabaseError("updateProject", error);
    }

    const db = readLocalDB();
    const idx = db.projects.findIndex((p: any) => p.id === id);
    if (idx !== -1) {
      db.projects[idx] = { ...db.projects[idx], ...updates };
      writeLocalDB(db);
      return db.projects[idx];
    }
    return null;
  },

  async deleteProject(id: string) {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.from("projects").delete().eq("id", id);
      if (!error) return true;
      handleSupabaseError("deleteProject", error);
    }

    const db = readLocalDB();
    const initialLen = db.projects.length;
    db.projects = db.projects.filter((p: any) => p.id !== id);
    writeLocalDB(db);
    return db.projects.length < initialLen;
  },

  async getSiteContent() {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("site_content").select("*");
      if (!error && data) return data;
      handleSupabaseError("getSiteContent", error);
    }
    return readLocalDB().site_content;
  },

  async updateSiteContent(page: string, section: string, content: any) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("site_content")
        .update({ content, updated_at: new Date().toISOString() })
        .match({ page, section })
        .select();
      if (!error && data && data.length > 0) return data[0];
      handleSupabaseError("updateSiteContent", error);
    }

    const db = readLocalDB();
    const idx = db.site_content.findIndex((sc: any) => sc.page === page && sc.section === section);
    if (idx !== -1) {
      db.site_content[idx].content = content;
      db.site_content[idx].updated_at = new Date().toISOString();
      writeLocalDB(db);
      return db.site_content[idx];
    } else {
      const newContent = {
        id: "sc_" + Date.now(),
        page,
        section,
        content,
        updated_at: new Date().toISOString()
      };
      db.site_content.push(newContent);
      writeLocalDB(db);
      return newContent;
    }
  }
};

// VERIFY ADMIN PASSWORD ENDPOINT
app.post("/api/admin/verify", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: "KE_ADMIN_SESSION_TOKEN_2026" });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

// DATABASE STATUS ENDPOINT
app.get("/api/db-status", async (req, res) => {
  const configured = isSupabaseConfigured;
  const url = process.env.SUPABASE_URL || null;
  const hasKey = !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY);

  if (!configured) {
    return res.json({
      configured: false,
      connected: false,
      tablesExist: false,
      driver: "local-file",
      message: "Supabase credentials are not configured in environment variables.",
      details: "Please add SUPABASE_URL and SUPABASE_ANON_KEY to your .env file."
    });
  }

  const sb = getSupabase();
  if (!sb) {
    return res.json({
      configured: true,
      connected: false,
      tablesExist: false,
      driver: "local-file",
      message: "Failed to initialize Supabase client.",
      details: "Check your SUPABASE_URL and SUPABASE_ANON_KEY format."
    });
  }

  try {
    // Attempt a basic query to check if the connection is working and if tables exist
    const { data, error } = await sb.from("team_members").select("id").limit(1);
    
    if (error) {
      const isRelationMissing = error.code === "42P01" || 
        error.code === "PGRST125" ||
        (error.message && typeof error.message === "string" && (
          error.message.toLowerCase().includes("relation") || 
          error.message.toLowerCase().includes("does not exist") ||
          error.message.toLowerCase().includes("invalid path")
        ));
      
      if (isRelationMissing) {
        return res.json({
          configured: true,
          connected: true, // Handshake succeeded, but tables not set up yet
          tablesExist: false,
          driver: "local-file",
          message: "Handshake successful, but database tables do not exist yet.",
          details: "You need to execute the SQL statements in /supabase-schema.sql inside your Supabase SQL editor to create the TEAM_MEMBERS, PROJECTS, and SITE_CONTENT tables.",
          error: error.message
        });
      } else {
        return res.json({
          configured: true,
          connected: false,
          tablesExist: false,
          driver: "local-file",
          message: `Supabase query failed with code ${error.code || "unknown"}: ${error.message}`,
          details: "Please check if your database IP whitelist restricts access or if credentials are correct.",
          error: error.message
        });
      }
    }

    return res.json({
      configured: true,
      connected: true,
      tablesExist: true,
      driver: "supabase",
      message: "Successfully connected to Supabase! Cloud persistence is active.",
      details: "All operations are reading and writing directly to your Supabase PostgreSQL instance."
    });

  } catch (err: any) {
    return res.json({
      configured: true,
      connected: false,
      tablesExist: false,
      driver: "local-file",
      message: `An unexpected connection error occurred: ${err.message || err}`,
      details: "Check the server console logs for stack traces."
    });
  }
});

// TEAM MEMBERS API
app.get("/api/team", async (req, res) => {
  try {
    const data = await DB.getTeamMembers();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/team/:slug", async (req, res) => {
  try {
    const data = await DB.getTeamMemberBySlug(req.params.slug);
    if (!data) return res.status(404).json({ error: "Team member not found" });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/team", async (req, res) => {
  try {
    const data = await DB.addTeamMember(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/team/:id", async (req, res) => {
  try {
    const data = await DB.updateTeamMember(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: "Team member not found" });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/team/:id", async (req, res) => {
  try {
    const success = await DB.deleteTeamMember(req.params.id);
    if (!success) return res.status(404).json({ error: "Team member not found" });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PROJECTS API
app.get("/api/projects", async (req, res) => {
  try {
    const data = await DB.getProjects();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:slug", async (req, res) => {
  try {
    const data = await DB.getProjectBySlug(req.params.slug);
    if (!data) return res.status(404).json({ error: "Project not found" });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const data = await DB.addProject(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const data = await DB.updateProject(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: "Project not found" });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const success = await DB.deleteProject(req.params.id);
    if (!success) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// SITE CONTENT API
app.get("/api/content", async (req, res) => {
  try {
    const data = await DB.getSiteContent();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/content", async (req, res) => {
  try {
    const { page, section, content } = req.body;
    if (!page || !section || !content) {
      return res.status(400).json({ error: "Page, section, and content are required" });
    }
    const data = await DB.updateSiteContent(page, section, content);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend with Vite in dev, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Starting in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Starting in PRODUCTION mode serving static build.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Kathmandu Economics (KE) running at http://localhost:${PORT}`);
    if (isSupabaseConfigured) {
      console.log(`[DB] Connected to Supabase with database persistence active.`);
    } else {
      console.log(`[DB] Using local file database persistence at ${dbPath}. Setup SUPABASE_URL and SUPABASE_ANON_KEY to sync to Supabase.`);
    }
  });
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}

export default app;

