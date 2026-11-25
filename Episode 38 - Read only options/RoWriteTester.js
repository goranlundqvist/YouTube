/**
 * Purpose: Try to write each demo field and report which writes worked.
 * Release: Brazil (the Read only option needs Australia or later)
 * Requirements: Scoped app, demo table and fields from step 1, run as admin.
 * 
 */
var RoWriteTester = Class.create();
RoWriteTester.prototype = {
    initialize: function() {
        this.TABLE = 'YOUR_TABLE';
        this.FIELDS = ['ro_display', 'ro_client', 'ro_strict', 'ro_instance', 'ro_none'];
    },

    findDemoRecord: function() {
        var gr = new GlideRecord(this.TABLE);
        gr.addQuery('name', 'demo');
        gr.setLimit(1);
        gr.query();
        return gr.next() ? gr.getUniqueValue() : '';
    },

    tryWrite: function(sysId, secure) {
        var label = secure ? 'GlideRecordSecure' : 'GlideRecord';
        var marker = (secure ? 'S_' : 'P_') + new GlideDateTime().getNumericValue();
        var report = [];
        for (var i = 0; i < this.FIELDS.length; i++) {
            var field = this.FIELDS[i];
            var gr = secure ? new GlideRecordSecure(this.TABLE) : new GlideRecord(this.TABLE);
            if (!gr.get(sysId)) {
                report.push(field + ': record not found');
                continue;
            }
            gr.setValue(field, marker);
            var note;
            try {
                note = 'update() returned ' + gr.update();
            } catch (e) {
                note = 'error: ' + e.message;
            }
            report.push(field + ': ' + this._readBack(sysId, field, marker) + ' (' + note + ')');
        }
        gs.info(label + ' test\n' + report.join('\n'));
        return report;
    },

/**
 * Purpose: Read the value fresh from the database and compare it to the marker.
 * Release: Brazil
 * Requirements: Inside RoWriteTester.
 *
 */
    _readBack: function(sysId, field, marker) {
        var check = new GlideRecord(this.TABLE);
        check.get(sysId);
        var stored = check.getValue(field);
        return stored == marker ? 'CHANGED' : 'NOT CHANGED (stored: ' + stored + ')';
    },

/**
 * Purpose: Test one field only, so results do not depend on loop order.
 * Release: Brazil
 * Requirements: Add inside RoWriteTester, same TABLE setting.
 */
    tryWriteField: function(sysId, secure, field) {
        var label = secure ? 'GlideRecordSecure' : 'GlideRecord';
        var marker = (secure ? 'S_' : 'P_') + new GlideDateTime().getNumericValue();
        var gr = secure ? new GlideRecordSecure(this.TABLE) : new GlideRecord(this.TABLE);
        if (!gr.get(sysId)) {
            return field + ': record not found';
        }
        gr.setValue(field, marker);
        var note;
        try {
            note = 'update() returned ' + gr.update();
        } catch (e) {
            note = 'error: ' + e.message;
        }
        var line = label + ' ' + field + ': ' + this._readBack(sysId, field, marker) + ' (' + note + ')';
        gs.info(line);
        return line;
    },

    type: 'RoWriteTester'
};