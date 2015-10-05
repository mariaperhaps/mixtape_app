console.log("Song.js linked");

var Song = Backbone.Model.extend({
  urlRoot: '/songs',
  isPlaying: false,
  play: function(){
   SC.initialize({
      client_id: "d95ac796afeb1568792d9ff7a945e19d",
     });
       SC.stream("/tracks/" + this.attributes.soundcloud_id,{onfinish: function(){
          this.collection.currentIndex ++
          this.collection.isItOver() ? this.collection.reset() : this.collection.trigger('reset')
        }.bind(this)}, function(sound){
          this.collection.currentSong = sound
          this.isPlaying = true
          sound.play()
    }.bind(this));
  }
})



function rotateSpools(){
  $('.spool').each(function(){
    $(this).attr('class', 'rotate')
  })
}



// $(document).ready(function(){

//   var SearchResultView = Backbone.View.extend({
//     tagName: 'li',
//     template: _.template($('#search-result-template').html()),
//     currentSong: "",
//     events: {
//       'click #sc-play': 'play',
//       'click #pause-sc': 'pause',
//       'click .add': 'save'
//     },
//     render: function(){
//       this.$el.html(this.template({song: this.model}))
//       return this
//     },
//     play: function(e){
//       $(e.target).removeClass('fa-play').addClass('fa-pause').attr('id', 'pause-sc')
//        SC.initialize({
//           client_id: "d95ac796afeb1568792d9ff7a945e19d",
//          });
//            SC.stream("/tracks/" + this.model.id, function(sound){
//               sound.play()
//               this.currentSong = sound
//         }.bind(this));
//     },
//     pause: function(e){
//       this.currentSong.pause();
//       $(e.target).removeClass ('fa-pause').addClass('fa-play').attr('id', 'sc-play')
//     },
//     save: function(){
//       tape_id = $('.tape-image').attr('id')
//       $.ajax({
//          type: 'POST',
//            url: '/songs',
//            dataType: 'json',
//            data: {
//              soundcloud_id: this.model.id,
//              tape_id: tape_id,
//              name: this.model.title,
//              duration: this.model.duration}
//            }).done (function(data){
//                // var tape = new Tape({id: tape_id})

//                // tape.fetch({success: function(tape){
//                //    new TapeView({model: tape})
//                // }})
//            });
//     }
//   });

//   var SearchResultsView = Backbone.View.extend({
//     el: '#SC_embeds',
//     initialize: function(){
//       this.listenTo(this.collection, 'add', this.render)
//     },
//     render: function(){
//       this.collection.forEach(function(song){
//         this.$el.append(new SearchResultView({model: song}).render().$el);
//       }.bind(this))
//     }
//   });







  // var SoundCloudSongs = Backbone.Collection.extend({
  //   model: Song,
  //   url: '/songs',
  //   initialize: function(options){
  //     this.getSongs(options);
  //   },
  //   getSongs: function(searchTerm){
  //     SC.initialize({
  //       client_id: "d95ac796afeb1568792d9ff7a945e19d",
  //     });
  //     SC.get('/tracks', { q: searchTerm, limit: '20' }, function(tracks){
  //       new SearchResultsView({collection: this})
  //       this.models = tracks;
  //       this.trigger('add')
  //     }.bind(this));
  //   }
  // });



// });

  var SongsCollection = Backbone.Collection.extend({
    model: Song,
    currentIndex: 0,
    currentSong: "",
    searchedSongs: [],
    reset: function(){
      this.currentIndex = 0;
      this.models[this.currentIndex].isPlaying = false
      $('#pause').removeClass("fa-pause").addClass('fa-play');
    },
    isItOver: function(){
      if(this.currentIndex >= this.length || this.currentIndex < 0){
        return true
      } else {
        return false
      }
    }
  });
// OLD STUFF


// var isPlaying = false
// var loaded = false
// var currentTrack = ""
// var playlist = []
// var counter = 0

// function Song(data) {
//   this.name = data.name;
//   this.soundcloud_id = data.soundcloud_id;
//   this.tape_id = data.tape_id;
//   this.duration = data.duration;
//   this.id = data.id;
// };

// function SongView(model){
//   this.$el   = $("<li>");
//   this.model = model;
// }


// Song.prototype.play = function(){
//   SC.initialize({
//     client_id: "d95ac796afeb1568792d9ff7a945e19d",
//    });
//      SC.stream("/tracks/" + this.soundcloud_id,{onfinish: function(){
//           counter++
//           console.log(counter)
//         if(counter >= playlist.length){
//           loaded = false
//           $('#play').text("PLAY");
//         }else{
//           playlist[0].playNext()
//         }
//       }}, function(sound){
//         currentTrack = sound;
//         sound.play()
//   });
// }

// Song.prototype.playNext = function(){
//   index = counter
//   playlist[index].play()
// }

// Song.prototype.pause = function(){
//   currentTrack.pause()
//   // SC.initialize({
//   //   client_id: "d95ac796afeb1568792d9ff7a945e19d",
//   //  });
//   //   track = SC.stream("/tracks/" + this.soundcloud_id, function(sound){
//   //     sound.pause();
//   // });
// }

