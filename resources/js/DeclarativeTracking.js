function ga(arg1, arg2, spec) {
    console.log(spec)
}

var DeclarativeTracking = (function() {
    
    var instance,
        gaEventSpecHelper,
        standardTriggers,
        util;
    
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

    util = {
        searchWithAlias: function(term, arr) {
            var obj;

            while(!obj) {
                obj = arr[term];
                if (typeof obj === 'string') {
                    term = obj;
                } else {
                    break;
                }
            }

            return obj;
        }
    }

    // split this into triggers and event trackers
    // this object supports aliases
    standardTriggers = [
        {
            name: 'jQuery',
            binding: function(element) {

                var jQueryEventType = element.attr('data-track-trigger'),
                    gaEventSpec = gaEventSpecHelper.buildFromElement(element);
                
                if(!jQueryEventType) {
                    // change this to an exception
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
        DeclarativeTracking.triggers = {};
        DeclarativeTracking.trackers = {};
        return DeclarativeTracking;
    }
    
    return {
        getInstance: function() {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        },

        registerTrigger: function(name, trigger) {
            this.getInstance().triggers[name] = trigger;
        },

        registerTracker: function(name, tracker) {
            this.getInstance().trackers[name] = tracker;
        },

        getTrigger: function(name) { return util.searchWithAlias(name, this.getInstance().triggers) },

        getTracker: function(name) { return util.searchWithAlias(name, this.getInstance().trackers) },

        bindTrackers: function() {
                $('[data-track]').each(function() {
                    var bindingName = $(this).attr('data-track'),
                        binding;
                    
                    if(!bindingName) {
                        // change to exceptions
                        console.error('Tracking binding "'+bindingName+'" not defined.');
                    }
                    
                    binding = DeclarativeTracking.getTrackingBinding(bindingName);
                    
                    console.debug('Attaching '+bindingName+' trackers.');
                    binding($(this));
                });
        },

        registerStandardTriggers: function() {
            var that = this;
            $.each(standardTriggers, function(i, triggerDescriptor) {
                that.registerTrigger(triggerDescriptor.name, triggerDescriptor.binding);
            })
        },

        init: function() {

            this.registerstandardTriggers();

        },
    };
    
})();

// $(function() {
//     DeclarativeTracking.bindTrackers();
// });
