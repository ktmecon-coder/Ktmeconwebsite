import { useState, FormEvent } from "react";
import { Mail, MapPin, CheckCircle, ArrowRight, ShieldCheck, Globe, Linkedin } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    practice: "economic-modelling",
    details: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Advisory inquiry received:", formData);
    setSubmitted(true);
  };

  const titleText = "Inquiries & Engagement";
  const titleWords = titleText.split(" ");
  const lastTitleWord = titleWords.pop() || "";
  const mainTitleWords = titleWords.join(" ");

  return (
    <div className="bg-[#FAF8F5] text-[#111111] min-h-screen font-sans selection:bg-[#B91C1C] selection:text-white" id="contact-page">
      {/* Header Spacer */}
      <div className="h-20 lg:h-24 bg-[#FAF8F5]" />

      {/* PAGE HERO - SOPHISTICATED EDITORIAL HEADER */}
      <header className="py-24 sm:py-32 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="space-y-12">
            <ScrollReveal variant="fade-up" duration={0.6}>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-[#B91C1C]" />
                <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-[#B91C1C] font-extrabold">
                  Institutional Channel
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
                    Formal Advisory Requests
                  </p>
                </ScrollReveal>
                <ScrollReveal variant="words" stagger={0.015} delay={0.4}>
                  <p className="font-serif text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                    We welcome structured inquiries regarding research collaborations, policy advisory, and private sector engagements. Our principal economists evaluate every brief and respond within two business days.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TWO COLUMN INTERACTION */}
      <section className="py-24 bg-[#F3EFE6]/40 border-t border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: Contact Info & Accents */}
            <div className="lg:col-span-5 space-y-10" id="contact-details-col">
              <div className="space-y-5">
                <ScrollReveal variant="fade-up" duration={0.6}>
                  <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B91C1C] font-extrabold block">
                    Institutional Coordinates
                  </span>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={0.1} duration={0.6}>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] tracking-tight">
                    Office & Operations
                  </h2>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
                  <p className="font-serif text-neutral-600 text-base leading-relaxed font-light">
                    Our core research operations are situated at the corporate headquarters in Dhumbarahi, Kathmandu.
                  </p>
                </ScrollReveal>
              </div>

              {/* Minimal Address Lines with custom styling */}
              <div className="space-y-8 pt-6 border-t border-neutral-200">
                {/* Address */}
                <ScrollReveal variant="fade-up" delay={0.1} duration={0.8}>
                  <div className="group flex gap-5 items-start">
                    <div className="p-3 bg-[#F3EFE6] text-neutral-700 rounded-xl group-hover:bg-[#B91C1C] group-hover:text-white transition-all duration-500 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Corporate Headquarters</h4>
                      <p className="font-serif text-sm text-neutral-800 leading-relaxed font-light">
                        Dhumbarahi, Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Email Address */}
                <ScrollReveal variant="fade-up" delay={0.2} duration={0.8}>
                  <div className="group flex gap-5 items-start">
                    <div className="p-3 bg-[#F3EFE6] text-neutral-700 rounded-xl group-hover:bg-[#B91C1C] group-hover:text-white transition-all duration-500 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Electronic Mailboxes</h4>
                      <div className="space-y-1.5 font-serif text-sm text-neutral-800 leading-relaxed font-light">
                        <p>
                          <a href="mailto:info@kathmandueconomics.com.np" className="hover:text-[#B91C1C] transition-colors duration-300 font-medium text-neutral-900 underline decoration-neutral-300 decoration-1 hover:decoration-[#B91C1C]">
                            info@kathmandueconomics.com.np
                          </a>
                        </p>
                        <p>
                          <a href="mailto:ktmecon@gmail.com" className="hover:text-[#B91C1C] transition-colors duration-300 text-neutral-600">
                            ktmecon@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* LinkedIn Follow Button */}
                <ScrollReveal variant="fade-up" delay={0.25} duration={0.8}>
                  <div className="group flex gap-5 items-start">
                    <div className="p-3 bg-[#F3EFE6] text-neutral-700 rounded-xl group-hover:bg-[#B91C1C] group-hover:text-white transition-all duration-500 shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="space-y-2 w-full">
                      <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">LinkedIn Profile</h4>
                      <a 
                        href="https://www.linkedin.com/company/kathmandu-economics" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0077B5] hover:bg-[#005582] text-white text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                      >
                        <Linkedin className="w-3.5 h-3.5 fill-white text-transparent" />
                        Follow us on LinkedIn
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Premium Google Map Card */}
              <ScrollReveal variant="fade-up" delay={0.3} duration={0.8}>
                <div className="rounded-[28px] overflow-hidden border border-neutral-200/60 shadow-sm bg-white p-2">
                  <div className="aspect-[16/10] w-full rounded-[22px] overflow-hidden bg-neutral-100 relative">
                    <iframe
                      src="https://maps.google.com/maps?q=27.725357800486375,85.34019042801604&z=16&output=embed"
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Kathmandu Economics Corporate Address"
                    ></iframe>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Head Office Coordinates</h4>
                      <p className="font-serif text-xs text-neutral-600 mt-0.5">27.725358, 85.340190</p>
                    </div>
                    <a
                      href="https://maps.google.com/maps?q=27.725357800486375,85.34019042801604&z=16"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono uppercase tracking-widest text-[#B91C1C] hover:underline font-bold"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7" id="contact-form-col">
              <ScrollReveal variant="fade-up" duration={0.8}>
                <div className="bg-white border border-[#E2E8F0] p-8 sm:p-12 rounded-[32px] shadow-sm hover:shadow-md transition-shadow duration-300">
                  {submitted ? (
                    <div className="text-center py-16 space-y-6">
                      <div className="w-20 h-20 mx-auto bg-green-50 text-green-600 flex items-center justify-center rounded-full border border-green-200">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl font-light text-neutral-900">Inquiry Registered</h3>
                        <p className="text-sm text-neutral-500 font-serif leading-relaxed max-w-md mx-auto font-light">
                          Your formal research briefing has been dispatched to our Managing Director. A principal economist has been assigned to evaluate the scope and will contact you within two business days.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", organization: "", practice: "economic-modelling", details: "" });
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B91C1C] hover:underline uppercase tracking-wider"
                      >
                        Submit Another Inquiry <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl font-light text-[#111111]">Advisory Engagement Brief</h3>
                        <p className="text-xs text-neutral-400 font-serif font-light">All formal submissions are held in strict institutional confidentiality. Fields marked are required.</p>
                      </div>

                      <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Dr. Samir Bhandari"
                            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-5 py-4 text-sm text-neutral-800 focus:outline-none focus:border-[#B91C1C] focus:bg-white transition-all duration-300 rounded-[12px] font-serif font-light"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Official Email Address</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. bhandari@ministry.gov.np"
                            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-5 py-4 text-sm text-neutral-800 focus:outline-none focus:border-[#B91C1C] focus:bg-white transition-all duration-300 rounded-[12px] font-serif font-light"
                          />
                        </div>

                        {/* Organization */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Organization / Department</label>
                          <input
                            type="text"
                            required
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="e.g. Ministry of Federal Affairs"
                            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-5 py-4 text-sm text-neutral-800 focus:outline-none focus:border-[#B91C1C] focus:bg-white transition-all duration-300 rounded-[12px] font-serif font-light"
                          />
                        </div>

                        {/* Practice Area */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Practice Area of Inquiry</label>
                          <select
                            value={formData.practice}
                            onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] px-5 py-4 text-sm text-neutral-800 focus:outline-none focus:border-[#B91C1C] focus:bg-white transition-all duration-300 rounded-[12px] font-serif font-light appearance-none"
                          >
                            <option value="economic-modelling">Economic Modelling & Quantitative Research</option>
                            <option value="socioeconomic-impact-assessment">Socioeconomic Impact Assessment</option>
                            <option value="economic-financial-advisory">Economic & Financial Advisory</option>
                          </select>
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Scope of Work & Terms of Reference (TOR)</label>
                          <textarea
                            required
                            rows={5}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            placeholder="Please outline the economic questions, survey parameters, or modeling requirements you wish to address..."
                            className="w-full bg-[#FCFAF6] border border-[#E2E8F0] p-5 text-sm text-neutral-800 focus:outline-none focus:border-[#B91C1C] focus:bg-white transition-all duration-300 rounded-[12px] font-serif font-light leading-relaxed"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-[#B91C1C] hover:bg-[#9E0113] text-white py-5 px-6 rounded-[12px] text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 group"
                      >
                        Dispatch Advisory Brief 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

