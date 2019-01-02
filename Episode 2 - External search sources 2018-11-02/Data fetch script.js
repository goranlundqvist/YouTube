(function(query) {
    var results = [];
    /* Calculate your results here. */
    var url = "https://api.github.com/search/code?q=" + encodeURI(query) + "+in:file+repo:chucktomasi/sn-community-live-stream";
	
    var ws = new GlideHTTPRequest(url);
	/* 
	** Dont' forget to change the sys_id on line 10 to your own basic auth config file.
	** It's in the table: sys_auth_profile_basic
	*/
    ws.setAuthenticationProfile("basic", "db1e1f240f2523404cf365ba32050ea6");
	
    var jsonOutput = ws.get();
    if (jsonOutput) {
        var response = new JSON().decode(jsonOutput.getBody());
        results = response.items;
        results.forEach(function(result) {
            result.url = result.svn_url;
            result.target = "_blank";
            result.primary = result.full_name;
        });
    }

    return results;
})(query);