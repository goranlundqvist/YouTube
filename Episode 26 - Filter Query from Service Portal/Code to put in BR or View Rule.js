//Remember this only works in scoped applications. It doesn't work in GLOBAL scope.

	//Using this to see if the form is showing through a widget or the normal interface.
	var gURI = new GlideURI();
    var fileString = gURI.getFileFromPath();

    /* Now look at the fileString variable to do the logic. If it comes from the portal it looks like
    // api/now/sp/widget/icp-form
    //
    // If it comes from the Backend it's more like just the table name: sn_customerservice_case
    */