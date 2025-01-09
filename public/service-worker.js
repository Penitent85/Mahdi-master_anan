// public/service-worker.js
self.addEventListener('push', function (event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/default-icon.png', // Optional icon path
        data: data.click_action, // URL to open when notification is clicked
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.notification.data) {
        clients.openWindow(event.notification.data); // Open the URL
    }
});
