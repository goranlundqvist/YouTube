var IntegrationUtils = Class.create();
IntegrationUtils.prototype = {
	initialize: function() {
	},
	/**SNDOC
@name createImportSet
@public
@description Creates an import set and giving the option to make it async
@param {string} [tableName] - The import set table which the import set should be related to
@param {string} [shortDesc] - value to insert into the short description field of the import set
@param {boolean} [aSync] - value to decide of the import set should be async or sync.
@returns {string} the sys_id of the import set
*/
	createImportSet: function(tableName, shortDesc, aSync){

		var createSet = new GlideRecord('sys_import_set');
		createSet.initialize();
		createSet.mode = (aSync == true) ? 'asynchronous': 'synchronous';
		createSet.setValue('table_name', tableName);
		createSet.setValue('short_description', shortDesc);
		createSet.setValue('state', 'loading');
		createSet.insert();

		return createSet.getUniqueValue();
	},
	/**SNDOC
@name setImportSetState
@public
@description Changes the state of an import set
@param {string} [importSetId] - SysID of the import set that we want to change state on
@param {string} [state] - which state we want to change to
@param {array} [param] - an array of parameters that should be used
@returns {} - Doesn't return anything
*/

	setImportSetState : function(importSetId, state){
		if(!importSetId)
			return;
		var importSetGR = new GlideRecord("sys_import_set");
		importSetGR.get(importSetId);
		importSetGR.setValue("state", state);
		importSetGR.update();
	},

	/**SNDOC
@name transformImportSet
@public
@description runs the transform of a import set
@param {string} [importSetId] - SysID of the import set that we want to transform
@returns {} - Doesn't return anything
*/	


	transformImportSet : function(importSetId){

		if(!importSetId)
			return;
		var importSetGr = new GlideRecord("sys_import_set");
		importSetGr.get(importSetId);

		var importSetRun = new GlideImportSetRun(importSetId);
		var importLog = new GlideImportLog(importSetRun, "YouTube Example Integrations Transform");
		var ist = new GlideImportSetTransformer();
		ist.setLogger(importLog);
		ist.setImportSetRun(importSetRun);
		ist.setImportSetID(importSetId);
		ist.setSyncImport(true);
		ist.transformAllMaps(importSetGr);
	},



	/**SNDOC
@name loadImportSet
@public
@description Load the data from a datasource into a import set table. Has to be in the global application since the GlideImportSetLoader doesn't worked in a scoped app.
@param {object} [dataSource] - the datasource that has the attachment that shall be loaded

@returns {object} - ImportSet record 
*/

	loadImportSet: function(dataSource) {


		// Process data source file

		var loader = new GlideImportSetLoader();
		var importSetRec = loader.getImportSetGr(dataSource);
		var ranload = loader.loadImportSetTable(importSetRec, dataSource);

		importSetRec.state = "loaded";
		importSetRec.update();

		return importSetRec;
	},
	/**SNDOC
@name convertDate
@public
@description converts date from 23-DEC-2019 to 23-12-2019

@param {string} [dateValue] - the date that we want to convert

@returns {string} - the date in correct format 
*/

	convertDate: function(dateValue) {

		var result = '';

		switch (dateValue.substring(3,6)){
			case 'JAN':
				result = dateValue.replace('JAN','01');
				break;
			case 'FEB':
				result = dateValue.replace('FEB','02');
				break;
			case 'MAR':
				result = dateValue.replace('MAR','03');
				break;
			case 'APR':
				result = dateValue.replace('APR','04');
				break;
			case 'MAY':
				result = dateValue.replace('MAY','05');
				break;
			case 'JUN':
				result = dateValue.replace('JUN','06');
				break;
			case 'JUL':
				result = dateValue.replace('JUL','07');
				break;
			case 'AUG':
				result = dateValue.replace('AUG','08');
				break;
			case 'SEP':
				result = dateValue.replace('SEP','09');
				break;
			case 'OCT':
				result = dateValue.replace('OCT','10');
				break;
			case 'NOV':
				result = dateValue.replace('NOV','11');
				break;
			case 'DEC':
				result = dateValue.replace('DEC','12');
				break;
			default: 
				gs.error("Error in transform map");
		}

		return result;
	},

	/**SNDOC
@name checkUserRole
@public
@description checks if a users has a specific role

@param {string} [userSysID] - sys_id of the user
@param {string} [roleName] - Name if the role that we want to check
@returns {boolean} - returns true if the user has the role, otherwise false
*/	
	checkUserRole: function (userSysID, roleName){

		try {
			var getRole = new GlideRecord('sys_user_role');
			if (getRole.get('name', roleName)){

				var doUserHaveRole = new GlideRecord('sys_user_has_role');
				doUserHaveRole.addQuery('role', getRole.getUniqueValue());
				doUserHaveRole.addQuery('user', userSysID);
				doUserHaveRole.addQuery('state','active');
				doUserHaveRole.setLimit(1);
				doUserHaveRole.query();

				return (doUserHaveRole.next()) ? true : false;
			}
			else {
				throw "No role with that name exist";

			}
		} catch (error) {
			gs.error("Function checkUserRole: " + error + ". with value " + roleName);
		}
	},	

	/**SNDOC
@name removeRoleFromUser
@public
@description Removes the role from the user 

@param {string} [userSysID] - sys_id of the user
@param {string} [roleName] - Name if the role that we want to remove
@returns {} - doesn't return anything
*/	
	removeRoleFromUser: function (userSysID, roleName){

		try {
			var getRole = new GlideRecord('sys_user_role');
			if (getRole.get('name', roleName)){

				var removeRole = new GlideRecord('sys_user_has_role');
				removeRole.addQuery('role', getRole.getUniqueValue());
				removeRole.addQuery('user', userSysID);
				removeRole.addQuery('state','active');
				removeRole.setLimit(1);
				removeRole.query();

				if (removeRole.next()){
					removeRole.deleteRecord();
					}
			}
			else {
				throw "No role with that name exist";

			}
		} catch (error) {
			gs.error("Function removeUserRole: " + error + ". with value " + roleName);
		}
	},

	/**SNDOC
@name addRoleToUser
@public
@description Add the role to the user 

@param {string} [userSysID] - sys_id of the user
@param {string} [roleName] - Name if the role that we want to add
@returns {} - doesn't return anything
*/	
	addRoleToUser: function (userSysID, roleName){

		try {
			var getRole = new GlideRecord('sys_user_role');
			if (getRole.get('name', roleName)){

				var addRole = new GlideRecord('sys_user_has_role');
				addRole.initialize();
				addRole.role = getRole.getUniqueValue();
				addRole.user = userSysID;
				addRole.insert();
			}
			else {
				throw "No role with that name exist";

			}
		} catch (error) {
			gs.error("Function addRoleToUser: " + error + ". with value " + roleName);
		}
	},
	
	type: 'IntegrationUtils'
};