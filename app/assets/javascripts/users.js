// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
console.log('user.js linked')

function overlay() {
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
$(document).ready(function() {

function getUser(){
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json'
    }).done (function(data){
      // console.log(data);
      user_id = data.id
   })
  };

getUser()

//Create A Tape
  $('#custom-submit').on('click', function(){
     console.log('works')
     var name = $('#customize').val()
     var receiver = $('#receiver').val()
     var message = $('#message').val()

     tape     = new Tape({ name: name, receiver: receiver, message: message });
     tapeView = new TapeView(tape)
     tape.create(name, receiver, message)

  el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    $('#overlay_btn').remove()
    $('#tape-options').css({visibility: 'visible'})
    $('#edit-tape').html('<p id="drop">drop here</p>');
  });

//Tape Dragging
    $yellowPinkTape = $('#yellowpink');
    $clearBlueTape = $('#clearblue');
    $redGreen = $('#redgreen');
    $yellowGreen = $('#yellowgreen');
    $blueWhite = $('#bluewhite');
    $rainbow = $('#rainbow');
    $pink = $('#pink');
    $greenYellow = $('#greenyellow');
    $black = $('#black');
    $blue = $('#blue');

    function dragTapes (el){
          // tapeId = el.attr('id')
          // debugger
       el.draggable({
          appendTo: 'body',
          containment: 'window',
          scroll: false,
          helper: 'clone'
          // console.log("dragged")
      });
    }

    dragTapes($yellowPinkTape);
    dragTapes($clearBlueTape);
    dragTapes($redGreen);
    dragTapes($yellowGreen);
    dragTapes($blueWhite);
    dragTapes($rainbow);
    dragTapes($pink);
    dragTapes($greenYellow);
    dragTapes($black);
    dragTapes($blue);


    $('#edit-tape').droppable({
        drop: function(event, ui) {
            $('#drop').remove();
            console.log('dropped');
            id = ui.draggable.attr('id')
            $tape = $('#' + id)
            var tapeSource = $tape.attr('src')

            $tape.removeAttr('style').css({padding: '20px'}).appendTo('#edit-tape')
            $tape.draggable('destroy');
            $('#tape-options').css({visibility: 'hidden'});
             href = "/tapes/" + currentTapeId + "/edit"
            // $editAnchor = $('<a>').attr('href', href).appendTo('#edit-tape');
            $('<button>').attr('id','save').html('Save and Start Mixing').css({marginLeft: '17%'}).appendTo('#edit-tape');
    //Save Tape to Database
        $('#save').on('click', function(){
          console.log('clicked');
          tape.update(tapeSource);

        });
       }
    });



  $('#send').on('click', function(){
    var id = $('img').eq(1).attr('id')
      console.log('sending')
         $.ajax({
          type: "POST",
          url: "/invitations",
          format: "json",
          data: ({id: id})
        }).done (function(data){
          console.log(data);
   })
  });


});
