var ImpersonationHelper = Class.create();
ImpersonationHelper.prototype = {
    initialize: function() {
    },
	
	//returns impersonating username
	getImpersonatingUserName: function() {
		return gs.getImpersonatingUserName();
	},
	
	//returns current username
	getCurrentUserName: function() {
		return gs.getUser().getFullName();
	},
	
	//checks if the current session is an impersonating one
	isImpersonating: function() {
		var impUser = new GlideImpersonate();
		return (impUser.isImpersonating() && this.getImpersonatingUserName() && (gs.getUserName() != this.getImpersonatingUserName()));
	},
	
	//returns impersonating user GlideRecord
	getImpersonatingUser: function() {
		if(this.isImpersonating()) {
			var userGr = new GlideRecord('sys_user');
			var impUser = this.getImpersonatingUserName();
			if(userGr.get('user_name', impUser)) {
				return userGr;
			}
			return null;
		}
		return null;
	},
	
	//returns impersonating data
	getImpersonationData: function() {
        var response = {};
		response.isImpersonating = this.isImpersonating();
		response.currentUser = this.getCurrentUserName();
		if(this.isImpersonating()) {
			var userGr = this.getImpersonatingUser();
			response.impersonatingUserName =  userGr ? (userGr.getValue('name') ? userGr.getValue('name') : userGr.getValue('user_name')) : '';
		}
		
		return response;
    },
	
	//end the impersonation and returns true
	endImpersonation: function() {
		if(this.isImpersonating()) {
			session.onlineUnimpersonate();
			return true;
		}
		return false;
	},

    type: 'ImpersonationHelper'
};