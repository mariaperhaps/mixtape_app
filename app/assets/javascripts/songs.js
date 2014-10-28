console.log("Song.js linked");
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function Song(data) {
  this.name = data.name;
  this.soundcloud_id = data.soundcloud_id;
  this.tape_id = data.tape_id;
  this.duration = data.duration;
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
      sound.pause();
  });
}

function Playlist(playlist){
  this.playlist = playlist
}

Playlist.prototype.duration = function(){
  return // whatever all the songs durations are.
}


array = ["one", "two", "three", "four"]
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



// Playlist.prototype.playAll = function(){
//   for (var i = 0; i < array.length; i++){
//      setTimeout(function(){
//        console.log("Firing!");
//      }, total_duration);
//      total_duration += 8000;
//   }
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



// Playlist.prototype.playAll = function(){
//   // ensure we play first and last
//   playlist[0].play();  // plays first song
//   for(var i = 0; i < playlist.length - 1; i++){
//     var song = array[i];
//     var nextTrack = playlist[i + 1];
//     total_duration += song.duration;

//     if(nextTrack == undefined){
//       console.log("it's over");
//     } else {
//       setTimeout(function(){
//       console.log(nextTrack, song.duration);
//       console.log(total_duration)
//         nextTrack.play();
//       }, total_duration);
//     }
//   }
// }

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
      var newSongView = new SongView(newSong);
      $('<li>').text(newSongView.model.name).appendTo($('#track_list'));
    }
  });
};

  loadSongs();
$(document).ready(function(){
  playlist = []

 $('.button').on('click', function(){
  // this is all playlist.playAll
  console.log('clicked');
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
            $('<li>').text(title).appendTo($('#track_list'));
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
