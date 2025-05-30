export function importToCalendar(project) {
  // Annahme: project.dueDate liegt im Format "YYYY-MM-DD" vor.
  const dtStart = project.dueDate.replace(/-/g, "");
  const dueDateObj = new Date(project.dueDate);
  // Für ein ganztägiges Event: DTEND ist der Folgetag
  dueDateObj.setDate(dueDateObj.getDate() + 1);
  const year = dueDateObj.getFullYear();
  const month = String(dueDateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dueDateObj.getDate()).padStart(2, "0");
  const dtEnd = `${year}${month}${day}`;

  const uid = Date.now() + "@" + window.location.hostname;
  const dtStamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Task Manager App//EN",
    "BEGIN:VEVENT",
    "UID:" + uid,
    "DTSTAMP:" + dtStamp,
    "DTSTART;VALUE=DATE:" + dtStart,
    "DTEND;VALUE=DATE:" + dtEnd,
    "SUMMARY:" + project.title,
    "DESCRIPTION:" + project.description,
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Erinnerung",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const icsContent = icsLines.join("\r\n");
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = project.title + ".ics";
  a.click();
  URL.revokeObjectURL(url);
}
