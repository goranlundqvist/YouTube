/**
 * An example of GlideAjax to get the support group of the CI and return it as a JSON with both the value and DisplayValue.
 *  Then it's uses that data to set the assignment group.
 *  onChange Client Script which runs on the Incident Table on the field Configuration Item (cmdb_ci). 

 */

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
 
     var ga = new GlideAjax('acmeClientScriptUtil');
     ga.addParam('sysparm_name', 'getSupportGrp');
     ga.addParam('syspam_ci_sysid', newValue);
     
     ga.getXML(assignGrp);
     
     function assignGrp(response){
         var answer = JSON.parse(response.responseXML.documentElement.getAttribute("answer"));
         if(answer){
             g_form.setValue('assignment_group', answer.value, answer.displayValue);
         }  
     }
 }