(function(ng) {
  'use strict';
  ng.module('flScroller', [])
    .directive('flScroller', function() {
      return {
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function ($scope, $element) {
          return void 0;
        },
        controllerAs: 'flScrollerCtrl'
      };
    });
}(angular));