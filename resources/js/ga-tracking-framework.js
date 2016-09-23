function ga(arg1, arg2, spec) {
    console.log(spec)
}

var GATF = (function() {
    
    var instance,
        gaEventSpecHelper,
        trackingBindings;
    
    gaEventSpecHelper = {
        buildEventSpec: function(category, action, label, value, fieldsObject) {
            return {
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value,
                fieldsObject: fieldsObject,
                transport: 'beacon'
            }
        },
        
        buildFromElement: function(element) {
            var category = $(element).attr('data-ga-track-event-category'),
                action = $(element).attr('data-ga-track-event-action'),
                  label = $(element).attr('data-ga-track-event-label'),
                value = $(element).attr('data-ga-track-event-value');
            
            if(!category) {
                console.log("GA event category not provided.");
            }
            
            if(!action) {
                console.log("GA event action not provided.");
            }
            
            return this.buildEventSpec(
                category,
                action,
                label,
                value
            );
        }
    }
    
    trackingBindings = {
        jQuery: function(element) {
            var jQueryEventType = element.attr('data-ga-track-trigger'),
                gaEventSpec = gaEventSpecHelper.buildFromElement(element);
            
            if(!jQueryEventType) {
                console.error('No event jQuery eventy type provided for element');
            }
            
            element.bind(jQueryEventType, function(jQueryEvent) {
                ga('send', 'event', gaEventSpec);
            });
        }
    };
    
    function createInstance() {
        var gatf = new Object();
        return gatf;
    }
    
    return {
        getInstance: function() {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        },
        bindTrackers: function() {
                $('[data-ga-track]').each(function() {
                    var bindingName = $(this).attr('data-ga-track'),
                        binding;
                    
                    if(!bindingName) {
                        console.error('Tracking binding "'+bindingName+'" not defined.');
                    }
                    
                    binding = trackingBindings[bindingName];
                    
                    console.debug('Attaching '+bindingName+' trackers.');
                    binding($(this));
                });
        }
    };
    
})();

$(function() {
    GATF.bindTrackers();
});
