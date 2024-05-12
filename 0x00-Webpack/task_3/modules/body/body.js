const $ = require( "jquery" );
const _ = require( "lodash" );
import "../../modules/body/body.css";

$(document).ready(function() {
    $('body').append('<button id="clickBtn">Click me!</button>');
    $('body').append('<p id="count">0 clicks on the button</p>');

    let count = 0;
    $('#clickBtn').on('click', function() {
        count++;
        $('#count').text(`${count} clicks on the button`);
    });
});
