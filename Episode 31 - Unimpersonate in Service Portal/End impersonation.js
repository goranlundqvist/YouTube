/*
Totally custom Widget

*/

//START OF BODY HTML TEMPLATE
<div ng-if="c.data.impersonationData.isImpersonating" class="banner">
  <div class="header">
    <div class="desc">
      {{::c.impersonation_header}}
      <span class="underline cursor-pointer" ng-click="c.endImpersonation()">{{::c.impersonation_redirect_header}}</span>
    </div>
  </div>
</div>
//END OF BODY HTML TEMPLATE

//START OF CSS 
.banner {
    width: 100%;
    height: auto;
    min-height: 40px;
    background-color: #81B5A1; 
    color: #fff;
    .header {
      display: flex;
      justify-content: center;
      .desc {
        padding: 10px;
      }
    }
  }
//END OF CSS

//START OF CLIENT CONTROLLER 
api.controller=function($window, $location) {
    /* widget controller */
    var c = this;
    c.impersonation_header = "You are currently impersonating " + c.data.impersonationData.currentUser + ".";
      
    c.impersonation_redirect_header = 'Click here to return to your account';
      
    c.endImpersonation = function() {
        c.server.get({'action': 'END_IMPERSONATION'})
            .then(function(response){
            var redirectUrl = $location.protocol() + "://" + $location.host();
            $window.location.href = redirectUrl;
        });
    }
  
  };
//END OF CLIENT CONTROLLER

//START OF SERVER SCRIPT 
(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
      var impersonationHelper = new global.ImpersonationHelper();
      data.impersonationData = impersonationHelper.getImpersonationData();
      
      if(input && input.action == 'END_IMPERSONATION') {
          return impersonationHelper.endImpersonation();
      }
      
  })();
//END OF SERVER SCRIPT

//START OF LINK FUNCTION

//END OF LINK FUNCTION

