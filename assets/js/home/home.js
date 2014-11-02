
var socket = io(window.location.pathname.substring(5));

function keyHandler(event) {
  if (event.keyCode == 13) {
    
    var value = $('#text_box').val();
    $('#chat_box').children().last().before("<p class=\"user_one\">" + value +"</p>");
    socket.emit('chat message', value);  

    $('#text_box').val('');
    $('#text_box').attr('placeholder', '');  

    $('body').scrollTop( $('#chat_box')[0].scrollHeight);
  }
}

$(document).ready(function () {
  $('#text_box').keyup(keyHandler);
  socket.on('chat message', function (msg) {
    $('#chat_box').children().last().before("<p class=\"user_two\">" + msg +"</p>");
    $('body').scrollTop( $('#chat_box')[0].scrollHeight);
  });
});
