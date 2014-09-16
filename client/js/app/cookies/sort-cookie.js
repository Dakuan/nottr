
var Cookies = require('cookies-js'),
    def = 'updatedAt',
    // the cookie is namespaced and versioned so it's easy to ditch it later
    cookieName = 'adpSortCookie0';
module.exports = {
    set: function (value) {
    	Cookies.set(cookieName, value);
    },
    get: function () {    	
    	var c = Cookies.get(cookieName);
    	if(!c) {
    		c = def;
    		Cookies.set(cookieName, c);
    	}
    	return c;
    }
};
