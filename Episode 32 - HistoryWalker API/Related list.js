(function refineQuery(current, parent) {


    var hwProblem = new sn_hw.HistoryWalker('problem', parent.getUniqueValue());
    hwProblem.walkTo(0);
    
    while (hwProblem.walkForward()) {
    
        if (hwProblem.getWalkedRecord().state == '103'){//103 is root cause analys
            var stateUpdateNr = hwProblem.getUpdateNumber();
            break;
        }   
    }
    
    hwProblem.walkTo(stateUpdateNr);
    var oldProblem = hwProblem.getWalkedRecordCopy()// Use the copy if you are going to "walk" more, they create a "real" copy of the walkedrecord
    
    var getRelatedIncidentsGR = new GlideRecord('incident');
    getRelatedIncidentsGR.addQuery('problem_id', parent.getUniqueValue());
    getRelatedIncidentsGR.query();
    
    var IncidentsAfterAsses = [];
    
    while (getRelatedIncidentsGR.next()){
        var hwIncident = new sn_hw.HistoryWalker('incident', getRelatedIncidentsGR.getUniqueValue());
        hwIncident.walkTo(0);
        while (hwIncident.walkForward()) {
        
            if (hwIncident.getWalkedRecord().problem == parent.getUniqueValue() && oldProblem.sys_updated_on < hwIncident.getWalkedRecord().sys_updated_on){
                IncidentsAfterAsses.push(hwIncident.getWalkedRecordCopy().sys_id);
                break;
            }   
        }
    
    }
    current.addQuery('sys_id','IN', IncidentsAfterAsses)
})(current, parent);