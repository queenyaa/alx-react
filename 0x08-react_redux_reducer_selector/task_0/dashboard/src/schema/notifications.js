// src/schema/notifications.js
import { schema, normalize } from 'normalizr';
import notificationsData from '../../notifications.json';


const user = new schema.Entity("users");

const message = new schema.Entity("messages", {}, { idAttribute: "guid" });

const notification = new schema.Entity("notifications", {
  author: user,
  context: message
});

export default notification;
// const normalizedData = normalize(notificationsData.default, [notification]);

// export { normalizedData };

const normalizedData = normalize(notificationsData, [notification]);
export const getAllNotificationsByUser = (userId) => {
  const { notifications, messages } = normalizedData.entities;
  return Object.values(notifications)
    .filter(notification => notification.author === userId)
    .map(notification => messages[notification.context]);
};