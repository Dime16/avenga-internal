import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

export const usePushNotifications = () => {
    useEffect(() => {
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                PushNotifications.register();
            } else {
                console.warn('Push permission not granted');
            }
        });

        PushNotifications.addListener('registration', token => {
            console.log('Push token:', token.value);
        });

        PushNotifications.addListener('registrationError', err => {
            console.error('Push registration error:', err);
        });

        PushNotifications.addListener('pushNotificationReceived', async (notification) => {
            console.log('Notification received in foreground:', notification);

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: notification.title || 'Notification',
                        body: notification.body || '',
                        id: Math.floor(Date.now() % 1000000),
                        schedule: { at: new Date(Date.now() + 100) },
                        sound: 'default',
                        attachments: undefined,
                        actionTypeId: '',
                        extra: notification.data,
                    },
                ],
            });
        });

        // Action on notification click/tap
        PushNotifications.addListener('pushNotificationActionPerformed', action => {
            console.log('Notification action performed:', action);
        });
    }, []);
};