$(function(){
    let editor = document.querySelector('.markedtext')
    
    if (editor) {
        var codeMirrorEditor = CodeMirror.fromTextArea(editor, {
        mode: 'markdown',
        tabMode: 'indent',
        theme: 'neo',
        lineWrapping: true,
        viewportMargin: Infinity,
        cursorBlinkRate: 0
      });
      //codeMirrorEditor.on('blur', function () { $(".CodeMirror-cursors").css('visibility', 'visible'); });
      marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })
      createButton()
      boldContent(codeMirrorEditor)
      updateContent(codeMirrorEditor)
      codeButton(codeMirrorEditor)
      italicContent(codeMirrorEditor)
      imageContent(codeMirrorEditor)
      resizeEditor(codeMirrorEditor)
      markedContentFN(codeMirrorEditor)
    }
})


markedContentFN = function (codeMirrorEditor) {
    var content = codeMirrorEditor.getValue()
    var markedcontent = marked.parse(content)
     $('#content_markdown').html(markedcontent)
        cursor = codeMirrorEditor.doc.getCursor();
        codeMirrorEditor.doc.setCursor({
          line: cursor.line,
          ch: cursor.ch
        });
}

updateContent = function(codeMirrorEditor) {
    codeMirrorEditor.on('keyup', function(){
        var content = codeMirrorEditor.getValue()
        var markedcontent = marked.parse(content)
        $('#content_markdown').html(markedcontent)        
    })
}

boldContent = function (codeMirrorEditor) {
    $('.mdeditor_bold').on('click', function(e) {
        e.preventDefault()
        codeMirrorEditor.doc.replaceSelection('**' + codeMirrorEditor.doc.getSelection('around') + '**');
        return codeMirrorEditor.focus();	
    })  
}

codeButton = function (codeMirrorEditor) {
    $('.mdeditor_code').on('click', function(e) {
        e.preventDefault()
        codeMirrorEditor.doc.replaceSelection('```\n' + codeMirrorEditor.doc.getSelection() + '\n```');
        return codeMirrorEditor.focus();	
    })
}

italicContent = function (codeMirrorEditor) {
    $('.mdeditor_italic').on('click', function(e) {
        e.preventDefault()
        codeMirrorEditor.doc.replaceSelection('*' + codeMirrorEditor.doc.getSelection('around') + '*');
        return codeMirrorEditor.focus();	
    })  
}

imageContent = function (codeMirrorEditor) {
    $('.mdeditor').append('<div class="pop-medias"><span class="close pop-medias-close">X</span><div class="pop-medias-content row"></div></div>')
    $.get('/admin/medias/list.json', function(data) {
        $.each(data.medias, function(index, image) {
            img_src = "/img/images/"+image.name
            img_name = image.name
            $('.pop-medias-content').append('<div class="col-md-2"><img id="'+img_name+'" src="'+img_src+'" style="width:100%;" class="pop-medias-img"></div>')
        })
    })
    $('.mdeditor_image').on('click', function(e) {

        e.preventDefault();
        $('.pop-medias').show()
        $('.pop-medias-close').on('click', function() {
            $('.pop-medias').hide()
        })
    })
    appendLink(codeMirrorEditor)
}

appendLink = function(codeMirrorEditor) {
    $("body").on("click", ".pop-medias-img", function(e) {

        e.stopPropagation()
        e.preventDefault()
        codeMirrorEditor.doc.replaceSelection('![' + codeMirrorEditor.doc.getSelection('end') + ']('+img_src+')');
        cursor = codeMirrorEditor.doc.getCursor();
        codeMirrorEditor.doc.setCursor({
          line: cursor.line,
          ch: cursor.ch - 1
        })
        $('.pop-medias').hide()
        return codeMirrorEditor.focus();
    })
}

resizeEditor = function () {
   $('.mdeditor_resize').on('click', function(e) {
        e.preventDefault()
        if($('.mdeditor').hasClass('fullscreen')) {
            $('.mdeditor').removeClass('fullscreen')
        }else{
            $('.mdeditor').addClass('fullscreen')
        }        
    })
}


createButton = function() {
    $('.mdeditor_toolbar').append('<button class="mdeditor_bold">b</button>')
    $('.mdeditor_toolbar').append('<button class="mdeditor_italic">i</button>');
    $('.mdeditor_toolbar').append('<button class="mdeditor_code">c</button>');
    $('.mdeditor_toolbar').append('<button class="mdeditor_image">p</button>');
    $('.mdeditor_toolbar').append('<button class="mdeditor_resize">f</button>');
}
