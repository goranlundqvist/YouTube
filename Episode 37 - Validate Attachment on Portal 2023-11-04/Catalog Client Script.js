function onSubmit() {
   
	  //Check and see if there is atleast one attachment, if none, attachment is undefined
    if (this.angular.element("#sc_cat_item").scope().attachments !== undefined) {
		
		  //Get the array of objects, each attachment has it's one object with data in the array 
		  var attachArr = this.angular.element("#sc_cat_item").scope().attachments;
		
		  //If we find a PDF-file, let the user submit
		  if (attachArr.map(function (attach){return attach.ext}).indexOf('pdf') >= 0 ){
			  return true;
		  }
    }
	
	  //If there isn't any PDF attached, dont let them submit it.
		alert('You need to attach an PDF-file to be able to submit.')	
    return false;
}
