_satellite.pushAsyncScript(function(event, target, $variables){
  //Set Variables

if (_satellite.getVar('jdpLvl') == undefined) {
	var lvl = _satellite.getVar('page_type').toLowerCase();
} else {
	lvl = _satellite.getVar('jdpLvl').toLowerCase();
}

if (_satellite.getVar('jdpAv1') == undefined) {
	var av1 = _satellite.getVar('vehicle_model').toLowerCase();
} else {
	av1 = _satellite.getVar('jdpAv1').toLowerCase();
}

if (_satellite.getVar('jdpAv2') == undefined) {
	var av2 = _satellite.getVar('vehicle_class').toLowerCase();
} else {
	av2 = _satellite.getVar('jdpAv2').toLowerCase();
}


if (lvl.indexOf("cpo") > -1) { // trim out "cpo model"
	lvl = "cpo";
	}

//trim tab if it's there:
av1 = av1.split("%23")[0];

if (av1 == av1.split("model-")[0] && av1 != "no model found") {
	av1 = "model-" + av1;
}

if (av2.indexOf("class") == -1) {
  av2 = "class-"+av2;
}

lvl = lvl.replace(/ /g,"+")
av1 = av1.replace(/ /g,"+")
av2 = av2.replace(/ /g,"+")


//Create Cache-Buster
var axel = Math.random() + "";
var a = axel * 10000000000000;
var protocol = "2"


if (location.protocol == "http:") {
	protocol = "2";
} else {
	protocol = "1";
}

if (typeof $ != "undefined") {
	//Jquery exists, yay
	_satellite.notify("Calling JD power with jquery: lvl=" + lvl + " av1=" + av1 + " av2=" + av2,1);
	$("body").append('<script src="//a0' + protocol + '.korrelate.net/a/e/d2a.ads?r=' + a + '&et=a&ago=312&ao=313&px=235&lvl=' + lvl + '&av1=' + av1 + '&av2=' + av2 + '"></script>');
} else {
	//no jquery, use javascript:
	_satellite.notify("had to switch. Calling with pure JS",1);
	var script = document.createElement("script");
	script.src = '//a0' + protocol + '.korrelate.net/a/e/d2a.ads?r=' + a + '&et=a&ago=312&ao=313&px=235&lvl=' + lvl + '&av1=' + av1 + '&av2=' + av2;
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
}
	
});
