var problemSysID = '9d3a266ac6112287004e37fb2ceb0133';
var hwProblem = new sn_hw.HistoryWalker('problem', problemSysID);
hwProblem.walkTo(0);

while (hwProblem.walkForward()) {

    if (hwProblem.getWalkedRecord().state == '103'){//103 is root cause analys
        var stateUpdateNr = hwProblem.getUpdateNumber();
        break;
    }   
}

hwProblem.walkTo(stateUpdateNr);
var oldProblem = hwProblem.getWalkedRecordCopy()// Use the copy if you are going to "walk" more, they create a "real" copy of the walkedrecord
gs.debug("problem record: updated " + oldProblem.sys_updated_on + " and state is " + oldProblem.state);

var getRelatedIncidentsGR = new GlideRecord('incident');
getRelatedIncidentsGR.addQuery('problem_id', problemSysID);
getRelatedIncidentsGR.query();

//var incidentSysIDArr = []; 
var IncidentsAfterAsses = [];

while (getRelatedIncidentsGR.next()){
    var hwIncident = new sn_hw.HistoryWalker('incident', getRelatedIncidentsGR.getUniqueValue());
    hwIncident.walkTo(0);
    while (hwIncident.walkForward()) {
    
        if (hwIncident.getWalkedRecord().problem = problemSysID && oldProblem.sys_updated_on < hwIncident.getWalkedRecord().sys_updated_on){
            IncidentsAfterAsses.push(hwIncident.getWalkedRecordCopy().number);
            break;
        }   
    }

}
gs.debug("All incidents added after the problem went into state Assess: " + IncidentsAfterAsses);


/*
**
**  The code below is just the test code to show how it works if you don't use getWalkedRecordCopy() instead of getWalkedRecord()
**
*/
var problemSysID = '9d3a266ac6112287004e37fb2ceb0133';
var hwProblem = new sn_hw.HistoryWalker('problem', problemSysID);
hwProblem.walkTo(0);

while (hwProblem.walkForward()) {
    if (hwProblem.getWalkedRecord().state == '103'){//103 is root cause analys
        var stateUpdateNr = hwProblem.getUpdateNumber();

    }   
}

hwProblem.walkTo(stateUpdateNr);
var oldProblemNoCopy = hwProblem.getWalkedRecord()// Use the copy if you are going to "walk" more, they create a "real" copy of the walkedrecord
gs.debug("problem record: updated " + oldProblemNoCopy.sys_updated_on + " and state is " + oldProblemNoCopy.state);

hwProblem.walkTo(17);
hwProblem.getWalkedRecord();
gs.debug("problem record: updated " + oldProblemNoCopy.sys_updated_on + " and state is " + oldProblemNoCopy.state);