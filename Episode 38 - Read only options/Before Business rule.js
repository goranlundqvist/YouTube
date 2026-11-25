/**
 * Purpose: Test if a before business rule can change read-only fields.
 * Release: Brazil
 * Requirements: Before update rule, condition: ro_none == run_br
 */
(function executeRule(current, previous) {
    var marker = 'br_' + new GlideDateTime().getNumericValue();
    current.setValue('ro_display', marker);
    current.setValue('ro_client', marker);
    current.setValue('ro_strict', marker);
    current.setValue('ro_instance', marker);
})(current, previous);