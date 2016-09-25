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
             'declarative-tracking/utils/jquery-helper'], 
            function(require, declarativeTracking, gaHelper, jqHelper) {
        
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
         * DOM
         */
        declarativeTracking.bindTrackers();
    
        /**
         * Website's User Interface logic
         */
         
        /**
         * Switch Google Analytics Account button
         */
        $("button#ga-switch-tracking-id").click(function() {
          var newTrackingId = $("input#ga-tracking-id").val(),
              newTrackerName = 'userTracker'+newTrackingId.replace(/\-/g,''),
              oldTrackerName = userGATrackingId ? 'userTracker'+userGATrackingId.replace(/\-/g,'') : undefined;
              
          if(newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
            return false;
          }
          
          // remove the old user tracker
          if(userGATrackingId) {
            ga(oldTrackerName+'.remove')
            console.debug('Removed previous GA tracker: '+oldTrackerName)
          }
          
          // set new tracking id for the user
          userGATrackingId = newTrackingId;
          
          // create new GA tracker
          ga('create', newTrackingId, 'auto', newTrackerName)
          console.debug('Created new GA tracker: '+newTrackerName)
          
          /* 
           * Cleaning up underlying jQuery event handlers
           * binded previously by declarative-tracker triggers
           * 
           * Note: doing this is not a responsibility of declarativeTracking object.
           * Those bindings were performed by the standard 'click' trigger
           * through the jquery-helper module. declarativeTracking object
           * is not responsible for cleaning up after registered triggers.
           */
          jqHelper.unbindAll()
          
          // rebinding declarative-tracking trackers
          declarativeTracking.bindTrackers()
          
          // show more instructions
          $("div#ga-switch-tracking-id-success, div#ga-tracking-overview-instructions").toggleClass('hidden')
          // update the button state
          $("input#ga-tracking-id").keyup()
          // display new user property tracking id
          $('.ga-tracking-id').html(userGATrackingId)
          
          return false;
        })
        
        /**
         * Dynamic disabling of the button
         */
        $("input#ga-tracking-id").keyup(function() {
          var newTrackingId = $("input#ga-tracking-id").val(),
              newTrackerName = 'userTracker'+newTrackingId.replace(/\-/g,'');
              
          if(!newTrackingId || newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
            $("button#ga-switch-tracking-id").prop('disabled', true)
          } else {
            $("button#ga-switch-tracking-id").prop('disabled', false)
          }
        })
                     
    })
    
})