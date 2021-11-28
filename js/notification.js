setTimeout(() => {
    messageInBackground();
}, 2000);

var notification_count = 0;

export function messageInBackground() {
    if (notification_count > 0) {
        chrome.browserAction.setBadgeText({ text: notification_count.toString() });
    }

    setInterval(() => {
        const data = JSON.parse(localStorage.getItem("company-reminders-list"));

        for (let i = 0; i < data?.length; i++) {
            const expirationDate = data[i]?.due;
            const expDateStr = String(new Date(expirationDate));
            const now = Date();
            const timeDiff = Date.parse(now) - Date.parse(expDateStr);

            console.log(timeDiff);

            if (timeDiff === -172800000) {
                notification_count++;

                chrome.browserAction.setBadgeText({
                    text: notification_count.toString(),
                });

                var notification = chrome.notifications.create(
                    "itemAdd",
                    {
                        type: "basic",
                        title: "Prepo: Reminder",
                        message: `Application at ${data[i]?.company.value} due in 2 days`,
                        iconUrl: "temp_logo.png",
                    },
                    () => { }
                );
                notification?.show();
            }

            if (timeDiff === -86400000) {
                notification_count++;

                chrome.browserAction.setBadgeText({
                    text: notification_count.toString(),
                });

                var notification = chrome.notifications.create(
                    "itemAdd",
                    {
                        type: "basic",
                        title: "Prepo: Reminder",
                        message: `Application at ${data[i]?.company.value} due tomorrow`,
                        iconUrl: "temp_logo.png",
                    },
                    () => { }
                );
                notification?.show();
            }

            if (timeDiff === -12600000) {
                notification_count++;

                chrome.browserAction.setBadgeText({
                    text: notification_count.toString(),
                });

                var notification = chrome.notifications.create(
                    "itemAdd",
                    {
                        type: "basic",
                        title: "Prepo: Reminder",
                        message: `Application at ${data[i]?.company.value} due in 4 hours`,
                        iconUrl: "temp_logo.png",
                    },
                    () => { }
                );
                notification?.show();
            }

            if (timeDiff === -900000) {
                if (notification_count > 0) {

                    chrome.browserAction.setBadgeText({
                        text: notification_count.toString(),
                    });

                }
                notification_count++;

                var notification = chrome.notifications.create(
                    "itemAdd",
                    {
                        type: "basic",
                        title: "Prepo: Reminder",
                        message: `Application ${data[i]?.company.value} is in 15 minutes`,
                        iconUrl: "temp_logo.png",
                    },
                    () => { }
                );
                notification?.show();
            }

            if (timeDiff === 0) {
                notification_count++;
                if (notification_count > 0) {

                    chrome.browserAction.setBadgeText({
                        text: notification_count.toString(),
                    });

                }

                var notification = chrome.notifications.create(
                    "itemAdd",
                    {
                        type: "basic",
                        title: "Prepo: Reminder",
                        message: `Your ${data[i]?.company.value} Application deadline is here`,
                        iconUrl: "temp_logo.png",
                    },
                    () => { }
                );
                notification?.show();
            }
        }
    }, 1000);
}