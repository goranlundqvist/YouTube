/*This is a Script include to with the Client Callable field checked */

var acmeClientScriptUtil = Class.create();
acmeClientScriptUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {
/**
 * Gets the sys_id from the GlideAjax call and gets the support group.
 *
 * @param {string} sys_id - sys_id of the record that is sent through the GlideAjax call.
 * @return {JSON} a object containing both the value and displayValue of the support group. 
 */	
	getSupportGrp: function() {
	
		var ci = this.getParameter('syspam_ci_sysid');
		var returnGrp = {};
		var getCI = new GlideRecord('cmdb_ci');
		getCI.get(ci);
		
		if(getCI.support_group){
			returnGrp.value = getCI.getValue('support_group');
			returnGrp.displayValue = getCI.getDisplayValue('support_group');
			
			return JSON.stringify(returnGrp);
		}
		else
			return;
		
		
	},
/**
 * Checks if the incident has any active incident tasks.
 *
 * @param {string} sys_id - sys_id of the record that is sent through the GlideAjax call.
 * @return {Boolean} returns true if there is any open incident tasks 
 */		
	
	checkTask: function() {
		var incRec = this.getParameter('sysparm_inc_sysid');
		var checkTask = new GlideRecord('incident_task');
		checkTask.addActiveQuery();//Only want active incident tasks
		checkTask.addQuery('parent', incRec);//Only want tasks connected to current incident
		checkTask.setLimit(1);//Only need to find 1 to abort
		checkTask.query();
		if (checkTask.hasNext()){
			return true;
		}
		else
			return false;
	},

	type: 'acmeClientScriptUtil'
});