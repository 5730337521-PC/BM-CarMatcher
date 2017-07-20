//FB
$(function () {
   $(function () {
      //create instance
      $('.chart').easyPieChart({
         animate: {
            duration: 1000,
            enabled: true
         }
      });
   });
});
randomBackground();

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1711103188904701', //126366697953106 ACTIVE 1711103188904701 TEST
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

var user = {};

function onTwClicked(){
    console.log("onTwClicked");
    var name = $("#twitter-id").val();
    if(name != ''){
      $("#social-login").hide();
      $("#fb-loading").show();
      $.get("/twitter?screen_name="+name, function(response){
          var tw = response.tweets.reduce(function(a,b){
              return a+(a.length > 0 ? ". ":"")+ b.text;
          }, "");
          console.log("tw ",tw);
          user.social = "TW";
          user.posts = tw;
          user.profpic = response.user.profile_image_url.replace("normal","400x400");
          $("#fb-profile-pic").attr("src", user.profpic);
          analyzeProfilePic(function(){
              analyzePosts();
          });
      });
    }
}
function analyzeProfilePic(callback){
  console.log("analyzeProfilePic :", user.profpic);
    $.get("https://gateway-a.watsonplatform.net/visual-recognition/api/v3/detect_faces", ///v3/detect_faces
            {
                api_key: 'f97b3375efa43650b5e0885e02535c1427f9427c',
                version: '2016-05-20',
                url : user.profpic
            }, function (response) {
                console.log("response ",response);
                console.log("res.img ",response.images);
                if (response.images && response.images[0].faces.length > 0) {
                    var face = response.images[0].faces[0];
                    var age,age_max,age_min;
                    console.log("face ",face);
                    console.log("!user.age ",!user.age);
                    //calc age
                    console.log("age ", face.age);
                    try{
                       age_min = face.age.min;
                    }catch(e){
                       age_min = false;
                    }
                    try{
                       age_max = face.age.max;
                    }catch(e){
                       age_max = false;
                    }
                    console.log("min",age_min);
                    console.log("max",age_max);
                    if(age_min && !age_max){
                       age = age_min;
                    }else if(!age_min && age_max){
                       age = parseInt(age_max);
                    }else if(age_min && age_max){
                       age = parseInt((age_min+age_max)/2);
                    }else{
                       age = "UNDEFINE";
                    }
                    if (!user.age && face.age) {
                        user.age = age;
                    }
                    if (!user.gender && face.gender) {
                        user.gender = face.gender.gender.toLowerCase();
                    }
                    user.visual = face;
                    user.watson_age = age;
                    user.watson_gender = face.gender.gender.toLowerCase();
                    console.log("wage",user.watson_age);
                    console.log("wg",user.watson_gender);

                }
                callback(response)
            }
    );
}

function insertuser(){
   var todb = { //ADV ART ACH ODR NEU CHA
      "user" : {
         "email" : user.email,
         "fname" : user.fname,
         "lname" : user.lname,
         "gender" : user.gender,
         "birthday" : user.birthday,
         "social" : user.social,
         "timestamp" : user.analyzewhen
      },
      "result" : {
         "adv" : user.result[0],
         "ART" : user.result[1],
         "ACH" : user.result[2],
         "ODR" : user.result[3],
         "NEU" : user.result[4],
         "CHA" : user.result[5],
         "model": user.model.name
      }
   }
   $.ajax({
      type: "POST",
      url: '/insert',
      data: {userdata : todb},
      success: function (response) {
         console.log("insertuser ", response);
      },
      dataType: 'json'
   });
}


