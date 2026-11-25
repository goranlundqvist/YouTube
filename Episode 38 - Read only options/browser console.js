/**
 * Purpose: Change the demo fields from the browser console, to show client-side bypass.
 * Release: Brazil
 * Requirements: Run in the browser console on the Ep 38 demo record form. Demo table only.
 */
function getGForm(root) {
  root = root || document;
  if (root.defaultView && root.defaultView.g_form) return root.defaultView.g_form;
  var all = root.querySelectorAll('*');
  for (var i = 0; i < all.length; i++) {
    var el = all[i];
    if (el.shadowRoot) {
      var found = getGForm(el.shadowRoot);
      if (found) return found;
    }
    if (el.tagName === 'IFRAME') {
      try {
        if (el.contentWindow && el.contentWindow.g_form) return el.contentWindow.g_form;
        if (el.contentDocument) {
          var inner = getGForm(el.contentDocument);
          if (inner) return inner;
        }
      } catch (e) {}
    }
  }
  return null;
}

var gf = getGForm();
var marker = 'console_' + new Date().getTime();
['ro_display', 'ro_client', 'ro_strict', 'ro_instance', 'ro_none'].forEach(function (f) {
  gf.setValue(f, marker);
});