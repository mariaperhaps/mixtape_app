console.log('linked');
$(document).ready(function(){

  $('.back-paint-box').on('click', function(e){
    $color = $(e.target).css('color')
    $('.tape-back').attr({fill: $color})
  });


  $('#close-colors').on('click', function(){
    $primary_color = $('.tape-back').eq(0).css('fill');

    $tape_id = $('h1').attr('id');

    $.ajax({
      type: "PUT",
      url: '/tapes/' + $tape_id,
      data: {fill_primary: $primary_color}
    }).done(function(data){
      location.reload();
    });

  });



  $('#cancel').on('click', function(){
    $('.tape-back').attr('fill', 'url(#SVGID_5_)')
  });


});
