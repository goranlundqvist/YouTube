var ritmSysID = '8be0dc7ddb8ae7002288dc50cf96199f';//The RITM that you have created
var getRITM = new GlideRecord('sc_req_item');
if (getRITM.get(ritmSysID)) {
    var myMultiSet = getRITM.variables.gorans_multi_cool_set;
}
gs.debug(myMultiSet);

//get all the values in a single column
//gs.debug(myMultiSet.who_to_curse);

// ADD a row
//  var newRow = myMultiSet.addRow();
//  newRow.setCellValue('who_to_curse', '5137153cc611227c000bbd1bd8cd2005');//Fred Luddy
//  newRow.which_curse = 1;
//  gs.debug(myMultiSet);


