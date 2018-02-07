import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

// Sweet Alert

import swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();

$('#contact-form')
  .on('invalid.zf.abide', function(ev, elem) {
    swal('Oops...', 'Something went wrong!', 'error');
  })
  // form validation passed, form will submit if submit event not returned false
  .on('formvalid.zf.abide', function(ev, frm) {
    var form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function(data) {
        var result = data;
        var response = JSON.parse(result);
        console.log(response);
        swal(
          response.message,
          'Thank You ',
          +response.name + 'For your reservation',
          'success'
        );
      }
    });
    // ajax post form
  })
  // to prevent form from submitting upon successful validation
  .on('submit', function(ev) {
    ev.preventDefault();
    console.log('Submit for form id ' + ev.target.id + ' intercepted');
  });
