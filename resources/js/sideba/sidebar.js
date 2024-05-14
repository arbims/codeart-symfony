import $ from 'jquery'
$("#close-sidebar").click(function(e) {
  e.preventDefault()
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function(e) {
  e.preventDefault()
  e.stopPropagation()
  $(".page-wrapper").addClass("toggled")
});
$('body').on('click', function(e) {
  $(".page-wrapper").removeClass("toggled")
})

