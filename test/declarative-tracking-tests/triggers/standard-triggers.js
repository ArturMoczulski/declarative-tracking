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

	  QUnit.test('trigger: change', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<input data-track='change' data-track-service='stub-track-service' />")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.change()

	    assert.expect(1)

	  })

	  QUnit.test('trigger: mouseenter', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<input data-track='mouseenter' data-track-service='stub-track-service' />")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.mouseenter()

	    assert.expect(1)

	  })

	  QUnit.test('trigger: select', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<select data-track='select' data-track-service='stub-track-service'></select>")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.select()

	    assert.expect(1)

	  })

	  QUnit.test('trigger: submit', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<input data-track='submit' data-track-service='stub-track-service' />")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.submit()

	    assert.expect(1)

	  })

	  QUnit.test('trigger: jquery', function(assert) {

	    var stubTrackService = function() { assert.ok(true, "stub-track-service fired") },
	        element;

	    (function(parent) {

	      element = $("<a data-track='jquery' data-track-jq-event-type='dblclick' data-track-service='stub-track-service'></a>")
	      parent.append(element)

	    })($('#qunit-fixture'))

	    DeclarativeTracking.registerTracker('stub-track-service', stubTrackService)
	    DeclarativeTracking.bindTrackers()

	    element.dblclick()

	    assert.expect(1)

	  })
})