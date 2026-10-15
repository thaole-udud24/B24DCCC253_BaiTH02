const VN_LOCALE = 'vi-VN';
const VN_TIMEZONE = 'Asia/Ho_Chi_Minh';

export function formatDayOfWeek(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const str = date.toLocaleDateString(VN_LOCALE, { weekday: 'short', timeZone: VN_TIMEZONE });
  return str.replace('Th ', 'Th ');
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString(VN_LOCALE, { day: '2-digit', month: '2-digit', timeZone: VN_TIMEZONE });
}

export function formatUpdateTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString(VN_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: VN_TIMEZONE,
  });
}

export function formatHourOnly(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleTimeString(VN_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: VN_TIMEZONE,
  });
}

export function formatFullDateVietnamese(): string {
  const date = new Date();
  const weekday = date.toLocaleDateString(VN_LOCALE, { weekday: 'long', timeZone: VN_TIMEZONE });
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // Capitalize first letter
  const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capWeekday}, ${day} tháng ${month}, ${year}`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Chào buổi sáng! ☀️';
  if (hour >= 12 && hour < 18) return 'Chào buổi chiều! 🌤️';
  return 'Chào buổi tối! 🌙';
}

export function isToday(dateString: string): boolean {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: VN_TIMEZONE });
  return dateString === today;
}
