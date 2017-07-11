_satellite.pushAsyncScript(function(event, target, $variables){
  var startTime = new Date().getTime(), now = startTime;
var intervalId = setInterval(function(){
    now = new Date().getTime();
    if ( !!window.MB_PAGE_INITED && window.MB_PAGE_INITED === 'true' ) { 
		// The DTM code can now run!
		
		  $("header").find("[data-action='openInventoryModal']").click (function () {
			_satellite.notify("Inventory top nav media tag",1);
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			$("body").append('<iframe src="//3990485.fls.doubleclick.net/activityi;src=3990485;type=Searc-;cat=mbusa0;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		  });
		_satellite.notify("floodlight inventory top nav object(s) bound",1);
			
        // We ran the DTM code, we can stop the interval.
        clearInterval(intervalId);
    } 
    // The MB_PAGE_INITED was never found or the value was not what was expected and its been 10 seconds
    else if ( (now - startTime > _satellite.getVar('Link Decoration Delay')) ) {
        clearInterval(intervalId);
    }
}, 250);
});
