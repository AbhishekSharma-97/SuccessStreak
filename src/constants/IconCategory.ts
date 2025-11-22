export const activityIconCategories = {
  fitness: ["Activity", "Run", "Dumbbell", "Bicycle", "Flame", "HeartPulse"],
  mindfulness: ["Lotus", "Moon", "Sun", "Cloud", "Feather"],
  learning: ["BookOpen", "GraduationCap", "PenTool", "Brain", "Bookmark"],
  health: ["Apple", "GlassWater", "Pill", "Heartbeat"],
  routine: ["Bed", "Coffee", "AlarmClock", "CalendarDays", "ClipboardCheck"],
  creativity: ["Music", "Camera", "Brush", "Mic", "Film"],
  productivity: ["Clipboard", "List", "Briefcase", "Focus"],
} as const;

export type ActivityCategory = keyof typeof activityIconCategories;
export type ActivityIconName = typeof activityIconCategories[ActivityCategory][number];
