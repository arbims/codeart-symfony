 import Pusher from 'pusher-js'
 import $ from 'jquery'

 
 // Enable pusher logging - don't include this in production
 Pusher.logToConsole = true;

 var pusher = new Pusher('daade1920365098826ef', {
   cluster: 'eu'
 });

 var channel = pusher.subscribe('my-channel-1');
    channel.bind('my-event-1', function(data) {
      console.log(data)
      let iconnotif = $('.notifications_icon')
      let count = $('.notifications_count').text()
      if (count = "") {
        count = 0;
      }
      console.log("count", count)
      $('.notifications_icon').empty()
      iconnotif.append('<span class="notifications_count">'+(count+1)+'</span>')  
      let notificationEl = $('.notifications')
      let content_notif = $('.content_notif')
      let notificationCountEl = $('.notifications_count')
      let avatar = (data.user.avatar !== null) ? data.user.avatar : 'profil.jpg' 
      var html =  '<div class="notifications_body"><a href="'+ data.url +'" transition="notification-item" class="notifications_item"><img src="/img/users/'+ avatar +'" class="notifications_avatar"><div class="notifications_text"><p>'+ data.user.username + 'à participé sur le sujet « '+ data.name +' »'+'</p></div></a></div>' 
      content_notif.prepend(html)
      //notificationCountEl.empty().append(data.count)
      //notificationEl.addClass('show_notifications')
 });