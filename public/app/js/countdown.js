(function () {
	angular.module('contador', ['ngSanitize'])

		.directive('countdown', ['Util', '$interval', function (Util, $interval) {
			return {
				restrict: 'A',
				scope: { date: '@' },
				link: function (scope, element,$scope) {
					var future;
					future = new Date(scope.date);
					$interval(function () {
						var diff;
						diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
						var time = Util.dhms(diff);

						return element.html("<span>"+time.d+"</span>"
							+"<span>"+time.h+"</span>"
							+"<span>"+time.m+"</span>"
						    +"<span>"+time.s+"</span>");
					}, 1000);
				}
			};
		}
	])
		.factory('Util', [function () {
		return {
			dhms: function (t) {
				var days, hours, minutes, seconds;
				days = Math.floor(t / 86400);
				t -= days * 86400;
				hours = Math.floor(t / 3600) % 24;
				t -= hours * 3600;
				minutes = Math.floor(t / 60) % 60;
				t -= minutes * 60;
				seconds = t % 60
				var cont2 ={
					d:days,
					h:hours,
					m:minutes,
					s:seconds,
				}
				var cont = [
						days + 'd',
						hours + 'h',
						minutes + 'm',
						seconds + 's'
						].join('');
				return cont2 ;

			}
		};
	}]);
}.call(this));



/*
angular.module('contador',['ngSanitize'])

	.controller('ContadorCtrl', ['$scope','$location','$timeout', function ($scope,$location,$timeout) {
		$scope.updateTimer=function(deadline) {
			var time = deadline - new Date(); //return differens between now and deadline
			return {
				'days': Math.floor(time / (1000 * 60 * 60 * 24)),
				'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
				'minutes': Math.floor((time / 1000 / 60) % 60),
				'seconds': Math.floor((time / 1000) % 60),
				'total': time
			};
		};

		$scope.animateClock=function(span) {
			span.className = "turn";
			$timeout(function () {
				span.className = "";
			}, 700);
		};

		$scope.startTimer = function (id, deadline) {
			var timerInterval = setInterval(function () {
				//var clock = angular.element(document).find('#'+id);
				var timer = $scope.updateTimer(deadline);

				$scope.clock = '<span>' + timer.days + '</span>'  //put in clock element our time
					+ '<span>' + timer.hours + '</span>'
					+ '<span>' + timer.minutes + '</span>'
					+ '<span>' + timer.seconds + '</span>';

				var spans =angular.element(document.querySelector('#clock')).find('span');
				//var spans = clock.getElementsByTagName("span");

				$scope.animateClock(spans[3]);
				if (timer.seconds == 59) $scope.animateClock(spans[2]);
				if (timer.minutes == 59 && timer.seconds == 59) $scope.animateClock(spans[1]);
				if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) $scope.animateClock(spans[0]);

				if (timer.total < 1) {
					clearInterval(timerInterval);
					$scope.clock = '<span>0</span><span>0</span><span>0</span><span>0</span>';
				}

			}, 1000);
		};


		$scope.loadcount = function () {
			var url = $location.path();

			if (url == "/inicio") {

			var deadline = new Date("July 18, 2017 19:30:00");
			$scope.startTimer('clock', deadline);
		}
		};


	}]);

*/
