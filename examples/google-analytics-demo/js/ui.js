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
        gaExamples = function() {
            
            var ui = { components: {} },
                comps = ui.components
            
            comps.switchTrackingIdSuccessMessage = $("div#ga-switch-tracking-id-success")
            comps.trackingPreviewInstructions = $("div#ga-tracking-overview-instructions")
            comps.userTrackingIdDisplay = $('.ga-tracking-id')
            comps.userTrackingIdInput = $("input#ga-tracking-id")
            comps.switchTrackingIdButton = $("button#ga-switch-tracking-id")
            comps.outboundConversionSuccessModalContent = $('.ga-tracking-modal-outbound-success')
            
            comps.emailSqueezeModal = {}
            comps.emailSqueezeModal.openButton = $('#ga-email-squeeze-open-button')
            comps.emailSqueezeModal.content = $('#ga-tracking-modal-email-squeeze-content')
            comps.emailSqueezeModal.signupForm = $('#ga-tracking-modal-email-squeeze-form')
            comps.emailSqueezeModal.emailAddressInput = $('#ga-email-squeeze-email')
            comps.emailSqueezeModal.signupButton = $('#ga-email-squeeze-signup')
            
            
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
                comps.switchTrackingIdSuccessMessage.toggleClass('hidden')
                
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
            
            declarativeTracking.registerTackerCallback('google-analytics-user-property', function(element) {
                bootbox.dialog({
                    message: comps.outboundConversionSuccessModalContent.html()
                })
            })
            
            comps.userTrackingIdDisplay.update = function() { $(this).html(userGATrackingId) }
            
            comps.emailSqueezeModal.openButton.click(function() {
                bootbox.dialog({
                    message: comps.emailSqueezeModal.content.html()
                })
            })
            
            debugger;
            comps.emailSqueezeModal.emailAddressInput.keyup(function() {
                debugger;
                if($(this).val()) {
                    comps.emailSqueezeModal.signupButton.prop('disabled',false)
                } else {
                    comps.emailSqueezeModal.signupButton.prop('disabled',true)    
                }
            })
            
            return ui
            
        }
    
    return {
        
        init: function() {
            
            this.gaExamples = gaExamples()
        }
        
    }
    
})