define(['declarative-tracking/utils/jquery-helper',
        'declarative-tracking/declarative-tracking',], function(jqHelper, declarativeTracking) {
    
    var updateUserGATracker = function(newTrackingId) {
        
            var newTrackerName = 'userTracker'+newTrackingId.replace(/\-/g,''),
                oldTrackerName = userGATrackingId ? 'userTracker'+userGATrackingId.replace(/\-/g,'') : undefined;
        
        
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
            
        }
    
    return function() {
        
        /**
         * Switch Google Analytics Account button
         */
        $("button#ga-switch-tracking-id").click(function() {
            
            var newTrackingId = $("input#ga-tracking-id").val()
            
            if(newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
                return false;
            }
          
            updateUserGATracker(newTrackingId)
          
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
        
    }
    
})