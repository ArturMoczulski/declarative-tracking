define(['require','jquery','declarative-tracking/declarative-tracking'], function(require, $, DeclarativeTracking) {

  QUnit.module( "DeclarativeTracking state independent", {
    afterEach: function() {
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.unregisterAllTrackers();
    }
  });

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
    
    QUnit.test("DeclarativeTracking.registerTrackerCallback", function(assert) {
      
      DeclarativeTracking.registerTracker('stub-tracker', function() {})
      
      var tracker = DeclarativeTracking.getTracker('stub-tracker');
      
      DeclarativeTracking.registerTackerCallback('stub-tracker', function() {})
      
      assert.equal(tracker.callbacks.length, 1, "Tracker callback registered")
      
    });

  QUnit.module( "DeclarativeTracking state dependent", {
    before: function() {
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.unregisterAllTrackers();

      DeclarativeTracking.init();
      
      DeclarativeTracking.unregisterAllTriggers();
      DeclarativeTracking.unregisterAllTrackers();
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

      var stubTracker = function(element) {
            assert.ok(true, "stub-tracker fired") 
          },
          stubTrigger = function(element, tracker) { 
            tracker(element) 
            
          }

      $('#qunit-fixture').append('<a data-track="stub-trigger" data-track-service="stub-track-service"></a>')

      DeclarativeTracking.registerTrigger('stub-trigger', stubTrigger)
      DeclarativeTracking.registerTracker('stub-track-service', stubTracker)
      DeclarativeTracking.bindTrackers()

      assert.expect(1)

    })
    
    QUnit.test('DeclarativeTracking.bindTrackers multiple trackers', function(assert) {

      var stubTracker1 = function(element) {
            assert.ok(true, "stub-tracker1 fired") 
          },
          stubTracker2 = function(element) {
            assert.ok(true, "stub-tracker2 fired") 
          },
          stubTracker3 = function(element) {
            assert.ok(true, "stub-tracker3 fired") 
          },
          stubTrigger = function(element, tracker) { 
            tracker(element) 
            
          }

      $('#qunit-fixture').append('<a data-track="stub-trigger" data-track-service="stub-track-service1,stub-track-service2, stub-track-service3"></a>')

      DeclarativeTracking.registerTrigger('stub-trigger', stubTrigger)
      DeclarativeTracking.registerTracker('stub-track-service1', stubTracker1)
      DeclarativeTracking.registerTracker('stub-track-service2', stubTracker2)
      DeclarativeTracking.registerTracker('stub-track-service3', stubTracker3)
      DeclarativeTracking.bindTrackers()

      assert.expect(3)

    })
    
    QUnit.test('DeclarativeTracking.bindTrackers fire tracker callbacks', function(assert) {

      var stubTracker = function(element) {},
          stubTrigger = function(element, tracker) { tracker(element) }

      $('#qunit-fixture').append('<a data-track="stub-trigger" data-track-service="stub-track-service"></a>')

      stubTracker.testName = 'callbacks'
      DeclarativeTracking.registerTrigger('stub-trigger', stubTrigger)
      DeclarativeTracking.registerTracker('stub-track-service', stubTracker)
      DeclarativeTracking.registerTackerCallback('stub-track-service', function() {
        assert.ok(true, 'callback for stub-track-service fired')
      })
      DeclarativeTracking.bindTrackers()

      assert.expect(1)

    })

})