define(function(require) {
    
  var DeclarativeTracking = require('declarative-tracking/declarative-tracking')

  QUnit.module( "DeclarativeTracking state independent");

    QUnit.test("DeclarativeTracking.registerTrigger", function(assert) {
      DeclarativeTracking.registerTrigger('stub-trigger', function() {});
      assert.notEqual(DeclarativeTracking.getTrigger('stub-trigger'), null, "Can register a trigger");
    });

    QUnit.test("DeclarativeTracking.registerTracker", function(assert) {
      DeclarativeTracking.registerTracker('stub-tracker', function() {});
      assert.notEqual(DeclarativeTracking.getTracker('stub-tracker'), null, "Can register a tracker");
    });

    QUnit.test("DeclarativeTracking.registerStandardTriggers", function(assert) {
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.registerStandardTriggers();
      assert.notEqual(DeclarativeTracking.getTrigger('click'), null, "jquery click included in standard triggers");
    })

    QUnit.test("DeclarativeTracking.registerStandardTrackers", function(assert) {
      DeclarativeTracking.unregisterAllTrackers();
      DeclarativeTracking.registerStandardTrackers();
      assert.notEqual(DeclarativeTracking.getTracker('google-analytics'), null, "google-analytics included in standard trackers");
    })

    QUnit.test( "DeclarativeTracking.unregisterAllTriggers", function(assert) {
      DeclarativeTracking.registerTrigger('stub-trigger', function() {})
      DeclarativeTracking.unregisterAllTriggers();
      assert.equal(DeclarativeTracking.getTrigger('stub-trigger'), null, "Unregistered triggers ok")
    })

    QUnit.test( "DeclarativeTracking.unregisterAllTrackers", function(assert) {
      DeclarativeTracking.registerTracker('stub-track-service', function() {})
      DeclarativeTracking.unregisterAllTrackers();
      assert.equal(DeclarativeTracking.getTracker('stub-track-service'), null, "Unregistered trackers ok")
    })

    QUnit.test("DeclarativeTracking.getTrigger by alias", function(assert) {
      DeclarativeTracking.registerTrigger('stub-trigger', function() {});
      DeclarativeTracking.registerTrigger('stub-trigger2', 'stub-trigger');
      assert.notEqual(DeclarativeTracking.getTrigger('stub-trigger'), DeclarativeTracking.getTrigger('stub-trigger2'), "Trigger aliasses work");
    });

    QUnit.test("DeclarativeTracking.getTracker by alias", function(assert) {
      DeclarativeTracking.registerTracker('stub-tracker', function() {});
      DeclarativeTracking.registerTracker('stub-tracker2', 'stub-tracker');
      assert.notEqual(DeclarativeTracking.getTracker('stub-tracker'), DeclarativeTracking.getTracker('stub-tracker2'), "Tracker aliasses work");
    });

  QUnit.module( "DeclarativeTracking state dependent", {
    before: function() {
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.unregisterAllTrackers();

      DeclarativeTracking.init();
    },
    afterEach: function() {
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.unregisterAllTrackers();
    }
  });

    QUnit.test( "DeclarativeTracking.getInstance", function(assert) {
      assert.deepEqual(DeclarativeTracking.getInstance(), DeclarativeTracking.getInstance(), "DeclarativeTracking is a singleton")
    })

    QUnit.test("DeclarativeTracking.registerTracker no duplicate registration", function(assert) {
      DeclarativeTracking.registerTracker('stub-tracker', function() {});
      try {
        DeclarativeTracking.registerTracker('stub-tracker', function() {});
        assert.ok(false, "Duplicate tracker registration not allowed")
      } catch(err) {
        assert.ok(true, "Duplicate tracker registration not allowed")
      }
    });

    QUnit.test("DeclarativeTracking.registerTrigger no duplicate registration", function(assert) {
      DeclarativeTracking.registerTrigger('stub-tracker', function() {});
      try {
        DeclarativeTracking.registerTrigger('stub-tracker', function() {});
        assert.ok(false, "Duplicate tracker registration not allowed")
      } catch(err) {
        assert.ok(true, "Duplicate tracker registration not allowed")
      }
    });

    QUnit.test('DeclarativeTracking.bindTrackers', function(assert) {

      var stubTracker = function(element) { assert.ok(true, "stub-tracker fired") },
          stubTrigger = function(element, tracker) { tracker(element) },
          result = false;

      (function(parent) {

        parent.append('<a data-track="stub-trigger" data-track-service="stub-track-service"></a>')

      })($('#qunit-fixture'))

      DeclarativeTracking.registerTrigger('stub-trigger', stubTrigger)
      DeclarativeTracking.registerTracker('stub-track-service', stubTracker)
      DeclarativeTracking.bindTrackers()

      assert.expect(1)

    })

})