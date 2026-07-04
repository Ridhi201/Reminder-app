/**
 * Mock data generator for Reports module.
 * Returns realistic time-series data for charts.
 */

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const WEEKS  = ["Week 1","Week 2","Week 3","Week 4"];

function makeMonthly(base, spread) {
  return MONTHS.map((m) => ({ name: m, value: rand(base - spread, base + spread) }));
}

function makeWeekly(base, spread) {
  return WEEKS.map((w) => ({ name: w, value: rand(base - spread, base + spread) }));
}

function makeDaily(base, spread) {
  return DAYS.map((d) => ({ name: d, value: rand(base - spread, base + spread) }));
}

function makeYearly(base) {
  return [2021, 2022, 2023, 2024, 2025, 2026].map((y) => ({
    name: String(y),
    value: rand(base * (y - 2019), base * (y - 2018)),
  }));
}

export function getReportData(module, period) {
  const configs = {
    users: { daily: [8, 4], weekly: [52, 15], monthly: [220, 60], yearly: 180 },
    reminders: { daily: [35, 12], weekly: [220, 50], monthly: [900, 150], yearly: 800 },
    notifications: { daily: [120, 40], weekly: [750, 100], monthly: [3100, 400], yearly: 2800 },
    templates: { daily: [3, 2], weekly: [18, 6], monthly: [72, 20], yearly: 60 },
  };

  const cfg = configs[module] || configs.reminders;

  switch (period) {
    case "daily":   return makeDaily(cfg.daily[0], cfg.daily[1]);
    case "weekly":  return makeWeekly(cfg.weekly[0], cfg.weekly[1]);
    case "yearly":  return makeYearly(cfg.yearly);
    default:        return makeMonthly(cfg.monthly[0], cfg.monthly[1]);
  }
}

export function getSummaryStats(module) {
  const stats = {
    users: [
      { label: "Total Users",   value: "1,248", delta: "+12%", up: true },
      { label: "Active Users",  value: "984",   delta: "+8%",  up: true },
      { label: "New This Month",value: "87",    delta: "+22%", up: true },
      { label: "Inactive",      value: "264",   delta: "-4%",  up: false },
    ],
    reminders: [
      { label: "Total Reminders", value: "8,542",  delta: "+18%", up: true },
      { label: "Active",          value: "3,201",  delta: "+11%", up: true },
      { label: "Completed",       value: "4,917",  delta: "+24%", up: true },
      { label: "Overdue",         value: "424",    delta: "+3%",  up: false },
    ],
    notifications: [
      { label: "Sent This Month",  value: "31,840", delta: "+29%", up: true },
      { label: "Delivered",        value: "30,412", delta: "+27%", up: true },
      { label: "Failed",           value: "1,428",  delta: "-8%",  up: false },
      { label: "Open Rate",        value: "64.3%",  delta: "+5%",  up: true },
    ],
    templates: [
      { label: "Total Templates", value: "142",  delta: "+6%",  up: true },
      { label: "Active",          value: "118",  delta: "+8%",  up: true },
      { label: "Used This Month", value: "2,914",delta: "+19%", up: true },
      { label: "Draft",           value: "24",   delta: "-2%",  up: false },
    ],
  };
  return stats[module] || stats.reminders;
}
