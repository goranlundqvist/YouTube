function($scope, $rootScope) {
	var c = this;
	c.data.attachLeft = c.data.neededAttach;

	$scope.parent = getParent($scope);

	$scope.$watch('parent.attachments', function() {

		if ($scope.parent.attachments) {
			if ($scope.parent.attachments.length >= c.data.neededAttach) {
				enableSubmit();
			} else {
				disableSubmit();
			}
		}
	});

	function disableSubmit() {
		c.data.attachLeft = c.data.neededAttach - $scope.parent.attachments.length;
		$scope.parent.submitted = true;
	}

	function enableSubmit() {
		$scope.parent.submitted = false;
	}

	function getParent(parent) {
		if (parent.item) {
			return parent;
		} else {
			if (parent.$parent){
				return getParent(parent.$parent);
			} else { 
				console.warn("couldn't find the correct parent");
			}
		}
	}
}