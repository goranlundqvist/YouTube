var record = new GlideRecord("incident");
gs.debug("record Active is: " + record.active);
gs.debug("record Number is: " + record.number);
gs.debug("record Opened at: " + record.opened_at);
gs.debug("record Sys ID is: " + record.sys_id);

gs.debug(record.isNewRecord());

var recordInit = new GlideRecord("incident");
recordInit.initialize();
gs.debug("recordInit Active is: " + recordInit.active);
gs.debug("recordInit Number is: " + recordInit.number);
gs.debug("recordInit Opened at: " + recordInit.opened_at);
gs.debug("recordInit Sys ID is: " + recordInit.sys_id);
gs.debug("recordInit State is: " + recordInit.state);

gs.debug(recordInit.isNewRecord());

var recordNew = new GlideRecord("incident");
recordNew.newRecord();
gs.debug("recordNew Active is: " + recordNew.active);
gs.debug("recordNew Number is: " + recordNew.number);
gs.debug("recordNew Opened at: " + recordNew.opened_at);
gs.debug("recordNew Sys ID is: " + recordNew.sys_id);
gs.debug("recordNew State is: " + recordNew.state);

gs.debug(recordNew.isNewRecord());