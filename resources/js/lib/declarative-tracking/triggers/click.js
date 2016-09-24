define(function() {

	return {
        name: 'click',
        trigger: function(element, tracker) { element.bind('click', function() { tracker(element) }) }
    }
    
})
