app.controller("navBarController", function ($scope, $state, $stateParams, userService, companyService) {
  if (companyService.currentCompanyReturn == 0) {
    $scope.companyDash = true; 
  } else {
    $scope.companyDash = false; 
  }
  console.log($scope.companyDash);
  // logout function
  $scope.logout = function(){
    if (companyService.currentCompanyReturn == 0) {
      $scope.companyDash = true; 
    } else {
      $scope.companyDash = false;
    }
    userService.setCurrentUser(0);
    companyService.setCurrentCompany(0);
    $state.go("home");
  }

  
 
})