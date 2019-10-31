(function runAction(/*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {		
    
        current.name = "Youtube example at " + new GlideDateTime();
  
        //Get attachment from email-record
        var getAttachment = new GlideRecord('sys_attachment');
        if (getAttachment.get('table_sys_id', sys_email.sys_id)){
            var oldAttachmentSysID = getAttachment.getUniqueValue();
            var is = new GlideSysAttachment().getContentStream(oldAttachmentSysID);
            var reader = new GlideTextReader(is);
            var ln = ' ';
    
            var newStr = '';
            while((ln = reader.readLine()) != null) {
                if (ln.length > 1)
                    newStr += ln + "\n";
            }
    
            new GlideSysAttachment().write(current, 'Changed ' + getAttachment.getValue('file_name'),"text/csv",newStr);
    
            gs.eventQueue('youtube23.email.import', current, oldAttachmentSysID);
    
        }
        else {
            gs.error("YouTube email integration didn't have a email. record: " + sys_email.sys_id);
        }
    })(current, event, email, logger, classifier);