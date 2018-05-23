/**
 * @module Controller
 */
'use strict';
angular.module('app.controllers', [])
/**
 * Home controller
 * emtpy controller which shows only markup
 *
 * @class HomeCtrl
 * @constructor
 * @param {Object} $scope
 */
.controller('HomeCtrl', ['$scope', function($scope) {} ])
.controller('GraphCtrl', ['$scope', '$interval', function($scope, $interval) {

  var vm = this;

  vm.sharedTime = new Date();
  $interval(function() {
    vm.sharedTime = new Date();
  }, 500);

  // Flot logic
  vm.flotStartDirective = function(directiveFn){
    vm.flotStart = directiveFn;
  };
  vm.flotStopDirective = function(directiveFn){
    vm.flotStop = directiveFn;
  };

  vm.generateFlot = function(){
    $.plot("#flot", data_500, {
      yaxis: {
        min: 0
      },
      xaxis: {
        tickDecimals: 0
      }
    });
  };

  vm.generateFlot5k = function(){
    $.plot("#flot", data_5000, {
      yaxis: {
        min: 0
      },
      xaxis: {
        tickDecimals: 0
      }
    });
  };

  var flotElement = document.getElementsByClassName("flot-overlay");
  $scope.$watch(function() { return $(flotElement).is(':visible'); }, function(newVal) {
    if(newVal === true) {
      vm.flotStop();
   }
});


/// D3 logic
vm.d3startDirective = function(directiveFn){
  vm.d3Start = directiveFn;
};

vm.d3stopDirective = function(directiveFn){
  vm.d3Stop = directiveFn;
};

vm.generateD3 = function(){
  InitiateD3();
};

function InitiateD3()
{
  // 2. Use the margin convention practice
var margin = {top: 50, right: 50, bottom: 50, left: 50}
, width = 1000 // Use the window's width
, height = 420; // Use the window's height

// The number of datapoints
var n = 500;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
  .domain([0, n]) // input
  .range([0, width]); // output

// 6. Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
  .domain([0, 100]) // input
  .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
  .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
  .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
  .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = dataObj_500.data;

// 1. Add the SVG to the page and employ #2
var svg = d3.select("#graph")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append("path")
  .datum(dataset) // 10. Binds data to the line
  .attr("class", "line") // Assign a class for styling
  .attr("d", line) // 11. Calls the line generator
  .call(function(){
    vm.d3Stop();
  });
}

vm.generateD3_5k = function(){
  InitiateD3_5k();
};

function InitiateD3_5k()
{
  // 2. Use the margin convention practice
var margin = {top: 50, right: 50, bottom: 50, left: 50}
, width = 1000 // Use the window's width
, height = 420; // Use the window's height

// The number of datapoints
var n = 5000;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
  .domain([0, n]) // input
  .range([0, width]); // output

// 6. Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
  .domain([0, 100]) // input
  .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
  .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
  .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
  .curve(d3.curveMonotoneX);// apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = dataObj_5k.data;

// 1. Add the SVG to the page and employ #2
var svg = d3.select("#graph")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append("path")
  .datum(dataset) // 10. Binds data to the line
  .attr("class", "line") // Assign a class for styling
  .attr("d", line) // 11. Calls the line generator
  .call(function(){
    vm.d3Stop();
  });
}

// Chart.js logic
vm.chartStartDirective = function(directiveFn){
  vm.chartStart = directiveFn;
};

vm.chartStopDirective = function(directiveFn){
  vm.chartStop = directiveFn;
};

vm.chartResetDirective = function(directiveFn){
  vm.chartReset = directiveFn;
};

var ctx = document.getElementById('myChart').getContext('2d');
vm.generateChart = function(){
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
          label: 'USA',
          data: dataObj_500.data
      }]
    },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              ticks: {
                max: 500,
                min: 0
            }
          }]
      },
      animation: {
        onComplete: function(animation) {
          vm.chartStop();
        }
    }
    }
  });
};

vm.generateChart5k = function(){
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
          label: 'USA',
          data: dataObj_5k.data
      }]
    },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              ticks: {
                max: 500,
                min: 0
            }
          }]
      },
      animation: {
        onComplete: function(animation) {
          vm.chartStop();
        }
    }
    }
  });
};


}]);
