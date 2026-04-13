import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, ReferenceLine
} from "recharts";

const COLORS = {
  red: "#C0392B",
  orange: "#E67E22",
  yellow: "#F1C40F",
  dark: "#1a1a2e",
  darkCard: "#16213e",
  accent: "#e94560",
  muted: "#8892a4",
  light: "#f0f4f8",
  white: "#ffffff",
  green: "#27ae60",
};

const cityFunding = [
  { year: "FY20", amount: 66.7 },
  { year: "FY21", amount: 68.2 },
  { year: "FY22", amount: 70.5 },
  { year: "FY23", amount: 73.1 },
  { year: "FY24", amount: 78.7 },
  { year: "FY25", amount: 81.7 },
  { year: "FY26 (req)", amount: 86.7, projected: true },
];

const deficitBreakdown = [
  { name: "Reserve Funds Used", value: 14, color: "#E67E22" },
  { name: "Grant Expenses", value: 6.5, color: "#F1C40F" },
  { name: "Program/Staff Cuts", value: 10, color: "#C0392B" },
  { name: "Remaining Gap", value: 7.5, color: "#8892a4" },
];

  { item: "Teachers Eliminated", count: 20, type: "positions" },
  { item: "Students Lose Busing", count: 2400, type: "students" },
  { item: "Librarians Eliminated", count: 12, type: "positions" },
  { item: "Positions Cut (Nov–Apr)", count: 75, type: "positions" },
  { item: "Total Positions Since 2015", count: 300, type: "positions" },
];

const highNeedStudents = [
  { year: "2019-20", pct: 82.5, ell: 20.3 },
  { year: "2020-21", pct: 85.0, ell: 22.1 },
  { year: "2021-22", pct: 87.3, ell: 24.5 },
  { year: "2022-23", pct: 89.1, ell: 27.2 },
  { year: "2023-24", pct: 90.8, ell: 29.6 },
  { year: "2024-25", pct: 92.6, ell: 31.0 },
];

const specialEdCosts = [
  { year: "FY21", cost: 42 },
  { year: "FY22", cost: 50 },
  { year: "FY23", cost: 58 },
  { year: "FY24", cost: 65 },
  { year: "FY25", cost: 72 },
];

const federalLosses = [
  { city: "Bridgeport", loss: 3.8, color: COLORS.red },
  { city: "Hartford", loss: 3.0, color: COLORS.orange },
  { city: "New Haven", loss: 3.0, color: COLORS.orange },
  { city: "Waterbury", loss: 3.0, color: COLORS.orange },
];

const perPupilGap = [
  { district: "Greenwich", perPupil: 30000 },
  { district: "Fairfield", perPupil: 20000 },
  { district: "Trumbull", perPupil: 18000 },
  { district: "Bridgeport", perPupil: 14700 },
];

const TABS = [
  "Overview",
  "Deficit Crisis",
  "What Was Cut",
  "Student Need",
  "Funding Gap",
];

