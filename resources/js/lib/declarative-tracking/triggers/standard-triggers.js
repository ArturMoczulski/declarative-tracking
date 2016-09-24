define(['require', '../utils/jquery-helper'],
	   function (require, jqHelper) {

	return [
		{
	        name: 'click',
	        trigger: function(element, tracker) { jqHelper.bind(element, tracker, 'click') }
    	}
	]

})