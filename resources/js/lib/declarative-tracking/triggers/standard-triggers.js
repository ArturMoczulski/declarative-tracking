define(['require', '../utils/jquery-helper'],
	   function (require, jqHelper) {

	return [
		{
	        name: 'click',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'click') }
    	},
    	{
	        name: 'change',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'change') }
    	},
    	{
	        name: 'mouseenter',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'mouseenter') }
    	},
    	{
	        name: 'select',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'select') }
    	},
    	{
	        name: 'submit',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'submit') }
    	},
    	{
    		name: 'jquery',
	        trigger: function(element, tracker) { 
	        	var jqEventType = element.attr('data-track-jq-event-type')
	        	jqHelper.bind(element, tracker, jqEventType)
	        }	
    	}
	]

})