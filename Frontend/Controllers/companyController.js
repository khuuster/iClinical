app.controller("companyController", function ($scope, $state, $stateParams, companyService, matchService, userService) {
  // if (companyService.currentCompanyReturn() == 0 && userService.currentUserReturn() == 0) {
  //   $state.go("dashboard");
  // } else if (companyService.currentCompanyReturn() == 0) {
  //   $state.go("home");
  // }

  //hides form verification upon initial page load
  $scope.companyName = true;
  $scope.companyUsername = true;
  $scope.companyPhone = true;
  $scope.companyEmail = true;
  $scope.companyPass = true;
  $scope.companyCity = true;
  $scope.companyDescription = true;
  $scope.company = {};

//makes company sign up form empty or edit filled out depending on if currentCompany is logged in. 
  if (companyService.currentCompanyReturn !== 0) {
        companyService.loadEditCompany().then(function (response) {
        $scope.company = response.data;
        console.log($scope.company)
      })
  }

  //submits company signup form
  $scope.newCompanySubmit = function () {
    // if any form input is empty then run next if else 
    if (($scope.company.companyName == "") ||
      ($scope.company.companyUserName == "") ||
      ($scope.company.phone == "") ||
      ($scope.company.email == "") ||
      ($scope.company.companyPassword == "") ||
      ($scope.company.city == "") ||
      ($scope.company.description == "")
    ) {
      $scope.companyName = true;
      $scope.companyUsername = true;
      $scope.companyPhone = true;
      $scope.companyEmail = true;
      $scope.companyPass = true;
      $scope.companyCity = true;
      $scope.companyDescription = true;

      if ($scope.company.companyName == "") {
        $scope.companyName = false;
      }

      if ($scope.company.companyUserName == "") {
        $scope.companyUsername = false;
      }

      if ($scope.company.phone == "") {
        $scope.companyPhone = false;
      }

      if ($scope.company.email == "") {
        $scope.companyEmail = false;
      }

      if ($scope.company.companyPassword == "") {
        $scope.companyPass = false;
      }

      if ($scope.company.description == "") {
        $scope.companyDescription = false;
      }

      if ($scope.company.city == "") {
        $scope.companyCity = false;
      }

    }
    //if everything is filled out in signup form this function is run and inputs passed in 
    else {
      companyService.newCompanyForm($scope.company);
      companyService.holdUsername($scope.company.companyUserName);
      $state.go("successPage");
    }
  }

  //success page redirect page load via id number to dashboard
  $scope.companyRedirect = function () {
    companyService.getAllCompanies().then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].companyUserName == companyService.returnUsername()) {
          companyService.setCurrentCompany(response.data[i].id);
          $state.go("companyDashboard");
        }
      }
    })
  }

  //loads company dashboard 
  $scope.loadCompanyDash = function () {
    companyService.getCurrentCompanyInfo().then(function (response) {
      $scope.currentCompany = response.data
    })
  }

  $scope.loadCompanyDash();

  //searches trials and populates dashboard with search results
  $scope.searchStudies = function (trialName) {
    matchService.getApi(trialName).then(function (response) {
      $scope.searchedTrials = response.data.items;
    })
  }

  // adds selected searched item to backend. Makes new instance of study in backend with company id in it
  $scope.addStudy = function (trial) {
    var searched = ({ studyId: trial.id, studyTitle: trial.public_title, briefSummary: trial.brief_summary, gender: trial.gender, status: trial.status, sampleSize: trial.target_sample_size, companyId: companyService.currentCompanyReturn() });
    companyService.postStudyCompany(searched);
    for (var i = 0; i < $scope.searchedTrials.length; i++) {
      if (trial.id == $scope.searchedTrials[i].id) {
        $scope.searchedTrials.splice(i, 1);
      }
    }
    setTimeout(function () {
      $scope.getAllStudies = companyService.getAllStudies().then(function (response) {
        $scope.companyStudies = [];
        for (var i = 0; i < response.data.length; i++) {
          if (companyService.currentCompanyReturn() == response.data[i].companyId) {
            $scope.companyStudies.push(response.data[i]);
          }
        }
      })
    }, 500);
  }

  //compnay deletes studies from backend, refreshes view
  $scope.deleteStudy = function (study) {
    companyService.deleteStudy(study.id);
    setTimeout(function () {
      $scope.getAllStudies = companyService.getAllStudies().then(function (response) {
        $scope.companyStudies = [];
        for (var i = 0; i < response.data.length; i++) {
          if (companyService.currentCompanyReturn() == response.data[i].companyId) {
            $scope.companyStudies.push(response.data[i]);
          }
        }
      })
    }, 500)
  }

  //loads all company studies upon initial page load
  $scope.getAllStudies = function () {
    companyService.getAllStudies().then(function (response) {
      $scope.companyStudies = [];
      for (var i = 0; i < response.data.length; i++) {
        if (companyService.currentCompanyReturn() == response.data[i].companyId) {
          $scope.companyStudies.push(response.data[i]);
        }
      }
    })
  }

  $scope.getAllStudies();

  //edit company button
  $scope.editCompany = function () {
    $state.go("companySignup");
  }

  // populates edit company signup form for edit
  $scope.editCompanyForm = function () {
    companyService.loadEditCompany().then(function (response) {
      $scope.company = response.data;
      console.log($scope.company)
    })
  }



  //hides or unhides submit or submit edit button in company signup form
  $scope.companyLoggedIn = function () {
    if (companyService.currentCompanyReturn() != 0) {
      $scope.submit = true;
      $scope.submitEdit = false;
    }
    else {
      $scope.submit = false;
      $scope.submitEdit = true;
    }
  }

  $scope.companyLoggedIn();

//submitEdit button
$scope.editCompanySubmit = function(id, company){
 companyService.updateCompany(id, company);
 setTimeout(function () {
    $state.go("companyDashboard");
 },500)
}

//find all of company's studies and extract studyId

$scope.findMatchedUsers = function(){
  companyService.getAllStudies().then(function(response){
    var listCurrentStudies = [];
    var userWithCompanyStudies = [];
    //get all studyID from current company
    for(var i = 0; i < response.data.length; i++){
      if(companyService.currentCompanyReturn() == response.data[i].companyId){
        listCurrentStudies.push(response.data[i].studyId)
      }
    }
    //finds all users by ID != 0 in all studies that matches studies in copmany list of current Studies.
    for(var i = 0; i < listCurrentStudies.length; i++){
      for(var j = 0; j < response.data.length; j++){
        if(listCurrentStudies[i] == response.data[j].studyId && response.data[j].userId != 0){
          userWithCompanyStudies.push({userName: response.data[j].userFirstName + " " + response.data[j].userLastName, email: response.data[j].userEmail, city: response.data[j].userCity, studyTitle: response.data[j].studyTitle})
        }
      }
    }
    $scope.studies = userWithCompanyStudies; 
  })
}
$scope.findMatchedUsers();

})
