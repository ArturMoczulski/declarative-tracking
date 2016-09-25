define(['require',
        './utils/util',
        './trackers/standard-trackers',
        './triggers/standard-triggers'],
        function(require) {

    return (function() {
        
        var instance,
            DeclarativeTracking,
            standardTriggers = require('./triggers/standard-triggers'),
            standardTrackers = require('./trackers/standard-trackers'),
            util = require('./utils/util');
        
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

            unregisterAllTriggers: function() { this.getInstance().triggers = {} },

            unregisterAllTrackers: function() { this.getInstance().trackers = {} },

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
            
            registerTackerCallback: function(trackerName, callback) {
                var tracker = this.getTracker(trackerName)
                
                if(!tracker) {
                    throw new Error(trackerName+" not registered.")
                }
                
                tracker.callbacks = tracker.callbacks ? tracker.callbacks : []
                
                tracker.callbacks.push(callback)
                
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
                            trackerNames = $(this).attr('data-track-service'),
                            trackers = [];
                        
                        if(!triggerName) {
                            throw new Error('Tracking trigger attribute not provided.');
                        }
                        if(!trackerNames) {
                            throw new Error('Tracker attribute not provided.');
                        }
                        
                        trigger = DeclarativeTracking.getTrigger(triggerName);

                        if(!trigger) {
                            throw new Error('Trigger '+triggerName+' not defined')
                        }
                        
                        $.each(trackerNames.split(/, ?/), function(i, trackerName) {
                            var tracker = DeclarativeTracking.getTracker(trackerName)
                        
                            console.debug('Attaching '+trackerName+' for trigger '+triggerName+'.');
                            
                            if(!trackers) {
                                throw new Error('Tracker '+trackerName+' not defined')
                            }
                        
                            trackers.push(tracker)
                        })

                        trigger($(this), function(element) {
                            $.each(trackers, function(i, tracker) {
                                
                                tracker(element)
                                                    
                                if(tracker.callbacks) {
                                    $.each(tracker.callbacks, function(i, callback) {
                                        callback(element)
                                    })
                                }
                            })
                        });
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