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

export function checkTaskDeadlines(tasks) {
  if (!('Notification' in window)) {
    return;
  }
  if (Notification.permission !== 'granted') {
    return;
  }

  const notified = JSON.parse(localStorage.getItem('notifiedTasks') || '{}');
  const now = new Date();

  for (const task of tasks) {
    if (notified[task.id] || !task.dueDate) {
      continue;
    }
    const dueDate = new Date(task.dueDate);
    const diff = dueDate.getTime() - now.getTime();
    if (diff > 0 && diff <= 24 * 60 * 60 * 1000) {
      new Notification('Aufgabe bald fällig', {
        body: `${task.text} ist in weniger als 24 Stunden fällig.`,
      });
      notified[task.id] = true;
    }
  }
  localStorage.setItem('notifiedTasks', JSON.stringify(notified));
}
