function ga(arg1, arg2, spec) {
    console.log(spec)
}

var DeclarativeTracking = (function() {
    
    var instance,
        gaEventSpecHelper,
        standardTrackingBindings;
    
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
            var category = $(element).attr('data-track-event-category'),
                action = $(element).attr('data-track-event-action'),
                  label = $(element).attr('data-track-event-label'),
                value = $(element).attr('data-track-event-value');
            
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

    standardTrackingBindings = [
        {
            name: 'jQuery',
            binding: function(element) {

                var jQueryEventType = element.attr('data-track-trigger'),
                    gaEventSpec = gaEventSpecHelper.buildFromElement(element);
                
                if(!jQueryEventType) {
                    console.error('No event jQuery eventy type provided for element');
                }
                
                element.bind(jQueryEventType, function(jQueryEvent) {
                    ga('send', 'event', gaEventSpec);
                });

            }
        }
    ];
    
    function createInstance() {
        var DeclarativeTracking = new Object();
        DeclarativeTracking.trackingBindings = {};
        return DeclarativeTracking;
    }
    
    return {
        getInstance: function() {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        },
        registerTrackingBinding: function(name, binding) {
            this.getInstance().trackingBindings[name] = binding;
        },
        getTrackingBinding: function(name) {
            return this.getInstance().trackingBindings[name];
        },
        bindTrackers: function() {
                $('[data-track]').each(function() {
                    var bindingName = $(this).attr('data-track'),
                        binding;
                    
                    if(!bindingName) {
                        console.error('Tracking binding "'+bindingName+'" not defined.');
                    }
                    
                    binding = instance.trackingBindings[bindingName];
                    
                    console.debug('Attaching '+bindingName+' trackers.');
                    binding($(this));
                });
        },
        registerStandardTrackingBindings: function() {
            var that = this;
            $.each(standardTrackingBindings, function(i, bindingDescriptor) {
                that.registerTrackingBinding(bindingDescriptor.name, bindingDescriptor.binding);
            })
        },
        init: function() {

            this.registerStandardTrackingBindings();

        },
    };
    
})();

// $(function() {
//     DeclarativeTracking.bindTrackers();
// });
