_satellite.pushAsyncScript(function(event, target, $variables){
  var startTime = new Date().getTime(), now = startTime;
var intervalId = setInterval(function(){
    now = new Date().getTime();
    if ( !!window.MB_PAGE_INITED && window.MB_PAGE_INITED === 'true' ) { 
		// The DTM code can now run!
		
		$("LI.vehicles.pie").click(function (e) {
			if ($(this).parents('header')[0] != undefined && $("#main-nav-drawer").attr('style') == ""
				&& _satellite.getVar('rightExpanded') != "true") {
				_satellite.setVar('rightExpanded', "true");
				_satellite.track('rightmobilenav')
			} else if (_satellite.getVar('rightExpanded') == "true") {
				_satellite.setVar('rightExpanded', "false");
			}
			//else do nothing
		});
		
		_satellite.notify("mobile right nav button bound",1);
			
        // We ran the DTM code, we can stop the interval.
        clearInterval(intervalId);
    } 
    // The MB_PAGE_INITED was never found or the value was not what was expected and its been 10 seconds
    else if ( (now - startTime > 10000) ) {
        clearInterval(intervalId);
    }
}, 250);
});
