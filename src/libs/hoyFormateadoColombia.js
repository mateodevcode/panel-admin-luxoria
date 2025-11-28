export function hoyFormateadoColombia() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    timeZone: "America/Bogota",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";

  const stripDot = (s) => s.replace(/\.$/, ""); // quita el punto de "sáb."
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return `${cap(stripDot(weekday))} ${day} ${cap(month)}`;
}
