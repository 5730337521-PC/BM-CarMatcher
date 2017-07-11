_satellite.pushAsyncScript(function(event, target, $variables){
  
var startTime = new Date().getTime(), now = startTime;
var intervalId = setInterval(function(){
    now = new Date().getTime();
    if ( !!window.MB_PAGE_INITED && window.MB_PAGE_INITED === 'true' ) { 
		// The DTM code can now run!
		
		var vehicleButton = document.getElementsByClassName("vehicles pie")[0];
		var shoppingToolsButton = document.getElementsByClassName("shopping-tools pie")[0];

		if (vehicleButton != undefined) {
			vehicleButton.addEventListener ("click", function () {
				_satellite.setVar('topOpened',"vehicles");
				_satellite.track('topOpen');
				});
		}

		if (shoppingToolsButton != undefined) {
			shoppingToolsButton.addEventListener("click", function () {
				_satellite.setVar('topOpened',"shopping tools");
				_satellite.track('topOpen');
				});	
		}

		var bodyStyles = document.getElementsByClassName("bodystyle");

		if (bodyStyles != undefined) {
			for (i = 0; i < bodyStyles.length; i++) {
				if (bodyStyles[i].tagName == "A") {
					(function (i) {
						bodyStyles[i].addEventListener("click", function () {
							_satellite.setVar('bodyCaro',bodyStyles[i].textContent);
							_satellite.track('bodyCaro')
						});
					}) (i);
				}
			}
		}
		
		_satellite.notify("top nav tag(s) bound",1);
			
        // We ran the DTM code, we can stop the interval.
        clearInterval(intervalId);
    } 
    // The MB_PAGE_INITED was never found or the value was not what was expected and its been 10 seconds
    else if ( (now - startTime > _satellite.getVar('Link Decoration Delay')) ) {
        clearInterval(intervalId);
    }
}, 250);

});
