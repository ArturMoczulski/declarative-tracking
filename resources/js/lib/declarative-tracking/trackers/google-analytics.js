define(function() {

	var gaEventSpecHelper;
    
    gaEventSpecHelper = {
        buildEventSpec: function(category, action, label, value, fieldsObject) {
            return {
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value,
                fieldsObject: fieldsObject,
                transport: 'beacon'
            }
        },
        
        buildFromElement: function(element) {
            var category = $(element).attr('data-track-event-category'),
                action = $(element).attr('data-track-event-action'),
                  label = $(element).attr('data-track-event-label'),
                value = $(element).attr('data-track-event-value');
            
            if(!category) {
                throw new Error("GA event category not provided.");
            }
            
            if(!action) {
                throw new Error("GA event action not provided.");
            }
            
            return this.buildEventSpec(
                category,
                action,
                label,
                value
            );
        }
    }

	return {
        name: 'google-analytics',
        tracker: function(element) {

            var gaEventSpec = gaEventSpecHelper.buildFromElement(element);
            ga('send', 'event', gaEventSpec);

        }
    }
})
