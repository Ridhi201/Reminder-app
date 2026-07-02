/**
 * NAVIGATION_STRUCTURE is the single source of truth for every module and
 * screen in the app. The route generator (see /scripts/generate-screens.mjs)
 * reads this same shape to create placeholder screens + routes, and the
 * Sidebar / ModuleOverview components read it at runtime to render nav.
 *
 * Shape:
 * { key, label, icon, slug, screens: [{ key, label, slug }] }
 */
import { toPascalCase, toSlug } from "../utils/slugify.js";

const RAW_STRUCTURE = [
  { key: "Authentication", label: "Authentication", icon: "🔐", screens: ["Splash", "Onboarding", "Welcome", "Login", "Register", "OTP Verification", "Forgot Password", "Reset Password", "Complete Profile"] },
  { key: "Dashboard", label: "Dashboard", icon: "📊", screens: ["Dashboard Home", "Today's Progress", "Today's Goal", "Weekly Analytics", "Monthly Analytics", "Upcoming Reminders", "Productivity Score", "Focus Time", "Water Tracker", "Mood Tracker", "Quote Of The Day", "Weather Widget", "Quick Actions", "Recent Activity", "Dashboard Settings"] },
  { key: "Reminder", label: "Reminders", icon: "⏰", screens: ["Reminder List", "Reminder Details", "Create Reminder", "Edit Reminder", "Delete Reminder", "Reminder History", "Reminder Notes", "Reminder Checklist", "Reminder Attachments", "Reminder Timeline", "Reminder Activity", "Reminder Archive", "Completed Reminders", "Pending Reminders", "Overdue Reminders", "Reminder Statistics"] },
  { key: "Calendar", label: "Calendar", icon: "📅", screens: ["Day View", "Week View", "Month View", "Year View", "Agenda View", "Timeline View", "Calendar Sync", "Calendar Settings"] },
  { key: "Templates", label: "Templates", icon: "🧩", screens: ["Browse Templates", "Featured Templates", "Premium Templates", "My Templates", "Create Template", "Edit Template", "Template Categories", "Template Preview", "Template History"] },
  { key: "AIAssistant", label: "AI Assistant", icon: "🤖", screens: ["AI Chat", "AI Reminder Generator", "AI Smart Schedule", "AI Daily Summary", "AI Weekly Summary", "AI Suggestions", "AI Voice Assistant", "AI Reminder Optimizer"] },
  { key: "VoiceAssistant", label: "Voice Assistant", icon: "🎙️", screens: ["Voice Reminder", "Voice Notes", "Voice Commands", "Voice History", "Voice Settings"] },
  { key: "LocationReminder", label: "Location Reminder", icon: "📍", screens: ["Saved Locations", "Add Location", "Edit Location", "Geofence", "Enter Location Trigger", "Exit Location Trigger", "Nearby Places"] },
  { key: "HabitTracker", label: "Habit Tracker", icon: "✅", screens: ["Habit Dashboard", "Habit List", "Create Habit", "Edit Habit", "Habit Analytics", "Habit Calendar", "Habit Rewards"] },
  { key: "GoalTracker", label: "Goal Tracker", icon: "🎯", screens: ["Goal Dashboard", "Goal List", "Create Goal", "Goal Progress", "Goal Analytics", "Goal Timeline"] },
  { key: "Pomodoro", label: "Pomodoro", icon: "🍅", screens: ["Focus Timer", "Break Timer", "Session History", "Pomodoro Analytics"] },
  { key: "Notes", label: "Notes", icon: "📝", screens: ["Notes List", "Create Note", "Edit Note", "Checklist Notes", "Drawing Notes", "Voice Notes", "Archive"] },
  { key: "Groups", label: "Groups", icon: "👥", screens: ["Family", "Friends", "Office", "Shared Reminders", "Members", "Group Chat", "Invitations"] },
  { key: "Notifications", label: "Notifications", icon: "🔔", screens: ["Notification Center", "Notification Details", "Notification History", "Notification Settings", "Smart Notifications"] },
  { key: "Badges", label: "Badges", icon: "🏅", screens: ["Badge Dashboard", "Badge Collection", "Badge Details", "Achievement Progress", "Locked Badges"] },
  { key: "XPLevels", label: "XP & Levels", icon: "⭐", screens: ["Level Dashboard", "XP History", "Rewards", "Leaderboard"] },
  { key: "Streak", label: "Streak", icon: "🔥", screens: ["Current Streak", "Best Streak", "Streak Calendar", "Monthly Progress", "Statistics", "Streak Rewards"] },
  { key: "Analytics", label: "Analytics", icon: "📈", screens: ["Daily Analytics", "Weekly Analytics", "Monthly Analytics", "Yearly Analytics", "Completion Rate", "Productivity Graph", "Focus Analytics", "Reports"] },
  { key: "Premium", label: "Premium", icon: "💎", screens: ["Plans", "Upgrade", "Payment", "Coupons", "Purchase History", "Premium Features"] },
  { key: "Profile", label: "Profile", icon: "👤", screens: ["My Profile", "Edit Profile", "Security", "Devices", "Login Activity", "Preferences", "Profile Saved Locations"] },
  { key: "Settings", label: "Settings", icon: "⚙️", screens: ["Appearance", "Themes", "Language", "Notification Settings", "Reminder Defaults", "Calendar Settings", "Backup", "Cloud Sync", "Export Data", "Import Data", "Privacy", "Permissions", "About", "Version"] },
  { key: "HelpCenter", label: "Help Center", icon: "❓", screens: ["FAQ", "Contact Support", "Bug Report", "Feature Request", "Tutorials"] },
  { key: "Legal", label: "Legal", icon: "📄", screens: ["Privacy Policy", "Terms & Conditions", "Refund Policy", "Licenses"] },
];

export const NAVIGATION_STRUCTURE = RAW_STRUCTURE.map((module) => ({
  ...module,
  slug: toSlug(module.label),
  screens: module.screens.map((label) => ({
    key: toPascalCase(label),
    label,
    slug: toSlug(label),
  })),
}));

export const findModule = (moduleSlug) =>
  NAVIGATION_STRUCTURE.find((m) => m.slug === moduleSlug);

export const findScreen = (moduleSlug, screenSlug) => {
  const module = findModule(moduleSlug);
  if (!module) return null;
  const screen = module.screens.find((s) => s.slug === screenSlug);
  return screen ? { module, screen } : null;
};
