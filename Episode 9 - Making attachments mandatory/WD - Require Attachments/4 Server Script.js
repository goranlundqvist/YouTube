(function() {  

	var catSysID = $sp.getParameter('sys_id');
	var getCatalogItem = new GlideRecord('sc_cat_item');
	getCatalogItem.get(catSysID);

	data.neededAttach = (getCatalogItem.getValue('u_att_need')) ? getCatalogItem.getValue('u_att_need') : 0;
})();