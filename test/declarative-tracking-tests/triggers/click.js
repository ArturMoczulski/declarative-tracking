define(function(require) {

  	var DeclarativeTracking = require('declarative-tracking/declarative-tracking')
  	
	QUnit.module( "Standard triggers",  {
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

	  QUnit.test('trigger: click', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<a data-track='click' data-track-service='stub-track-service'></a>")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.click()

	    assert.expect(1)

	  })
})