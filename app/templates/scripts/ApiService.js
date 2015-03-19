'use strict';

/**
 * @ngdoc service
 * @name <%= ngModulName %>.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 */
angular.module('<%= ngModulName %>')
  .factory('apiService', function($window, $http, API_ENDPOINT) {

    var _api = API_ENDPOINT;
    var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);

    // activate for basic auth
    if (_api.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
    }

    // public api
    return {
      getEndpoint: function() { return endpoint; }
    };

  });

