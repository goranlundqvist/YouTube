/*
This is bascially just the stock header with 2 lines of coded added.
First line of the HTML TEMPLATE and first code line in SERVER SCRIPT

*/

//START OF BODY HTML TEMPLATE
<sp-widget widget="data.bannerWidget"></sp-widget>
<div>
  <nav class="navbar-inverse" ng-class="::{'navbar':!isViewNative, 'is-native': isViewNative}"
       role="navigation">
    <div ng-show="::!isViewNative" class="navbar-header">
<a class="navbar-brand" ng-if="::!portal.logo" href="?id={{::portal.homepage_dv}}"><span ng-bind="portal.title"></span></a>
      <a class="navbar-brand navbar-brand-logo" ng-if="::portal.logo" ng-href="?id={{::portal.homepage_dv}}" ng-click="collapse()" aria-label="${Go to homepage}">
        <img ng-src="{{::portal.logo}}" title="ServiceNow" role="presentation" alt="${Portal Logo}" />
      </a>

      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sp-nav-bar">
        <span class="sr-only">${Toggle navigation}</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <div sp-navbar-toggle="" class="collapse navbar-right" id="sp-nav-bar">
      <!-- Include The Menu -->
      <sp-widget widget="::data.menu"></sp-widget>
      <ul ng-if="(!user.logged_in && page.id != portal.login_page_dv && !data.hasLogin)" class="nav navbar-nav" role="presentation">
        <li role="presentation"><a href ng-click="::openLogin()">${Login}</a></li>
      </ul>
      <ul ng-if="user.logged_in" class="nav navbar-nav" role="menubar">
        <!-- chat, avatar, and logout -->
        <li ng-if="::(data.connect_support_queue_id && !isAgentChatConfigured)" role="presentation"><a href ng-click="openPopUp()" role="menuitem">${Live Chat}</a></li>
        <li ng-if="showAvatar" class="hidden-xs dropdown" role="presentation">
          <a href class="toggle-dropdown" data-toggle="dropdown" aria-expanded="false" title="{{::data.profileBtnMsg}}" aria-label="{{::data.profileBtnMsg}}: {{::user.name}}" id="profile-dropdown"  role="menuitem" aria-haspopup="true">
            <span class="navbar-avatar" aria-hidden="true"><sn-avatar class="avatar-small-medium" primary="avatarProfile" /></span>
            <span class="visible-lg-inline">{{::user.name}}</span>
          </a>
          <ul class="dropdown-menu" role="menu" aria-label="{{::data.profileBtnMsg}}">
            <li role="presentation"><a tabindex="-1" ng-href="?id=user_profile&sys_id={{::user.sys_id}}" role="menuitem">${Profile}</a></li>
            <li ng-if="::!(isViewNative || isViewNativeTablet)" role="presentation"><a tabindex="-1" href="{{::portal.logoutUrl}}" role="menuitem">${Logout}</a></li>
          </ul>
        </li>
        <li ng-if="showXSAvatar" class="visible-xs-block" role="presentation"><a role="menuitem" ng-href="?id=user_profile&sys_id={{::user.sys_id}}" ng-click="collapse()">
          <span class="navbar-avatar"><sn-avatar class="avatar-small-medium" primary="avatarProfile" /></span>{{::user.name}}</a>
        </li>
        <li ng-if="::!(isViewNative || isViewNativeTablet)" class="visible-xs-block" role="presentation"><a role="menuitem" ng-href="{{::portal.logoutUrl}}" ng-click="collapse()">${Logout}</a></li>
      </ul>
    </div>
  </nav>
</div>
//END OF BODY HTML TEMPLATE

//START OF CLIENT CONTROLLER 
function ($rootScope, $scope, snRecordWatcher, spUtil, $location, $uibModal, cabrillo, $timeout, $window) {

	$scope.collapse = function() {
		$rootScope.$emit('sp-navbar-collapse');
	}

	$scope.avatarProfile = {
		userID: $scope.user.sys_id,
		name: $scope.user.name,
		initials: $window.NOW.user_initials
	};

	if ($window.NOW.user_avatar) {
		$scope.avatarProfile.userImage = $window.NOW.user_avatar;
	}

	if (cabrillo.isNative()) {
		if ($window.innerWidth < 767) {
			$scope.isViewNative = true;
		} else {
			$scope.isViewNativeTablet = true;
		}
	}


	$scope.openPopUp = function() {
		var url = "$chat_support.do?queueID=" + $scope.data.connect_support_queue_id;
		var popup = window.open (url, "popup", "width=900, height=600");
	};

	$scope.openLogin = function () {
		$scope.modalInstance = $uibModal.open({
			templateUrl: 'modalLogin',
			scope: $scope
		});
	};

	var xsScreenSize = isXSScreenSize();
	$scope.showXSAvatar = isXSScreenSize();
	$scope.showAvatar = !isXSScreenSize();

	$scope.isAgentChatConfigured = g_has_agent_chat_config;

	angular.element($window).on('resize', function () {
		if(xsScreenSize !== isXSScreenSize() && (!$scope.showXSAvatar || !$scope.showAvatar)){
			$scope.showXSAvatar = true;
			$scope.showAvatar = true;
		}
	});


	function isXSScreenSize() {
		return $window.matchMedia('(max-width: 767px)').matches;
	}

	$rootScope.$on('sp.avatar_changed', function(evt, obj) {
		$scope.userID = "";
		$scope.newAvatarId = obj.newAvatarId;
		$timeout(function(){
			$scope.userID = $scope.user.sys_id;
			$("#profile-dropdown .sub-avatar").css("background-image", 'url("' + $scope.newAvatarId + '.iix?t=small")');
		});
	});

	$scope.isHomepage = function() {
		if (!$scope.page.id)
			return true;

		if ($scope.page.id == $scope.portal.homepage_dv)
			return true;

		return false;
	};
}
		
