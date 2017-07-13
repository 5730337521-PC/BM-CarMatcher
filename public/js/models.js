var name_key = {
   "C-Class Saloon" : "C",
   "E-Class Coupé" : "E_coupe",
   "SLK Roadster" : "SLK",
   "A-Class Saloon" : "A",
   "C-Class Coupé" : "C_coupe",
   "GL-Class" : "GL",
   "SLS AMG" : "SLS_AMG",
   "GLA Off-Roader" : "GLA",
   "CLA Coupé" : "CLA",
   "S-Class Saloon" : "S",
   "CLS Coupé" : "CLS",
   "GLE SUV" : "GLE"
};


var models = {
   "C": {
      "name": "C-Class Saloon",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/c-class/w205.flash.html#_int_passengercars:home:model-navi:w205",
      "pic": "./model/model_c",
      "color" : "Grey, Silver, Black, White",
      "price" : "2,790,000 THB",
      "seat" : "5",
      "about" : "The C-Class design has always had aesthetic links with our large Saloons. The same is true today. The new C-Class Saloon is a resolute expression of the current Mercedes-Benz style that is also evident in the S-Class"
   },
   "E_coupe": {
      "name": "E-Class Coupé",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
      "pic": "./model/model_e_coupe",
      "color" : "Grey, Silver, Black, White, Red",
      "price" : " 3,490,000 THB",
      "seat" : "5",
      "about" : "The new E-Class Coupé now represents civilised sportiness more than ever.Gently curved flanks trace the unmistakeable profile of a coupé. The concept of the harmonious exterior design is captured in the interior and continued with exclusive design elements."
   },
   "SLK": {
      "name": "SLK Roadster",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
      "pic": "./model/model_slk",
      "color" : "Grey, Silver, Black, White",
      "price" : "9,490,000 THB",
      "seat" : "2",
      "about" : "The silhouette of the new SLC is eye-catchingly and excitingly dynamic, both open and closed. The visual main focus is located far towards the back and directs the gaze to its powerful rear. The distinctive rear bumper with its integrated tailpipes and LED tail lamps sounds the stunning final chord."

   },
   "A": {
      "name": "A-Class Saloon",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/a-class/w176.flash.html",
      "pic": "./model/model_a",
      "color" : "Silver, Black, White",
      "price" : "2,140,000 THB",
      "seat" : "5",
      "about" : "Athletic at first sight - and on every metre travelled: the new generation A-Class delivers on the promise held out by its design. The new generation A-Class signals emotion in motion with its aggressive front apron, the taut side line and the even more distinctive rear end, optionally with all-LED tail lamps."
   },
   "C_coupe": {
      "name": "C-Class Coupé",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/c-class/_c204.flash.html",
      "pic": "./model/model_c_coupe",
      "color" : "Silver, Black, White",
      "price" : "2,570,000 THB",
      "seat" : "5",
      "about" : "No question about it: The new Mercedes-Benz C-Class Coupé leaves nobody cold. Its compelling presence conquers the roads and always places it in the focus of attention. The ultimate statement for automotive individualists who want to feel agility with all their senses"
   },
   "GL": {
      "name": "GL-Class",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/gl-class/x166.flash.html",
      "pic": "./model/model_gl",
      "color" : "Silver, Black, White",
      "price" : "8,990,000 THB",
      "seat" : "7",
      "about" : "Few people can dominate a scene alone with their presence. And then there is the Mercedes-Benz GLS. It immediately conquers all around it with the force of its sheer presence. Its front section radiates a superbly confident presence with its powerdomes, while its striking silhouette is the epitome of character. And car's powerful rear rounds off its dominant look."

   },
   "SLS_AMG": {
      "name": "SLS AMG",
      "link": "http://www.mercedes-amg.com/webspecial/slsblackseries/eng.php",
      "pic": "./model/model_sls_amg",
      "color" : "Silver, Black, White",
      "price": " 15,490,000 THB",
      "seat" : "2",
      "about" : "The process of determining the visual appearance of the SLS AMG Black Series is one that is rooted with posing an initial question: “What are we trying to achieve?”… When the answer to that question is “To create one of the most pursitic examples Driving Performance ever produced”, the process is, indeed, an interesting one"
   },
   "GLA": {
      "name": "GLA Off-Roader",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/gla-class/x156.flash.html",
      "pic": "./model/model_gla",
      "color" : "Silver, Black, White",
      "price" : "2,090,000 THB",
      "seat" : "5",
      "about" : "The new GLA is different.The first compact SUV from Mercedes-Benz blends coupé-like design roots with great everyday suitability. The leading role it plays in the compact premium all-road segment is reflected impressively in its urban lifestyle design. "
   },
   "CLA": {
      "name": "CLA Coupé",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/cla-class/c117.flash.html",
      "pic": "./model/model_cla",
      "color" : "Silver, Black, White",
      "price": "2,140,000 THB",
      "seat" : "5",
      "about" : "With its new CLA Coupé, Mercedes-Benz sets new benchmarks for expressive, avantgarde design. This Coupé does not merely wish to please the beholder - but rather, seduce the beholder with every line."
   },
   "S": {
      "name": "S-Class Saloon",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/s-class/w222.flash.html",
      "pic": "./model/model_s",
      "color" : "Silver, Black, White",
      "price": "5,990,000 THB",
      "seat" : "5",
      "about" : "The contours of the new S-Class combine stylish superiority with sporty elegance. The exciting lines suggest power and dynamism, even before the vehicle moves off. The interior delivers on the promise of the exterior: spaciousness, attractiveness and comfort, married together to give an unsurpassed ambience of well-being. Courtesy exclusively of the S-Class."
   },
   "CLS": {
      "name": "CLS Coupé",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/cls-class/_c218.flash.html",
      "pic": "./model/model_cls",
      "color" : "Silver, Black, White",
      "price": "4,090,000 THB",
      "seat" : "5",
      "about" : "You sense when a moment becomes something special. If you are left speechless or cannot take your eyes off something, you know: This is one of those moments that you would like to hold on to. That's exactly what will happen to you when you see the latest generation of the CLS Coupé. That's a promise."
   },
   "GLE": {
      "name": "GLE SUV",
      "link": "http://www.mercedes-benz.com.sg/content/singapore/mpc/mpc_singapore_website/enng/home_mpc/passengercars/home/new_cars/models/gle-class/gle_suv.flash.html",
      "pic": "./model/model_gle",
      "color" : "Silver, Black, White",
      "price" : "6,990,000 THB",
      "seat" : "5",
      "about" : "The refined and unflappable nature of the new GLE hints at great moments of excitement, exudes a sense of freedom and radiates a quality you will find infectious: naturalness. Its design concept makes this off-roader a uniquely dynamic, impressive and dominant vehicle."
   }
};
