import { useState, useEffect, FormEvent, DragEvent, ChangeEvent } from "react";
import { LogIn, Plus, Edit2, Trash2, Check, RefreshCw, Layers, Users, BookOpen, Settings, Upload } from "lucide-react";
import { Project, TeamMember, SiteContent } from "../types";
import { DB, isSupabaseConfigured } from "../supabaseService";
import { supabase } from "../supabase";

// Renders an elegant photo upload drag & drop field that automatically center-crops and optimizes images
function ImageUpload({
  label,
  value,
  onChange,
  aspectRatio,
  aspectRatioLabel,
  targetWidth = 1000
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  aspectRatio: number;
  aspectRatioLabel: string;
  targetWidth?: number;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusInfo, setStatusInfo] = useState<{
    originalSize: string;
    originalRatio: string;
    targetSize: string;
  } | null>(null);
  const [showUrlField, setShowUrlField] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, WEBP, etc.).");
      return;
    }
    setError(null);
    try {
      const result = await new Promise<{
        dataUrl: string;
        originalSize: string;
        originalRatio: string;
        targetSize: string;
      }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new window.Image();
          img.onload = () => {
            const originalWidth = img.width;
            const originalHeight = img.height;
            const srcRatio = originalWidth / originalHeight;
            
            // Calculate center crop
            let sx = 0;
            let sy = 0;
            let sWidth = originalWidth;
            let sHeight = originalHeight;
            
            if (srcRatio > aspectRatio) {
              sWidth = originalHeight * aspectRatio;
              sx = (originalWidth - sWidth) / 2;
            } else if (srcRatio < aspectRatio) {
              sHeight = originalWidth / aspectRatio;
              sy = (originalHeight - sHeight) / 2;
            }
            
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = Math.round(targetWidth / aspectRatio);
            
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Could not get 2D canvas context"));
              return;
            }
            
            // White background for transparency support in JPG
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
            
            try {
              const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
              resolve({
                dataUrl,
                originalSize: `${originalWidth}x${originalHeight}`,
                originalRatio: srcRatio.toFixed(2),
                targetSize: `${canvas.width}x${canvas.height}`
              });
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error("Failed to load image resource"));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      onChange(result.dataUrl);
      setStatusInfo({
        originalSize: result.originalSize,
        originalRatio: result.originalRatio,
        targetSize: result.targetSize
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process image.");
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2 border border-[#E2E8F0] p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <span className="font-mono text-[9px] font-bold text-[#B91C1C] bg-red-50 px-1.5 py-0.5 border border-red-100 uppercase">
          Aspect Ratio: {aspectRatioLabel} Auto-Adjust
        </span>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed p-6 flex flex-col items-center justify-center transition-all duration-300 ${
          dragActive
            ? "border-[#B91C1C] bg-red-50/10"
            : value
            ? "border-[#E2E8F0] bg-gray-50/50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50/30"
        }`}
      >
        {value ? (
          <div className="w-full flex flex-col md:flex-row items-center gap-6">
            <div className="relative shrink-0 border border-gray-200 shadow-sm bg-white p-1.5">
              <img
                src={value}
                alt="Upload preview"
                className="object-cover max-h-32 rounded-sm border border-gray-100 shadow-sm"
                style={{ aspectRatio: `${aspectRatio}` }}
              />
              <span className="absolute bottom-3 right-3 bg-[#111111] text-white font-mono text-[8px] px-1 py-0.5 uppercase tracking-wider">
                {aspectRatioLabel} Preview
              </span>
            </div>
            
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="text-xs text-gray-700 font-medium">
                Image loaded & automatically cropped to perfect proportions!
              </div>
              
              {statusInfo ? (
                <div className="text-[10px] text-gray-500 font-mono space-y-0.5 bg-white p-2 border border-gray-100 rounded-sm inline-block">
                  <div>Original: <span className="font-semibold text-gray-700">{statusInfo.originalSize}</span> (Ratio: {statusInfo.originalRatio})</div>
                  <div>Optimized: <span className="font-semibold text-[#B91C1C]">{statusInfo.targetSize}</span> ({aspectRatioLabel})</div>
                </div>
              ) : (
                <div className="text-[10px] text-gray-500 font-mono">
                  Custom aspect ratio active. Ready for updates.
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                <label className="bg-[#111111] hover:bg-[#B91C1C] text-white font-mono text-[9px] font-bold px-3 py-1.5 uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-sm inline-flex items-center gap-1.5">
                  <Upload className="w-3 h-3" />
                  Replace Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setStatusInfo(null);
                  }}
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-mono text-[9px] font-bold px-3 py-1.5 uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
            <div className="p-3 bg-white rounded-full border border-gray-200 text-gray-400 shadow-sm">
              <Upload className="w-5 h-5 text-[#B91C1C]" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-700">Drag & drop your file here, or click to browse</p>
              <p className="text-[10px] text-gray-400">Supports PNG, JPG, WEBP. Automatically centers, crops, and optimizes.</p>
            </div>
            <label className="bg-[#111111] hover:bg-[#B91C1C] text-white font-mono text-[9px] font-bold px-4 py-2 uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-sm">
              Select Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="text-[10px] text-red-600 font-mono bg-red-50 p-2 border border-red-100 uppercase">
          ⚠️ {error}
        </div>
      )}

      <div className="pt-1 flex justify-end">
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          className="text-[9px] font-mono text-gray-400 hover:text-gray-600 uppercase tracking-wider underline cursor-pointer"
        >
          {showUrlField ? "Hide image link input" : "Or paste image link manually"}
        </button>
      </div>

      {showUrlField && (
        <div className="pt-2">
          <input
            type="text"
            value={value}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-3 py-2 text-xs font-mono focus:outline-none"
          />
          <span className="text-[9px] text-gray-400 mt-1 block">
            Note: Manual URLs bypass aspect ratio auto-cropping. Use the upload button above for automated framing.
          </span>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "team" | "content">("projects");

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Editor States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember> | null>(null);
  const [editMessage, setEditMessage] = useState("");

  // Edit Site Content Sections (Helper State)
  const [homeHeroHeadline, setHomeHeroHeadline] = useState("");
  const [homeHeroSubheadline, setHomeHeroSubheadline] = useState("");
  const [homeAboutPreviewTitle, setHomeAboutPreviewTitle] = useState("");
  const [homeAboutPreviewText, setHomeAboutPreviewText] = useState("");
  const [aboutIntroTitle, setAboutIntroTitle] = useState("");
  const [aboutIntroText, setAboutIntroText] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionText, setMissionText] = useState("");

  // Database Connection Diagnostics State
  const [dbStatus, setDbStatus] = useState<{
    configured: boolean;
    connected: boolean;
    tablesExist: boolean;
    driver: string;
    message: string;
    details: string;
    error?: string;
  } | null>(null);
  const [checkingDb, setCheckingDb] = useState(false);

  // Custom Delete Confirmation State (Bypasses window.confirm iframe blocks)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmType, setDeleteConfirmType] = useState<"project" | "team" | null>(null);

  const checkDbStatus = async () => {
    setCheckingDb(true);
    if (!isSupabaseConfigured()) {
      setDbStatus({
        configured: false,
        connected: false,
        tablesExist: false,
        driver: "local-storage",
        message: "Supabase credentials are not configured in environment variables.",
        details: "Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
      });
      setCheckingDb(false);
      return;
    }

    try {
      const { data, error } = await supabase.from("team_members").select("id").limit(1);
      if (error) {
        const isRelationMissing = error.code === "42P01" || 
          error.code === "PGRST125" ||
          (error.message && typeof error.message === "string" && (
            error.message.toLowerCase().includes("relation") || 
            error.message.toLowerCase().includes("does not exist") ||
            error.message.toLowerCase().includes("invalid path")
          ));

        if (isRelationMissing) {
          setDbStatus({
            configured: true,
            connected: true, // Handshake succeeded, but tables not set up yet
            tablesExist: false,
            driver: "local-storage",
            message: "Handshake successful, but database tables do not exist yet.",
            details: "You need to execute the SQL statements in /supabase-schema.sql inside your Supabase SQL editor to create the TEAM_MEMBERS, PROJECTS, and SITE_CONTENT tables.",
            error: error.message
          });
        } else {
          setDbStatus({
            configured: true,
            connected: false,
            tablesExist: false,
            driver: "local-storage",
            message: `Supabase query failed with code ${error.code || "unknown"}: ${error.message}`,
            details: "Please check your Supabase credentials or network connection.",
            error: error.message
          });
        }
      } else {
        setDbStatus({
          configured: true,
          connected: true,
          tablesExist: true,
          driver: "supabase",
          message: "Successfully connected to Supabase! Cloud persistence is active.",
          details: "All operations are reading and writing directly to your Supabase PostgreSQL instance."
        });
      }
    } catch (err: any) {
      setDbStatus({
        configured: true,
        connected: false,
        tablesExist: false,
        driver: "local-storage",
        message: `An unexpected connection error occurred: ${err.message || err}`,
        details: "Check the console logs for stack traces."
      });
    } finally {
      setCheckingDb(false);
    }
  };

  // Check auth on load
  useEffect(() => {
    const token = sessionStorage.getItem("ke_admin_token");
    if (token === "KE_ADMIN_SESSION_TOKEN_2026") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      checkDbStatus(); // Check database status
      const [dataProj, dataTeam, dataCont] = await Promise.all([
        DB.getProjects(),
        DB.getTeamMembers(),
        DB.getSiteContent()
      ]);

      if (Array.isArray(dataProj)) setProjects(dataProj);
      if (Array.isArray(dataTeam)) setTeam(dataTeam);
      if (Array.isArray(dataCont)) {
        setSiteContent(dataCont);
        
        // Map content fields
        const homeHero = dataCont.find((sc) => sc.page === "home" && sc.section === "hero");
        if (homeHero?.content) {
          setHomeHeroHeadline(homeHero.content.headline || "");
          setHomeHeroSubheadline(homeHero.content.subheadline || "");
        }
        const homeAbout = dataCont.find((sc) => sc.page === "home" && sc.section === "about_preview");
        if (homeAbout?.content) {
          setHomeAboutPreviewTitle(homeAbout.content.title || "");
          setHomeAboutPreviewText(homeAbout.content.text || "");
        }
        const aboutIntro = dataCont.find((sc) => sc.page === "about" && sc.section === "introduction");
        if (aboutIntro?.content) {
          setAboutIntroTitle(aboutIntro.content.title || "");
          setAboutIntroText(aboutIntro.content.text || "");
        }
        const mission = dataCont.find((sc) => sc.page === "mission_values" && sc.section === "mission");
        if (mission?.content) {
          setMissionTitle(mission.content.title || "");
          setMissionText(mission.content.text || "");
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard statistics", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "KathmanduEcoAdmin2026!";
      if (password === adminPass) {
        sessionStorage.setItem("ke_admin_token", "KE_ADMIN_SESSION_TOKEN_2026");
        setIsAuthenticated(true);
      } else {
        setAuthError("Incorrect credentials");
      }
    } catch (err) {
      setAuthError("Failed to authenticate");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ke_admin_token");
    setIsAuthenticated(false);
  };

  // ==========================================
  // PROJECTS CRUD
  // ==========================================
  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewProject = () => {
    setEditingProject({
      title: "",
      slug: "",
      summary: "",
      content: "",
      practice_area: "economic-modelling",
      featured_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      challenge: "",
      methodology: "",
      findings: "",
      impact: "",
      status: "Completed",
      featured: true
    });
  };

  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    setEditMessage("");
    if (!editingProject) return;

    try {
      const isNew = !editingProject.id;
      let result;
      if (isNew) {
        result = await DB.addProject(editingProject as Omit<Project, "id" | "created_at">);
      } else {
        result = await DB.updateProject(editingProject.id!, editingProject);
      }

      if (result) {
        setEditMessage(`Project "${editingProject.title}" saved successfully.`);
        setEditingProject(null);
        fetchDashboardData();
      } else {
        setEditMessage("Failed to save project.");
      }
    } catch (err) {
      setEditMessage("Error saving project.");
    }
  };

  const handleDeleteProject = (id: string, name: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType("project");
    setEditMessage("");
  };

  const executeDeleteProject = async (id: string) => {
    try {
      const success = await DB.deleteProject(id);
      if (success) {
        setEditMessage("Research case deleted successfully.");
        fetchDashboardData();
      } else {
        setEditMessage("Failed to delete research case.");
      }
    } catch (err) {
      setEditMessage("Error deleting research case.");
    }
  };

  // ==========================================
  // TEAM MEMBERS CRUD
  // ==========================================
  const handleEditTeam = (member: TeamMember) => {
    setEditingTeam({ ...member });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewTeam = () => {
    setEditingTeam({
      name: "",
      slug: "",
      title: "",
      expertise: "",
      biography: "",
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    });
  };

  const handleSaveTeam = async (e: FormEvent) => {
    e.preventDefault();
    setEditMessage("");
    if (!editingTeam) return;

    try {
      const isNew = !editingTeam.id;
      let result;
      if (isNew) {
        result = await DB.addTeamMember(editingTeam as Omit<TeamMember, "id" | "created_at">);
      } else {
        result = await DB.updateTeamMember(editingTeam.id!, editingTeam);
      }

      if (result) {
        setEditMessage(`Team member "${editingTeam.name}" saved successfully.`);
        setEditingTeam(null);
        fetchDashboardData();
      } else {
        setEditMessage("Failed to save team member.");
      }
    } catch (err) {
      setEditMessage("Error saving team member.");
    }
  };

  const handleDeleteTeam = (id: string, name: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType("team");
    setEditMessage("");
  };

  const executeDeleteTeam = async (id: string) => {
    try {
      const success = await DB.deleteTeamMember(id);
      if (success) {
        setEditMessage("Faculty record deleted successfully.");
        fetchDashboardData();
      } else {
        setEditMessage("Failed to delete faculty record.");
      }
    } catch (err) {
      setEditMessage("Error deleting faculty record.");
    }
  };

  // ==========================================
  // SITE CONTENT UPDATE
  // ==========================================
  const handleSaveSiteContent = async (page: string, section: string, content: any) => {
    setEditMessage("");
    try {
      const result = await DB.updateSiteContent(page, section, content);
      if (result) {
        setEditMessage("Institutional site content updated successfully.");
        fetchDashboardData();
      } else {
        setEditMessage("Failed to update site content.");
      }
    } catch (err) {
      setEditMessage("Error updating site content.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#FCFAF6] min-h-screen flex items-center justify-center px-4 py-32" id="admin-login-screen">
        <div className="bg-white border border-[#E2E8F0] p-8 max-w-md w-full shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#B91C1C] flex items-center justify-center text-white font-serif font-black text-xl mx-auto">
              ΚΣ
            </div>
            <h1 className="font-serif text-xl font-bold text-[#111111]">Advisory Administrative Login</h1>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">KATHMANDU ECONOMICS PORTAL</p>
          </div>

          {authError && (
            <div className="bg-red-50 border-l-2 border-red-600 p-3 text-xs text-red-700 font-medium font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">SECURE CREDENTIAL CODE</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-3 text-xs focus:outline-none focus:border-[#B91C1C]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#B91C1C] text-white py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Verify Credentials
            </button>
          </form>
          <p className="text-[9px] font-mono text-center text-gray-400">
            Access strictly monitored under local cyber policies. KE_AUTH_V3.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF6] min-h-screen pt-32 pb-24" id="admin-dashboard-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <div className="text-xs font-mono font-bold text-[#B91C1C] uppercase tracking-widest">ADMINISTRATIVE DASHBOARD</div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#111111] mt-1">Kathmandu Economics CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="border border-[#E2E8F0] hover:bg-gray-100 text-gray-600 px-3.5 py-2 text-xs font-mono font-bold uppercase flex items-center gap-1.5 focus:outline-none transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Data
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#B91C1C] hover:bg-[#9E0113] text-white px-4 py-2 text-xs font-mono font-bold uppercase focus:outline-none transition-colors"
            >
              Terminate Session
            </button>
          </div>
        </div>

        {/* DATABASE CONNECTION STATUS */}
        {dbStatus && (
          <div className="bg-white border border-[#E2E8F0] p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DATABASE PERSISTENCE ENGINE</span>
                  {dbStatus.driver === "supabase" ? (
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-green-200">
                      Supabase Cloud Active
                    </span>
                  ) : dbStatus.connected && !dbStatus.tablesExist ? (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-amber-200 animate-pulse">
                      Action Required: Create Tables
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-gray-200">
                      Local JSON File Fallback
                    </span>
                  )}
                </div>
                
                <h2 className="font-serif text-lg font-bold text-[#111111]">{dbStatus.message}</h2>
                <p className="text-xs text-gray-500 mt-1">{dbStatus.details}</p>
                
                {dbStatus.error && (
                  <div className="mt-3 bg-red-50 border border-red-100 p-3 text-xs font-mono text-red-600">
                    <span className="font-bold">Error Details:</span> {dbStatus.error}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={checkDbStatus}
                  disabled={checkingDb}
                  className="bg-[#111111] hover:bg-[#B91C1C] disabled:bg-gray-400 text-white px-4 py-2 text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? "animate-spin" : ""}`} />
                  {checkingDb ? "Verifying..." : "Verify Connection"}
                </button>
              </div>
            </div>

            {/* Additional helper instruction to set up Supabase when tables are missing */}
            {dbStatus.connected && !dbStatus.tablesExist && (
              <div className="mt-5 border-t border-dashed border-gray-200 pt-5 space-y-3">
                <div className="bg-amber-50/50 border-l-2 border-amber-500 p-4">
                  <h4 className="text-xs font-mono font-bold text-[#B91C1C] uppercase tracking-wider mb-2">How to Initialize Your Supabase Database:</h4>
                  <ol className="text-xs text-gray-600 list-decimal pl-4 space-y-1.5 leading-relaxed font-sans">
                    <li>Go to your <strong className="text-gray-900">Supabase Project Dashboard</strong>.</li>
                    <li>Open the <strong className="text-gray-900 font-mono">SQL Editor</strong> from the left sidebar navigation.</li>
                    <li>Click <strong className="text-gray-900">"New query"</strong>.</li>
                    <li>Copy the SQL schema declarations from the file <strong className="text-gray-900 font-mono">/supabase-schema.sql</strong> in this workspace.</li>
                    <li>Paste them into the Supabase SQL editor and click <strong className="text-gray-900">Run</strong>.</li>
                    <li>Click the <strong className="text-gray-900">"Verify Connection"</strong> button above to activate cloud persistence!</li>
                  </ol>
                </div>
              </div>
            )}

            {/* If Supabase is not configured at all */}
            {!dbStatus.configured && (
              <div className="mt-5 border-t border-dashed border-gray-200 pt-5">
                <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 leading-relaxed font-sans">
                  <span className="font-bold block text-gray-800 font-mono text-[10px] uppercase tracking-wider mb-1.5">💡 DEVELOPMENT PERSISTENCE NOTICE</span>
                  Currently, the applet is running safely in <strong className="text-gray-900">Local File-Based Fallback Mode</strong>. This maintains fully persistent edits to your team members, projects, and site content inside a local database file in this container workspace, which is 100% fine for 4 to 5 team members and several projects per section.
                  <br /><br />
                  If you want to configure cloud-hosted production synchronization, add your <code className="bg-white px-1.5 py-0.5 border text-gray-800 font-semibold font-mono rounded">SUPABASE_URL</code> and <code className="bg-white px-1.5 py-0.5 border text-gray-800 font-semibold font-mono rounded">SUPABASE_ANON_KEY</code> (or service role key) environment variables in the AI Studio Settings panel.
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK MESSAGES */}
        {editMessage && (
          <div className="bg-green-50 border-l-2 border-green-600 p-4 text-xs text-green-700 font-mono font-semibold flex items-center gap-2 mb-6">
            <Check className="w-4 h-4 shrink-0" />
            {editMessage}
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2" id="admin-tabs">
          <button
            onClick={() => { setActiveTab("projects"); setEditingProject(null); setEditingTeam(null); }}
            className={`px-5 py-3 text-xs font-mono font-bold uppercase flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "projects" ? "border-[#B91C1C] text-[#B91C1C]" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            Research Cases ({projects.length})
          </button>
          <button
            onClick={() => { setActiveTab("team"); setEditingProject(null); setEditingTeam(null); }}
            className={`px-5 py-3 text-xs font-mono font-bold uppercase flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "team" ? "border-[#B91C1C] text-[#B91C1C]" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Users className="w-4 h-4" />
            Faculty Members ({team.length})
          </button>
          <button
            onClick={() => { setActiveTab("content"); setEditingProject(null); setEditingTeam(null); }}
            className={`px-5 py-3 text-xs font-mono font-bold uppercase flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "content" ? "border-[#B91C1C] text-[#B91C1C]" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            Sovereign Website Content
          </button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-20 font-mono text-xs text-gray-400">Loading CMS registry metrics...</div>
        ) : (
          <div>
            {/* ========================================================== */}
            {/* TABS 1: PROJECTS CRUDS */}
            {/* ========================================================== */}
            {activeTab === "projects" && (
              <div className="space-y-8 animate-fade-in">
                {editingProject ? (
                  // PROJECT SAVE/EDIT FORM
                  <form onSubmit={handleSaveProject} className="bg-white border border-[#E2E8F0] p-6 sm:p-10 space-y-6 shadow-sm">
                    <h3 className="font-serif text-lg font-extrabold text-[#111111] border-b pb-3 mb-4">
                      {editingProject.id ? "Modify Advisory Research Publication" : "Register New Economic Research Case"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">TITLE</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">URL SLUG (UNIQUE)</label>
                        <input
                          type="text"
                          required
                          value={editingProject.slug || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">PRACTICE AREA</label>
                        <select
                          value={editingProject.practice_area || "economic-modelling"}
                          onChange={(e) => setEditingProject({ ...editingProject, practice_area: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        >
                          <option value="economic-modelling">Economic Modelling</option>
                          <option value="socioeconomic-impact-assessment">Socioeconomic Impact Assessment</option>
                          <option value="economic-financial-advisory">Economic & Financial Advisory</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">STATUS</label>
                        <select
                          value={editingProject.status || "Completed"}
                          onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        >
                          <option value="Completed">Completed</option>
                          <option value="Active">Active</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">FEATURE ON HOMEPAGE</label>
                        <select
                          value={editingProject.featured ? "true" : "false"}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.value === "true" })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        >
                          <option value="true">Featured</option>
                          <option value="false">Standard Listing</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-1">
                        <ImageUpload
                          label="Featured Cover Photo"
                          value={editingProject.featured_image || ""}
                          onChange={(val) => setEditingProject({ ...editingProject, featured_image: val })}
                          aspectRatio={16 / 9}
                          aspectRatioLabel="16:9 Landscape"
                          targetWidth={1200}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">EXECUTIVE SUMMARY</label>
                        <textarea
                          required
                          rows={3}
                          value={editingProject.summary || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">FULL RESEARCH BRIEF CONTENT (HTML/PARAGRAPHS)</label>
                        <textarea
                          rows={5}
                          value={editingProject.content || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">THE ECONOMIC CHALLENGE</label>
                        <textarea
                          required
                          rows={4}
                          value={editingProject.challenge || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">METHODOLOGICAL FRAMEWORK</label>
                        <textarea
                          required
                          rows={4}
                          value={editingProject.methodology || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, methodology: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">KEY EMPIRICAL FINDINGS</label>
                        <textarea
                          required
                          rows={4}
                          value={editingProject.findings || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, findings: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">SOVEREIGN & SECTORAL IMPACT</label>
                        <textarea
                          required
                          rows={4}
                          value={editingProject.impact || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="border border-gray-300 px-5 py-2.5 text-xs font-mono font-bold uppercase transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#B91C1C] hover:bg-[#9E0113] text-white px-6 py-2.5 text-xs font-mono font-bold uppercase transition-colors"
                      >
                        Save Publication
                      </button>
                    </div>
                  </form>
                ) : (
                  // PROJECTS LIST VIEW
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#E2E8F0]">
                      <h3 className="font-serif font-extrabold text-[#111111] text-base">Registered Case Publications Directory</h3>
                      <button
                        onClick={handleNewProject}
                        className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors focus:outline-none"
                      >
                        <Plus className="w-4 h-4" />
                        Add Research Case
                      </button>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
                        <thead className="bg-[#FCFAF6] font-mono text-[9px] uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-4">Title / Publication Code</th>
                            <th className="px-6 py-4">Practice Division</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Frontpage</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {projects.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4">
                                <div className="font-serif font-bold text-gray-900 text-sm">{p.title}</div>
                                <div className="font-mono text-[9px] text-gray-400 mt-0.5">SLUG: {p.slug} // ID: {p.id}</div>
                              </td>
                              <td className="px-6 py-4 uppercase font-mono text-[10px] text-[#B91C1C] font-bold">
                                {p.practice_area.replace("-", " ")}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 font-mono text-[9px] font-bold border ${
                                  p.status === "Completed" ? "bg-green-50 border-green-200 text-green-700" : "bg-blue-50 border-blue-200 text-blue-700"
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-[10px]">
                                {p.featured ? "FEATURED" : "STANDARD"}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {deleteConfirmId === p.id && deleteConfirmType === "project" ? (
                                  <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-2 py-1">
                                    <span className="font-mono text-[9px] text-[#B91C1C] font-bold uppercase">Confirm?</span>
                                    <button
                                      onClick={() => {
                                        setDeleteConfirmId(null);
                                        setDeleteConfirmType(null);
                                        executeDeleteProject(p.id);
                                      }}
                                      className="bg-[#B91C1C] hover:bg-[#9E0113] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase cursor-pointer"
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeleteConfirmId(null);
                                        setDeleteConfirmType(null);
                                      }}
                                      className="text-gray-500 hover:text-gray-700 font-mono text-[9px] font-bold uppercase cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-x-3">
                                    <button
                                      onClick={() => handleEditProject(p)}
                                      className="text-blue-600 hover:text-blue-800 focus:outline-none font-mono font-bold text-[10px] uppercase cursor-pointer"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProject(p.id, p.title)}
                                      className="text-[#B91C1C] hover:text-[#9E0113] focus:outline-none font-mono font-bold text-[10px] uppercase cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TABS 2: TEAM CRUDS */}
            {/* ========================================================== */}
            {activeTab === "team" && (
              <div className="space-y-8 animate-fade-in">
                {editingTeam ? (
                  // TEAM SAVE/EDIT FORM
                  <form onSubmit={handleSaveTeam} className="bg-white border border-[#E2E8F0] p-6 sm:p-10 space-y-6 shadow-sm">
                    <h3 className="font-serif text-lg font-extrabold text-[#111111] border-b pb-3 mb-4">
                      {editingTeam.id ? "Modify Faculty Member Credentials" : "Enroll New Faculty Economist Record"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={editingTeam.name || ""}
                          onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">URL SLUG (UNIQUE)</label>
                        <input
                          type="text"
                          required
                          value={editingTeam.slug || ""}
                          onChange={(e) => setEditingTeam({ ...editingTeam, slug: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">TITLE & RANK</label>
                        <input
                          type="text"
                          required
                          value={editingTeam.title || ""}
                          onChange={(e) => setEditingTeam({ ...editingTeam, title: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">EXPERT DOMAIN & SPECIALTY</label>
                        <input
                          type="text"
                          required
                          value={editingTeam.expertise || ""}
                          onChange={(e) => setEditingTeam({ ...editingTeam, expertise: e.target.value })}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUpload
                        label="Faculty Headshot Photo"
                        value={editingTeam.photo_url || ""}
                        onChange={(val) => setEditingTeam({ ...editingTeam, photo_url: val })}
                        aspectRatio={1}
                        aspectRatioLabel="1:1 Square"
                        targetWidth={500}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-500 uppercase">DOCTORAL / PROFESSIONAL CV & BIOGRAPHY</label>
                      <textarea
                        required
                        rows={6}
                        value={editingTeam.biography || ""}
                        onChange={(e) => setEditingTeam({ ...editingTeam, biography: e.target.value })}
                        className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setEditingTeam(null)}
                        className="border border-gray-300 px-5 py-2.5 text-xs font-mono font-bold uppercase transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#B91C1C] hover:bg-[#9E0113] text-white px-6 py-2.5 text-xs font-mono font-bold uppercase transition-colors"
                      >
                        Save Faculty Record
                      </button>
                    </div>
                  </form>
                ) : (
                  // TEAM LIST VIEW
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 border border-[#E2E8F0]">
                      <h3 className="font-serif font-extrabold text-[#111111] text-base">Sovereign Expert Registry</h3>
                      <button
                        onClick={handleNewTeam}
                        className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors focus:outline-none"
                      >
                        <Plus className="w-4 h-4" />
                        Enroll Faculty Member
                      </button>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
                        <thead className="bg-[#FCFAF6] font-mono text-[9px] uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-4">Faculty Member Details</th>
                            <th className="px-6 py-4">Title / Rank</th>
                            <th className="px-6 py-4">Doctoral Specialty</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {team.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 flex items-center gap-3">
                                <img
                                  src={m.photo_url}
                                  alt={m.name}
                                  className="w-10 h-10 object-cover rounded-full filter grayscale border"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-serif font-bold text-gray-900 text-sm">{m.name}</div>
                                  <div className="font-mono text-[9px] text-gray-400">SLUG: {m.slug}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-mono text-[10px] text-[#B91C1C] font-bold">
                                {m.title}
                              </td>
                              <td className="px-6 py-4 text-xs italic">
                                {m.expertise}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {deleteConfirmId === m.id && deleteConfirmType === "team" ? (
                                  <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-2 py-1">
                                    <span className="font-mono text-[9px] text-[#B91C1C] font-bold uppercase">Confirm?</span>
                                    <button
                                      onClick={() => {
                                        setDeleteConfirmId(null);
                                        setDeleteConfirmType(null);
                                        executeDeleteTeam(m.id);
                                      }}
                                      className="bg-[#B91C1C] hover:bg-[#9E0113] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase cursor-pointer"
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeleteConfirmId(null);
                                        setDeleteConfirmType(null);
                                      }}
                                      className="text-gray-500 hover:text-gray-700 font-mono text-[9px] font-bold uppercase cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-x-3">
                                    <button
                                      onClick={() => handleEditTeam(m)}
                                      className="text-blue-600 hover:text-blue-800 focus:outline-none font-mono font-bold text-[10px] uppercase cursor-pointer"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTeam(m.id, m.name)}
                                      className="text-[#B91C1C] hover:text-[#9E0113] focus:outline-none font-mono font-bold text-[10px] uppercase cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TABS 3: SITE CONTENT EDITORS */}
            {/* ========================================================== */}
            {activeTab === "content" && (
              <div className="space-y-8 animate-fade-in" id="content-edit-tab">
                {/* HOMEPAGE CONTENT CARD */}
                <div className="bg-white border border-[#E2E8F0] p-6 sm:p-10 space-y-6 shadow-sm">
                  <h3 className="font-serif text-lg font-extrabold text-[#111111] border-b pb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#B91C1C]" />
                    Page content settings: Homepage Hero & About Briefing
                  </h3>

                  {/* Homepage Hero editor */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest border-l-2 border-[#B91C1C] pl-3">HOMEPAGE HERO SECTION</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">HERO MAIN HEADLINE</label>
                        <input
                          type="text"
                          value={homeHeroHeadline}
                          onChange={(e) => setHomeHeroHeadline(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">HERO SUBHEADLINE DESCRIPTION</label>
                        <textarea
                          rows={3}
                          value={homeHeroSubheadline}
                          onChange={(e) => setHomeHeroSubheadline(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveSiteContent("home", "hero", { headline: homeHeroHeadline, subheadline: homeHeroSubheadline })}
                      className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300"
                    >
                      Save Hero Block
                    </button>
                  </div>

                  {/* About Preview editor */}
                  <div className="space-y-4 border-t pt-8">
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest border-l-2 border-[#B91C1C] pl-3">HOMEPAGE ABOUT SPLIT PREVIEW</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">PREVIEW HEADER TITLE</label>
                        <input
                          type="text"
                          value={homeAboutPreviewTitle}
                          onChange={(e) => setHomeAboutPreviewTitle(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">PREVIEW CONTENT BODY</label>
                        <textarea
                          rows={4}
                          value={homeAboutPreviewText}
                          onChange={(e) => setHomeAboutPreviewText(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveSiteContent("home", "about_preview", { title: homeAboutPreviewTitle, text: homeAboutPreviewText })}
                      className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300"
                    >
                      Save Preview Block
                    </button>
                  </div>
                </div>

                {/* ABOUT US PAGE CONTENT CARD */}
                <div className="bg-white border border-[#E2E8F0] p-6 sm:p-10 space-y-6 shadow-sm">
                  <h3 className="font-serif text-lg font-extrabold text-[#111111] border-b pb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#B91C1C]" />
                    Page content settings: About Us Intro & Mission Values
                  </h3>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest border-l-2 border-[#B91C1C] pl-3">ABOUT US PAGE SECTION 1</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">INTRODUCTION TITLE</label>
                        <input
                          type="text"
                          value={aboutIntroTitle}
                          onChange={(e) => setAboutIntroTitle(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">INTRODUCTION BODY COPY</label>
                        <textarea
                          rows={4}
                          value={aboutIntroText}
                          onChange={(e) => setAboutIntroText(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveSiteContent("about", "introduction", { title: aboutIntroTitle, text: aboutIntroText })}
                      className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300"
                    >
                      Save About Intro
                    </button>
                  </div>

                  <div className="space-y-4 border-t pt-8">
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest border-l-2 border-[#B91C1C] pl-3">MISSION STATEMENT (CHARTER)</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">MISSION STATEMENT HEADLINE</label>
                        <input
                          type="text"
                          value={missionTitle}
                          onChange={(e) => setMissionTitle(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-4 py-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-500 uppercase">MISSION DECLARATION</label>
                        <textarea
                          rows={4}
                          value={missionText}
                          onChange={(e) => setMissionText(e.target.value)}
                          className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-4 text-xs focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSaveSiteContent("mission_values", "mission", { title: missionTitle, text: missionText })}
                      className="bg-[#111111] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-300"
                    >
                      Save Charter Mission
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
