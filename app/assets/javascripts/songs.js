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
});


var SongsCollection = Backbone.Collection.extend({
  model: Song,
  currentIndex: 0,
  currentSong: "",
  searchedSongs: [],
 initialize: function(){
    Backbone.pubSub.on('saved', this.save, this, arguments);
    Backbone.pubSub.on('deleted', this.reset, this, arguments);
  },
  reset: function(){
    console.log('im in')
    this.currentIndex = 0;
    this.models[this.currentIndex].isPlaying = false
    $('#pause' ).removeClass('fa-pause').addClass('fa-play');
    $('#pause').attr('id', 'play');
    stopSpinning()
  },
  isItOver: function(){
    if(this.currentIndex >= this.length || this.currentIndex < 0){
      return true
    } else {
      return false
    }
  },
  save: function(){
    this.create(arguments[0])
  },
});


function rotateSpools(){
  $('.spool').each(function(){
    $(this).attr('class', 'rotate')
  })
}


function stopSpinning(){
$('.rotate').each(function(){
  $(this).attr('class', 'spool')
});
}

