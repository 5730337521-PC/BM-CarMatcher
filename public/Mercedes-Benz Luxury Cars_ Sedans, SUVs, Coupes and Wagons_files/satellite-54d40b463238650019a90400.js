_satellite.pushAsyncScript(function(event, target, $variables){
  if (document.URL.indexOf("build") > -1) {
  	_satellite.setVar('jdLvl',"byo start");
}

_satellite.track('jdppixel');
});
