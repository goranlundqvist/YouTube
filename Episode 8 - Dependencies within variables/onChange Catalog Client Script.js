function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
       g_form.clearOptions('subcategory_with_select_box');
        return;
    }
     g_form.clearOptions('subcategory_with_select_box');
     
     if (newValue == 1){
         g_form.addOption('subcategory_with_select_box', '11', 'SubCategory A A', 0);
         g_form.addOption('subcategory_with_select_box', '12', 'SubCategory A B', 1);
     }
     else if (newValue == 2){
         g_form.addOption('subcategory_with_select_box', '21', 'SubCategory B A', 0);
     }
     else if (newValue == 3){
         g_form.addOption('subcategory_with_select_box', '31', 'SubCategory C A', 0);
     }
     
     g_form.addOption('subcategory_with_select_box', '01', 'SubCategory All');
     
 }