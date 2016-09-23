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

    // this object supports aliases
    standardTriggers = [
        {
            name: 'click',
            trigger: function(element, tracker) { element.bind('click', function() { tracker(element) }) }
        }
    ];

    // this object supports aliases
    standardTrackers = [
        {
            name: 'google-analytics',
            tracker: function(element) {

                var gaEventSpec = gaEventSpecHelper.buildFromElement(element);
                ga('send', 'event', gaEventSpec);

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
                    /**
                     * The attributes might seem a bit confusing from development side, but they
                     * seem easier to use by the end user.
                     *
                     * data-track="click"
                     * data-track-service="google-analytics"
                     */
                    var triggerName = $(this).attr('data-track'),
                        trigger,
                        trackerName = $(this).attr('data-track-service'),
                        tracker;
                    
                    if(!triggerName) {
                        throw Error('Tracking trigger "'+triggerName+'" not defined.');
                    }
                    if(!trackerName) {
                        throw Error('Tracker "'+triggerName+'" not defined.');
                    }
                    
                    trigger = DeclarativeTracking.getTrigger(triggerName);
                    tracker = DeclarativeTracking.getTracker(trackerName);
                    
                    console.debug('Attaching '+trackerName+' tracker for trigger '+triggerName+'.');

                    trigger($(this), tracker);
                });
        },

        registerStandardTriggers: function() {
            var that = this;
            $.each(standardTriggers, function(i, triggerDescriptor) {
                that.registerTrigger(triggerDescriptor.name, triggerDescriptor.trigger);
            })
        },

        registerStandardTrackers: function() {
            var that = this;
            $.each(standardTrackers, function(i, trackerDescriptor) {
                that.registerTracker(trackerDescriptor.name, trackerDescriptor.tracker);
            })
        },

        init: function() {

            this.registerStandardTriggers();
            this.registerStandardTrackers();

        },
    };
    
})();

// $(function() {
//     DeclarativeTracking.bindTrackers();
// });
