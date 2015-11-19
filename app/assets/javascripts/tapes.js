console.log("Tape.js linked");

Backbone.pubSub = _.extend({}, Backbone.Events);

var Tape = Backbone.Model.extend({
  url: '/tapes',
  initialize: function(){
    this.songs = new SongsCollection();
    this.songs.url = '/tapes/' + this.id + '/songs';
  }
});

$(document).ready(function(){

// TODO: Is there a better way?
  var currentTapeId = $('h1').attr('id')

  var PlaylistView = Backbone.View.extend({
    el: '#transport',
    initialize: function(){
      this.listenTo(this.collection, 'reset', this.playAll)
    },
    events: {
      'click #play': 'playAll',
      'click #pause': 'pauseCurrent',
      'click #skip-back': 'previousSong',
      'click #skip-ahead': 'nextSong'
    },
    playAll: function(){
      rotateSpools()
      $('#play i:first-child').removeClass('fa-play').addClass('fa-pause');
      $('#play').attr('id', 'pause')
      if (this.collection.models[this.collection.currentIndex].isPlaying == false){
        this.collection.models[this.collection.currentIndex].play()
      } else {
        this.collection.currentSong.play()
      }
    },
    pauseCurrent: function(){
      stopSpinning()
      this.collection.currentSong.pause()
      $('#pause i:first-child').removeClass('fa-pause').addClass('fa-play');
      $('#pause').attr('id', 'play');
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
        new SearchForm({collection: songs})
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
      this.model.destroy({success: function(data){Backbone.pubSub.trigger('deleted', data);}});
      console.log('inside delete')
    }
  });


  var SongsView = Backbone.View.extend({
    el: '#songs-list',
    initialize: function(){
      this.listenTo(this.collection, 'sync remove', this.render)
      console.log("songs happened")
    },
    render: function(song){
      this.$el.empty();
      this.collection.forEach(function(song){
        this.$el.append(new SongView({model: song}).render().el)
      }.bind(this))
    }

  });

  var SearchResultView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#search-result-template').html()),
    currentSong: "",
    events: {
      'click #sc-play': 'play',
      'click #pause-sc': 'pause',
      'click .add': 'save'
    },
    render: function(){
      this.$el.html(this.template({song: this.model}))
      return this
    },
    play: function(e){
      $(e.target).removeClass('fa-play').addClass('fa-pause').attr('id', 'pause-sc')
       SC.initialize({
         client_id: "d95ac796afeb1568792d9ff7a945e19d",
       });
       SC.stream("/tracks/" + this.model.id, function(sound){
          sound.play()
          this.currentSong = sound
       }.bind(this));
    },
    pause: function(e){
      this.currentSong.pause();
      $(e.target).removeClass ('fa-pause').addClass('fa-play').attr('id', 'sc-play')
    },
    save: function(){
      tape_id = $('h1').attr('id')
      data = {
             soundcloud_id: this.model.id,
             tape_id: tape_id,
             name: this.model.title,
             duration: this.model.duration}
      Backbone.pubSub.trigger('saved', data)
      // $.ajax({
      //      type: 'POST',
      //      url: '/songs',
      //      dataType: 'json',
      //      data: {
      //        soundcloud_id: this.model.id,
      //        tape_id: tape_id,
      //        name: this.model.title,
      //        duration: this.model.duration}
      //      }).done (function(data){
      //       Backbone.pubSub.trigger('saved', data);
      //        var tape = new Tape({id: tape_id})
      //          tape.fetch({success: function(tape){
      //           tape.songs.fetch({success: function(songs){
      //               new SongsView({collection: songs})
      //             }});
      //          }})
      //      });
    }
  });

    var SearchResultsView = Backbone.View.extend({
    el: '#SC_embeds',
    initialize: function(){
      this.render()
      this.listenTo(this.collection, 'add', this.render)
    },
    render: function(){
      this.$el.empty()
      this.collection.forEach(function(song){
        this.$el.append(new SearchResultView({model: song}).render().$el);
      }.bind(this))
    }
  });

    var SearchForm = Backbone.View.extend({
    el: '#search-songs',
    events: {
      'click #song-search-button': 'search'
    },
    search: function(){
      var query = $('#searchsoundcloud').val()

      SC.initialize({
        client_id: "d95ac796afeb1568792d9ff7a945e19d",
      });
      SC.get('/tracks', { q: query, limit: '100' }, function(tracks){
          var search = new SearchResultsView({collection: tracks})
      }.bind(this));

      $('#searchsoundcloud').val("")
    }
  })


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