function analyzePosts(){
    console.log("analyzing post user=", user),
    $.ajax({
        type: "POST",
        url: '/analyze',
        dataType: 'json',
        async: false,
        //json object to sent to the authentication url
        data: {content: user.posts},
        success: function (response) {
            console.log("personality ", response);
            user.analyzewhen = new Date().getTime();;
            user.personality = response;
            user.psycho = {};
            $("#fb-loading").hide();
            setTimeout(function () {
                $("#fb-name").html(user.name);
                console.log("user.age ", user.age);
                console.log("user.gender ", user.gender);
                console.log("wage",user.watson_age);
              console.log("wg",user.watson_gender);
                if(!VRon){
                   if (user.age) {
                       $("#fb-age").html("Age: " + user.age + (user.age_actual ? "" : " (Estimate)"));
                   }
                   else {
                       $("#fb-age").html("Age: N/A");
                   }
                   if (user.gender) {
                       $("#fb-gender").html("Gender: " + user.gender + (user.gender_actual ? "" : " (Analyzed)"));
                   }
                   else {
                       $("#fb-gender").html("Gender: N/A");
                   }
                }else{
                   $("#fb-age").html("Age: " + user.watson_age +" (Estimate)");
                    $("#fb-gender").html("Gender: "  + user.watson_gender + " (Analyzed)");
                }

                $("#fb-result").fadeIn();
                setTimeout(function () {
                   user.result = [
                      100 * user.personality.tree.children[0].children[0].children[0].children[0].percentage
                     ,100 * user.personality.tree.children[0].children[0].children[0].children[1].percentage
                     ,100 * user.personality.tree.children[0].children[0].children[1].children[0].percentage
                     ,100 * user.personality.tree.children[0].children[0].children[1].children[3].percentage
                     ,100 * user.personality.tree.children[0].children[0].children[4].percentage
                     ,100 * user.personality.tree.children[1].children[0].children[0].percentage
                   ];
                    console.log("user result",user.result)
                    updatePersonalityChart("Adventurousness",user.result[0]);
                    updatePersonalityChart("Artistic",user.result[1]);
                    updatePersonalityChart("Achievement",user.result[2], "Achievement-Striving");
                    updatePersonalityChart("Orderliness",user.result[3]);
                    updatePersonalityChart("Neuroticism",user.result[4], "Emotional");
                    updatePersonalityChart("Challenge",user.result[5], "Challenge-Seeking");
                    analyzePsycho();
                    setTimeout(function () {
                        user.model = chooseModel();
                        // console.log("model ", user.model);
                        RedirectURL(user.fname,user.lname,user.email,user.gender,user.birthday,user.result[0],user.result[1],user.result[2],user.result[3],user.result[4],user.result[5],user.model.name);
                        insertuser();
                        $("#fb-model").attr('href', user.model.link);
                        $("#fb-model").html("Mercedes-Benz " + user.model.name);
                        $("#fb-content").css('background-image', 'url(' + user.model.pic + '.jpg)');
                        $("#fb-recommend").fadeIn();
                        $("#chat-open-icon").fadeIn();

                    }, 1000);
                }, 1000);
                //db update
               //  console.log("user :",user);
            }, 500);
        }
    });
}

function RedirectURL(Firstname,Lastname,Email,Gender,Birthday,Adventurousness,Artistic,Achievementseeking,Orderliness,Emotional,Challenge,car){
   // openwindow();
   if(!Firstname){
      Firstname="";
   }
   if(!Lastname){
      Lastname="";
   }
   if(!Email){
      Email="";
   }
   if(!Birthday){
      Birthday="";
   }
   if(!Gender){
      Gender="";
   }
   var url = "http://www.pages00.net/orgforwirayutjantrapornsin/carmatcher?Firstname="+Firstname+"&Lastname="+Lastname+"&Email="+Email+"&Gender="+Gender+"&Birthdate="+Birthday+"&Adventurousness="+Adventurousness+"&Artistic="+Artistic+"&Achievementseeking="+Achievementseeking+"&Orderliness="+Orderliness+"&Emotional="+Emotional+"&Challenge="+Challenge+"&Car="+car;
   try{
      myWindow = window.open(url,'name',"resizable,scrollbars,width=400px,height=520px");
   }catch(e){
      console.log("pls disable popup block")
      $("#popupblk").fadeIn();
   }
   if(!myWindow || myWindow.closed || typeof myWindow.closed=='undefined')
      {
         console.log("pls disable popup block")
         $("#popupblk").fadeIn();
      }
}

var myWindow;

