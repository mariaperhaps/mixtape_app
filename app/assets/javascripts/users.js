// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function overlay() {
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
$(document).ready(function() {

// tapeApp.tapeNum   = 0;

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

//Get All Tapes
  // window.onload = function(){
  //   $.ajax({
  //     url: "/tapes",
  //     format: "json"
  //   }).done(function(data){
  //     // console.log(data);
  //     for(var i = 0; i < data.length; i++){
  //       var newTape = new Tape(data[i]);
  //       newTapeView = new TapeView(newTape);
  //       TapeLink = $('<a>').attr('href', '/tapes/' + newTapeView.model.id).appendTo($('#tapes'))
  //       $('<li>').text(newTapeView.model.name).appendTo(TapeLink)
  //     }
  //   });
  // };


//Create A Tape
  $('#custom-submit').on('click', function(){
     console.log('works')
     var input = $('#customize').val()
     tape     = new Tape({ name: input });
     tapeView = new TapeView(tape)
     tape.create(input)

  el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    $('#overlay_btn').remove()

    $('#tape-options').css({visibility: 'visible'})
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
       el.draggable({
        drag: function( event, ui ) {
          tapeId = this.id
          console.log("dragged")
        }
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
            console.log('dropped');
            $tape = $('#' + tapeId)
            var tapeSource = $tape.attr('src')
            $tape.removeAttr('style').css({padding: '20px'}).appendTo('#edit-tape')

            $tape.draggable('destroy');

            $('#tape-options').css({visibility: 'hidden'});
             href = "/tapes/" + currentTapeId + "/edit"
            $editAnchor = $('<a>').attr('href', href).appendTo('#edit-tape');
            $('<button>').attr('id','save').html('Save and Start Mixing').css({marginLeft: '80px'}).appendTo($editAnchor);
    //Save Tape to Database
        $('#save').on('click', function(){
          console.log('clicked');
          tape.updateColor(tapeSource);

        });
       }
    });




});
