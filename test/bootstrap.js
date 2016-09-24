(function() {

	var testModules = [
		'require',
		'declarative-tracking/declarative-tracking',
		'testsuite.js',
	]

	require.config({
		baseUrl: "../resources/js/lib"
	})

	require(testModules, function(require, declarativeTracking, testSuite) {

		QUnit.start()

	})

})()