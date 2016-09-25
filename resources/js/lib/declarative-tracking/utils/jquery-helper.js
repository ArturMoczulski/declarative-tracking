define(function() {
    
    var boundEventHandlers = []

	return {
		bind: function(element, tracker, eventType) { 
		    var eventHandler = function() { tracker(element) }
		    boundEventHandlers.push({
		        element: element,
		        eventType: eventType,
		        eventHandler: eventHandler
		    })
		    
            element.bind(eventType, eventHandler)
		},
		unbindAll: function() {
		    $.each(boundEventHandlers, function(i, bindingSpec) {
		        bindingSpec.element.unbind(bindingSpec.eventType, bindingSpec.eventHandler)
		    })
		}
    }
    
})
