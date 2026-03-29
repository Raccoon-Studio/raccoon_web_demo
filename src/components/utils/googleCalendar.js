// utils/googleCalendar.js

/**
 * Generates a Google Calendar "create event" URL with pre-filled details.
 *
 * @param {Object} options
 * @param {string} options.title       – Event title
 * @param {Date}   options.startDate   – JS Date for start
 * @param {number} options.durationMin – Duration in minutes (default 30)
 * @param {string} options.description – Event description / agenda
 * @param {string} options.location    – Location or video call URL
 * @param {string} options.guestEmail  – Pre-fill guest email (optional)
 * @returns {string} Google Calendar URL
 */
export function buildGoogleCalendarUrl({
  title = "Discovery Call — Raccoon Studio",
  startDate,
  durationMin = 30,
  description = "",
  location = "Google Meet (link will be added)",
  guestEmail = "",
}) {
  const fmt = (d) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  const start = fmt(startDate);
  const end = fmt(new Date(startDate.getTime() + durationMin * 60 * 1000));

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location,
    sf: "true",
    output: "xml",
  });

  if (guestEmail) {
    params.set("add", guestEmail);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates available time slots for a given date.
 * Business hours: 9 AM – 5:30 PM (last slot at 5:30 so it ends by 6 PM).
 *
 * @param {Date}   date        – The day to generate slots for
 * @param {number} intervalMin – Slot interval in minutes (default 30)
 * @param {string} timezone    – IANA timezone string
 * @returns {Date[]} Array of slot start times
 */
export function getAvailableSlots(
  date,
  intervalMin = 30,
  timezone = "America/Los_Angeles",
) {
  const slots = [];
  const startHour = 9;
  const endHour = 17;
  const endMinute = 30;

  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += intervalMin) {
      if (h === endHour && m > endMinute) break;
      const slot = new Date(date);
      slot.setHours(h, m, 0, 0);

      // Skip past slots
      if (slot > new Date()) {
        slots.push(slot);
      }
    }
  }

  return slots;
}

/**
 * Returns the next N business days from today.
 *
 * @param {number} count – How many days to return
 * @returns {Date[]}
 */
export function getNextBusinessDays(count = 14) {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1); // start from tomorrow

  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

/**
 * Format helpers
 */
export function formatDate(d) {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(d) {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateFull(d) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}