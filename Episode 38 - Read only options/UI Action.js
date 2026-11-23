/**
 * Purpose: Try to change every demo field from the client.
 * Release: Brazil
 * Requirements: UI Action on the demo table, Client checked.
 */
function testClientWrite() {
    var fields = ['ro_display', 'ro_client', 'ro_strict', 'ro_instance', 'ro_none'];
    var marker = 'client_' + new Date().getTime();
    for (var i = 0; i < fields.length; i++) {
        g_form.setValue(fields[i], marker);
    }
}