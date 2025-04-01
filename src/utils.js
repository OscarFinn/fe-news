export function handleDates(dateStr) {
  const fullDate = new Date(dateStr);
  const date = fullDate.toLocaleDateString();
  const time = fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const now = new Date();

  const diffInSeconds = Math.round((fullDate - now) / 1000);

  const timeUnits = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  let relativeTime = "Just now";
  for (const { unit, seconds } of timeUnits) {
    const diff = Math.round(diffInSeconds / seconds);
    if (Math.abs(diff) >= 1) {
      relativeTime = relativeTimeFormat.format(diff, unit);
      break;
    }
  }

  return { date, time, relativeTime };
}
