define(function(require) {

  	var DeclarativeTracking = require('declarative-tracking/declarative-tracking')

	QUnit.module( "Standard trackers", {
	    beforeEach: function() {
	      DeclarativeTracking.unregisterAllTriggers();
	      DeclarativeTracking.unregisterAllTrackers();

	      DeclarativeTracking.registerStandardTrackers();
	      DeclarativeTracking.registerStandardTriggers();
	    },
	    afterEach: function() {
	      DeclarativeTracking.unregisterAllTriggers();
	      DeclarativeTracking.unregisterAllTrackers();
	    }
	})

	  QUnit.test('tracker: google-analytics', function(assert) {

	    var expectedArg1 = 'send',
	        expectedArg2 = 'event',
	        expectedEventCategory = 'stub-event-category',
	        expectedEventAction = 'stub-event-action',
	        expectedEventLabel = 'stub-event-label',
	        expectedEventValue = 'stub-event-value'

	    window.ga = function(arg1, arg2, payload) {
	      assert.equal(arg1, 'send')
	      assert.equal(arg2, 'event')
	      assert.equal(payload.eventCategory, expectedEventCategory)
	      assert.equal(payload.eventAction, expectedEventAction)
	      assert.equal(payload.eventLabel, expectedEventLabel)
	      assert.equal(payload.eventValue, expectedEventValue)
	    }

	    var stubTrigger = function(element, tracker) { tracker(element) },
	        element;

	    (function(parent) {

	      element = $("<a data-track='stub-trigger' data-track-service='google-analytics'></a>")
	      element.attr('data-track-event-category', expectedEventCategory)
	      element.attr('data-track-event-action', expectedEventAction)
	      element.attr('data-track-event-label', expectedEventLabel)
	      element.attr('data-track-event-value', expectedEventValue)

	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTrigger('stub-trigger', stubTrigger)
	    DeclarativeTracking.bindTrackers()

	    assert.expect(6)

	    window.ga = undefined;

	  })
})