import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import { FaArrowUp, FaArrowDown, FaCalendar } from "react-icons/fa";

import "./NotificationAnalytics.css";

// Seeded Analytics Datasets
const DAILY_DATA = [
  { label: "Mon", sent: 120, opened: 98, failed: 2 },
  { label: "Tue", sent: 150, opened: 130, failed: 4 },
  { label: "Wed", sent: 110, opened: 90, failed: 1 },
  { label: "Thu", sent: 180, opened: 155, failed: 5 },
  { label: "Fri", sent: 145, opened: 120, failed: 3 },
  { label: "Sat", sent: 80, opened: 70, failed: 1 },
  { label: "Sun", sent: 95, opened: 85, failed: 2 }
];

const WEEKLY_DATA = [
  { label: "Week 1", sent: 850, opened: 720, failed: 15 },
  { label: "Week 2", sent: 920, opened: 810, failed: 18 },
  { label: "Week 3", sent: 780, opened: 680, failed: 12 },
  { label: "Week 4", sent: 1050, opened: 920, failed: 22 }
];

const MONTHLY_DATA = [
  { label: "Jan", sent: 3200, opened: 2700, failed: 64 },
  { label: "Feb", sent: 3500, opened: 2950, failed: 70 },
  { label: "Mar", sent: 4100, opened: 3600, failed: 82 },
  { label: "Apr", sent: 3800, opened: 3300, failed: 76 },
  { label: "May", sent: 4500, opened: 3900, failed: 90 },
  { label: "Jun", sent: 4800, opened: 4200, failed: 96 }
];

const CHANNEL_DATA = [
  { name: "Email", value: 55, color: "#2563eb" },
  { name: "Push", value: 30, color: "#10b981" },
  { name: "SMS", value: 15, color: "#f59e0b" }
];

