/**
 * Purpose: Run the server-side write tests.
 * Release: Brazil
 * Requirements: RoWriteTester Script Include, run in scope x_2323551_ep_38_0.
 */
var tester = new YOUR_SCOPE.RoWriteTester();
var id = tester.findDemoRecord();
tester.tryWrite(id, false); // plain GlideRecord
tester.tryWrite(id, true);  // GlideRecordSecure