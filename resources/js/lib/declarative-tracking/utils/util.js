define(function (require) {

	return {
        searchWithAlias: function(term, arr) {
            var obj;

            while(!obj) {
                obj = arr[term];
                if (typeof obj === 'string') {
                    term = obj;
                } else {
                    break;
                }
            }

            return obj;
        }
    }

})