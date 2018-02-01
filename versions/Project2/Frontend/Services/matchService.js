app.service("matchService", function ($http) {
  // get our users  
  this.getUsers = function(){
      return $http.get("http://localhost:5000/api/users")
  }
  this.getAUser = function (id) {
    return $http.get("http://localhost:5000/api/users/" + id)
  }
  // searches the api with input
  this.getApi = function(condition){
    console.log(condition);
    return $http.get("https://api.opentrials.net/v1/search?q="+ condition + "%20age%20&page=1&per_page=100");
  }

  //gets all studies
  this.getAllStudies = function(){
    return $http.get("http://localhost:5000/api/studies")
  }

  //deletes study from user saved list
  this.deleteUserStudy = function(id){
    return $http.delete("http://localhost:5000/api/studies/" + id)
  }
 
})
  