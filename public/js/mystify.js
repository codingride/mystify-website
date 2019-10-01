'use strict';

var validation = function(email) {
  var valid = false;
  email = email.toString().trim();
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(filter.test(email)) {
    valid = true;
  } else {
    valid = false;
  }
  return valid;
}

$(function () {  
  $('#newsletter_form').submit(function (e) {
    e.preventDefault();
    // Rest message value
    $('#message').removeClass('notification is-danger');
    $('#message').html('');

    // Disable submit
    $('#newsletter_submit').toggleClass('is-loading');
    $('#newsletter_submit').prop('disabled', true);

    var email = $('input:first').val();
    grecaptcha.ready(function () {
      grecaptcha.execute('6Lfz868UAAAAAImEnE9fqF4g_1IrxT43_DPjXR6i', { action: 'homepage' }).then(function(token) {
        if (token && validation(email)) {
          $.ajax({
            url: 'https://server.mystify.one/newsletter',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
              email : email,
              recaptcha : token
            }),
            success: function(result) {
              $('#newsletter_submit').removeClass('is-loading');
              $('#newsletter_id').val('');
              $('#newsletter_submit').prop('disabled', false);
              $('#message').addClass('notification is-success');
              $('#message').html(result.data.message).show().delay( 3000 ).fadeOut( 1000 );
            },
            error: function(error) {
              $('#newsletter_submit').removeClass('is-loading');
              $('#newsletter_id').val('');
              $('#newsletter_submit').prop('disabled', false);
              $('#message').addClass('notification is-danger');
              $('#message').html(error.responseJSON.data.message).show().delay( 3000 ).fadeOut( 1000 );
            }
          });
        } else {
          $('#newsletter_submit').removeClass('is-loading');
          $('#newsletter_id').val('');
          $('#newsletter_submit').prop('disabled', false);
          $('#message').addClass('notification is-danger');
          $('#message').html('Email address must be valid!').show().delay( 3000 ).fadeOut( 1000 );
        }
      });
    });
  });
});

$(function () {  
  $('#contact_form').submit(function (e) {
    e.preventDefault();
    
    // Rest message value
    $('#message').removeClass('notification is-danger');
    $('#message').html('');

    // Disable submit
    $('#contact_submit').toggleClass('is-loading');
    $('#contact_submit').prop('disabled', true);

    var name = $('#contact_name').val();
    var email = $('#contact_email').val();
    var message = $('#contact_message').val();
    
    grecaptcha.ready(function () {
      grecaptcha.execute('6Lfz868UAAAAAImEnE9fqF4g_1IrxT43_DPjXR6i', { action: 'homepage' }).then(function(token) {
        if (token && validation(email)) {
          if(name.toString().trim() === '' || message.toString().trim() === '') {
            $('#contact_submit').removeClass('is-loading');
            $('#contact_submit').prop('disabled', false);
            $('#message').addClass('notification is-danger');
            $('#message').html('Your name and message must not be empty!').show().delay( 3000 ).fadeOut( 1000 );
          } else {
            $.ajax({
              url: 'https://server.mystify.one/contact',
              type: 'post',
              dataType: 'json',
              data: JSON.stringify({
                name: name,
                email : email,
                message: message,
                recaptcha : token
              }),
              success: function(result) {
                console.log(result)
                $('#contact_submit').removeClass('is-loading');
                $('#contact_name').val('');
                $('#contact_email').val('');
                $('#contact_message').val('');
                $('#contact_submit').prop('disabled', false);
                $('#message').addClass('notification is-success');
                $('#message').html(result.data.message).show().delay( 3000 ).fadeOut( 1000 );
              },
              error: function(error) {
                console.log(error)
                $('#contact_submit').removeClass('is-loading');
                $('#contact_submit').prop('disabled', false);
                $('#message').addClass('notification is-danger');
                $('#message').html(error.responseJSON.data.message).show().delay( 3000 ).fadeOut( 1000 );
              }
            }); 
          }
        } else {
          $('#contact_submit').removeClass('is-loading');
          $('#contact_submit').prop('disabled', false);
          $('#message').addClass('notification is-danger');
          $('#message').html('Email address must be valid!').show().delay( 3000 ).fadeOut( 1000 );
        }
      });
    });
  });
});
