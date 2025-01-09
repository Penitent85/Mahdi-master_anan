// hooks/usePushNotifications.js
import { useEffect } from 'react';

export const usePushNotifications = () => {
    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.error('Notification permission denied.');
        }
    };

    const subscribeToPushNotifications = async () => {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: '<Your-VAPID-Public-Key>', // Replace with Base64-encoded public key
            });

            console.log('Push subscription:', subscription);

            // Send the subscription to your backend
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription),
            });
        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    };

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            requestNotificationPermission();
        }
    }, []);

    return { subscribeToPushNotifications };
};
