"use client";

import { useState } from "react";

const navItems = [
  { icon: "⌂", label: "Creator Dashboard" },
  { icon: "◈", label: "Tonight’s Plan" },
  { icon: "◎", label: "Live Copilot" },
  { icon: "⚔", label: "PK Partners" },
  { icon: "♫", label: "Content Library" },
  { icon: "▥", label: "Show Review" },
];

const schedule = [
  { time: "20:00", title: "Warm Welcome", note: "Share one small win from today", tone: "mint" },
  { time: "20:18", title: "Song Requests", note: "A Little Happiness + live requests", tone: "violet" },
  { time: "20:38", title: "Friendly PK", note: "@Orange Soda · easy conversation", tone: "orange" },
  { time: "20:55", title: "Dance Set", note: "Jazz medley · 8 minutes", tone: "pink" },
];

export default function Home() {
  const [active, setActive] = useState("Creator Dashboard");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div><strong>StreamOne</strong><small>Your personal AI manager</small></div>
        </div>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.label} className={active === item.label ? "nav-item active" : "nav-item"} onClick={() => setActive(item.label)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-tip">
          <span className="tip-kicker">AI SHOW NOTE</span>
          <strong>Pre-show readiness</strong>
          <div className="progress"><i /></div>
          <small>8 of 10 tasks complete</small>
        </div>
        <div className="profile-row">
          <div className="avatar">J</div>
          <div><strong>James</strong><small>Entertainment creator · 8 PM</small></div>
          <span>•••</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">MONDAY · AUG 17</p>
            <h1>Good evening, James <span>✦</span></h1>
            <p>Your game plan for tonight is ready.</p>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Messages">◌<b /></button>
            <button className="primary-button">▶&nbsp;&nbsp;Enter Live Copilot</button>
          </div>
        </header>

        <div className="hero-grid">
          <article className="live-card">
            <div className="live-card-head"><div><span className="status-dot" />Live tonight at 8:00 PM</div><button>Edit plan</button></div>
            <div className="live-card-main">
              <div><span className="pill">TONIGHT’S THEME</span><h2>Summer Heartbeat Radio</h2><p>Easy conversation · Songs · Friendly PK · Jazz medley</p></div>
              <div className="countdown"><small>GOING LIVE IN</small><strong>03:42:18</strong></div>
            </div>
            <div className="goal-row">
              <span>SHOW GOALS</span>
              <div><b>+120</b><small>New followers</small></div><div><b>18 min</b><small>Avg. watch</small></div><div><b>8.5%</b><small>Engagement</small></div>
            </div>
          </article>
          <article className="ai-card">
            <div className="ai-orb">✦</div><span className="pill dark">AI PICK FOR TODAY</span>
            <h3>Move the first song 8 minutes earlier</h3><p>Your last three shows gained 12% in average watch time when the performance segment began near 8:15 PM.</p>
            <button>Apply to run of show <span>→</span></button>
          </article>
        </div>

        <section className="content-grid">
          <article className="panel run-sheet">
            <div className="panel-head"><div><h3>Tonight’s Run of Show</h3><p>90 minutes · 4 core segments</p></div><button className="text-button">View Full Plan&nbsp; →</button></div>
            <div className="schedule">
              {schedule.map((item, index) => (
                <div className="schedule-item" key={item.time}>
                  <time>{item.time}</time><span className={`timeline-dot ${item.tone}`}>{index + 1}</span>
                  <div><strong>{item.title}</strong><small>{item.note}</small></div>{index === 1 && <em>AI PICK</em>}<button aria-label={`Open ${item.title}`}>›</button>
                </div>
              ))}
            </div>
          </article>
          <aside className="right-column">
            <article className="panel readiness">
              <div className="panel-head"><div><h3>Show Readiness</h3><p>2 tasks left</p></div><span>80%</span></div>
              <div className="ready-progress"><i /></div>
              <label><input type="checkbox" defaultChecked /> Lighting and audio test</label><label><input type="checkbox" defaultChecked /> Backing tracks and dance music</label>
              <label><input type="checkbox" /> Confirm PK partner online</label><label><input type="checkbox" /> Publish live-show teaser</label>
            </article>
            <article className="risk-card"><div className="risk-icon">!</div><div><span>TONIGHT’S SAFETY NOTE</span><strong>Avoid private contact details and spending promises during PK.</strong></div><button aria-label="View safety details">›</button></article>
          </aside>
        </section>
      </section>
    </main>
  );
}
