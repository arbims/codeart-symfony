$(function () {
	
	dropzone_el = document.querySelector('.dropzone')
	if (dropzone_el) {
		Dropzone.autoDiscover = false;
	    var myDropzone = new Dropzone(".dropzone", {
	        maxFilesize: 5,
	        acceptedFiles: ".jpeg,.jpg,.png,.pdf",
	        init: function () {
	        	var this_dropzone = this
	        	$.get('/admin/medias/list.json', function(data) {
	        		$.each(data.medias, function(index, image) {
	        			var mockFile = {
	        				name: "/img/images/"+image.name,
	        				id: image.id
	        			}
	        			myDropzone.options.addedfile.call(myDropzone, mockFile);
	        			myDropzone.options.thumbnail.call(myDropzone, mockFile, "/img/images/"+image.name);
	        		})
	        	})
	        }
	    });	
	}
	
	$('.close').on('click', function () {
		$(this).parent().slideUp()
	})

	$('.form-control').on('click', function () {
		$(this).removeClass('form-error')
		$(this).next().remove()
	})

	$('.select2').select2({});
	$('.table').DataTable({
		"oLanguage": {
			"sUrl": "//cdn.datatables.net/plug-ins/1.11.4/i18n/fr_fr.json"
		}
	})

	// creation ul li
	if ($('#chapter').val() != undefined) {
		console.log($('#chapter').val())
		let chapters = JSON.parse($('#chapter').val())
		console.log(chapters)
		html = '<ul id="sortable">'
		$.each(chapters, function (k, value) {
			html += '<li class="ui-state-default" id="' + value.id + '_' + value.post.name + '_'+ value.post.slug + '_' + value.video_length +'"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + value.post.name + '</li>'
		})
		html += '</ul>'
		console.log(html)
		$('.ulchapters').append(html)	
		$("#sortable").sortable({
			stop: function (event, ui) {
				listSortable = $(this).sortable("toArray");
				let allobj = []
				$.each(listSortable, function(k,v) {
					let obj = {};
					res = v.split("_")
					obj = {id: res[0], post: { slug: res[2],name: res[1] }, video_length: res[3] }
					allobj.push(obj)
				})
				allobj = JSON.stringify(allobj)
				let chapter = $("#chapter")
				chapter.val(allobj)
			}
		});
		$("#sortable").disableSelection();
	}
		
})