//END OF CLIENT CONTROLLER

//START OF CSS 
.navbar {
    transition: 250ms opacity ease-in-out;
    -webkit-transition: 250ms opacity ease-in-out;
    border: 0;
    border-bottom: 4px solid $sp-navbar-divider-color;
  }
  
  .navbar-fade {
    opacity: 0.4;
  }
  
  .navbar-inverse .navbar-toggle {
    border-color: rgba(255, 255, 255, 0.25);
  }
  
  header[role="banner"],
  .nav > li > a {
    max-height: 60px;
  }
  
  @media screen and (max-width: 768px){
    .nav > li > a {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }
  
  .navbar-brand {
    max-height: 60px;
    padding: 0;
    padding-bottom: 0.5rem;
  }
  
  .navbar-brand img, .navbar-brand span {
    margin-left: $sp-logo-margin-x;
    margin-right: $sp-logo-margin-x;
    margin-top: $sp-logo-margin-y;
    margin-bottom: $sp-logo-margin-y;
    display: block;
    max-height: $sp-logo-max-height;
    max-width: $sp-logo-max-width;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .breadcrumb-container {
    background-color: $panel-bg;
  }
  
  /* for mobile app */
  .navbar-inverse.is-native {
    background-color: #405060;
  }
  
  nav {
    margin-bottom: 0px;
    border-radius: 0px;
  
   .toggle-dropdown {
      height: 60px;
    }
  
  }
  
  .navbar-right {
    padding-right: 0px;
    padding-left: 7px;
  }
  
  .navbar-nav {
  margin: 0px;
  }
  
  // PRB711244: Dropdown menu is scrollable when too many items
  .scrollable-dropdown {
    max-height: 80vh;
    overflow: auto;
    height: auto;
  }
  
  .is-native {
   .scrollable-dropdown {
    max-height: 100vh;
    overflow: scroll;
    height: auto;
      }
  }
  
  
  /* PRB923910: Fix for Service Portal - Header Poorly Aligned in Safari */
  @media screen and (min-width: 768px) {
    .navbar-right {
      display: flex !important;
    }
  }
//END OF CSS

//START OF SERVER SCRIPT 
// Defines the support queue ID that will be linked to by the Live Chat link in header
data.bannerWidget = $sp.getWidget('end_impersonation');
data.connect_support_queue_id = $sp.getValue('sp_chat_queue');
data.login_page = $sp.getValue('login_page');
data.profileBtnMsg = gs.getMessage("User options");
var menu = $sp.getValue("sp_rectangle_menu");
data.menu = $sp.getWidgetFromInstance(menu);
if (data.menu && data.menu.data) {
	data.menu.data.replace = true;
	// Hide login if menu already has link to login
	data.hasLogin = false;
	if (data.menu.data.menu.items) {
		for(var i in data.menu.data.menu.items) {
			var item = data.menu.data.menu.items[i];
			if (item.type == 'page' && item.sp_page == data.login_page)
				data.hasLogin = true;
		}
	}
}

data.loginWidget = $sp.getWidgetFromInstance('login-modal');
//END OF SERVER SCRIPT

//START OF LINK FUNCTION
function(scope, element) {
	$(document).keyup(function(event) {
		if (event.which == 9 || event.which == 37 || event.which == 39) { //tab key handler + arrow keys
			if ($(event.target).parents(".dropdown-menu").length == 0) { //if we are NOT inside a dropdown...
				//close the dropdowns
				$(".dropdown").removeClass("open");
				$("[data-toggle='dropdown']").attr("aria-expanded", "false");
			}
		}
	});

	$(element).on('click.nav','.navbar-collapse.in',function(e) {
		var target = $(e.target);
		if (target.is('a')) {
			if (target.hasClass('sp-menu-has-items'))
				return; // menu item has a submenu, so just toggle it

			// collapse mobile nav if clicked an anchor
			$(this).removeClass('in').addClass('collapse');
			return;
		}

		if (target.parent().hasClass("toggle-dropdown")) {
			// collapse mobile nav if parent has toggle-dropdown class
			$(this).removeClass('in').addClass('collapse');
			return;
		}

		// if neither target nor parent is an anchor, do nothing
		if (!target.parent().is('a'))
			return;

		// collapse mobile nav if target is part of a submenu
		if (target.parents("ul.dropdown-menu").length > 0)
			$(this).removeClass('in').addClass('collapse');
	});
}
//END OF LINK FUNCTION

