(function() {

	var testModules = [
		'require',
		'jquery',
		'declarative-tracking/declarative-tracking',
		'testsuite.js'
	]

	require.config({
		baseUrl: "../resources/js/lib",
		paths: {
			'declarative-tracking-tests': '../../../test/declarative-tracking-tests',
			'jquery': '../../../node_modules/jquery/dist/jquery.min'
		}
	})

	require(testModules, function(require, declarativeTracking, testSuite) {

		QUnit.start()

	})

})()