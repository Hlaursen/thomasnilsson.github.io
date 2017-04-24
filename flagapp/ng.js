 var countryApp = angular.module('countryApp', []);
      countryApp.controller('CountryCtrl', function ($scope, $http){
        $http.get('country_data.json').success((data) => { 
            $scope.countries = data;
        });
});
