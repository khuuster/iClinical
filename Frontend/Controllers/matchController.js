app.controller("matchController", function ($scope, $state, $stateParams, matchService, userService, companyService) {
  // checks if user is logged on
  if (userService.currentUserReturn() == 0) {
    $state.go("home");
  }
  // this searches the open trial api by conditions passed in
  $scope.clinicalSearch = function (condition) {
    console.log(condition);
    matchService.getApi(condition)
      .then(function (response) {
        console.log(response.data.items)
        $scope.apiResponse = response.data.items;
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // matching function test
  $scope.matchingUser = function () {
    $scope.conditionMatch = "";
    // this is where the user is passed in
    matchService.getAUser(userService.currentUserReturn())
      .then(function (response) {
        var conds = [];

        console.log(response)
        $scope.currentUser = response.data;
        console.log($scope.currentUser);
        // this is where the conditions check will to be added to the search
        if ($scope.currentUser.cancer == true) {
          conds.push("cancer");
        };
        if ($scope.currentUser.cardiovascular == true) {
          conds.push("cardiovascular");
        }
        if ($scope.currentUser.congenital == true) {
          conds.push("congenital");
        }
        if ($scope.currentUser.ear == true) {
          conds.push("ear%20hearing");
        }
        if ($scope.currentUser.eye == true) {
          conds.push("eye%20optical");
        }
        if ($scope.currentUser.infection == true) {
          conds.push("infection");
        }
        if ($scope.currentUser.inflammatory == true) {
          conds.push("inflammatory");
        }
        if ($scope.currentUser.mentalHealth == true) {
          conds.push("mental");
        }
        if ($scope.currentUser.neurological == true) {
          conds.push("neurological");
        }
        if ($scope.currentUser.reproduction == true) {
          conds.push("reproductive");
        }
        if ($scope.currentUser.respiratory == true) {
          conds.push("respiratory");
        }
        if ($scope.currentUser.isObese == true) {
          conds.push("obese");
        }
        if ($scope.currentUser.isSmoker == true) {
          conds.push("smoke");
        }
        console.log(conds)
        // this joins all the true conditions into a formatted search for the api
        $scope.conditionMatch = conds.join("%20");
        console.log($scope.conditionMatch);
      })
      .catch(function (error) {
        console.log(error)
      })
    matchService.getApi($scope.conditionMatch)
      .then(function (response) {
        // console.log(response.data.items)
        $scope.apiResponse = response.data.items;
        // this calls the dope function to match 1-100 study results to the users profile
        $scope.matchTrimmer($scope.apiResponse)
        $scope.currentStudy = $scope.apiResponse[0]
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // this trims the results to the users info
  $scope.matchTrimmer = function (theResults) {
    // this will check if the study is still recruiting
    for (var i = theResults.length - 1; i > 0; i--) {
      if (theResults[i].recruitment_status !== "recruiting") {
        theResults.splice(i, 1);
      }
    }
    // console.log(theResults);
    // this checks if the study matches the users gender
    for (var i = theResults.length - 1; i > 0; i--) {
      if (theResults[i].gender !== $scope.currentUser.gender.toLowerCase() && theResults[i].gender !== "both") {
        theResults.splice(i, 1);
      }
    }
    // this checks if the users' age matches the study
    // console.log(theResults);
    for (var i = theResults.length - 1; i > 0; i--) {
      if (theResults[i].age_range !== undefined) {
        var max = theResults[i].age_range.max_age.slice(0, 2);
        var min = theResults[i].age_range.min_age.slice(0, 2);
        // console.log(min + " " + max);
        if ($scope.currentUser.age > min) {
          theResults.splice(i, 1);
        } else if ($scope.currentUser.age < max) {
          if (max !== "N/") {
            theResults.splice(i, 1);
          }
        }
      }
    }
    // console.log(theResults);
  }
  $scope.matchingUser();
  // below is what makes studies show one by one
  $scope.studyIndex = 0;
  $scope.currentStudy = {};
  $scope.matchesView = true;

  // adds interested study into backend.
  $scope.switchTest = function () {
    $scope.studyIndex = $scope.studyIndex + 1;
    console.log($scope.studyIndex);
    if ($scope.studyIndex != $scope.apiResponse.length) {
      $scope.currentStudy = $scope.apiResponse[$scope.studyIndex];
      console.log($scope.currentStudy)
      userService.getAUser(userService.currentUserReturn()).then(function (response) {
        $scope.userInfo = response;
        var searched = ({
          studyId: $scope.currentStudy.id,
          studyTitle: $scope.currentStudy.public_title,
          briefSummary: $scope.currentStudy.brief_summary,
          gender: $scope.currentStudy.gender,
          status: $scope.currentStudy.status,
          sampleSize: $scope.currentStudy.target_sample_size,
          companyId: companyService.currentCompanyReturn(),
          userId: userService.currentUserReturn(),
          userFirstName: $scope.userInfo.data.firstName,
          userLastName: $scope.userInfo.data.lastName,
          userEmail: $scope.userInfo.data.email,
          userCity: $scope.userInfo.data.city,
          companyName: "Alternative Studes INC",
          companyPhone: "7145555555",
          companyEmail: "ALTMEDINC@iclinical.com",
          companyCity: "Santa Ana"
        })
        console.log($scope.userInfo.data);
        setTimeout(function(){
          companyService.postStudyCompany(searched);
        }, 500)
         
      })

     


    } else {
      $scope.matchesView = false;
    }
  }

  $scope.switchStudies = function () {
    $scope.studyIndex = $scope.studyIndex + 1;
    console.log($scope.studyIndex);
    if ($scope.studyIndex != $scope.apiResponse.length) {
      $scope.currentStudy = $scope.apiResponse[$scope.studyIndex];
      console.log($scope.currentStudy)
    } else {
      $scope.matchesView = false;
    }
    $scope.myClass = "studies-continer animated bounce"
  }

  //lists all saved studies from user
  $scope.getSavedStudies = function(){
    matchService.getAllStudies().then(function(response){
      var userStudies = [];
      var companiesSameStudy = [];
      for(var i = 0; i < response.data.length; i++){
        if (userService.currentUserReturn() == response.data[i].userId){
          userStudies.push({studyTitle: response.data[i].studyTitle, id: response.data[i].id})
        }
      }
      for (var i = 0; i < userStudies.length; i++){
        for(var j = 0; j < response.data.length; j++){
          //<============!!!!!!!add response.data[j].companyName != null to go live !!!!!!!===================>>>>>>>>>>>>
          if (response.data[i].studyTitle == response.data[j].studyTitle ){
            companiesSameStudy.push({studyTitle: response.data[j].studyTitle , companyName: response.data[j].companyName , companyPhone: response.data[j].companyPhone , companyEmail: response.data[j].companyEmail , companyCity: response.data[j].companyCity})
          }
        }
      }
      $scope.savedStudies = userStudies; 
      $scope.userCompanies = companiesSameStudy;
    })
  }
  $scope.getSavedStudies()



  //delete button for saved studies 
  $scope.removeSavedStudy = function (id){
    matchService.deleteUserStudy(id);
    setTimeout(function(){
      $scope.getSavedStudies();
    } ,500 )
  }
 
  //shows all companies matched with saved studies
  $scope.showUserCompanies = function(){
    
  }

})