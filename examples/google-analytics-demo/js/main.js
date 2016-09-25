// GA Tracking Code

var GATrackingId = 'UA-84588374-2',
    userGATrackingId;

(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create',GATrackingId,'auto');ga('send','pageview');

$(function() {
    
    // syntax highlighting
    hljs.initHighlightingOnLoad();
    
    require.config({
    	baseUrl: "../../../resources/js/lib"
    })
    
    // initiate declarative-tracking
    require(['require', 
             'declarative-tracking/declarative-tracking',
             'declarative-tracking/utils/google-analytics-helper',
             '../../../examples//google-analytics-demo/js/ui'], 
      function(require, declarativeTracking, gaHelper, ui) {
        
        /**
         * Set up user interface
         */
        ui.init()
        
        /**
         * Register all standard trackers and initialize dt
         */
        declarativeTracking.init();
        
        /**
         * google-analytics-user-property tracker will take care of sending
         * GA event data to user's property
         */
        declarativeTracking.registerTracker('google-analytics-user-property', function(element) {
          var gaEventSpec = gaHelper.buildFromElement(element),
              userGATrackerName = userGATrackingId ? 'userTracker'+userGATrackingId.replace(/\-/g,'') : undefined;
          
          if(userGATrackingId) {
            ga(userGATrackerName+'.send', 'event', gaEventSpec);
            console.debug("Event data sent to user's GA")
          }
          
        })
        
        /**
         * Assign tracking data dispatch logic based on attributes defined in
         * DOM - this is the meat of declarative-tracking.
         */
        declarativeTracking.bindTrackers();
                     
    })
    
})