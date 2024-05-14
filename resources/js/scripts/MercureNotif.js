import $ from 'jquery'

const custom_topic = 'http://codeart.tn/ping/'+ window.codeart.USER
const url = new URL('http://localhost:3001/.well-known/mercure');
url.searchParams.append('topic', custom_topic );

const eventSource = new EventSource(url);

eventSource.onmessage = e => {
  let data = JSON.parse(e.data)
  let iconnotif = $('.notifications_icon')
    let count = $('.notifications_count').text()
    if (count = "") {
      count = 0;
    }
    $('.notifications_icon').empty()
    iconnotif.append('<span class="notifications_count">'+(count+1)+'</span>')  
    let notificationEl = $('.notifications')
    let content_notif = $('.content_notif')
    let notificationCountEl = $('.notifications_count')
    let avatar = (data.user.avatar !== null) ? data.user.avatar : 'profil.jpg' 
    var html =  '<div class="notifications_body"><a href="'+ data.url +'" transition="notification-item" class="notifications_item"><img src="/img/users/'+ avatar +'" class="notifications_avatar"><div class="notifications_text"><p>'+ data.user.username + 'à participé sur le sujet « '+ data.name +' »'+'</p></div></a></div>' 
    content_notif.prepend(html)
}