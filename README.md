# Car Matcher
Car matcher web application for IBM Bluemix,Watson,WCA DEMO
https://carmatcher-personality-beta.mybluemix.net/

**Bluemix Service include:**
1. Watson Personality Insight
1. Watson Conversation
1. Watason Visual Recognition
1. Cloudant NoSQL DB

**To deploy this app**
1. You need your own facebook application with the following login permission approved*
   1. email
   1. user_about_me
   1. user_birthday
   1. user_likes
   1. user_location
   1. user_posts
to make your own Facebook apps visit : https://developers.facebook.com/

1. Replace appId with you facbook appId in .public/js/css
1. Fill "example.env" and change the name to ".env"
1. Edit manifest.yml
1. Push it to Bluemix.