function onFbClicked() {
    console.log("onFBClicked");
    FB.login(function (response) {
        if (response.authResponse) {
            $("#social-login").hide();
            $("#fb-loading").show();
            console.log('Welcome!  Fetching your information.... ', response);
            FB.api('/me?fields=name,birthday,gender,about,email,first_name,last_name', function (response) {
                console.log("me ", response);
                console.log("gender ", response.gender);
                console.log("birthday ", response.birthday);
                user.social = "FB";
                user.email = response.email;
                user.birthday = response.birthday;
                user.name = response.name;
                user.lname = response.last_name;
                user.fname = response.first_name;
                user.id = response.id
                user.posts = "";
                user.posts += response.about;

                $("#fb-profile-pic").attr("src", "http://graph.facebook.com/" + user.id + "/picture?type=large");
                if (response.gender) {
                  user.gender = response.gender;
                  user.gender_actual = true;
                }
                if (response.birthday) {
                    var b = response.birthday;
                    var curr_year = new Date().getFullYear();
                    b = b.substr(b.length - 4, 4);
                    console.log("isNaN(b) ", b);
                    if (!isNaN(b)) {
                        user.age = curr_year-parseInt(b.substr(b.length - 4, 4));
                        user.age_actual = true;
                   }
                }

                FB.api('me?fields=picture.width(1000)', function (response) {
                    console.log("pic ", response);
                    user.profpic = response.picture.data.url;
                    analyzeProfilePic(function (response) {
                       FB.api('me?fields=posts,likes', function (response) {
                           console.log("posts,like ", response);
                           try{
                              processFbPosts("", response.posts , function (totalStr) {
                                  user.posts += totalStr;
                              });
                           }catch(e){
                              console.log("no post");
                           }
                           //likes
                           try{
                              for(var i = 0; i < response.likes.data.length; i++) {
                                 var obj = response.likes.data[i];
                                 user.posts += obj.name + ". ";
                              }
                           }
                           catch(e){
                              console.log("no likes");
                           }
                            analyzePosts();
                       });
                    })
                });
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'user_birthday, user_location, user_likes, user_about_me, user_posts, email, public_profile'});
}

function randomBackground() {
    var arr = Object.keys(models);
    var i = Math.floor(Math.random() * arr.length);
    console.log(models[arr[i]].pic);
    $("#fb-content").css('background-image', 'url(' + models[arr[i]].pic + '.jpg)');
}

function analyzePsycho() {
    if (user.psycho.Achievement < 50 && user.psycho.Adventurousness < 50) user.psycho = "other";
    else if (Math.max(user.psycho.Achievement, user.psycho.Adventurousness) == user.psycho.Achievement)
        user.psycho = "achiever";
    else user.psycho = "sport";
}

function chooseModel() {
    if (user.age <= 30) {
        if (user.gender == "male") {
            if (user.psycho == "achiever")
                return models["E_coupe"];
            else if (user.psycho == "sport")
                return models["SLK"];
            else
                return models["A"];
        }
        else {
            if (user.psycho == "achiever")
                return models["C"];
            else if (user.psycho == "sport")
                return models["C_coupe"];
            else
                return models["A"];
        }
    }
    else if (user.age > 30 && user.age <= 40) {
        if (user.gender == "male") {
            if (user.psycho == "achiever")
                return models["GL"];
            else if (user.psycho == "sport")
                return models["SLS_AMG"];
            else
                return models["C_coupe"];
        }
        else {
            if (user.psycho == "achiever")
                return models["GL"];
            else if (user.psycho == "sport")
                return models["GLA"];
            else
                return models["CLA"];
        }
    }
    else if (user.age > 40) {
        if (user.gender == "male") {
            if (user.psycho == "achiever")
                return models["S"];
            else if (user.psycho == "sport")
                return models["SLK"];
            else
                return models["C"];
        }
        else {
            if (user.psycho == "achiever")
                return models["S"];
            else if (user.psycho == "sport")
                return models["CLS"];
            else
                return models["GLE"];
        }
    }
    else {
        if (user.psycho == "achiever")
            return models["S"];
        else if (user.psycho == "sport")
            return models["SLK"];
        else return models["C"];
    }
}

function updatePersonalityChart(key, pct, title) {
    pct = Math.round(pct);
    if (!title) title = key;
    user.psycho[key] = pct;
    $("#chart-" + key + "-title").html(title);
    $("#chart-" + key + "-pct").html(pct);
    $("#chart-" + key).data('easyPieChart').update(pct);
}


function processFbPosts(curr, response, callback) {
    console.log("processFbPosts res", response);
    curr = response.data.reduce(function (a, b) {
        if (!b.message)return a;
        else return a + ". " + b.message;
    }, curr);
    var response_paging_next;
    try{
      if(response.paging.next && response.paging.next.length > 0){
        response_paging_next = response.paging.next;
      }
      else {
        response_paging_next = false;
      }
    }catch(e){
      response_paging_next = false;
    }
    if (curr.length < 6000 && response_paging_next > 0) {
        $.get(response_paging_next, function (resp) {
            processFbPosts(curr, resp, callback);
        });
    }
    else callback(curr);
}

var working = false;

function personality_stat_hide(){
   if(!working){
      working = true;
      $("#fb-recommend").hide();
      $("#fb-result").hide();
      $("#show-stat").fadeIn();
      setTimeout(function(){
         working = false;
      }, 500);
   }
}

function personality_stat_show(){
   if(!working){
      working = true;
      $("#fb-result").fadeIn();
      $("#show-stat").hide();
      $("#fb-recommend").fadeIn();
      setTimeout(function(){
         working = false;
      }, 500);
   }
}

var VRon=false;

document.getElementById("VRcheckbox").disabled = true;

function checkboxonlick(){
   if(!VRon){
         $('#VRcheckbox').prop('checked', true);
         VRon = true;
   }
   else{
         $('#VRcheckbox').prop('checked', false);
         VRon = false;
   }
   console.log("rn vron",VRon);
}
