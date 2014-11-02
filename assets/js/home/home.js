var socket = io();

function keyHandler(event) {
  if (event.keyCode == 13) {
    
    var value = $('#text_box').val();
    $('#chat_box').append("<p class=\"user_one\">" + value +"</p>");
    socket.emit('chat message', value);  

    $('#text_box').val('');
    $('#text_box').attr('placeholder', '');  

    console.log($('#chat_box')[0].scrollHeight);
    $('body').scrollTop( $('#chat_box')[0].scrollHeight - $('#text_box').height() );


  }
}



$(document).ready(function () {
  $('#text_box').keyup(keyHandler);
});
