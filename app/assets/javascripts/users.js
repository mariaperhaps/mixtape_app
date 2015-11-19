// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
console.log('user.js linked')

function overlay() {
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
$(document).ready(function() {

$('#edit-user').on('click', function(){
  $('.visible-details').hide();
  $('.edit-details').show();
});

$('#update-user').on('click', function(){
  var $name = $('#update-name').val();
  var $city = $('#update-city').val();
  var $twitter = $('#update-twitter').val();
  var $id = $('.welcome').attr('id');
  $.ajax({
    type: 'PUT',
    url: '/users/' + $id,
    data: ({name: $name, city: $city, twitter: $twitter })
  }).done(function(){
      location.reload();  });
  });

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
     var name = $('#customize').val()
     var receiver = $('#receiver').val()
     var message = $('#message').val()

     $.ajax({
        url: '/tapes',
        method: 'POST',
        data: ({name:name, receiver: receiver, message: message})
     }).done(function(data){
      console.log(data);
      window.location.replace("/tapes/" + data.id + "/edit");
     });

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
            console.log('dropped');
            id = ui.draggable.attr('id')
            $tape = $('#' + id)
            var tapeSource = $tape.attr('src')

            $tape.removeAttr('style').css({padding: '20px'}).appendTo('#edit-tape')
            $tape.draggable('destroy');
            $('#tape-options').css({visibility: 'hidden'});
             href = "/tapes/" + currentTapeId + "/edit"
            // $editAnchor = $('<a>').attr('href', href).appendTo('#edit-tape');
            $('<button>').attr('id','save').html('Save and Start Mixing').css({marginLeft: '100px'}).appendTo('#edit-tape');
    //Save Tape to Database
        $('#save').on('click', function(){
          console.log('clicked');
          tape.update(tapeSource);

        });
       }
    });



  $('#review').on('click', function(){
    var id = $('h1').attr('id')
      console.log('sending')
        $('.fade-over').show();
        $('i.fa-spinner').show();
         $.ajax({
          type: "POST",
          url: "/invitations",
          format: "json",
          data: ({id: id})
        }).done (function(data){
          $('i.fa-spinner').hide();
          var $thanks = $('<h1 class="thanks">').text("Your tape has been sent!").appendTo($('.fade-over'))
          setTimeout(function(){
            $('.fade-over').fadeOut('slow', function(){
              $thanks.remove()
            });
          }, 2000);
   });
  });


});
