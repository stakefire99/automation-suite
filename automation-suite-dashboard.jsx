import { useState, useEffect, useRef } from "react";

const MODULES = ["overview", "files", "scraper", "email", "monitor", "scheduler"];

const glowColor = {
  overview: "#00ffe7",
  files: "#ffe600",
  scraper: "#ff6b35",
  email: "#b388ff",
  monitor: "#69f0ae",
  scheduler: "#40c4ff",
};

const icons = {
  overview: "⚡",
  files: "📁",
  scraper: "🌐",
  email: "📧",
  monitor: "🖥️",
  scheduler: "⏰",
};

const moduleLabels = {
  overview: "Overview",
  files: "File Organizer",
  scraper: "Web Scraper",
  email: "Email Automation",
  monitor: "System Monitor",
  scheduler: "Task Scheduler",
};

function useCounter(target, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

function AnimatedBar({ value, color, label, max = 100 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 11, color: "#aaa", letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 2, height: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${width}%`, background: color,
          transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
          boxShadow: `0 0 8px ${color}`,
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

function OverviewPanel() {
  const tasks = useCounter(1245);
  const hours = useCounter(48);
  const files = useCounter(856);
  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Tasks Completed", val: tasks.toLocaleString(), color: "#00ffe7", sub: "0.16% errors" },
          { label: "Time Saved", val: `${hours}h`, color: "#ffe600", sub: "this session" },
          { label: "Files Organized", val: files.toLocaleString(), color: "#ff6b35", sub: "856 files" },
        ].map(({ label, val, color, sub }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${color}22`,
            borderRadius: 6,
            padding: "18px 16px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.7 }} />
            <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 6, letterSpacing: 0.8 }}>{label}</div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 3 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 14, fontFamily: "'Space Mono', monospace" }}>SYSTEM RESOURCE LOAD</div>
        <AnimatedBar value={45} color="#00ffe7" label="CPU USAGE" />
        <AnimatedBar value={40} color="#b388ff" label="MEMORY  3.2 / 8 GB" />
        <AnimatedBar value={49} color="#ffe600" label="DISK  125 / 256 GB" />
        <AnimatedBar value={62} color="#ff6b35" label="NETWORK  85 Mbps" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { label: "Productivity Boost", val: "+45%", color: "#69f0ae" },
          { label: "Error Reduction", val: "−85%", color: "#40c4ff" },
          { label: "Storage Saved", val: "4.2 GB", color: "#ffe600" },
          { label: "Cost Savings", val: "₹8,500", color: "#ff6b35" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            padding: "13px 14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 5,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Space Mono', monospace" }}>{val}</span>
            <span style={{ fontSize: 11, color: "#666", letterSpacing: 0.5 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileOrganizerPanel() {
  const categories = [
    { name: "Documents", count: 245, color: "#ffe600", icon: "📄" },
    { name: "Images", count: 312, color: "#ff6b35", icon: "🖼️" },
    { name: "Videos", count: 89, color: "#b388ff", icon: "🎬" },
    { name: "Music", count: 54, color: "#69f0ae", icon: "🎵" },
    { name: "Archives", count: 67, color: "#40c4ff", icon: "📦" },
    { name: "Code", count: 89, color: "#00ffe7", icon: "💻" },
  ];
  const total = categories.reduce((s, c) => s + c.count, 0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, fontFamily: "'Space Mono', monospace" }}>MONITORING PATH</div>
          <div style={{ fontSize: 13, color: "#ffe600", fontFamily: "'Space Mono', monospace", marginTop: 4 }}>/Users/Downloads</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: 1 }}>LAST RUN</div>
          <div style={{ fontSize: 12, color: "#69f0ae", fontFamily: "'Space Mono', monospace", marginTop: 3 }}>2 min ago</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
        {categories.map(({ name, count, color, icon }) => (
          <div key={name} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}30`,
            borderRadius: 5,
            padding: "14px 12px",
            position: "relative",
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'Space Mono', monospace" }}>{count}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 3, letterSpacing: 0.5 }}>{name}</div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
              background: color, opacity: 0.5, borderRadius: "0 0 5px 5px"
            }} />
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "#666", letterSpacing: 1 }}>TOTAL FILES</span>
          <span style={{ fontSize: 14, color: "#ffe600", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{total.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", gap: 1 }}>
          {categories.map(({ name, count, color }) => (
            <div key={name} style={{
              flex: count, background: color, opacity: 0.8,
              transition: "flex 1s ease",
            }} title={`${name}: ${count}`} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
          {categories.map(({ name, color }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 10, color: "#666" }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScraperPanel() {
  const jobs = [
    { name: "E-commerce Prices", status: "active", pages: 4521, success: 98.7, color: "#ff6b35" },
    { name: "News Aggregator", status: "active", pages: 5832, success: 99.1, color: "#00ffe7" },
    { name: "Job Listings", status: "active", pages: 2105, success: 97.3, color: "#ffe600" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
        {[
          { label: "Pages Scraped", val: "12,458", color: "#ff6b35" },
          { label: "Data Extracted", val: "45 MB", color: "#00ffe7" },
          { label: "Success Rate", val: "98.7%", color: "#69f0ae" },
          { label: "Proxy Rotation", val: "Every 100", color: "#ffe600" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            padding: "14px 14px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}25`,
            borderRadius: 5,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "'Space Mono', monospace" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 4, letterSpacing: 0.5 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>ACTIVE JOBS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {jobs.map(({ name, status, pages, success, color }) => (
          <div key={name} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}28`,
            borderRadius: 5,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: color,
              boxShadow: `0 0 8px ${color}`,
              flexShrink: 0,
              animation: "pulse 2s infinite",
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#ddd", marginBottom: 3 }}>{name}</div>
              <div style={{ fontSize: 10, color: "#555", fontFamily: "'Space Mono', monospace" }}>{pages.toLocaleString()} pages</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "'Space Mono', monospace" }}>{success}%</div>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 0.5 }}>success</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailPanel() {
  const templates = [
    { name: "Welcome Series", sent: 124, open: 72, color: "#b388ff" },
    { name: "Weekly Digest", sent: 89, open: 61, color: "#40c4ff" },
    { name: "Campaign Blast", sent: 111, open: 58, color: "#ff6b35" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
        {[
          { label: "Emails Sent", val: "324", color: "#b388ff" },
          { label: "Recipients", val: "156", color: "#40c4ff" },
          { label: "Open Rate", val: "68.5%", color: "#69f0ae" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            padding: "16px 14px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}30`,
            borderRadius: 5,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'Space Mono', monospace" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 5, letterSpacing: 0.5 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>TEMPLATES</div>
      {templates.map(({ name, sent, open, color }) => (
        <div key={name} style={{
          marginBottom: 12,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 5,
          padding: "13px 16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#ccc" }}>{name}</span>
            <span style={{ fontSize: 11, color: "#555", fontFamily: "'Space Mono', monospace" }}>{sent} sent</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 4, overflow: "hidden" }}>
            <div style={{
              width: `${open}%`, height: "100%",
              background: `linear-gradient(90deg, ${color}, ${color}99)`,
              borderRadius: 2,
              boxShadow: `0 0 6px ${color}`,
              transition: "width 1.2s ease",
            }} />
          </div>
          <div style={{ fontSize: 10, color: color, marginTop: 5, fontFamily: "'Space Mono', monospace" }}>{open}% open rate</div>
        </div>
      ))}
      <div style={{
        marginTop: 18, padding: "12px 16px",
        background: "rgba(179,136,255,0.06)",
        border: "1px solid rgba(179,136,255,0.2)",
        borderRadius: 5,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>📅</span>
        <div>
          <div style={{ fontSize: 11, color: "#b388ff" }}>NEXT CAMPAIGN</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Tomorrow · 9:00 AM</div>
        </div>
      </div>
    </div>
  );
}

function MonitorPanel() {
  const [cpu, setCpu] = useState(45);
  const [mem, setMem] = useState(40);
  const [net, setNet] = useState(62);
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(c => Math.max(20, Math.min(90, c + (Math.random() - 0.5) * 8)));
      setMem(m => Math.max(30, Math.min(80, m + (Math.random() - 0.5) * 3)));
      setNet(n => Math.max(20, Math.min(95, n + (Math.random() - 0.5) * 12)));
    }, 1800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
        {[
          { label: "CPU", value: cpu, color: "#00ffe7", unit: "%" },
          { label: "Memory", value: mem, color: "#b388ff", unit: "%" },
          { label: "Network", value: net, color: "#ff6b35", unit: "%" },
          { label: "Disk", value: 49, color: "#ffe600", unit: "%" },
        ].map(({ label, value, color, unit }) => (
          <div key={label} style={{
            padding: "14px 14px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}28`,
            borderRadius: 5,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: "#888", letterSpacing: 1 }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "'Space Mono', monospace" }}>
                {Math.round(value)}{unit}
              </span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", height: 40, borderRadius: 3, overflow: "hidden", position: "relative" }}>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: `${value}%`,
                background: `linear-gradient(to top, ${color}88, ${color}22)`,
                transition: "height 0.8s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        padding: "14px 16px",
        background: "rgba(105,240,174,0.05)",
        border: "1px solid rgba(105,240,174,0.2)",
        borderRadius: 5,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#69f0ae", boxShadow: "0 0 10px #69f0ae" }} />
        <div>
          <div style={{ fontSize: 12, color: "#69f0ae", fontWeight: 600 }}>ALL SYSTEMS NOMINAL</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>No active alerts · Uptime 24d 15h</div>
        </div>
      </div>
    </div>
  );
}

function SchedulerPanel() {
  const tasks = [
    { name: "Daily Backup", time: "00:00", recur: "Daily", status: "tonight", color: "#40c4ff" },
    { name: "Weekly Report", time: "08:00", recur: "Sunday", status: "3 days", color: "#ffe600" },
    { name: "DB Cleanup", time: "03:00", recur: "Daily", status: "tonight", color: "#ff6b35" },
    { name: "Email Campaign", time: "10:00", recur: "Weekdays", status: "tomorrow", color: "#b388ff" },
    { name: "Log Rotation", time: "23:59", recur: "Weekly", status: "6 days", color: "#69f0ae" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#40c4ff", fontFamily: "'Space Mono', monospace" }}>15</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3, letterSpacing: 1 }}>ACTIVE TASKS</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: 1 }}>NEXT RUN</div>
          <div style={{ fontSize: 13, color: "#69f0ae", fontFamily: "'Space Mono', monospace", marginTop: 3 }}>Daily Backup · 00:00</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>UPCOMING TASKS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map(({ name, time, recur, status, color }, i) => (
          <div key={name} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 5,
            borderLeft: `3px solid ${color}`,
          }}>
            <div style={{ fontSize: 10, color: "#444", fontFamily: "'Space Mono', monospace", width: 26 }}>
              {(i + 1).toString().padStart(2, "0")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#ddd" }}>{name}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{recur} · {time}</div>
            </div>
            <div style={{ fontSize: 10, color, fontFamily: "'Space Mono', monospace", background: `${color}18`, padding: "3px 8px", borderRadius: 3 }}>
              {status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const panels = { overview: OverviewPanel, files: FileOrganizerPanel, scraper: ScraperPanel, email: EmailPanel, monitor: MonitorPanel, scheduler: SchedulerPanel };

export default function AutomationSuite() {
  const [active, setActive] = useState("overview");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const Panel = panels[active];
  const color = glowColor[active];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0c",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e0e0e0",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .module-btn { transition: all 0.2s ease; cursor: pointer; }
        .module-btn:hover { transform: translateX(3px); }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 32, height: 32,
            background: `linear-gradient(135deg, ${color}, ${color}44)`,
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
            boxShadow: `0 0 16px ${color}55`,
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: 0.5 }}>AutoSuite</div>
            <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, fontFamily: "'Space Mono', monospace" }}>AUTOMATION CONTROL CENTER</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#69f0ae", boxShadow: "0 0 8px #69f0ae", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, color: "#69f0ae", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>ACTIVE</span>
          </div>
          <div style={{ fontSize: 12, color: "#444", fontFamily: "'Space Mono', monospace" }}>
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 200,
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: "rgba(255,255,255,0.01)",
          flexShrink: 0,
        }}>
          {MODULES.map((mod) => {
            const isActive = active === mod;
            const c = glowColor[mod];
            return (
              <button
                key={mod}
                className="module-btn"
                onClick={() => setActive(mod)}
                style={{
                  background: isActive ? `${c}14` : "transparent",
                  border: isActive ? `1px solid ${c}33` : "1px solid transparent",
                  borderRadius: 5,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: 16, opacity: isActive ? 1 : 0.5 }}>{icons[mod]}</span>
                <span style={{ fontSize: 12, color: isActive ? c : "#555", fontWeight: isActive ? 600 : 400, letterSpacing: 0.3 }}>
                  {moduleLabels[mod]}
                </span>
                {isActive && (
                  <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                )}
              </button>
            );
          })}

          <div style={{ flex: 1 }} />

          {/* Footer stats */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16, paddingLeft: 4 }}>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: 1.5, marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>UPTIME</div>
            <div style={{ fontSize: 13, color: "#555", fontFamily: "'Space Mono', monospace" }}>24d 15h</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          <div style={{ marginBottom: 24, animation: "fadeSlideIn 0.35s ease" }} key={active}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>{icons[active]}</span>
              <h1 style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                letterSpacing: 0.3,
              }}>{moduleLabels[active]}</h1>
            </div>
            <div style={{
              height: 2, width: 48, background: color,
              borderRadius: 2, boxShadow: `0 0 12px ${color}`,
              transition: "background 0.3s ease, box-shadow 0.3s ease",
            }} />
          </div>

          <div style={{ animation: "fadeSlideIn 0.4s ease" }} key={active + "_panel"}>
            <Panel />
          </div>
        </div>
      </div>
    </div>
  );
}
