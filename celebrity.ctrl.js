angular.module("exampleApp", ['ngResource'])
	.filter("currencyConvert", function($log) {
		return function(value, selectedCurrencyValue) {			
			// $log.debug("value = " + angular.toJson(value));
			return (value / selectedCurrencyValue).toFixed();
		}
	})
	.controller("celebrityCtrl", function($scope, $resource, $log) {
		// var celebrities_ajax = $resource('http://localhost\\:8000/celebrityRichList.json');
		var celebrities_ajax = $resource('celebrityRichList.json');

		$scope.celebrities = [];

		celebrities_ajax.get(function(resp) {		
			$scope.celebrities = resp.celebrityList;
			
			$scope.currencies = [
				{name: "US Dollar", value: resp.usDollarValue}, 
				{name: "Euro", value: resp.euroValue},
				{name: "Australian Dollar",  value: resp.australianDollarValue}];
			$scope.selectedCurrency = $scope.currencies[0];
		});

		$scope.countryFilterFn = function(item) {
			return !$scope.selectedCountry || item.country === $scope.selectedCountry;
		}

		$scope.openSearchFilterFn = function(item) {
			// $log.debug("item = " + angular.toJson(item));
			if (!$scope.searchText) {
				 return true;	
			} else if (isNaN($scope.searchText)) {
				return item.name.search($scope.searchText) > -1
						|| item.country.search($scope.searchText) > -1
			} else {
				return ('' + item.rank).search('' + $scope.searchText) > -1
						|| ('' + (item.netWorth / $scope.selectedCurrency.value).toFixed()).search('' + $scope.searchText) > -1
						|| ('' + item.age).search('' + $scope.searchText) > -1
			}
		}

		$scope.orders = [
			{name: "Rank", value: "rank"}, 
			{name: "Name", value: "name"},
			{name: "Age",  value: "age"}];

		$scope.listOrder = $scope.orders[0];		// required to prefill dropdown
		
		$scope.countries = [
			"Australia",
			"Brazil",
			"Canada",
			"France",
			"Germany",
			"India",
			"Ireland",
			"Israel",
			"Italy",
			"Netherlands",
			"Poland",
			"Saudi Arabia",
			"South Africa",
			"Tunisia",
			"United Kingdom",
			"United States"
			];
	});