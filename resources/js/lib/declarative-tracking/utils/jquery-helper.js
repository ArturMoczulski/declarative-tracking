define(function() {

	return {
		bind: function(element, tracker, eventType) { element.bind(eventType, function() { tracker(element) }) }
    }
    
})