export default function NotificationAnalytics() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("daily"); // "daily" | "weekly" | "monthly"
  const [hoveredPoint, setHoveredPoint] = useState(null); // { index, x, y, data }

  // Get active dataset based on timeframe
  const activeDataset = useMemo(() => {
    if (timeframe === "weekly") return WEEKLY_DATA;
    if (timeframe === "monthly") return MONTHLY_DATA;
    return DAILY_DATA;
  }, [timeframe]);

  // Max value in active dataset for scaling SVG y-axis
  const maxVal = useMemo(() => {
    const values = activeDataset.map((d) => Math.max(d.sent, d.opened, d.failed));
    return Math.max(...values, 100) * 1.15;
  }, [activeDataset]);

  // SVG Chart points calculation
  const chartWidth = 650;
  const chartHeight = 280;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const points = useMemo(() => {
    return activeDataset.map((d, index) => {
      const x = paddingLeft + (index * innerWidth) / (activeDataset.length - 1);
      const ySent = chartHeight - paddingBottom - (d.sent / maxVal) * innerHeight;
      const yOpened = chartHeight - paddingBottom - (d.opened / maxVal) * innerHeight;
      const yFailed = chartHeight - paddingBottom - (d.failed / maxVal) * innerHeight;
      return { x, ySent, yOpened, yFailed, data: d, index };
    });
  }, [activeDataset, maxVal, innerWidth, innerHeight]);

  // Smooth lines generator
  const getLinePath = (yKey) => {
    return points
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p[yKey]}`)
      .join(" ");
  };

  // Gradient area generator
  const getAreaPath = (yKey) => {
    if (points.length === 0) return "";
    const linePath = getLinePath(yKey);
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const baseY = chartHeight - paddingBottom;
    return `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
  };

  // Pie chart calculation
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="notification-analytics-page">
      <PageHeader
        title="Notification Analytics"
        subtitle="Track delivery rates, open rates, and channel performance metrics"
        showButton={false}
      />

      <div className="module-tabs">
        <button 
          className="tab-btn" 
          onClick={() => navigate("/notifications")}
        >
          Overview
        </button>
        <button 
          className="tab-btn" 
          onClick={() => navigate("/notifications/history")}
        >
          History
        </button>
        <button 
          className="tab-btn active" 
          onClick={() => navigate("/notifications/analytics")}
        >
          Analytics
        </button>
      </div>

      {/* Analytics KPI Overview cards */}
      <div className="analytics-kpi-grid">
        <Card>
          <div className="kpi-card">
            <span className="kpi-title">Today's Notifications</span>
            <div className="kpi-value-row">
              <h2>145</h2>
              <span className="kpi-trend up">
                <FaArrowUp /> 12.4%
              </span>
            </div>
            <p className="kpi-subtext">vs. yesterday average</p>
          </div>
        </Card>

        <Card>
          <div className="kpi-card">
            <span className="kpi-title">Sent Successfully</span>
            <div className="kpi-value-row">
              <h2>139</h2>
              <span className="kpi-trend up">
                <FaArrowUp /> 14.1%
              </span>
            </div>
            <p className="kpi-subtext">Successfully pushed to gateway</p>
          </div>
        </Card>

        <Card>
          <div className="kpi-card">
            <span className="kpi-title">Failed Notifications</span>
            <div className="kpi-value-row">
              <h2>6</h2>
              <span className="kpi-trend down text-danger">
                <FaArrowDown /> 4.2%
              </span>
            </div>
            <p className="kpi-subtext">Bounces or carrier rejections</p>
          </div>
        </Card>

        <Card>
          <div className="kpi-card">
            <span className="kpi-title">Delivery Rate</span>
            <div className="kpi-value-row">
              <h2>96%</h2>
              <span className="kpi-trend up">
                <FaArrowUp /> 0.8%
              </span>
            </div>
            <p className="kpi-subtext">Target threshold: &gt;95%</p>
          </div>
        </Card>

        <Card>
          <div className="kpi-card">
            <span className="kpi-title">Open Rate</span>
            <div className="kpi-value-row">
              <h2>81%</h2>
              <span className="kpi-trend up">
                <FaArrowUp /> 2.3%
              </span>
            </div>
            <p className="kpi-subtext">Average push/email view rate</p>
          </div>
        </Card>
      </div>

      {/* Main Charts area */}
      <div className="analytics-charts-grid">
        {/* Main Performance Chart */}
        <Card className="performance-chart-card">
          <div className="chart-card-header">
            <div className="header-left">
              <h3>Delivery Trends</h3>
              <p>Sent, Opened, and Failed delivery timeline</p>
            </div>
            <div className="timeframe-selector">
              <button
                className={`tf-btn ${timeframe === "daily" ? "active" : ""}`}
                onClick={() => setTimeframe("daily")}
              >
                Daily
              </button>
              <button
                className={`tf-btn ${timeframe === "weekly" ? "active" : ""}`}
                onClick={() => setTimeframe("weekly")}
              >
                Weekly
              </button>
              <button
                className={`tf-btn ${timeframe === "monthly" ? "active" : ""}`}
                onClick={() => setTimeframe("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="chart-body">
            {/* SVG Line/Area chart */}
            <div className="svg-chart-container" style={{ position: "relative" }}>
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="openedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-axis gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = paddingTop + ratio * innerHeight;
                  const labelVal = Math.round(maxVal * (1 - ratio));
                  return (
                    <g key={idx} className="grid-line-group">
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={chartWidth - paddingRight}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="#64748b"
                      >
                        {labelVal}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis labels */}
                {activeDataset.map((d, index) => {
                  const x = paddingLeft + (index * innerWidth) / (activeDataset.length - 1);
                  return (
                    <text
                      key={index}
                      x={x}
                      y={chartHeight - 15}
                      textAnchor="middle"
                      fontSize="11.5"
                      fill="#64748b"
                      fontWeight="500"
                    >
                      {d.label}
                    </text>
                  );
                })}

                {/* Gradient Areas */}
                <path d={getAreaPath("ySent")} fill="url(#sentGrad)" />
                <path d={getAreaPath("yOpened")} fill="url(#openedGrad)" />

                {/* Paths/Lines */}
                <path
                  d={getLinePath("ySent")}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d={getLinePath("yOpened")}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d={getLinePath("yFailed")}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />

                {/* Interactive Hover Hotspots & Circles */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    {/* Circle highlights */}
                    {hoveredPoint && hoveredPoint.index === idx && (
                      <>
                        <circle cx={p.x} cy={p.ySent} r="6" fill="#2563eb" stroke="white" strokeWidth="2" />
                        <circle cx={p.x} cy={p.yOpened} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                        <circle cx={p.x} cy={p.yFailed} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                        <line x1={p.x} y1={paddingTop} x2={p.x} y2={chartHeight - paddingBottom} stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                      </>
                    )}

                    {/* Giant invisible hit-test columns */}
                    <rect
                      x={p.x - innerWidth / (activeDataset.length - 1) / 2}
                      y={paddingTop}
                      width={innerWidth / (activeDataset.length - 1)}
                      height={innerHeight}
                      fill="transparent"
                      cursor="pointer"
                      onMouseEnter={(e) => {
                        setHoveredPoint({
                          index: idx,
                          x: p.x,
                          y: p.ySent,
                          data: p.data
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Dynamic HTML Tooltip */}
              {hoveredPoint && (
                <div
                  className="chart-tooltip"
                  style={{
                    position: "absolute",
                    left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                    top: "10%",
                    transform: "translateX(-50%)",
                    pointerEvents: "none"
                  }}
                >
                  <div className="tooltip-title">{hoveredPoint.data.label}</div>
                  <div className="tooltip-row">
                    <span className="bullet sent"></span>
                    <span>Sent: <strong>{hoveredPoint.data.sent}</strong></span>
                  </div>
                  <div className="tooltip-row">
                    <span className="bullet opened"></span>
                    <span>Opened: <strong>{hoveredPoint.data.opened}</strong></span>
                  </div>
                  <div className="tooltip-row">
                    <span className="bullet failed"></span>
                    <span>Failed: <strong>{hoveredPoint.data.failed}</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom chart legend */}
            <div className="chart-legends">
              <div className="legend-item">
                <span className="legend-indicator sent"></span>
                <span>Sent</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator opened"></span>
                <span>Opened</span>
              </div>
              <div className="legend-item">
                <span className="legend-indicator failed"></span>
                <span>Failed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Channel Distribution pie/donut chart */}
        <Card className="distribution-chart-card">
          <div className="chart-card-header">
            <h3>Channels Breakdown</h3>
            <p>Notification volume split by channel type</p>
          </div>
          <div className="donut-chart-body">
            <div className="donut-graphic-wrapper">
              <svg width="180" height="180" viewBox="0 0 160 160">
                {CHANNEL_DATA.map((ch, idx) => {
                  const dashOffset = circ - (ch.value / 100) * circ;
                  const rotation = (accumulatedPercent / 100) * 360 - 90;
                  accumulatedPercent += ch.value;

                  return (
                    <circle
                      key={idx}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke={ch.color}
                      strokeWidth="16"
                      strokeDasharray={circ}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform={`rotate(${rotation} 80 80)`}
                      className="donut-segment"
                    />
                  );
                })}
                <circle cx="80" cy="80" r={radius - 12} fill="white" />
                <text x="80" y="78" textAnchor="middle" className="donut-center-num">
                  100%
                </text>
                <text x="80" y="96" textAnchor="middle" className="donut-center-lbl">
                  Channels
                </text>
              </svg>
            </div>

            <div className="donut-legends">
              {CHANNEL_DATA.map((ch, idx) => (
                <div key={idx} className="donut-legend-item">
                  <div className="legend-left">
                    <span className="donut-indicator" style={{ backgroundColor: ch.color }}></span>
                    <span className="donut-name">{ch.name}</span>
                  </div>
                  <strong className="donut-value">{ch.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
