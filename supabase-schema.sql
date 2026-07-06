-- SQL Schema for Kathmandu Economics Supabase Database Setup

-- Create TEAM_MEMBERS table
CREATE TABLE IF NOT EXISTS TEAM_MEMBERS (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    expertise TEXT NOT NULL,
    biography TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create PROJECTS table
CREATE TABLE IF NOT EXISTS PROJECTS (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    practice_area TEXT NOT NULL,
    featured_image TEXT,
    challenge TEXT NOT NULL,
    methodology TEXT NOT NULL,
    findings TEXT NOT NULL,
    impact TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Completed',
    featured BOOLEAN DEFAULT true,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create SITE_CONTENT table
CREATE TABLE IF NOT EXISTS SITE_CONTENT (
    id TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial team members
INSERT INTO TEAM_MEMBERS (id, name, slug, title, expertise, biography, photo_url)
VALUES 
('t1', 'Dr. Arpan Shrestha', 'dr-arpan-shrestha', 'Managing Director & Chief Economist', 'Macroeconomic Modelling, Public Policy & General Equilibrium', 'Dr. Arpan Shrestha is a leading economic policy expert with over 15 years of experience advising governments, multilateral banks, and international organisations. He holds a PhD in Economics from the London School of Economics (LSE). His research has been published in major peer-reviewed journals and focuses on Dynamic Stochastic General Equilibrium (DSGE) models and fiscal policy design.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'),
('t2', 'Ms. Sumina Rijal', 'ms-sumina-rijal', 'Director of Development Practice', 'Socioeconomic Impact Assessment, Gender-Inclusive Policy & Evaluation', 'Ms. Sumina Rijal leads the Socioeconomic Impact Assessment practice at Kathmandu Economics. She holds a Master in Public Administration (MPA) from the Harvard Kennedy School. Sumina has directed large-scale impact evaluations for the World Bank, DFID, and various ministries. Her expertise lies in applying mixed-method research designs and causal inference to developmental interventions.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'),
('t3', 'Mr. Charles Vance', 'mr-charles-vance', 'Senior Advisory Director', 'Infrastructure Finance, Regulatory Economics & Risk Advisory', 'Mr. Charles Vance has over 20 years of experience in regulatory economics, market entry strategies, and public-private partnership (PPP) frameworks. Formerly a Senior Infrastructure Specialist at the World Bank, Charles advises ministries on economic due diligence, financial risk modelling, and sector liberalization policies. He holds a Master’s degree in Financial Economics from Oxford University.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Insert initial projects
INSERT INTO PROJECTS (id, title, slug, summary, practice_area, featured_image, challenge, methodology, findings, impact, status, featured)
VALUES
('p1', 'Nepal Macro-Fiscal Model (NMFM)', 'nepal-macro-fiscal-model', 'Development of a customized, multi-sector macro-fiscal forecasting model to simulate trade policies and medium-term growth projections.', 'economic-modelling', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop', 'The Ministry of Finance required a cohesive, rigorous framework to simulate the effects of external tariff adjustments and domestic revenue mobilisation policies. Existing projection systems were highly fragmented, spreadsheet-based, and unable to capture inter-sectoral feedback effects or structural macroeconomic adjustments.', 'Kathmandu Economics developed a multi-sector, structural macro-fiscal model incorporating dynamic feedback loops between fiscal deficits, monetary transmission, and real-sector growth. The team estimated a system of behavioral equations using time-series econometrics (Vector Autoregression and Error Correction Models) calibrated specifically to national accounts data.', 'The model demonstrated that a 5% increase in public capital expenditure, financed through targeted customs modernization, yields a 1.2% increase in real GDP growth over a 3-year horizon, while mitigating inflationary pressures. Conversely, uncoordinated deficit spending increases crowding-out effects on private investment by 18%.', 'The NMFM was formally adopted by the national planning commission and the Ministry of Finance as the primary analytical tool for preparing the Medium-Term Expenditure Framework (MTEF) and estimating fiscal space for national pride projects.', 'Completed', true),
('p2', 'Socioeconomic Impact Assessment of the Trishuli Hydroelectric Expansion', 'trishuli-hydroelectric-expansion-assessment', 'A comprehensive evaluation of the resettlement, livelihood restoration, and community-level economic multipliers of a 216MW run-of-the-river hydroelectric project.', 'socioeconomic-impact-assessment', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop', 'The expansion of the Trishuli hydroelectric infrastructure required a credible, independent, and socially robust assessment of livelihood disruption, land acquisition compensation rates, and regional economic benefits to secure multilateral development bank funding.', 'We deployed a mixed-methods research framework combining a randomized household survey (n=1,200 households) with spatial econometrics to map agricultural output disruptions. Control groups were selected from adjacent river basins using propensity score matching to isolate the true causal impact of project-induced employment.', 'The assessment revealed that localized procurement and construction employment increased median household income in the project impact zone by 34% during peak construction. However, agricultural income for displaced families fell by 14% due to delayed land reclamation, highlighting a critical gap in livelihood restoration timelines.', 'Our actionable recommendations led to the redesign of the resettlement action plan, including the establishment of a $2.5M micro-entrepreneurship seed fund. This revised plan fully satisfied international environmental and social standards (including IFC Performance Standard 5), clearing the path for financial close.', 'Completed', true),
('p3', 'Regulatory Economics Advisory & Tariff Reform for the Telecommunications Sector', 'telecom-regulatory-economics-tariff-reform', 'An economic due diligence and price-elasticity advisory to modernize wholesale pricing and interconnection tariffs.', 'economic-financial-advisory', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop', 'As high-speed data demand surged, legacy voice-centric wholesale interconnection tariffs were creating market distortions, discouraging infrastructure sharing, and driving up retail prices for remote communities.', 'We constructed a forward-looking long-run incremental cost (FL-LRIC) model to determine the efficient costs of network service provision. We conducted econometric estimation of mobile data demand elasticity across income deciles using household utility survey data.', 'The analysis established that wholesale pricing was overstating network capital costs by 22%, creating an artificial barrier to entry for smaller digital service providers. The estimated price elasticity of demand for mobile broadband in rural areas was -1.45, indicating that tariff reductions would be highly stimulative to total sector revenue.', 'The national regulatory authority utilized our FL-LRIC model to mandate a phased 25% reduction in wholesale mobile termination rates over 24 months, accelerating rural mobile internet penetration by 16% and expanding digital commerce options.', 'Completed', true)
ON CONFLICT (id) DO NOTHING;

-- Insert initial site content
INSERT INTO SITE_CONTENT (id, page, section, content)
VALUES
('sc1', 'home', 'hero', '{"headline": "Rigorous Economic Analysis. Transformative Policy Design.", "subheadline": "Kathmandu Economics is a premier research and advisory firm providing quantitative modelling, socioeconomic impact assessments, and financial advisory to governments, development institutions, and the private sector."}'),
('sc2', 'home', 'about_preview', '{"title": "Bridging Academic Rigour & Policy Reality", "text": "Established to address complex developmental and financial challenges, Kathmandu Economics (KE) applies state-of-the-art economic modelling, comprehensive field research, and strategic financial analysis. Our advisory services are characterized by empirical integrity, independent thinking, and a deep understanding of developing and emerging market structures."}'),
('sc3', 'about', 'introduction', '{"title": "Institutional Excellence in Economic Research", "text": "Kathmandu Economics (KE) is an independent economics research and advisory firm. We translate complex data into actionable policies, helping our clients navigate economic transitions, appraise investments, and evaluate socioeconomic impact with high empirical precision."}'),
('sc4', 'about', 'who_we_are', '{"title": "Our Institutional Identity", "text": "We operate as a hub of elite analysts, econometricians, and policy specialists. Inspired by leading institutions like the Brookings Institution and the OECD, we uphold absolute analytical integrity. We work with clients to build robust evidence bases, avoiding speculative methodologies in favour of peer-reviewed, empirically testable models."}'),
('sc5', 'about', 'core_areas', '{"title": "Core Work and Influence", "text": "Our work spans macroeconomic forecasting, regulatory economics, spatial econometric studies, development evaluations, and infrastructure finance advisory. By serving as an intellectual bridge, we help shape national budgets, developmental guidelines, and market regulations."}'),
('sc6', 'about', 'who_we_serve', '{"title": "Client Portfolio & Partnerships", "text": "Kathmandu Economics serves sovereign ministries, multilateral development banks (including the World Bank and ADB), bilateral development partners, international NGOs, and progressive private corporations seeking rigorous due diligence and market analysis."}'),
('sc7', 'mission_values', 'mission', '{"title": "Our Institutional Mission", "text": "To elevate the standard of economic decision-making through empirical rigour, analytical independence, and institutional-quality advisory. We believe that sustainable development and shared prosperity must be anchored in robust, evidence-based economic logic."}'),
('sc8', 'mission_values', 'values', '{"values": [{"title": "Empirical Rigour", "desc": "We reject speculative analysis. Our research is anchored in verified datasets, robust econometric estimation, and reproducible models."}, {"title": "Absolute Independence", "desc": "Our advisory is strictly independent, free from ideological bias, and committed solely to the evidence of what works."}, {"title": "Institutional Quality", "desc": "We hold our publications and reports to the highest academic and international standard, on par with global research organizations."}, {"title": "Social Responsibility", "desc": "We assess economic issues with a deep appreciation for human impact, prioritizing inclusive, sustainable, and transparent solutions."}]}')
ON CONFLICT (id) DO NOTHING;
