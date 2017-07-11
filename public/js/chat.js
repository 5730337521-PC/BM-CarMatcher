(function() {
   var app;

   $(document).ready(function() {
      return app.init();
   });

   app = {
      init: function() {
         post_to_sev("",function(res){
            app.bot_post(res);
         });
         return this.bind_events();
      },
      bind_events: function() {
         /* On enter
         posttosev -> conver return
         console.log(res);
         bot_post(post_to_sev(msg).output.text);
         */
         return $(document).on("submit", "#chat", function(e) {
            var send_m = app.send_message();
            console.log("send_m",send_m)
            post_to_sev(send_m,function(res){
               app.bot_post(res);
            });


            return e.preventDefault();
         });
      },
      send_message: function() {
         var msg;
         msg = $(".text").val().trim();
         if (msg) {
            //print msg
            $(".text").val("");
            $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
            return msg;
         }
      },

      bot_post: function(msg) {
         return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
      }
   };

}).call(this);

function post_msg(msg,callback){
   $.ajax({
      type: "POST",
      url: '/conversation',
      data: {message : msg},
      success: callback,
      dataType: 'json'
   });
}

function post_to_sev(msg,callback){
   post_msg(msg,function(response){
      msg = response.output.text[0];
      // console.log("msg", msg);
      callback(msg);
   })
}

function chatclose(){
   $("#chat-open-icon").fadeIn();
   $("#chat-window").fadeOut();
}

function chatopen(){
   $("#chat-window").show();
   $("#chat-open-icon").hide();
}

$(document).mouseup(function(e){
   var container = $("#chat-window");
   // if the target of the click isn't the container nor a descendant of the container
   if (!container.is(e.target) && container.has(e.target).length === 0 && ($('#social-login:visible').length == 0)){
      // console.log('container', container);
      console.log('run', $('#social-login:visible').length);
      chatclose();
   }
});
