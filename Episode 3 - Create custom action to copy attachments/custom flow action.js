/*
**To this you need to define 4 input variables and name them with the same names I using below (sTable, sSysID, tTable, tSysID).
**Watch the video for more information.
*/


(function execute(inputs, outputs) {

    var copyAtt = new GlideSysAttachment();
      copyAtt.copy(inputs.sTable,inputs.sSysID,inputs.tTable,inputs.tSysID);
      
      
    })(inputs, outputs);