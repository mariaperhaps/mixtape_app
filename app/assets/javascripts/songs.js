console.log("Song.js linked");
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function Song(data) {
  this.name = data.name;
  this.soundcloud_id = data.soundcloud_id;
  this.tape_id = data.tape_id;
  this.duration = data.duration;
  this.id = data.id;
};

function SongView(model){
  this.$el   = $("<li>");
  this.model = model;
}

Song.prototype.play = function(){
  SC.initialize({
    client_id: "d95ac796afeb1568792d9ff7a945e19d",
   });
    track = SC.stream("/tracks/" + this.soundcloud_id, function(sound){
      sound.play();
  });
}

Song.prototype.pause = function(){
  SC.initialize({
    client_id: "d95ac796afeb1568792d9ff7a945e19d",
   });
    track = SC.stream("/tracks/" + this.soundcloud_id, function(sound){
      track.pause();
  });
}

Song.prototype.destroy = function(){
  $.ajax({
       type: "DELETE",
       url: "/tapes/" + this.id,
    });
};

function Playlist(playlist){
  this.playlist = playlist
}

Playlist.prototype.duration = function(){
  return // whatever all the songs durations are.
}

total_duration = 0;


// function doSetTimeout(index, duration){
//    setTimeout(function(){
//       console.log(index, total_duration);
//     }, total_duration);
// }

// Playlist.prototype.playAll = function(){
//   for(i = 0; i < playlist.length; i++){
//    setTimeout(function(x)
//     { return function() { console.log(x, total_duration); total_duration += 2000 };
//   }(i), total_duration*i)
//  }
// }



function doSetTimeout(index, duration){
  setTimeout(function(){index.play()}, duration)
}

Playlist.prototype.playAll = function(){
  for (var i = 0; i < playlist.length; i++){
    console.log(total_duration)
     doSetTimeout(playlist[i], total_duration)
     total_duration += playlist[i].duration;
     }
}


//Get All Songs
function loadSongs(){
  $.ajax({
    url: "/songs",
    format: "json"
  }).done(function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
      var newSong = new Song(data[i]);
      playlist.push(newSong);
      newSongView = new SongView(newSong);
      $('<li>').html('<span>X</span>' + newSongView.model.name).attr('id',newSongView.model.id).on('click', function(){
         $.ajax({
             type: "DELETE",
             url: "/songs/" + this.id,
          });
          this.remove()

              console.log('put delete function here');
            }).appendTo($('#track_list'));
    }
  });
};

window.onload = loadSongs();


$(document).ready(function(){
  playlist = []

 $('.button').on('click', function(){
  // this is all playlist.playAll
  console.log('clicked');
  $('#track_list').empty()
  loadSongs()

    p = new Playlist(playlist)
    p.playAll();
  });


  SC.initialize({
    client_id: "d95ac796afeb1568792d9ff7a945e19d",
  });

     // $('#track_list').append($('<p>')).text(data.name);


  // $('#search').on('click', function(){
  //   console.log('clicked');
  //   $( "#slide" ).toggle( "slide",{direction:'right'} );
  //   // $slide = $('#slide')
  //   //   $slide.animate('slide',{direction:'right'},1000);
  // });


// Search for songs on Soundcloud

  $searchSubmit = $('#Submit');

  $searchSubmit.on('click', searchForSongsOnSoundCloud);
});

function searchForSongsOnSoundCloud() {
  $('.search_results').remove();
  console.log('clicked');
  $searchInput = $('#searchsoundcloud').val();
  // fetches the songs
  SC.get('/tracks', { q: $searchInput, limit: '10' }, function(tracks){
    console.log(tracks)
    // fetchSoundCloudWidget
    tracks.forEach(function(track){
      SC.oEmbed(track['permalink_url'], { maxheight: '110', maxwidth: '350', color: "c1e2e5"},
        // embed widget in HTML
        function(embed) {
          console.log(track)
          $('<li class=\'search_results\'>' + embed['html'] + '<button class=\"add\">+</button></li>').on('click',
          // addToPlaylist
          function(){
            console.log('clicked')
            title = track.title;
            id = track.id;
            duration = track.duration;
            tape_id = $('img').attr('id')
            $('<li>').html('<span>X</span>' + title).on('click', function(){
              console.log('put delete function here');
            }).appendTo($('#track_list'));

            $.ajax({
              type: 'POST',
              url: '/songs',
              dataType: 'json',
              data: {
                soundcloud_id: id,
                tape_id: tape_id,
                name: title,
                duration: duration}
              }).done (function(data){
                // appendToPlaylistView
                console.log(data.name);
              })
        }).appendTo($('#SC_embeds'));
      });
   });
  });
}


//Delete Songs From Playlist

              $xSpans = $('span')
              for( var i = 0; i < $xSpans.length; i++){
                i.on('click', function(){
                  console.log('put delete function here');
                })
              }


    // function dragSongs (el){
    //    el.draggable({
    //     drag: function( event, ui ) {
    //       console.log("dragged")
    //     }
    //   });
    // }

    // songs = $('.search_results')
    // for(var i = 0; i < songs.length; i++){
    //   dragSongs([i]);
    // }
