(function execute(inputs, outputs) {  
  try {
      //Get all input variables
    var textSearch = inputs.textSearch;
    var pattern = inputs.pattern;
    var globalSearch = inputs.globalSearch;
  
    //Decide if we want to use the global flag or not  
      var regEx = (globalSearch) ?
          new RegExp(pattern, "jg") :
        new RegExp(pattern, "j");
  
      var allMatches = textSearch.match(regEx);
    
    outputs.is_match = regEx.test(textSearch);//Returns true if we find atleast one match
    outputs.matches_found = allMatches; //Returns all matching data in an array
      outputs.first_match = allMatches[0];
  }
  catch(e) {
    gs.logError('Error in flow Action "Check Regex Matches": ' + e, "Flow");
  }
  
  })(inputs, outputs);