  // src/schema/notifications.js
  import { schema, normalize } from 'normalizr';
  import notificationsData from '../../dist/notifications.json';


  const user = new schema.Entity("users");

  const message = new schema.Entity("messages", {}, { idAttribute: "guid" });

  const notification = new schema.Entity("notifications", {
    author: user,
    context: message
  });

  export default notification;
  export const notificationSchema = new schema.Array(notification);
  // const normalizedData = normalize(notificationsData.default, [notification]);

  export const notificationsNormalizer = (data) => {
    return normalize(data, notificationSchema);
  };
  // export { normalizedData };

  // const normalizedData = normalize(notificationsData, [notification]);
  export const getAllNotificationsByUser = (userId) => {
    const normalizedData = notificationsNormalizer(notificationsData);
    const { notifications, users, messages } = normalizedData.entities;

    if (!notifications) {
      return [];
    }
    return Object.values(notifications)
      .filter(notification => notification.author === userId)
      .map(notification => messages[notification.context]);
  };