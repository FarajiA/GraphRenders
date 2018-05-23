/**
 * @module Directives
 */
'use strict';
angular.module('app.directives', [])
/**
 * app-version directive
 *
 * @class appVersion
 * @constructor
 * @param {String} version
 */
.directive('appVersion', [ 'version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]).directive('stopwatch', function() { return {
    restrict: 'AE',
    templateUrl: 'stopwatch.html',
    scope: {
      // Set title in the isolate scope from the title attribute on the directive's element.
      title: '@title',
      // Set up a bi-directional binding between currentTime on the local scope and the parent
      // scope's variable containing the current time that's the value of the time attribute.
      currentTime: '=time',
      setFn: '&'
    },

    link: function(scope, element, attrs, ctrl) {

        //scope.setFn({theDirFn: function(){console.log("yoooooo directive")}});
    },

    controllerAs: 'swctrl',
    controller: function($scope, $interval) {
      var self = this;
      var totalElapsedMs = 0;
      var elapsedMs = 0;
      //var time;
      var startTime;
      var timerPromise;

      self.start = function() {
        if (!timerPromise) {
          startTime = new Date();
          timerPromise = $interval(function() {
            var now = new Date();
            //$scope.time = now;
            elapsedMs = now.getTime() - startTime.getTime();
          }, 31);
        }
      };

      self.stop = function() {
        if (timerPromise) {
          $interval.cancel(timerPromise);
          timerPromise = undefined;
          totalElapsedMs += elapsedMs;
          elapsedMs = 0;
        }
      };

      self.reset = function() {
        startTime = new Date();
        totalElapsedMs = elapsedMs = 0;
      };

      self.getTime = function() {
        return time;
      };

      self.getElapsedMs = function() {
        return totalElapsedMs + elapsedMs;
      };

      $scope.setFn({
          startFn: function(){ self.start(); },
          stopFn: function() { self.stop(); },
          resetFn: function() { self.reset(); }
        });
    }
  };
});