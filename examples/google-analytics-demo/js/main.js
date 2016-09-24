// GA Tracking Code

var GATrackingId = 'UA-84588374-2',
    userGATracker;

(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create',GATrackingId,'auto');ga('send','pageview');

$(function() {
    
    // syntax highlighting
    hljs.initHighlightingOnLoad();
    
    // initiaite declarative-tracking
    require(['require', 
             '../../../resources/js/lib/declarative-tracking/declarative-tracking'], function(require, declarativeTracking) {
        
        declarativeTracking.init();
        declarativeTracking.bindTrackers();
                     
    })
    
    // switching GA Tracking Id
    
    $("#ga-switch-tracking-id").click(function() {
      var newTrackingId = $("#ga-tracking-id").val(),
          newTrackerName = 'userTracker'+newTrackingId.replace(/\-/g,'');
          
      if(newTrackingId == GATrackingId || newTrackerName == userGATracker) {
        return false;
      }
          
      userGATracker = newTrackerName;
      
      ga('create', newTrackingId, 'auto', userGATracker)
      
      bootbox.alert("You switched to send events to a different Google Analytics property.")
      
      console.debug('Created new GA tracker: '+userGATracker)
      
      return false;
    })
    
})