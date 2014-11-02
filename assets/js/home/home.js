
var socket = io(window.location.pathname.substring(5));

function keyHandler(event) {
  //user presses enter
  if (event.keyCode == 13) {

    var value = $('#text_box').val();
    if($('#chat_box').find('p').length > 0) {
      $('#chat_box').find('p').last().after("<p class=\"user_one wordwrap\">" + value.toUpperCase() +"</p>");
    } else {
      $('#chat_box').prepend("<p class=\"user_one wordwrap\">" + value.toUpperCase() +"</p>");
    }
    socket.emit('chat message', value);  
    socket.emit('not typing');

    $('#text_box').val('');
    $('#text_box').attr('placeholder', '');  
    $('#chat_box').scrollTop( $('#chat_box')[0].scrollHeight);
  } else {
    if($('#text_box').val().length == 0) {
      socket.emit('not typing');
    } else {
      socket.emit('typing');
    }
  }
}

$(document).ready(function () {
  $('#text_box').keyup(keyHandler);

  socket.on('chat message', function (msg) {
    $('#chat_box').append("<p class=\"user_two wordwrap\">" + msg.toUpperCase() +"</p>");
    $('#chat_box').scrollTop( $('#chat_box')[0].scrollHeight );
  });

  socket.on('typing', function() {
    if ($('.typing').length == 0) {
      $('#chat_box').append("<div class='typing'><img height='29' src='../../imgs/typing.png'> </img></div>");
      $('#chat_box').scrollTop( $('#chat_box')[0].scrollHeight);
    }
  });
  socket.on('not typing', function() {
    $('.typing').remove();
    $('#chat_box').scrollTop( $('#chat_box')[0].scrollHeight );  
  });

  socket.on('left room', function() {
    console.log('welp. other person left.');
    $('body').append("<div class='faded'></div>");
    $('.faded').animate({opacity: 1}, 3000);
  });

  socket.on('person entered', function() {
    $('#clock').countdown(new Date().getTime() + 100, function (event) {
      if (event.type == "finish") {
         $('body').append("<div class='faded'></div>");
         $('.faded').animate({opacity: 1}, 3000);
      }
      $(this).html(event.strftime('%-M:%S'));
    });
  });

});
