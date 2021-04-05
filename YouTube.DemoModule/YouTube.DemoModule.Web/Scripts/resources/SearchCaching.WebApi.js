angular.module('YouTube.DemoModule')
  .factory('superCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('super-cache');
  }]);