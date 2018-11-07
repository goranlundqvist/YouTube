/*
I have changed some things in the body html and the client controller. The rest of the code is OOB of the London release widget "Ticket Conversation"
*/

//START OF BODY HTML TEMPLATE

<div>
  <div ng-if="!data.canRead && !data.isNewRecord">
    ${Requested record not found}
  </div>
  <div ng-if="data.canRead && !data.isNewRecord" class="panel panel-{{options.color}} b ticket_conversation" >
    <div class="panel-heading">

      <div class="h2 panel-title">
        <h2 class="h4 panel-title" aria-label="{{::data.ticketTitle}} ${Ticket history}" >{{::data.ticketTitle}}</h2>
        
        <div class="pull-right">
          <ul>
            <li>
              <a href ng-show="data.showLocationIcon" class="panel-button" ng-click="checkInLocation()" title="{{data.checkInLocMsg}}">
                <span class="glyphicon glyphicon-globe"></span>
              </a>
            </li>
            <li>
              <a href class="panel-button" ng-show="isNative" ng-click="scanBarcode()" title="{{data.scanBarcodeMsg}}">
                <span class="glyphicon glyphicon-barcode"></span>
              </a>
            </li>
            <li><sp-attachment-button ng-if="::data.canWrite && data.canAttach"></sp-attachment-button></li>
          </ul>
        </div>
      </div>

    </div>

    <div class="panel-body">
      <div ng-if="data.hasReadableJournalField" >
        <form ng-submit="postEntry(data.journalEntry)" id="sand">
          <div ng-show="::data.primaryJournalField" class="input-group">
            <textarea ng-keypress="keyPress($event)"
                      sn-resize-height="trim"
                      rows="1" id="post-input"
                      class="form-control no-resize overflow-hidden"
                      ng-model='data.journalEntry'
                      ng-model-options='{debounce: 250}'
                      ng-attr-placeholder="{{getPlaceholder()}}"
                      autocomplete="off"
                      ng-change="userTyping(data.journalEntry)"
                      ng-paste="paste($event)"/> <!--THIS IS THE ONLY THING i ADDED/CHANGED IN THE HTML --->
            <span class="journal-field-indicator" ng-style="({'background-color': data.useSecondaryJournalField ? data.secondaryJournalField.color : data.primaryJournalField.color})"></span>
            <span class="input-group-btn" style="vertical-align: top">
              <input type="submit" class="btn btn-primary" value="{{data.btnLabel}}" ng-disabled="data.isPosting"/>
            </span>
          </div>
          <div ng-if="::(data.secondaryJournalField && data.secondaryJournalField.can_write)">
            <label class="pull-right"><input type="checkbox" ng-model="::data.useSecondaryJournalField" ng-change="updateFormWithJournalFields()"/> {{::data.secondaryJournalField.label}}</label>
          </div>
        </form>
        <ul class="list-group m-b-none">
          <li class="list-group-item user-typing m-t" ng-repeat="u in typing">${{{::u.user_display_name}} is typing}</li>
        </ul>
        <ul class="list-group m-b-none m-t" ng-if="msg">
          <li class="list-group-item user-typing">{{msg}}</li>
        </ul>
        <div class="timeline-container">
          <ul role="list" class="timeline" aria-label="${Ticket history}">
            <li class="timeline-item" ng-class="::{'timeline-inverted': e.user_sys_id == data.stream.user_sys_id} " ng-repeat="e in data.mergedEntries" aria-label="{{::e.name}}">
              <div class="timeline-badge">
                <sn-avatar-once
                           ng-if="hasLiveProfile(e.user_sys_id)"
                           primary="getLiveProfileByUserId(e.user_sys_id)"
                           class="avatar-large"
                           show-presence="false"
                           enable-context-menu="false">
                </sn-avatar-once>
              </div>
              <div class="timeline-panel">
                <div class="timeline-panel-inner" ng-style="::{'border-color': getFieldColor(e.element)}">
                  <div class="timeline-heading">
                    <div class="timeline-title h4">{{::e.name}}</div>
                    <p class = "time-text">
                      <small class="text-muted" >
                        <span class="glyphicon glyphicon-time" aria-hidden="true" tabindex="-1" />
                        <sn-time-ago  timestamp="::e.sys_created_on"  /> 
                      </small>
                      <i ng-if="::e.field_label" class="fa fa-circle text-muted" aria-hidden="true"></i>
                      <small class = "text-muted journal-type">{{::e.field_label}}</small>
                    </p>
                  </div>
                  <div class="timeline-body">
                    <p ng-if="::(e.element != 'attachment')" ng-bind-html="::e.value"></p>
                    <div ng-if="::(e.element == 'attachment')">
                      <a target="_blank" href="/sys_attachment.do?view=true&sys_id={{::e.attachment.sys_id}}" title="{{::dataViewMsg}}" >
                        <img ng-if="e.attachment.thumbnail_path" alt="" ng-src="/{{::e.attachment.path}}?t=medium" class="img-responsive"/>
                      </a>
                      <div>
                        <a href="/sys_attachment.do?sys_id={{::e.attachment.sys_id}}" target="_blank" title="{{::dataViewMsg}}"><strong>{{::e.attachment.file_name}}</strong></a><br/>
                        {{::e.attachment.size}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li role="listitem" class="timeline-item timeline-inverted" aria-label="{{data.stream.user_full_name}}">
              <div class="timeline-badge">
                <sn-avatar-once
                           ng-if="hasLiveProfile(data.stream.user_sys_id)"
                           primary="getLiveProfileByUserId(data.stream.user_sys_id)"
                           class="avatar-large"
                           show-presence="false"
                           enable-context-menu="false">
                </sn-avatar-once>
              </div>
              <div class="timeline-panel timeline-panel-first-item">
                <div class="timeline-heading">
                  <div class="timeline-title h4">{{data.stream.user_full_name}}</div>
                  <p>
                    <small class="text-muted">
                      <span class="glyphicon glyphicon-time" aria-hidden="true" tabindex="-1" />
                      <sn-time-ago timestamp="data.created_on" />
                    </small>
                  </p>
                </div>
                <div class="timeline-body">
                  <p>{{data.number}} ${Created}</p>
                </div>
              </div>
            </li>
            <span role="presentation" aria-hidden="true" class="timeline-start">
              <div class="timeline-badge success">
                ${Start}
              </div>
            </span>
          </ul>
        </div>

      </div>
      <div ng-if="!data.hasReadableJournalField">
        {{options.no_readable_journal_field_message}}
      </div>
    </div>
  </div>
</div>

//END OF BODY HTML TEMPLATE

//START OF CLIENT CONTROLLER 

function spTicketConversation($scope, nowAttachmentHandler, $animate, $rootScope, cabrillo, $timeout, snRecordWatcher, spUtil, spAriaUtil, $http, $window) {
	$scope.showLocationIcon = false;
	$scope.msg = "";
	$scope.isNative = cabrillo.isNative();
	$scope.errorMessages = [];
	var existingEntries = {}
	var skipNextRecordWatchUpdate = false;
	$scope.typing = [];
	if (!$scope.data.hasReadableJournalField && !$scope.data.isNewRecord)
		console.warn("No readable journal field (comments, work notes, etc.) available in the stream for this record");
	if ($scope.page && $scope.page.g_form)
		hideParentJournalFields();

    //This is the function I have added in the client controller.    
	$scope.paste = function (event) {

  var files = [];

  var clipData = event.originalEvent.clipboardData;

  angular.forEach(clipData.items, function (item, key) {

      if (clipData.items[key].type.match(/image.*/)) {

          files.push(clipData.items[key].getAsFile());

          $scope.attachmentHandler.onFileSelect(files);

      }

  });

}
	
	
	function hideParentJournalFields() {
		if (!$scope.data.stream)
			return;

		var fields = $scope.data.stream.journal_fields;
		var g_form = $scope.page.g_form;
		for (var f in fields)
			g_form.setDisplay(fields[f].name, false);
	}
	var liveProfiles = {};
	liveProfiles[$scope.user.sys_id] = {
		userID: $scope.user.sys_id,
		name: $scope.user.name,
		initials: $window.NOW.user_initials
	};
	if ($window.NOW.user_avatar) {
		liveProfiles[$scope.user.sys_id].userImage = $window.NOW.user_avatar;
	}

	$scope.getLiveProfileByUserId = function (userId){
		return liveProfiles[userId];
	}

	var pending = {};

	//Little caching implementation to make sure we only get a given user's profile once.
	$scope.hasLiveProfile = function hasLiveProfile(userId){
		if (liveProfiles[userId])
			return true;
		else if (pending[userId])
			return false;
		else {
			pending[userId] = $http.get('/api/now/live/profiles/sys_user.' + userId).then(function (response) {
				liveProfiles[userId] = {
					userID: userId,
					name: response.data.result.name,
					initials: buildInitials(response.data.result.name),
					avatar: response.data.result.avatar
				};
			});
			return false;
		}
	}

	function buildInitials(name) {
		if (!name)
			return "--";

		var initials = name.split(" ").map(function(word) {
			return word.toUpperCase();
		}).filter(function(word) {
			return word.match(/^[A-Z]/);
		}).map(function(word) {
			return word.substring(0,1);
		}).join("");

		return (initials.length > 3) ? initials.substr(0, 3) : initials;
	}


	function setupAttachmentHandler(){
		$scope.attachmentHandler = new nowAttachmentHandler(attachSuccess, appendError);

		function attachSuccess() {
			$rootScope.$broadcast("sp.attachments.update", $scope.data.sys_id);
			spAriaUtil.sendLiveMessage($scope.data.attachAddedMsg);
		}

		function appendError(error) {
			spUtil.addErrorMessage(error.msg + error.fileName);
			$scope.errorMessages.push(error);
			spAriaUtil.sendLiveMessage($scope.data.attachFailMsg);
		}

		$timeout(function() {
			$scope.attachmentHandler.setParams($scope.data.table, $scope.data.sys_id, 1024 * 1024 * $scope.data.maxAttachmentSize);
		})
	}
	setupAttachmentHandler();

	var recordWatcherTimer;
	$scope.$on('record.updated', function(name, data) {
		// Use record watcher update if:
		//	This record was updated AND This widget didn't trigger the update.
		if (data.table_name == $scope.data.table && data.sys_id == $scope.data.sys_id){
			$timeout.cancel(recordWatcherTimer);
			recordWatcherTimer = $timeout(function(){
				if (skipNextRecordWatchUpdate)
					skipNextRecordWatchUpdate = false;
				else
					spUtil.update($scope).then(function(r){
						$scope.data.stream = r.stream;
					});
			}, 250);
		}
	});

	$scope.$on('sp.show_location_icon', function(evt) {
		$scope.data.showLocationIcon = true;
	});

	$rootScope.$on('sp.sessions', function(evt, sessions) {
		$scope.typing = [];
		Object.keys(sessions).forEach(function (session) {
			session = sessions[session];
			if (session.status != 'typing')
				return;

			$scope.typing.push(session);
		})
	})

	$scope.$on('sp.conversation_title.changed', function(evt, text) {
		$scope.data.ticketTitle = text;
	})

	$scope.$watch("data.canWrite", function() {
		$rootScope.$broadcast("sp.record.can_write", $scope.data.canWrite);
	});

	var streamUpdateTimer;
	$scope.$watch("data.stream", function() {
		$timeout.cancel(streamUpdateTimer);
		streamUpdateTimer = $timeout(function() {
			mergeStreamEntries();
		}, 50);
	});

	function mergeStreamEntries() {
		$scope.placeholder = $scope.data.placeholderNoEntries;
		if (!$scope.data.stream || !$scope.data.stream.entries)
			return;

		$scope.placeholder = $scope.data.placeholder;
		var entries = $scope.data.stream.entries;
		if (!$scope.data.mergedEntries) {
			$scope.data.mergedEntries = $scope.data.stream.entries.slice();
			for (var i = 0; i < entries.length; i++) {
				existingEntries[entries[i].sys_id] = true;
			}

			return;
		}

		var mergedEntries = $scope.data.mergedEntries;
		for (var i = entries.length-1; i >= 0; i--) {
			var curEntry = entries[i];
			if (isNewEntry(mergedEntries, curEntry)){
				mergedEntries.unshift(curEntry);
				existingEntries[curEntry.sys_id] = true;
			}
		}
	}

	function isNewEntry(mergedEntries, item) {
		for (var i=0; i < mergedEntries.length; i++) {
			if (mergedEntries[i].sys_id === item.sys_id) {
				return false;
			}
		}
		return true;
	}

	$scope.getPlaceholder = function() {
		if ($scope.data.use_dynamic_placeholder && $scope.data.useSecondaryJournalField)
			return $scope.data.secondaryJournalField.label;
		return $scope.placeholder;
	};

	var colorCache;
	$scope.getFieldColor = function(fieldName) {
		var defaultColor = "transparent";
		if (colorCache) {
			if (fieldName in colorCache)
				return colorCache[fieldName];
			else
				return defaultColor;
		}

		colorCache = {};
		var jf = $scope.data.stream.journal_fields;
		for (var i=0; i<jf.length;i++) {
			colorCache[jf[i].name] = jf[i].color || defaultColor;
		}
		return $scope.getFieldColor(fieldName);
	}

	$scope.checkInLocation = function() {
		$rootScope.$broadcast("check_in_location");
		$rootScope.$broadcast("location.sharing.start");
	}

	$scope.$on("location.sharing.end", function() {
		$timeout(function() {$scope.msg = ""}, 500);
	})

	$scope.$on("location.sharing.start", function() {
		$scope.msg = $scope.data.sharingLocMsg;
	})

	$scope.scanBarcode = function() {
		$rootScope.$broadcast("scan_barcode");
	}

	$scope.$on("attachment.upload.start", function() {
		$scope.msg = $scope.data.uploadingAttachmentMsg;
	})

	$scope.$on("attachment.upload.stop", function() {
		$scope.msg = "";
		//update the stream so we get the new attachment
		spUtil.update($scope).then(function(r) {
			$scope.data.stream = r.stream;
		});
	});

	$scope.data.isPosting = false;

	$scope.postEntry = function(input) {
		post(input);
	};

	function post(input) {
		if ($scope.data.isPosting)
			return;

		if (!input)
			return;

		input = input.trim();
		$scope.data.journalEntry = input;

		if ($scope.data.useSecondaryJournalField)
			$scope.data.journalEntryField = $scope.data.secondaryJournalField.name;
		else
			$scope.data.journalEntryField = $scope.data.primaryJournalField.name;
		$scope.data.isPosting = true;
		spUtil.update($scope).then(function(){
			$scope.data.isPosting = false;
			reset();
			spAriaUtil.sendLiveMessage($scope.data.messagePostedMsg);
			$timeout(function() {
				$scope.setFocus(); // sets focus back on input, defined in "link"
			});
		});
		skipNextRecordWatchUpdate = true;
		$scope.setFocus(); // sets focus back on input, defined in "link"
	}

	var reset = function(){
		$scope.userTyping("");
		$scope.data.journalEntry = "";
		$scope.updateFormWithJournalFields();
		$scope.data.useSecondaryJournalField = false;
		$scope.data.journalEntryField = "";
	}

	$scope.keyPress = function(event) {
		if ($scope.data.isPosting)
			return;
		
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			$timeout(function() {
				if ($scope.data.journalEntry)
					$scope.postEntry($scope.data.journalEntry);
			}, 250);
		}
	}

	$scope.userTyping = function(input) {
		var status = "viewing";
		if (input.length)
			status = "typing";

		$scope.$emit("record.typing", {status: status, value: input, table: $scope.data.table, sys_id: $scope.data.sys_id});
		$scope.updateFormWithJournalFields();
	}
	$scope.updateFormWithJournalFields = function () {
		var fieldName, fieldToClear = "";
		if ($scope.data.useSecondaryJournalField) {
			fieldName = $scope.data.secondaryJournalField.name;
			fieldToClear = $scope.data.primaryJournalField.name;
		} else {
			fieldName = $scope.data.primaryJournalField.name;
			fieldToClear = "";
		}
		$scope.$emit("activity_stream_is_changed", {"fieldName": fieldName, "fieldToClear": fieldToClear, "input": $scope.data.journalEntry});
	}
}

//END OF CLIENT CONTROLLER