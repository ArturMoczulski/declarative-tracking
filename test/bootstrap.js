(function() {

	var testModules = [
		'require',
		'declarative-tracking/declarative-tracking',
		'testsuite.js'
	]

	require.config({
		baseUrl: "../resources/js/lib",
		paths: {
			'declarative-tracking-tests': '../../../test/declarative-tracking-tests'
		}
	})

	require(testModules, function(require, declarativeTracking, testSuite) {

		QUnit.start()

	})

})()