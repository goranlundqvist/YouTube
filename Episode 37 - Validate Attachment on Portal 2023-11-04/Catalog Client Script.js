function onSubmit() {
   
	  //Check and see if there is atleast one attachment, if none, attachment is undefined
    if (this.angular.element("#sc_cat_item").scope().attachments !== undefined) {
		
		  //Get the array of objects, each attachment has it's one object with data in the array 
		  var attachArr = this.angular.element("#sc_cat_item").scope().attachments;
		
		  //Loop through the array which have an object of each attachment with information and see if atleast one of them is a PDF-file
      //See readme for an example on how the array can look like
		  var attachPdfExist = (attachArr.map(function (attach){return attach.ext}).indexOf('pdf') >= 0 );
		
		  //If we find a PDF-file, let the user submit
		  if (attachArr.map(function (attach){return attach.ext}).indexOf('pdf') >= 0 ){
			  return true;
		  }
    }
	
	  //If there isn't any PDF attached, dont let them submit it.
		alert('You need to attach an PDF-file to be able to submit.')	
    return false;
}
