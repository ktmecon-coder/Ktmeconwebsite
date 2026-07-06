import { useState, useMemo } from "react";
import { ArrowRight, TrendingUp, ShieldAlert, Sparkles, Sliders, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type ActiveModel = "npv" | "risk" | "tariff";

export default function InteractiveAdvisoryShowcase() {
  const [activeModel, setActiveModel] = useState<ActiveModel>("npv");

  // ---------------------------------------------------------------------------
  // MODEL 1: CAPITAL ALLOCATION & NPV MODEL STATE & MATH
  // ---------------------------------------------------------------------------
  const [capex, setCapex] = useState(100); // in Million USD
  const [opex, setOpex] = useState(15); // annual in Million USD
  const [revenue, setRevenue] = useState(42); // annual in Million USD
  const [discountRate, setDiscountRate] = useState(10); // in %

  const npvData = useMemo(() => {
    const rate = discountRate / 100;
    const flows: number[] = [-capex];
    let cumulative = -capex;
    let paybackYear = -1;

    for (let t = 1; t <= 5; t++) {
      const netCash = revenue - opex;
      flows.push(netCash);
      cumulative += netCash;
      if (cumulative >= 0 && paybackYear === -1) {
        paybackYear = t - 1 + (Math.abs(cumulative - netCash) / netCash);
      }
    }

    // Calculate NPV
    let calculatedNpv = 0;
    for (let t = 0; t <= 5; t++) {
      calculatedNpv += flows[t] / Math.pow(1 + rate, t);
    }

    // Estimate IRR (simplistic secant method or bisection for a simple steady flow)
    // -CapEx + (Rev - OpEx) * PVFactor = 0
    // PVFactor = CapEx / (Rev - OpEx)
    const annualInflow = revenue - opex;
    let irr = 0;
    if (annualInflow > 0 && capex > 0) {
      const ratio = capex / annualInflow;
      // PVFA = (1 - (1+r)^-5) / r = ratio
      // Simple numerical search for r
      let low = 0;
      let high = 2.0;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        const pvfa = mid === 0 ? 5 : (1 - Math.pow(1 + mid, -5)) / mid;
        if (pvfa > ratio) {
          low = mid;
        } else {
          high = mid;
        }
      }
      irr = ((low + high) / 2) * 100;
    }

    return {
      cashFlows: flows,
      npv: calculatedNpv,
      irr: irr > 150 ? 150 : irr,
      payback: paybackYear > 0 ? paybackYear.toFixed(1) : "N/A"
    };
  }, [capex, opex, revenue, discountRate]);

  // ---------------------------------------------------------------------------
  // MODEL 2: PROBABILISTIC RISK MODEL STATE & MATH
  // ---------------------------------------------------------------------------
  const [stressScenario, setStressScenario] = useState<"baseline" | "shock" | "expansion">("baseline");
  const [volatility, setVolatility] = useState(25); // in %

  const riskMetrics = useMemo(() => {
    let meanReturn = 12; // baseline annual %
    if (stressScenario === "shock") meanReturn = -18;
    if (stressScenario === "expansion") meanReturn = 28;

    const vol = volatility / 100;
    const z95 = 1.645;
    const z99 = 2.326;

    const var95 = meanReturn - (z95 * volatility);
    const var99 = meanReturn - (z99 * volatility);

    // Expected shortfall approximation
    const es95 = meanReturn - (2.06 * volatility);

    return {
      expectedReturn: meanReturn,
      var95: var95.toFixed(1),
      var99: var99.toFixed(1),
      es95: es95.toFixed(1)
    };
  }, [stressScenario, volatility]);

  // ---------------------------------------------------------------------------
  // MODEL 3: REGULATORY TARIFF SCHEDULE STATE & MATH
  // ---------------------------------------------------------------------------
  const [baseRate, setBaseRate] = useState(12); // Base price cents/kWh or per unit
  const [elasticity, setElasticity] = useState(30); // in %, represents negative elasticities e.g. -0.30
  const [capexRequirement, setCapexRequirement] = useState(45); // in Million USD infrastructure capex

  const tariffMetrics = useMemo(() => {
    // Basic demand elasticity formulation
    // Quantity = Q_base * (Price / Price_base) ^ Elasticity
    // Let Q_base = 500 Million units at standard Price of 10 cents.
    const priceRatio = baseRate / 10;
    const e = -(elasticity / 100);
    const quantity = 500 * Math.pow(priceRatio, e);
    const totalRevenue = (quantity * baseRate) / 100; // in Million USD
    
    // Operating cost of utility
    const fixedCosts = 15; // Million USD
    const variableCostPerUnit = 4; // Cents per unit
    const totalOpCost = fixedCosts + (quantity * variableCostPerUnit) / 100;
    
    const profit = totalRevenue - totalOpCost;
    
    // Cost recovery ratio including Capex amortization (assuming 10-year straight line, i.e. 10% per year)
    const annualCapexCost = capexRequirement * 0.1;
    const totalAnnualRequirement = totalOpCost + annualCapexCost;
    const recoveryRatio = (totalRevenue / totalAnnualRequirement) * 100;

    // Consumer affordability index (scaled 1-100 where lower rate is better)
    const affordability = Math.max(10, Math.min(100, (baseRate * 7)));

    return {
      quantity: quantity.toFixed(1),
      revenue: totalRevenue.toFixed(1),
      profit: profit.toFixed(1),
      recoveryRatio: recoveryRatio.toFixed(1),
      affordability: (100 - affordability).toFixed(0) // Higher score is better affordability
    };
  }, [baseRate, elasticity, capexRequirement]);

  return (
    <div className="bg-[#FCFAF6] border-t border-b border-neutral-200/80 py-28 relative overflow-hidden" id="analytics-showcase-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT EXPOSITION */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <ScrollReveal variant="fade-up" duration={0.6}>
                <div className="flex items-center gap-3">
                  <span className="h-[2.5px] w-8 bg-[#B91C1C]" />
                  <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#B91C1C] font-extrabold">
                    Interactive Proof
                  </span>
                </div>
              </ScrollReveal>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] leading-tight tracking-tight">
                <ScrollReveal variant="words" stagger={0.03}>
                  Analytical Simulation Suite
                </ScrollReveal>
              </h2>
            </div>

            <p className="font-serif text-neutral-600 text-base leading-relaxed font-light">
              This interactive suite demonstrates the empirical logic and mathematical modeling that Kathmandu Economics applies to private sector transactions, regulatory tariffs, and portfolio risk management.
            </p>

            {/* MODEL SELECTORS */}
            <div className="space-y-3 pt-4">
              <button
                onClick={() => setActiveModel("npv")}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                  activeModel === "npv"
                    ? "bg-white border-neutral-300 shadow-md text-neutral-900"
                    : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B91C1C] font-bold block">Module 01</span>
                  <span className="font-serif text-lg font-light">Capital Allocation & NPV</span>
                </div>
                <TrendingUp className={`w-5 h-5 text-[#B91C1C] transition-transform duration-300 ${activeModel === "npv" ? "scale-110" : "opacity-40"}`} />
              </button>

              <button
                onClick={() => setActiveModel("risk")}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                  activeModel === "risk"
                    ? "bg-white border-neutral-300 shadow-md text-neutral-900"
                    : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B91C1C] font-bold block">Module 02</span>
                  <span className="font-serif text-lg font-light">Probabilistic Risk & Stress Testing</span>
                </div>
                <ShieldAlert className={`w-5 h-5 text-[#B91C1C] transition-transform duration-300 ${activeModel === "risk" ? "scale-110" : "opacity-40"}`} />
              </button>

              <button
                onClick={() => setActiveModel("tariff")}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                  activeModel === "tariff"
                    ? "bg-white border-neutral-300 shadow-md text-neutral-900"
                    : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B91C1C] font-bold block">Module 03</span>
                  <span className="font-serif text-lg font-light">Utility Tariff Pricing Elasticity</span>
                </div>
                <Sparkles className={`w-5 h-5 text-[#B91C1C] transition-transform duration-300 ${activeModel === "tariff" ? "scale-110" : "opacity-40"}`} />
              </button>
            </div>
          </div>

          {/* RIGHT DYNAMIC MODEL SHEET */}
          <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-[32px] p-8 sm:p-12 shadow-sm relative">
            
            {/* 1. NPV CAPITAL ALLOCATION MODEL */}
            {activeModel === "npv" && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B91C1C] font-bold">Economic Appraisal Tool</span>
                  <h3 className="font-serif text-2xl font-light text-neutral-900">Capital Allocation & Discounted Cash Flow</h3>
                  <p className="text-xs text-neutral-400 font-serif font-light leading-relaxed">
                    Adjust investment metrics below to model project viability, discounted cash flow (DCF) yield curves, and exact payback periods.
                  </p>
                </div>

                {/* CONTROLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-[#FAF8F5] rounded-2xl border border-neutral-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Initial CapEx:</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">${capex}M</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      step="5"
                      value={capex}
                      onChange={(e) => setCapex(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>$20M</span>
                      <span>$250M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Annual Net Revenue:</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">${revenue}M</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="1"
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>$10M</span>
                      <span>$80M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Annual OpEx:</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">${opex}M</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={opex}
                      onChange={(e) => setOpex(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>$5M</span>
                      <span>$40M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Discount Rate (Cost of Capital):</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">{discountRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="20"
                      step="0.5"
                      value={discountRate}
                      onChange={(e) => setDiscountRate(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>4%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                {/* RESULTS SHEET */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Net Present Value (NPV)</span>
                    <div className={`font-serif text-3xl font-light ${npvData.npv >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {npvData.npv >= 0 ? "+" : ""}${npvData.npv.toFixed(1)}M
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      {npvData.npv >= 0 ? "Project yields returns above cost of capital" : "Project does not recover cost of capital"}
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Internal Rate of Return (IRR)</span>
                    <div className={`font-serif text-3xl font-light ${npvData.irr >= discountRate ? "text-green-600" : "text-red-500"}`}>
                      {npvData.irr.toFixed(1)}%
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Target Hurdle Rate is {discountRate}%
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Discounted Payback Period</span>
                    <div className="font-serif text-3xl font-light text-neutral-800">
                      {npvData.payback} {npvData.payback !== "N/A" ? "Years" : ""}
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Time frame to recover initial capital investment
                    </p>
                  </div>
                </div>

                {/* GRAPHICAL REPRESENTATION - HIGH END SVG CANVAS */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">5-Year Cumulative Discounted Cash Flow Chart</h4>
                  <div className="relative w-full h-48 bg-[#FAF8F5] border border-neutral-100 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                      <div className="w-full border-t border-dashed border-neutral-200" />
                      <div className="w-full border-t border-solid border-neutral-300" style={{ transform: "translateY(-40%)" }} />
                      <div className="w-full border-t border-dashed border-neutral-200" />
                    </div>

                    {/* SVG Line & Bar Overlay */}
                    <svg className="w-full h-full relative z-10" viewBox="0 0 500 120" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#E2E8F0" strokeWidth="1" />
                      
                      {/* Bars & Dots */}
                      {npvData.cashFlows.map((flow, i) => {
                        const x = 40 + i * 85;
                        // Map flow to height. Max flow around 100, Min flow around -250
                        const yZero = 60;
                        let height = (flow / 150) * 45; // Scale
                        if (height > 45) height = 45;
                        if (height < -45) height = -45;

                        return (
                          <g key={i} className="group/bar">
                            <rect
                              x={x - 12}
                              y={flow >= 0 ? yZero - height : yZero}
                              width="24"
                              height={Math.abs(height)}
                              fill={flow >= 0 ? "#16A34A" : "#B91C1C"}
                              rx="3"
                              className="transition-all duration-500 ease-out opacity-80 hover:opacity-100"
                            />
                            <text
                              x={x}
                              y={flow >= 0 ? yZero - height - 6 : yZero - height + 12}
                              textAnchor="middle"
                              className="text-[8px] font-mono font-bold fill-neutral-600"
                            >
                              {flow >= 0 ? "+" : ""}{flow.toFixed(0)}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Timeline Legend */}
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500 px-4">
                      <span>Yr 0 (CapEx)</span>
                      <span>Yr 1</span>
                      <span>Yr 2</span>
                      <span>Yr 3</span>
                      <span>Yr 4</span>
                      <span>Yr 5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ACTUARIAL PROBABILISTIC RISK MODEL */}
            {activeModel === "risk" && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B91C1C] font-bold">Actuarial Stress Testing</span>
                  <h3 className="font-serif text-2xl font-light text-neutral-900">Probabilistic Risk Distribution & Value-at-Risk</h3>
                  <p className="text-xs text-neutral-400 font-serif font-light leading-relaxed">
                    Evaluate expected portfolio or asset value distributions under regulatory stress parameters and volatility shocks.
                  </p>
                </div>

                {/* CONTROLS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-[#FAF8F5] rounded-2xl border border-neutral-100">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">Macro Scenario Profile</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["shock", "baseline", "expansion"] as const).map((scen) => (
                        <button
                          key={scen}
                          onClick={() => setStressScenario(scen)}
                          className={`py-3 px-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 border text-center ${
                            stressScenario === scen
                              ? "bg-[#B91C1C] border-[#B91C1C] text-white shadow-sm"
                              : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-800"
                          }`}
                        >
                          {scen}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Asset Volatility (Uncertainty Range):</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">{volatility}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={volatility}
                      onChange={(e) => setVolatility(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>Low (10%)</span>
                      <span>High (50%)</span>
                    </div>
                  </div>
                </div>

                {/* METRICS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1 bg-[#FAF8F5]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Expected Annual Yield</span>
                    <div className="font-serif text-3xl font-light text-neutral-800">
                      {riskMetrics.expectedReturn}%
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Mean return based on global scenario
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Value-at-Risk (95% VaR)</span>
                    <div className={`font-serif text-3xl font-light ${Number(riskMetrics.var95) < 0 ? "text-red-600" : "text-green-600"}`}>
                      {riskMetrics.var95}%
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      95% statistical confidence lower bound yield
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B91C1C] font-bold">95% Expected Shortfall (ES)</span>
                    <div className="font-serif text-3xl font-light text-red-700">
                      {riskMetrics.es95}%
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Expected average return in worst 5% of shocks
                    </p>
                  </div>
                </div>

                {/* PROBABILITY DENSITY CURVE ACCENT */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Statistical Probability Density Distribution Curve</h4>
                  <div className="relative w-full h-40 bg-neutral-900 rounded-2xl p-6 overflow-hidden flex flex-col justify-end">
                    
                    {/* SVG Curve */}
                    <svg className="w-full h-full absolute inset-0 pt-6" viewBox="0 0 400 100" preserveAspectRatio="none">
                      {/* Shaded Tail Risk */}
                      <path
                        d="M 0,100 L 150,100 L 150,85 C 130,80 110,65 0,100 Z"
                        fill="#B91C1C"
                        opacity="0.3"
                      />
                      {/* Normal Distribution Curve Line */}
                      <path
                        d={`M 0,100 Q 150,${stressScenario === 'shock' ? '15' : stressScenario === 'expansion' ? '85' : '45'} 250,10 Q 300,90 400,100`}
                        fill="none"
                        stroke="#B91C1C"
                        strokeWidth="2"
                        className="transition-all duration-700 ease-out"
                      />
                      
                      {/* Scanline VaR Indicator */}
                      <line x1="150" y1="0" x2="150" y2="100" stroke="#EF4444" strokeDasharray="3,3" strokeWidth="1.5" />
                    </svg>

                    <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span>95% Tail Risk Threshold</span>
                      <span className="text-[#EF4444] font-bold">95% VaR: {riskMetrics.var95}%</span>
                      <span>Asset Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. REGULATORY TARIFF MODEL */}
            {activeModel === "tariff" && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#B91C1C] font-bold">Regulatory Design Suite</span>
                  <h3 className="font-serif text-2xl font-light text-neutral-900">Utility Tariff Cost-Recovery & Price Elasticity</h3>
                  <p className="text-xs text-neutral-400 font-serif font-light leading-relaxed">
                    Calibrate public utility tariff schedules to ensure sovereign infrastructure cost recovery while optimizing consumer affordability indexes.
                  </p>
                </div>

                {/* CONTROLS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-[#FAF8F5] rounded-2xl border border-neutral-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Base Tariff Rate (¢/Unit):</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">{baseRate}¢ / unit</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="0.5"
                      value={baseRate}
                      onChange={(e) => setBaseRate(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>5¢</span>
                      <span>25¢</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Consumer Demand Elasticity:</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">-{elasticity / 100}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={elasticity}
                      onChange={(e) => setElasticity(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>Inelastic (-0.10)</span>
                      <span>Highly Elastic (-0.80)</span>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 font-bold uppercase tracking-wider">Utility Sovereign CapEx Investment:</span>
                      <span className="text-neutral-800 font-bold font-serif text-sm">${capexRequirement} Million</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={capexRequirement}
                      onChange={(e) => setCapexRequirement(Number(e.target.value))}
                      className="w-full accent-[#B91C1C] h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                      <span>$10M</span>
                      <span>$100M</span>
                    </div>
                  </div>
                </div>

                {/* RESULTS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Projected Consumption Demand</span>
                    <div className="font-serif text-3xl font-light text-neutral-800">
                      {tariffMetrics.quantity}M units
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Total system load usage under base price
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1 bg-[#FAF8F5]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Tariff Cost-Recovery Index</span>
                    <div className={`font-serif text-3xl font-light ${Number(tariffMetrics.recoveryRatio) >= 100 ? "text-green-600" : "text-amber-600"}`}>
                      {tariffMetrics.recoveryRatio}%
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      {Number(tariffMetrics.recoveryRatio) >= 100 ? "Sovereign CapEx & OpEx fully covered" : "Tariff subsidized by public treasury"}
                    </p>
                  </div>

                  <div className="p-6 border border-neutral-100 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Consumer Affordability Score</span>
                    <div className="font-serif text-3xl font-light text-neutral-800">
                      {tariffMetrics.affordability}/100
                    </div>
                    <p className="text-[10px] text-neutral-400 font-serif leading-relaxed font-light">
                      Higher index values denote greater public access and affordability
                    </p>
                  </div>
                </div>

                {/* AFFORDABILITY VS COST RECOVERY GRAPH */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Policy Policy Tradeoff Spectrum</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 border border-neutral-100 rounded-xl space-y-2">
                      <span className="text-neutral-500 uppercase text-[10px]">Fiscal Subsidization Status:</span>
                      <div className="flex items-center gap-2">
                        {Number(tariffMetrics.recoveryRatio) >= 100 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">!</div>
                        )}
                        <span className="font-serif text-neutral-800 font-medium">
                          {Number(tariffMetrics.recoveryRatio) >= 100 ? "Fiscal Autonomy Achieved" : `Deficit: ${(100 - Number(tariffMetrics.recoveryRatio)).toFixed(0)}% subsidized`}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border border-neutral-100 rounded-xl space-y-2">
                      <span className="text-neutral-500 uppercase text-[10px]">Affordability Index Alert:</span>
                      <div className="flex items-center gap-2">
                        {Number(tariffMetrics.affordability) >= 40 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">X</div>
                        )}
                        <span className="font-serif text-neutral-800 font-medium">
                          {Number(tariffMetrics.affordability) >= 40 ? "Within Social Welfare Limits" : "Critically High Tariff Risk"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
