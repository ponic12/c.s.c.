var app = angular.module('plunker', ['ngMaterial','ngCookies', 'mdColorPicker']);

app.controller('MainCtrl', function($scope) {
  $scope.textConfig = {};
  $scope.textConfig.fonts = [
			'Arial',
			'Arial Black',
			'Comic Sans MS',
			'Courier New',
			'Georgia',
			'Impact',
			'Times New Roman',
			'Trebuchet MS',
			'Verdana'
		];

	$scope.textConfig.font;
	$scope.textConfig.textColor;
	$scope.textConfig.textBackground;

    $scope.colorConfig = {
        label: "coloritoss",
        sliders:false
    };
    // $scope.textConfig.showPreview = true;

});
