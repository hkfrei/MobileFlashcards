import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "MobileFlashcards:notifications";

/*
* @description Remove the Notification key from Async storage and
* cancel all scheduled notifications.
*/
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

/*
* @description Define the notification
* @return {object} an object which represents the notification
*/
function createNotification() {
  return {
    title: "MobileFlashcards reminder!",
    body: "You didn't train until now. Answer some questions!",
    ios: {
      sound: true
    }
  };
}

/*
* @description Set the local notification in asyns
* storage if there is no one available
*/
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      // if no notification is stored
      if (data === null) {
        // ask for permission to send MobileFlashcards notifications
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          // the answer is a status object
          .then(({ status }) => {
            if (status === "granted") {
              // Remove all previous scheduled notifications
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              // Set the date tomorrow at 18.00
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(18);
              tomorrow.setMinutes(0);

              // Schedule a notification for tomorrow 18.00
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day"
                }
              );
              // Set the AsyncStorage Notification to true => Notification is set
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
