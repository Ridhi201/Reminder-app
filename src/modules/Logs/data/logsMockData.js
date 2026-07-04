/**
 * Mock activity log entries — realistic admin panel actions
 */

const USERS = ["Admin", "Priya S.", "Rahul M.", "Sneha K.", "Dev T."];
const MODULES = ["Users", "Reminders", "Templates", "Notifications", "Settings", "Auth", "Reports"];
const ACTIONS = [
  { label: "Created",  type: "create" },
  { label: "Updated",  type: "update" },
  { label: "Deleted",  type: "delete" },
  { label: "Viewed",   type: "view" },
  { label: "Exported", type: "export" },
  { label: "Logged In",type: "login" },
  { label: "Logged Out",type: "logout" },
];
const DEVICES = ["Chrome / Windows", "Safari / macOS", "Firefox / Linux", "Chrome / Android", "Safari / iPhone"];
const IPS = ["192.168.1.1","192.168.1.24","10.0.0.5","172.16.0.8","203.0.113.42","198.51.100.11"];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function randomDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  d.setHours(Math.floor(Math.random() * 12) + 8);
  d.setMinutes(Math.floor(Math.random() * 60));
  return d;
}

function fmt(date) {
  return date.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

let _id = 1;
function makeLog() {
  const action = randomItem(ACTIONS);
  const module = action.type === "login" || action.type === "logout"
    ? "Auth"
    : randomItem(MODULES.filter((m) => m !== "Auth"));

  return {
    id: _id++,
    user:    randomItem(USERS),
    action:  action.label,
    type:    action.type,
    module,
    time:    randomDate(30),
    ip:      randomItem(IPS),
    device:  randomItem(DEVICES),
  };
}

// Generate 80 entries and sort newest first
export const MOCK_LOGS = Array.from({ length: 80 }, makeLog)
  .sort((a, b) => b.time - a.time)
  .map((l) => ({ ...l, timeStr: fmt(l.time) }));
