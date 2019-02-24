var transformMapSysIDs = '3a4a3c714fb7a300d99a121f9310c70f';//If you have more, separate them with , like 3a4a3c714fb7a300d99a121f9310c70f,3a4a3c714fb7a300d99a121f9310c703

current.name = gs.getUserName() + " UserImport at: " + new GlideDateTime();
current.import_set_table_name = 'u_import_record_producer';//Name of your import table
current.file_retrieval_method = "Attachment";
current.type = "File";
current.format = "Excel";
current.header_row = 1;
current.sheet_number = 1;
current.insert();//Need this since we want to load and transform directly

//Now it time to load the excel file into the import table

var loader = new GlideImportSetLoader();
var importSetRec = loader.getImportSetGr(current);
var ranload = loader.loadImportSetTable(importSetRec, current);
importSetRec.state = "loaded";
importSetRec.update();

//Time to run the the transform with the transform map
var transformWorker = new GlideImportSetTransformerWorker(importSetRec.sys_id, transformMapSysIDs);
transformWorker.setBackground(true);
transformWorker.start();

//To avoid to create another data source we abort the RP insert.
current.setAbortAction(true);
