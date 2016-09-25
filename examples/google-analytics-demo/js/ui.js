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
            
        },
        gaExamplesUi = {
            showDataPreviewInstructions: function() {
                $("div#ga-switch-tracking-id-success, div#ga-tracking-overview-instructions").toggleClass('hidden')
            },
            updateUserGATrackingId: function() {
                $('.ga-tracking-id').html(userGATrackingId)
            },
            updateSwitchUserGATrackingButton: function() {
                var newTrackingId = $("input#ga-tracking-id").val()
              
                if(!newTrackingId || newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
                    $("button#ga-switch-tracking-id").prop('disabled', true)
                } else {
                    $("button#ga-switch-tracking-id").prop('disabled', false)
                }
                
            }
        }
    
    return function() {
        
        /**
         * Switch Google Analytics Account button
         */
        $("button#ga-switch-tracking-id").click(function() {
            
            // Get the new tracking id from the input box
            var newTrackingId = $("input#ga-tracking-id").val()
            
            // Ignore if the user tracking id didn't change
            if(newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
                return false;
            }
          
            updateUserGATracker(newTrackingId)
            
            gaExamplesUi.showDataPreviewInstructions()
            gaExamplesUi.updateUserGATrackingId()
            gaExamplesUi.updateSwitchUserGATrackingButton()
          
            return false;
        })
        
        /**
         * Dynamic disabling of the button as you type GA Tracking Id
         */
        $("input#ga-tracking-id").keyup(function() {
            
            gaExamplesUi.updateSwitchUserGATrackingButton()
            
        })
        
    }
    
})