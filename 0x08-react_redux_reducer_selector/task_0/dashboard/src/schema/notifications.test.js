// schema/notifications.test.js
import { normalize, schema } from 'normalizr';
import { getAllNotificationsByUser } from './notifications';
import notificationSchema from './notifications';
import notification from './notifications';
import notificationsData from '../../notifications.json';

// Normalizing the data using the notification schema
const normalizedData = normalize(notificationsData, [notification]);

test('getAllNotificationsByUser returns correct notifications for user', () => {
  // const userId = '5debd764a7c57c7839d722e9';
  const expectedOutput = [
    {
      guid: "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
      isRead: true,
      type: "urgent",
      value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    },
    {
      guid: "280913fe-38dd-4abd-8ab6-acdb4105f922",
      isRead: false,
      type: "urgent",
      value: "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
    }
  ];

  const notifications = getAllNotificationsByUser("5debd764a7c57c7839d722e9");
  expect(notifications).toEqual(expect.arrayContaining(expectedOutput));
});

test('normalized data contains correct result array', () => {
  const data = [
    { id: "5debd76480edafc8af244228" },
    { id: "5debd764507712e7a1307303" },
    { id: "5debd76444dd4dafea89d53b" },
    { id: "5debd76485ee4dfd1284f97b" },
    { id: "5debd7644e561e022d66e61a" },
    { id: "5debd7644aaed86c97bf9d5e" },
    { id: "5debd76413f0d5e5429c28a0" },
    { id: "5debd7642e815cd350407777" },
    { id: "5debd764c1127bc5a490a4d0" },
    { id: "5debd7646ef31e0861ec1cab" },
    { id: "5debd764a4f11eabef05a81d" },
    { id: "5debd764af0fdd1fc815ad9b" },
    { id: "5debd76468cb5b277fd125f4" },
    { id: "5debd764de9fa684468cdc0b" },

  ];

  const normalizedData = normalize(data, [notificationSchema]);
  const resultArray = Object.keys(normalizedData.entities.notifications);

  const expectedArray = data.map(item => item.id);

  expect(resultArray).toEqual(expectedArray);
});

describe('Schema normalization', () => {
  it('has a correct users entity', () => {
    const expectedReturn = {
      age: 25,
      email: "poole.sanders@holberton.nz",
      id: "5debd764a7c57c7839d722e9",
      name: { first: "Poole", last: "Sanders" },
      picture: "http://placehold.it/32x32"
    };

    const user = normalizedData.entities.users["5debd764a7c57c7839d722e9"];

    expect(user).toEqual(expectedReturn);
  });
});

test('normalized data contains correct messages entity', () => {
  const data = {
      guid: "efb6c485-00f7-4fdf-97cc-5e12d14d6c41",
      isRead: false,
      type: "default",
      value: "Cursus risus at ultrices mi."
    };
    // Add other messages here
  expect(normalizedData.entities.messages["efb6c485-00f7-4fdf-97cc-5e12d14d6c41"]).toEqual(data);
});

test('normalized data contains correct notifications entity', () => {
  const data = [
    { id: "5debd7642e815cd350407777", author: "5debd764f8452ef92346c772", context: "3068c575-d619-40af-bf12-dece1ee18dd3" },
    // Add other notifications here
  ];

  const normalizedData = normalize(data, [notificationSchema]);

  expect(normalizedData.entities.notifications["5debd7642e815cd350407777"]).toEqual(data[0]);
});