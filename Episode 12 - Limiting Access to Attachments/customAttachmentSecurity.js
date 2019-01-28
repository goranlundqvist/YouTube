var customAttachmentSecurity = Class.create();
customAttachmentSecurity.prototype =  Object.extendsObject(AttachmentSecurity, {
  
canRead: function(current) {
		if (current.table_name.nil())
			return true;
		
		// If the attachment is from live feed,
		// grant it the read access
		if (current.table_name.indexOf("live_profile") > -1 || current.table_name.indexOf("live_group_profile") > -1)
			return true;

		if (current.table_name == 'incident' && !gs.hasRole('itil') && this._checkCreatedHasRole(current.getValue('sys_created_by')) && gs.getSession().isInteractive()) {//this._checkCreatedHasRole(current.getValue('sys_created_by'))
			return false;			
		}
	
		// Remove Prefix
		var tableName = current.table_name + '';
		if (tableName.startsWith("invisible."))
			tableName = tableName.substring(10);
		else if (tableName.startsWith("ZZ_YY"))
			tableName = tableName.substring(5);

		var parentRecord = new GlideRecord(tableName);

		parentRecord.setWorkflow(false);
		if (!parentRecord.isValid() || !parentRecord.get(current.table_sys_id)) {
			if (current.sys_created_by.equals(gs.getUserName()))
				return true;
			return false;
		}

		return parentRecord.canRead();	
	},
	
 _checkCreatedHasRole: function(userID){
	 
	 var getUser = new GlideRecord('sys_user');
	 if(getUser.get('user_name', userID)){
		var trueIfHasRole = new GlideRecord('sys_user_has_role');
		    trueIfHasRole.addQuery('user', getUser.getUniqueValue());
		    trueIfHasRole.setLimit(1);
		    trueIfHasRole.query();
		 
		return (trueIfHasRole.hasNext()) ? true : false;
	 }
 },	
	
    type: 'customAttachmentSecurity'
});