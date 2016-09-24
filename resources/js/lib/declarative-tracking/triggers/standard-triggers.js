define(['require', '../utils/jquery-helper'],
	   function (require, jqHelper) {

	return [
		{
	        name: 'click',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'click') }
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