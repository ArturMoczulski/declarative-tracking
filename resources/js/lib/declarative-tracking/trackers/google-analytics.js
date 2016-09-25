define(['./../utils/google-analytics-helper'],function(gaHelper) {

	return {
        name: 'google-analytics',
        tracker: function(element) {

            var gaEventSpec = gaHelper.buildFromElement(element);
            ga('send', 'event', gaEventSpec);
            console.debug('Event data sent to GA')

        }
    }
})
