(function() {
   var app;
   var start = false;
   var currcar = user.model;
   $(document).ready(function(){
      $("#chat-open-icon").click(function(){
         if(!start){
            start = true;
            return app.init();
         }
      });
   });
   // $(document).ready(function() {
   //    return app.init();
   // });

   app = {
      init: function() {
         conver_init(function(res){
            console.log("bot_init_res",res);
            app.bot_post(res.output.text);

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
            post_to_sev(send_m,"",function(res){
               var context = res.context;
               var bot_msg = res.output.text[0];
               console.log("bot_msg \n",bot_msg);
               console.log("context \n",context);
               app.bot_post(bot_msg);
               app.docontext(context);
            });
            return e.preventDefault();
         });
      },

      docontext: function(context){
         if(context.car != currcar){
            changecar(context.car);
         }
      },
      send_message: function() {
         var msg;
         msg = $(".text").val().trim();
         if (msg) {
            //print msg
            $(".text").val("");
            $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
            try{
               $("#chat-msg").animate({ scrollTop: $("#chat-msg").get(0).scrollHeight() }, 750);
               // console.log("scroll");
            } catch(e){
               // console.log("no scroll");
               $('#chat-msg').animate({ scrollTop: $('#chat-msg').get(0).scrollHeight}, 750);
            }
            return msg;
         }
      },

      bot_post: function(msg) {
         $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
         try{
            $("#chat-msg").animate({ scrollTop: $("#chat-msg").get(0).scrollHeight() }, 500);
            // console.log("scroll");
         } catch(e){
            // console.log("no scroll");
            $('#chat-msg').animate({ scrollTop: $('#chat-msg').get(0).scrollHeight}, 500);
         }
         return msg;
      }
   };

}).call(this);

function post_msg(msg,contextjson,callback){
   var data = {
      'message' : msg,
      'init' : false,
      'context' : contextjson
   }
   $.ajax({
      type: "POST",
      url: '/conversation',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: callback,
      dataType: 'json'
   });
}

function post_to_sev(msg,contextjson,callback){
   post_msg(msg,contextjson,function(response){
      msg = response;
      // console.log("msg", msg);
      callback(msg);
   })
}

function conver_init_ajax(callback){
   var initcfg = {
      'message' : "",
      'init' : true,
      'context' : {
         'car' : user.model,
         'username' : user.fname
      }
   }
   $.ajax({
      type: "POST",
      url: '/conversation',
      data: JSON.stringify(initcfg),
      contentType: "application/json",
      success: callback,
      dataType: 'json'
   });
}

function conver_init(callback){
   conver_init_ajax(function(response){
      msg = response;
      // console.log("msg", msg);
      callback(msg);
   })
}

function changecar(car){
   $("#fb-model").attr('href', car.link);
   $("#fb-model").html("Mercedes-Benz " + car.name);
   $("#fb-content").css('background-image', 'url(' + car.pic + '.jpg)');
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
      console.log('hide chat', $('#social-login:visible').length);
      chatclose();
   }
});
