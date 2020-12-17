function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading)
		return;

	var obj = (g_form.getValue('multi_test').length != 0) ? JSON.parse(g_form.getValue('multi_test')): [];

	obj.push({var_one: 'test1',
			  var_two: 'test2'});
	g_form.setValue('multi_test', JSON.stringify(obj));

}