// Song.prototype.destroy = function(){
//   $.ajax({
//        type: "DELETE",
//        url: "/songs/" + this.id,
//     });
// };

// function Playlist(playlist){
//   this.playlist = playlist
// }

// Playlist.prototype.duration = function(){
//   return // whatever all the songs durations are.
// }

// function doSetTimeout(index, duration){
//   setTimeout(function(){index.play()}, duration)
// }

// Playlist.prototype.playAll = function(){
//   index = counter
//   playlist[index].play()
// }
//   // for (var i = 0; i < playlist.length; i++){
//   //   console.log(i, total_duration)
//   //   doSetTimeout(playlist[i], total_duration)
//   //   total_duration += playlist[i].duration;
//   // }
// // }


// //Get All Songs

// // window.onload = loadSongs();



// $(document).ready(function(){
//   $('#pause').hide()
//   // playlist = []

//   function loadSongs(){
//     $('#page_list').empty()
//     var id = $('img').eq(1).attr('id')
//     $.ajax({
//       url: "/tapes/" + id + "/songs",
//       format: "json"
//     }).done(function(data){
//       console.log(data);
//       for(var i = 0; i < data.length; i++){
//         var newSong = new Song(data[i]);
//         // playlist.push(newSong);
//         newSongView = new SongView(newSong);
//         $('<li>').html('<span>X</span>' + newSongView.model.name).attr('id',newSongView.model.id).on('click', function(){
//           this.remove()
//           newSong.destroy()
//            // $.ajax({
//            //     type: "DELETE",
//            //     url: "/songs/" + this.id,
//            //  }).done (function(data){
//            //  });

//                 console.log('put delete function here');
//               }).appendTo($('#track_list'));
//       }
//     });
//   };

//   loadSongs()



//   total_duration = 0;






//   $('#play').on('click', function(){
//     if(loaded === false){
//       playlist = []
//       var id = $('img').eq(1).attr('id')
//         $.ajax({
//           url: "/tapes/" + id + "/songs",
//           format: "json"
//         }).done(function(data){
//         for(var i = 0; i < data.length; i++){
//           var newSong = new Song(data[i]);
//           playlist.push(newSong);
//         }
//           loaded = true
//           isPlaying = true
//           playlist[0].play()
//           $('#play').text("PAUSE")
//       })
//         // p = new Playlist(playlist)
//         // p.playAll();
//         }else if( loaded === true && isPlaying === false){
//           currentTrack.play()
//           isPlaying = true
//           $(this).text("PAUSE")
//         }else if( loaded === true && isPlaying === true){
//           currentTrack.pause();
//           isPlaying = false;
//           $(this).text("PLAY")
//         }
//   });

//   // $('#pause').on('click', function(){
//   //   currentTrack.pause()
//   //   $('#pause').hide();
//   //   $('#play').show();
//   //   isPlaying = false
//   // })



//   SC.initialize({
//     client_id: "d95ac796afeb1568792d9ff7a945e19d",
//   });



// // Search for songs on Soundcloud

//   $searchSubmit = $('#Submit');

//   $searchSubmit.on('click', searchForSongsOnSoundCloud);
// });

// function searchForSongsOnSoundCloud() {
//   $('.search_results').remove();
//   console.log('clicked');
//   $searchInput = $('#searchsoundcloud').val();
//   // fetches the songs
//   SC.get('/tracks', { q: $searchInput, limit: '20' }, function(tracks){
//     console.log(tracks)
//     // fetchSoundCloudWidget
//     tracks.forEach(function(track){
//       SC.oEmbed(track['permalink_url'], { maxheight: '110', maxwidth: '350', color: "c1e2e5"},
//         // embed widget in HTML
//         function(embed) {
//           console.log(track)
//           $('<li class=\'search_results\'>' + embed['html'] + '<button class=\"add\">Add</button></li>').on('click',
//           // addToPlaylist
//           function(){
//             console.log('clicked')
//             title = track.title;
//             id = track.id;
//             duration = track.duration;
//             tape_id = $('img').eq(1).attr('id')
//             // $('<li>').html('<span>X</span>' + title).appendTo($('#track_list'));

//             $.ajax({
//               type: 'POST',
//               url: '/songs',
//               dataType: 'json',
//               data: {
//                 soundcloud_id: id,
//                 tape_id: tape_id,
//                 name: title,
//                 duration: duration}
//               }).done (function(data){
//                 // appendToPlaylistView
//                 console.log(data);

//                     var newSong = new Song(data);
//                     // playlist.push(newSong);
//                     newSongView = new SongView(newSong);
//                     $('<li>').html('<span>X</span>' + newSongView.model.name).attr('id',newSongView.model.id).on('click', function(){
//                       this.remove()
//                       newSong.destroy()
//                        // $.ajax({
//                        //     type: "DELETE",
//                        //     url: "/songs/" + this.id,
//                        //  }).done (function(data){
//                        //    });
//                           }).appendTo($('#track_list'));

//               })
//         }).appendTo($('#SC_embeds'));
//       });
//    });
//   });
// }




