app.controller("dashboardController", function ($scope, $state, $stateParams, userService, matchService) {
  // loads the current user
  if (userService.currentUserReturn() == 0) {
    $state.go("home");
  }
  $scope.loadUser = function () {
    userService.getCurrentUserInfo()
      .then(function (response) {
        console.log(response.data)
        $scope.loadedUser = response.data;
      })
  }
  $scope.loadUser();

  //edit user button
  $scope.editUser = function () {
    $state.go("userSignup");
  }

})