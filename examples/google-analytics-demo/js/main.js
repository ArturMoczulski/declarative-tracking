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
    
    // initiaite declarative-tracking
    require(['require', 
             '../../../resources/js/lib/declarative-tracking/declarative-tracking'], function(require, declarativeTracking) {
        
        declarativeTracking.init();
        declarativeTracking.bindTrackers();
                     
    })
    
    // switching GA Tracking Id
    
    $("button#ga-switch-tracking-id").click(function() {
      var newTrackingId = $("input#ga-tracking-id").val(),
          newTrackerName = 'userTracker'+newTrackingId.replace(/\-/g,''),
          oldTrackerName = userGATrackingId ? 'userTracker'+userGATrackingId.replace(/\-/g,'') : undefined;
          
      if(newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
        return false;
      }
      
      if(userGATrackingId) {
        ga(oldTrackerName+'.remove')
        console.debug('Removed previous GA tracker: '+oldTrackerName)
      }
          
      userGATrackingId = newTrackingId;
      
      ga('create', newTrackingId, 'auto', newTrackerName)
      
      console.debug('Created new GA tracker: '+newTrackerName)
      
      
      $("div#ga-switch-tracking-id-success, div#ga-tracking-overview-instructions").toggleClass('hidden')
      $("input#ga-tracking-id").keyup()
      $('.ga-tracking-id').html(userGATrackingId)
      
      return false;
    })
    
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