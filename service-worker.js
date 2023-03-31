self.addEventListener('push', function(event) {
    const promiseChain = self.registration.showNotification(event.data.text(), {
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        requireInteraction: true,
        tag: 'renotify',
        renotify: true,
        silent: false
    });

    event.waitUntil(promiseChain);
})
