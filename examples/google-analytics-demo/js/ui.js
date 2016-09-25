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
        gaExamplesUi = function() {
            
            var ui = { components: {} },
                comps = ui.components
            
            comps.switchTrackingIdSuccessMessage = $("div#ga-switch-tracking-id-success")
            comps.trackingPreviewInstructions = $("div#ga-tracking-overview-instructions")
            comps.userTrackingIdDisplay = $('.ga-tracking-id')
            comps.userTrackingIdInput = $("input#ga-tracking-id")
            comps.switchTrackingIdButton = $("button#ga-switch-tracking-id")
            
            
            comps.userTrackingIdInput.keyup(function() {
            
                comps.switchTrackingIdButton.update()
                
            })
            
            comps.switchTrackingIdButton.click(function() {
                
                // Get the new tracking id from the input box
                var newTrackingId = comps.userTrackingIdInput.val()
                
                // Ignore if the user tracking id didn't change
                if(newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
                    return false;
                }
              
                updateUserGATracker(newTrackingId)
                
                comps.trackingPreviewInstructions.toggleClass('hidden')
                comps.switchTrackingIdButton.toggleClass('hidden')
                
                comps.userTrackingIdDisplay.update()
                
                comps.switchTrackingIdButton.update()
              
                return false;
            })
            
            comps.switchTrackingIdButton.update = function() {
                var newTrackingId = comps.userTrackingIdInput.val()
                  
                if(!newTrackingId || newTrackingId == GATrackingId || newTrackingId == userGATrackingId) {
                    comps.switchTrackingIdButton.prop('disabled', true)
                } else {
                    comps.switchTrackingIdButton.prop('disabled', false)
                }
            }
            
            comps.userTrackingIdDisplay.update = function() { $(this).html(userGATrackingId) }
            
            return ui
            
        }
    
    return function() {
        
        gaExamplesUi()
        
    }
    
})