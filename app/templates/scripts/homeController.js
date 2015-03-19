'use strict';

/**
 * @ngdoc function
 * @name <%= ngModulName %>.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('<%= ngModulName %>')
  .controller('HomeController', function($scope, ExampleService) {

    $scope.myHTML = null;

    // just an example...
    $scope.fetchRandomText = function() {
      ExampleService.doSomethingAsync()
        .then(ExampleService.fetchSomethingFromServer)
        .then(function(response) {
            $scope.myHTML = response.data.text;
            // close pull to refresh loader
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchRandomText();

  });
