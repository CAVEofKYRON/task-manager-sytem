export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return;
  }
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function checkDueReminders(projects) {
  if (!('Notification' in window)) {
    return;
  }
  if (Notification.permission !== 'granted') {
    return;
  }

  const notified = JSON.parse(localStorage.getItem('notifiedProjects') || '{}');
  const now = new Date();

  for (const project of projects) {
    if (notified[project.id]) {
      continue;
    }
    const dueDate = new Date(project.dueDate);
    const diff = dueDate.getTime() - now.getTime();
    if (diff > 0 && diff <= 24 * 60 * 60 * 1000) {
      new Notification('Projekt bald fällig', {
        body: `${project.title} ist in weniger als 24 Stunden fällig.`,
      });
      notified[project.id] = true;
    }
  }
  localStorage.setItem('notifiedProjects', JSON.stringify(notified));
}
