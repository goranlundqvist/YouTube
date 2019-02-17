(function() {
try {

var incSys = '757db0eb4f57a300d99a121f9310c73c';
var myTaskRecord = new GlideRecord('incident');
myTaskRecord.get(incSys);

var inputs = {};
    inputs['ah_task'] = myTaskRecord; // GlideRecord of table: task 
    inputs['ah_comment'] ='this is my comment' ; // String 
    sn_fd.FlowAPI.startAction('sn_itsm_spoke.add_comment', inputs);				
} catch (ex) {
    var message = ex.getMessage();
    gs.error(message);
}
})();