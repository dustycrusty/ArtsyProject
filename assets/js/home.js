$(function(){
  $("#collapsedMenu").click(function(e){
    e.preventDefault();
    var x = document.getElementById("Navigator");
      if (x.className === "topnav") {
        x.className += " responsive";
          
      } else {
        x.className = "topnav";
      
      }
  });
});

function addResponsive(){
  $(function(){
  $("#collapsedMenu").click(function(e){
    e.preventDefault();
    var x = document.getElementById("Navigator");
      if (x.className === "topnav") {
        x.className += " responsive";
          
      } else {
        x.className = "topnav";
      
      }
  });
});
};
$(document).ready(function(){
    $rotated = false;
    $('#collapsedMenu').click(function(){
       $(this).toggleClass('rotateOn');
    });
});

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

function collapsible(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active-collapse");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
};
