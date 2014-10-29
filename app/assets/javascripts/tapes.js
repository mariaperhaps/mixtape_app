// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
console.log("Tape.js linked");

function Tape(data) {
  this.img_url = data.img_url;
  this.name = data.name;
  this.id = data.id;
  this.receiver = data.receiver;
};


Tape.prototype.destroy = function(){
  $.ajax({
       type: "DELETE",
       url: "/tapes/" + this.id,
    });
};

Tape.prototype.create = function(name, receiver, message){
  $.ajax({
       type: "POST",
       url: "/tapes",
       dataType: 'json',
       data: {name: name, receiver: receiver, message: message}
    }).done (function(data){
      // console.log(data);
      currentTapeId = data.id
    })
};

Tape.prototype.update = function(img_url){
  $.ajax({
    url: "/tapes/" + currentTapeId,
    data: {img_url: img_url},
    type: "PUT"
  }).done(function(response){
    console.log("response");
  });
};

