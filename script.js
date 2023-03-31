function updateButton(button, permission) {
    if (window.Notification.permission == 'granted') {
        button.innerText = 'Subscribed'
        button.disabled = true
    }
    else if (window.Notification.permission == 'denied') {
        button.innerText = 'Unsubscribed'
        button.disabled = true
    }
    else {
        document.getElementById('subscription').innerText = 'Waiting for subscription...'
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUserToPush() {
    navigator.serviceWorker.register('/service-worker.js')
    navigator.serviceWorker.ready.then((registration) => {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BIA7A6M5KRcpwI-M9CrYFrpmVameyihIjywOIUgmdA3p7NATE2SjIQ1UB-3qLgKvE3CHgsTIlgBX_7nnr5WO-3E',
            ),
        };

        registration.pushManager.subscribe(subscribeOptions).then(
            (pushSubscription) => {
                document.getElementById('subscription').innerText = JSON.stringify(pushSubscription)
            },
            (error) => {
                document.getElementById('subscription').innerText = error
            }
        );
    })
}

const button = document.getElementById('myBtn')
button.innerText = 'Subscribe'
button.onclick = function() {
    Notification.requestPermission()
        .then(function (result) {
            updateButton(button, result)
            if (result == 'granted') { 
                subscribeUserToPush()
            }
        })
}
if (!('Notification' in window)) {
    button.innerText = 'Unsupported browser'
    button.disabled = true
}
else {
    updateButton(button, window.Notification.permission)
}