const StatCard = ({ label, value, sub, color = COLORS.accent }) => (
  <div style={{
    background: COLORS.darkCard,
    border: `1px solid ${color}33`,
    borderLeft: `4px solid ${color}`,
    borderRadius: 8,
    padding: "18px 20px",
    flex: 1,
    minWidth: 160,
  }}>
    <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: "'Bebas Neue', cursive", letterSpacing: 1 }}>{value}</div>
    <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 600, marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d1117", border: `1px solid ${COLORS.accent}44`, borderRadius: 8, padding: "10px 16px" }}>
      <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || COLORS.accent, fontSize: 14, fontWeight: 700 }}>
          {typeof p.value === "number" && p.name?.includes("pct") ? `${p.value}%` : 
           typeof p.value === "number" ? `$${p.value}M` : p.value}
          {" "}<span style={{ color: COLORS.muted, fontSize: 11 }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

export default function BridgeportDashboard() {
  const [tab, setTab] = useState("Overview");

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.dark,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: COLORS.white,
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, #16213e 100%)`,
        borderBottom: `2px solid ${COLORS.accent}`,
        padding: "32px 40px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{
            background: COLORS.accent,
            color: "#fff",
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: 3,
            padding: "6px 12px",
            borderRadius: 4,
            marginTop: 6,
            textTransform: "uppercase",
          }}>CRISIS REPORT</div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(22px, 4vw, 40px)",
              fontWeight: 900,
              lineHeight: 1.1,
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: 2,
            }}>
              BRIDGEPORT PUBLIC SCHOOLS
              <span style={{ color: COLORS.accent }}> — EDUCATION BUDGET CRISIS</span>
            </h1>
            <p style={{ margin: "8px 0 0", color: COLORS.muted, fontSize: 13 }}>
              Data-driven analysis of systemic underfunding • 2024–2026 • 20,000 students affected
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 24, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? COLORS.accent : "transparent",
              color: tab === t ? "#fff" : COLORS.muted,
              border: `1px solid ${tab === t ? COLORS.accent : "#333"}`,
              borderRadius: 6,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }}>

        {/* OVERVIEW TAB */}
        {tab === "Overview" && (
          <div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              <StatCard label="FY24–25 Deficit" value="$38M" sub="Triggered state intervention" color={COLORS.red} />
              <StatCard label="Projected FY26–27 Gap" value="$45M" sub="Without new state funding" color={COLORS.orange} />
              <StatCard label="Additional Funds Requested" value="$106M" sub="Board voted 6–2, Feb 2026" color={COLORS.yellow} />
              <StatCard label="Positions Cut Since 2015" value="~300" sub="A decade of disinvestment" color={COLORS.muted} />
              <StatCard label="Students Losing Busing" value="2,400" sub="April 2025 board vote" color={COLORS.accent} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, flexWrap: "wrap" }}>
              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>City Contribution to BPS (in $M)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={cityFunding} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} domain={[60, 90]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" name="City contribution" radius={[4, 4, 0, 0]}
                      fill={COLORS.accent}
                      label={{ position: "top", fill: COLORS.muted, fontSize: 10, formatter: v => `$${v}M` }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "12px 0 0" }}>
                  Despite ~$15M in increases over 6 years, funding hasn't kept pace with costs or inflation.
                </p>
              </div>

              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>High-Need Students (% of enrollment)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={highNeedStudents}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 10 }} axisLine={false} />
                    <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} domain={[18, 98]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="pct" name="High-need %" stroke={COLORS.red} strokeWidth={3} dot={{ fill: COLORS.red, r: 5 }} />
                    <Line type="monotone" dataKey="ell" name="ELL %" stroke={COLORS.orange} strokeWidth={2} strokeDasharray="5 3" dot={{ fill: COLORS.orange, r: 4 }} />
                    <Legend wrapperStyle={{ fontSize: 12, color: COLORS.muted }} />
                  </LineChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "12px 0 0" }}>
                  High-need student share rose from 82.5% to 92.6% — as funding stayed flat.
                </p>
              </div>
            </div>

            {/* Key quotes */}
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { quote: "We're not asking more than what others already have. We're asking for fairness, for equity.", source: "Bridgeport student, CT State Capitol, 2025" },
                { quote: "If they don't give us $64 million, there's nothing to do. It's a fact that we will be looking at closing schools.", source: "Callie Gale Heilmann, Bridgeport Generation Now" },
              ].map((q, i) => (
                <div key={i} style={{
                  background: "#0d1117",
                  borderLeft: `3px solid ${COLORS.accent}`,
                  borderRadius: 8,
                  padding: "16px 20px",
                }}>
                  <p style={{ fontSize: 13, fontStyle: "italic", color: COLORS.white, margin: "0 0 8px", lineHeight: 1.6 }}>"{q.quote}"</p>
                  <p style={{ fontSize: 11, color: COLORS.muted, margin: 0 }}>— {q.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEFICIT CRISIS TAB */}
        {tab === "Deficit Crisis" && (
          <div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="Nov 2024 Deficit" value="$38M" sub="Expiration of COVID relief funds" color={COLORS.red} />
              <StatCard label="Reserve Funds Burned" value="$14M" sub="One-time fix, not sustainable" color={COLORS.orange} />
              <StatCard label="Charged to Grants" value="$6.5M" sub="Temporary measure" color={COLORS.yellow} />
              <StatCard label="FY26–27 Projected Gap" value="$45M" sub="Just to maintain status quo" color={COLORS.accent} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>How the $38M Deficit Was (Partially) Closed</h3>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 16px" }}>FY 2024–25 gap mitigation</p>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={deficitBreakdown} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `$${value}M`} labelLine={false}>
                      {deficitBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v}M`} contentStyle={{ background: "#0d1117", border: "1px solid #333", borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Special Education Cost Surge</h3>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 16px" }}>+$30M increase from FY21–FY25</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={specialEdCosts} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} domain={[35, 80]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="cost" name="Sped cost ($M)" fill={COLORS.orange} radius={[4, 4, 0, 0]}
                      label={{ position: "top", fill: COLORS.muted, fontSize: 10, formatter: v => `$${v}M` }} />
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "12px 0 0" }}>
                  Also: MLL enrollment grew 51% over 5 years. Transportation costs rose from $28.6M → projected $32.7M.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 24, background: COLORS.darkCard, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.red}33` }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Federal Funding at Risk — Trump Freeze (2025)</h3>
              <p style={{ fontSize: 12, color: COLORS.muted, marginBottom: 16 }}>
                CT is one of 26 states suing over a $7B federal education freeze. Bridgeport stands to lose the most of any CT city.
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={federalLosses} layout="vertical" barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis type="number" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} unit="M" />
                  <YAxis type="category" dataKey="city" tick={{ fill: COLORS.white, fontSize: 12 }} axisLine={false} width={80} />
                  <Tooltip formatter={(v) => `$${v}M`} contentStyle={{ background: "#0d1117", border: "1px solid #333", borderRadius: 8 }} />
                  <Bar dataKey="loss" name="Federal loss ($M)" radius={[0, 4, 4, 0]}>
                    {federalLosses.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* WHAT WAS CUT TAB */}
        {tab === "What Was Cut" && (
          <div>
            <p style={{ fontSize: 14, color: COLORS.muted, marginBottom: 24, lineHeight: 1.7 }}>
              In April 2025, the Bridgeport Board of Education voted <strong style={{ color: COLORS.white }}>5–4</strong> to approve deep cuts to close a $30M shortfall. These cuts saved $19.2M — but left a projected $2M gap even after city and state support.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { icon: "📚", label: "Teachers Eliminated", val: "20 positions", color: COLORS.red },
                { icon: "🚌", label: "Students Lost Busing", val: "2,400 students", color: COLORS.orange },
                { icon: "📖", label: "Librarians Removed", val: "All district librarians", color: COLORS.yellow },
                { icon: "👶", label: "Kinder Paras Cut", val: "All K paraprofessionals", color: COLORS.accent },
                { icon: "🎭", label: "Performing Arts Eliminated", val: "FAME program ended", color: "#9b59b6" },
                { icon: "🧑‍💼", label: "Admin & Counselors Cut", val: "75+ positions (Nov–Apr)", color: COLORS.muted },
              ].map((item, i) => (
                <div key={i} style={{
                  background: COLORS.darkCard,
                  border: `1px solid ${item.color}44`,
                  borderTop: `3px solid ${item.color}`,
                  borderRadius: 10,
                  padding: 20,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, color: item.color, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.white }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Position Losses: A Decade of Erosion</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { period: "2015–2019", positions: 80 },
                  { period: "2019–2022", positions: 60 },
                  { period: "2022–2024", positions: 85 },
                  { period: "2024–2025\n(Nov–Apr)", positions: 75 },
                ]} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="period" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #333", borderRadius: 8 }} />
                  <Bar dataKey="positions" name="Positions Eliminated" fill={COLORS.red} radius={[4, 4, 0, 0]}
                    label={{ position: "top", fill: COLORS.muted, fontSize: 11 }} />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 12, color: COLORS.muted, margin: "12px 0 0", textAlign: "center" }}>
                Approximately <strong style={{ color: COLORS.red }}>300 total positions eliminated since 2015</strong> — driven by a state funding formula frozen since 2013.
              </p>
            </div>
          </div>
        )}

        {/* STUDENT NEED TAB */}
        {tab === "Student Need" && (
          <div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="High-Need Students (2024-25)" value="92.6%" sub="Up from 82.5% in 2019-20" color={COLORS.red} />
              <StatCard label="English Language Learners" value="31%" sub="Up from 20.3% in 2019-20" color={COLORS.orange} />
              <StatCard label="Special Ed Vacancies" value="31+" sub="Certified staff openings (Nov 2024)" color={COLORS.accent} />
              <StatCard label="Total Students Served" value="~20,000" sub="Largest district in CT" color={COLORS.muted} />
            </div>

            <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a", marginBottom: 24 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Rising Need as Resources Shrink</h3>
              <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 20px" }}>High-need % and ELL % of Bridgeport student population, 2019–2025</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={highNeedStudents}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="year" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} unit="%" domain={[18, 98]} />
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#0d1117", border: "1px solid #333", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="pct" name="High-Need Students" stroke={COLORS.red} strokeWidth={3} dot={{ r: 6, fill: COLORS.red }} />
                  <Line type="monotone" dataKey="ell" name="English Language Learners" stroke={COLORS.orange} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 5, fill: COLORS.orange }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: "#0d1117", borderRadius: 12, padding: 24, border: `1px solid ${COLORS.accent}33` }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 2 }}>Why This Matters</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  "Bridgeport has more English language learners in one high school than some entire districts have total.",
                  "92.6% of students classified as high-need — yet the state's per-pupil formula hasn't been updated since 2013.",
                  "Special ed enrollment is rising, but the district had 31+ certified special ed vacancies as of November 2024.",
                  "Cutting school counselors and social workers disproportionately hurts the city's highest-need students.",
                ].map((fact, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ color: COLORS.accent, fontSize: 18, flexShrink: 0, marginTop: 2 }}>▶</div>
                    <p style={{ fontSize: 13, color: COLORS.light, margin: 0, lineHeight: 1.6 }}>{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FUNDING GAP TAB */}
        {tab === "Funding Gap" && (
          <div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <StatCard label="ECS Foundation (per pupil)" value="$11,525" sub="Unchanged since 2013" color={COLORS.red} />
              <StatCard label="Gap vs. Greenwich" value="~$80M" sub="To reach per-pupil parity" color={COLORS.orange} />
              <StatCard label="Ganim's City Pledge" value="$10M" sub="Over 2 years — $5M/year" color={COLORS.green} />
              <StatCard label="Additional State Funding Needed" value="$64M+" sub="Per advocacy groups" color={COLORS.accent} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>Estimated Per-Pupil Spending by District</h3>
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 16px" }}>The ZIP code gap in Connecticut education</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={perPupilGap} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="district" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickFormatter={v => `$${v.toLocaleString()}`} />
                    <Tooltip formatter={v => `$${v.toLocaleString()}`} contentStyle={{ background: "#0d1117", border: "1px solid #333", borderRadius: 8 }} />
                    <Bar dataKey="perPupil" name="Per-pupil spending" radius={[4, 4, 0, 0]}>
                      {perPupilGap.map((entry, i) => (
                        <Cell key={i} fill={entry.district === "Bridgeport" ? COLORS.red : COLORS.accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.darkCard, borderRadius: 12, padding: 24, border: "1px solid #2a2a4a" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 14, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 2 }}>The ECS Formula Problem</h3>
                <p style={{ fontSize: 12, color: COLORS.muted, margin: "0 0 20px", lineHeight: 1.6 }}>
                  Connecticut's per-student foundation amount has been <strong style={{ color: COLORS.red }}>frozen at $11,525 since 2013</strong> — despite a 2.77% average inflation rate each year.
                </p>
                <div style={{ background: "#0d1117", borderRadius: 8, padding: 16 }}>
                  {[
                    { label: "State Foundation (2013, frozen)", val: "$11,525/pupil", color: COLORS.muted },
                    { label: "Inflation-adjusted (2026 est.)", val: "~$16,200/pupil", color: COLORS.yellow },
                    { label: "Funding Gap per Student", val: "~$4,675/pupil", color: COLORS.red },
                    { label: "Bridgeport students affected", val: "~20,000", color: COLORS.accent },
                    { label: "Total systemic gap est.", val: "~$93M/yr", color: COLORS.red },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 4 ? "1px solid #1a1a2e" : "none" }}>
                      <span style={{ fontSize: 12, color: COLORS.muted }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, background: `linear-gradient(135deg, #1a0a0a, #2a0d0d)`, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.red}44` }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, color: COLORS.red }}>🚨 Bottom Line</h3>
              <p style={{ fontSize: 13, color: COLORS.light, lineHeight: 1.8, margin: 0 }}>
                Without <strong>$64M+ from the state</strong>, Bridgeport schools face school closures. The $106M request is to restore what's been cut — not expand. Meanwhile, a federal funding freeze threatens another <strong>$3.8M loss</strong>, the largest federal hit of any CT city.  Mayor Ganim's $10M city pledge covers less than 10% of the need.
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #2a2a4a", fontSize: 11, color: COLORS.muted }}>
          Sources: CT Mirror, WSHU, CT Public Radio, Coastal CT Times, Only In Bridgeport, City of Bridgeport FY2026 Budget, Bridgeport Public Schools
        </div>
      </div>
    </div>
  );
}
