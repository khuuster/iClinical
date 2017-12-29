app.controller("loginController", function ($scope, $state, $stateParams, userService, companyService) {
  //User login verfication
  $scope.userWrong = true;
  $scope.userLogin = function (user) {
    userService.getUsers()
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {

          if (response.data[i].email == user.email && response.data[i].password == user.password) {
            console.log("this user matches " + response.data[i].firstName);
            $scope.userWrong = true;
            userService.setCurrentUser(response.data[i].id)
            $state.go("dashboard");
          } else {
            console.log("no user matches")
            $scope.userWrong = false;
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  //Company login verification
  $scope.companyWrong = true;
  $scope.companyLogin = function (company) {
    companyService.getAllCompanies()
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].email == company.email && response.data[i].companyPassword == company.password) {
            console.log("this company matches " + response.data[i].companyName);
            $scope.companyWrong = true;
            companyService.setCurrentCompany(response.data[i].id)
            $state.go("companyDashboard");
          } else {
            console.log("no company matches")
            $scope.companyWrong = false;
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

})