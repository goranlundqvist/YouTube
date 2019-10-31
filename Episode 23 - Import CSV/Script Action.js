(function(){
	/*
	*Delete the old Attachment from the data source (event.parm1).
	*Load the csv-file into the import set table. 
	*Current is the data source that was created through an incoming email and the inbound action has created 
	*the event.
	*If the code below was in the inbound action it sometimes ran faster than the attachment file record was 
	*created. 
	*
	*Then it will run the transform.
	*/
	
    new GlideSysAttachment().deleteAttachment(event.parm1);
	var importSet = new global.IntegrationUtils().loadImportSet(current);
	new global.IntegrationUtils().transformImportSet(importSet.sys_id);
})();