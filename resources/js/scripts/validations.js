import $ from 'jquery'

(function($){
	$('.form-control').on('keypress', function () {
		if ($(this).hasClass('form-error')) {
			$(this).siblings().remove()
			$(this).removeClass('is-invalid')
	    	$(this).removeClass('form-error')		
		}
  })
})