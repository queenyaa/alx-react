import $ from 'jquery';
import _ from 'lodash';

// Adding elements to the DOM
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button id="start-button">Click here to get started</button>');
$('body').append('<p id="count"></p>');
$('body').append('<p>Copyright - Holberton School</p>');

// Function to track button clicks and update counter
let count = 0;
const updateCounter = _.debounce(() => {
  count++;
  $('#count').text(`${count} clicks on the button`);
}, 1000);

// Event listener for button click
$('#start-button').on('click', () => {
  updateCounter();
});
