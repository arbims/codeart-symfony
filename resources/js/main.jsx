import Turbolinks from 'turbolinks'
import { render } from 'preact'
import Comments from './components/Comments'
import $ from 'jquery'
import 'bootstrap'
import Editor from './components/Editor'
import ForumsComments from './components/ForumsComments'
import Typed from 'typed.js'
import '../css/app.scss'
import hljs from "highlightjs";
//import Notifications from './components/Notifications'
//import './scripts/Notifications'
import './scripts/validations'
import 'preact/debug'
//import './scripts/MercureNotif'

function srearchDiv() {
    var mouse_is_inside = false;
    $('.searchbardiv').hover(function () {
        mouse_is_inside = true;
    }, function () {
        mouse_is_inside = false;
    });

    $('body').on('click', function (e) {
        if (!mouse_is_inside) {
            $('.searchbardiv').removeClass('showsearch')
        }
    })
    $('#buttonsearch').on('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        $('.searchbardiv').toggleClass('showsearch')
    })
}

// animation typed
function typedAnnimation() {
    let typedel = document.querySelector('#typed-text')
    var animationBool = $('#typed-text').attr('data-annimed')

    if (animationBool == 'false') {
        $('#typed-text').attr('data-annimed', 'true')
        if (typedel) {
            if (undefined == typed) {
                var typed = new Typed('.typed_element', {
                    strings: ["Aprrendre le php.", "Apprendre le javascript."],
                    typeSpeed: 100,
                    loop: true
                });
            }
        }
    }
}

function readyNotification() {
    // show hide notifications
    let notificationsli = $('.link_notification')
    var clickedBool = notificationsli.attr('data-clicked')
    let el = $('.notifications')
    if (notificationsli) {
        if (clickedBool == 'false') {
            notificationsli.attr('data-clicked', 'true')
            notificationsli.on("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                el.toggleClass('show_notifications', 500);
                $.get("/forums/comments/readnotif.json", function (res) {
                });
            });
            $('body').on('click', function (e) {
                if (el.hasClass('show_notifications')) {
                    el.removeClass('show_notifications')
                }
            })
        }
    }
}

function Sidebar() {
    $("#close-sidebar").on('click', function (e) {
        e.preventDefault()
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").on('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        $(".page-wrapper").addClass("toggled")
    });
    $('body').on('click', function (e) {
        $(".page-wrapper").removeClass("toggled")
    })
}

function toggleVideo() {
    $('.chapter-toogle').on('click', function () {
        if ($(this).hasClass('full_width')) {
            $(this).removeClass('full_width')
            $(this).next().removeClass('chapter_toggle_none')
            $('.youtube_container').parent().removeClass('video_full')
            $(this).next().show()
            $(this).find("img").removeClass('chapter-toogle-svg-left')
            $(this).find("img").addClass('chapter-toogle-svg-right')
            $(this).find("img").attr('src', '/img/arrow-right.svg')
            $(this).find("img").attr('title', 'fullscreen')
        } else {
            $(this).addClass('full_width')
            $(this).next().addClass('chapter_toggle_none')
            $('.youtube_container').parent().addClass('paddin_margin_0 video_full')
            $(this).next().hide()
            $(this).find("img").removeClass('chapter-toogle-svg-right')
            $(this).find("img").addClass('chapter-toogle-svg-left')
            $(this).find("img").attr('src', '/img/arrow-left.svg')
            $(this).find("img").attr('title', 'show side bar')
        }
    })
}

// Reapply code highlighting on pages loaded with Turbolinks
document.addEventListener('turbolinks:load', function () {
    let el = document.querySelector('#preact-comments')
    if (el) {
        render(<Comments />, document.getElementById('preact-comments'));
    }

    let editor = document.querySelector('#editor-peact')

    if (editor) {
        render(<Editor />, document.getElementById('editor-peact'));
    }

    let editorComments = document.querySelector('#preact-forums-comments')

    if (editorComments) {
        render(<ForumsComments />, document.querySelector('#preact-forums-comments'))
    }

    // let noti = document.getElementById('noti')
    // if(noti) {
    //     render(<Notifications />, document.querySelector('#noti'))
    // }

    $('.close').on('click', function () {
        $(this).parent().parent().slideUp()
    })
    
    // loop search
    let active = false
    $('.search-navbar').on("mouseenter", function () {
        $('.searchnavbar_input').addClass('searchnavbar_input_show')
        $('.searchnavbar_input').on('focus', function () {
            active = true
        })
    }).on('mouseleave', function () {
        let val = $('.searchnavbar_input').val()
        //let cursor = $('.searchnavbar_input').selectionStart()
        if (active === false) {
            $('.searchnavbar_input').removeClass('searchnavbar_input_show')
        }
    })

    setInterval(function () {
        $('.toast').slideUp()
    }, 5000)

    document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block)
    })
    typedAnnimation()
    readyNotification()
    srearchDiv()
    Sidebar()
    toggleVideo()
})

document.addEventListener('turbolinks:click', e => {
    const anchorElement = e.target
    const isSamePageAnchor =
        anchorElement.hash &&
        anchorElement.origin === window.location.origin &&
        anchorElement.pathname === window.location.pathname

    if (isSamePageAnchor) {
        Turbolinks.controller.pushHistoryWithLocationAndRestorationIdentifier(e.data.url, Turbolinks.uuid())
        e.preventDefault()
        window.dispatchEvent(new Event('hashchange'))
    }
})

console.log('Test prod is true')

Turbolinks.start()
