self.addEventListener('push', function(event) {
    const promiseChain = self.registration.showNotification(event.data.text());
    const audio = new Audio('sound.wav')
    audio.addEventListener("canplaythrough", (event) => {
        audio.play();
    });

    event.waitUntil(promiseChain);
})
