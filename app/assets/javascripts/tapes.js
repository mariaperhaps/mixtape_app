console.log("Tape.js linked");

var Tape = Backbone.Model.extend({
  url: '/tapes',
  initialize: function(){
    this.songs = new SongsCollection();
    this.songs.url = '/tapes/' + this.id + '/songs';
  }
});

$(document).ready(function(){

// TODO: Is there a better way?
  var currentTapeId = $('.tape-image').attr('id')

  var PlaylistView = Backbone.View.extend({
    el: '#transport',
    initialize: function(){
      this.listenTo(this.collection, 'reset', this.playAll)
    },
    events: {
      'click .fa-play': 'playAll',
      'click .fa-pause': 'pauseCurrent',
      'click #skip-back': 'previousSong',
      'click #skip-ahead': 'nextSong'
    },
    playAll: function(){
        $('.fa-play').removeClass('fa-play').addClass('fa-pause');
      if (this.collection.models[this.collection.currentIndex].isPlaying == false){
        this.collection.models[this.collection.currentIndex].play()
      } else {
        this.collection.currentSong.play()
      }
    },
    pauseCurrent: function(){
      this.collection.currentSong.pause()
      $('.fa-pause').removeClass('fa-pause').addClass('fa-play');
    },
    previousSong: function(){
      this.collection.currentSong.stop()
      this.collection.currentIndex--
      this.checkIfOver();
    },
    nextSong: function(){
      this.collection.currentSong.stop()
      this.collection.currentIndex++
      this.checkIfOver()
    },
    checkIfOver: function(){
      if (this.collection.isItOver()){
        this.collection.reset();
      } else {
        this.collection.models[this.collection.currentIndex].play()
      }
    }
  });

  var TapeView = Backbone.View.extend({
    initialize: function(){
      this.showSongs();
    },
    showSongs: function(){
      this.model.songs.fetch({success: function(songs){
        new SongsView({collection: songs})
        new PlaylistView({collection: songs})
      }});
    }
  });


  var SongView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#song-template').html()),
    events: {
      'click .delete-song': 'delete'
    },
    render: function(){
      this.$el.html(this.template({song: this.model.toJSON()}))
      return this
    },
    delete: function(){
      // TODO
      console.log('inside delete')
    }
  });


  var SongsView = Backbone.View.extend({
    el: '#songs-list',
    initialize: function(){
      this.listenTo(this.collection, 'sync', this.render)
      console.log("songs happened")
    },
    render: function(song){
      this.collection.forEach(function(song){
        this.$el.append(new SongView({model: song}).render().el)
      }.bind(this))
    }

  });


  var tape = new Tape({id: currentTapeId})
  tape.fetch()
  new TapeView({model: tape})






});










// OLD STUFF

// function Tape(data) {
//   this.img_url = data.img_url;
//   this.name = data.name;
//   this.id = data.id;
//   this.receiver = data.receiver;
// };


// Tape.prototype.destroy = function(){
//   $.ajax({
//        type: "DELETE",
//        url: "/tapes/" + this.id,
//     });
// };

// Tape.prototype.create = function(name, receiver, message){
//   $.ajax({
//        type: "POST",
//        url: "/tapes",
//        dataType: 'json',
//        data: {name: name, receiver: receiver, message: message}
//     }).done (function(data){
//       // console.log(data);
//       currentTapeId = data.id
//     })
// };

// Tape.prototype.update = function(img_url){
//   $.ajax({
//     url: "/tapes/" + currentTapeId,
//     data: {img_url: img_url},
//     type: "PUT"
//   }).done(function(response){
//     console.log("response");
//     window.location = "/tapes/" + currentTapeId + "/edit";
//   });
// };

