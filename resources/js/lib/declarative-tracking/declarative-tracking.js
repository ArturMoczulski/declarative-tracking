define(['require',
        './trackers/standard-trackers'],
        function(require) {

    return (function() {
        
        var instance,
            DeclarativeTracking,
            standardTriggers,
            standardTrackers = require('./trackers/standard-trackers'),
            util;

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
        
        function createInstance() {
            var DeclarativeTracking = new Object();
            DeclarativeTracking.triggers = {};
            DeclarativeTracking.trackers = {};
            DeclarativeTracking.initialized = false;
            return DeclarativeTracking;
        }
        
        DeclarativeTracking = {
            getInstance: function() {
                if(!instance) {
                    instance = createInstance();
                }
                return instance;
            },

            unregisterAllTriggers: function() { this.getInstance().triggers = [] },

            unregisterAllTrackers: function() { this.getInstance().trackers = [] },

            registerTrigger: function(name, trigger) {
                if(this.getInstance().triggers[name]) {
                    throw new Error("Trigger "+name+ " has already been registered")
                }
                this.getInstance().triggers[name] = trigger;
            },

            registerTracker: function(name, tracker) {
                if(this.getInstance().trackers[name]) {
                    throw new Error("Tracker "+name+ " has already been registered")
                }
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
                            throw new Error('Tracking trigger attribute not provided.');
                        }
                        if(!trackerName) {
                            throw new Error('Tracker attribute not provided.');
                        }
                        
                        trigger = DeclarativeTracking.getTrigger(triggerName);
                        tracker = DeclarativeTracking.getTracker(trackerName);

                        if(!trigger) {
                            throw new Error('Trigger '+triggerName+' not defined')
                        }
                        
                        if(!tracker) {
                            throw new Error('Tracker '+trackerName+' not defined')
                        }
                        
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

                if(this.getInstance().initialized) {
                    throw new Error('DeclarativeTracking already initialized')
                }

                this.registerStandardTriggers();
                this.registerStandardTrackers();

                this.getInstance().initialized = true;

            },
        };

        return DeclarativeTracking;
        
    })();

})