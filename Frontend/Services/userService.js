app.service("userService", function ($http) {
  // posts a user
  this.newUserForm = function (x) {
    return $http.post("http://localhost:5000/api/users", x)
  }
  // gets all users
  this.getUsers = function () {
    return $http.get("http://localhost:5000/api/users")
  }
   // gets a user
   this.getAUser = function (id) {
    return $http.get("http://localhost:5000/api/users/" + id)
  }
  //redirect user to success page, holds user email to set currentuserID for success page.
  var userEmail = null;
  this.userEmail = function(name){
    userEmail = name;
  }
  //returns userEmail
  this.returnEmail = function(){
    return userEmail;
  }
  // current user logged in, 0 means no one is logged on
  var _currentUserId = 0;
  this.setCurrentUser = function (id){
    _currentUserId = id;
  }
  // returns logged on users' id
  this.currentUserReturn = function(){
    return _currentUserId;
  }
  
  this.getCurrentUserInfo = function(){
    console.log(_currentUserId)
    return $http.get("http://localhost:5000/api/users/" + _currentUserId)
  }
  // get individual user
  this.getUserById = function (id, callback) {
    if (id == "" || id == undefined || id == null) {
      //create empty user object pass user object to callback
      var user = {
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        gender: "",
        city: "",
        blood: false,
        cancer: false,
        cardio: false,
        congenital: false,
        ear: false,
        infection: false,
        inflame: false,
        injury: false,
        mental: false,
        metabolic: false,
        muscle: false,
        brain: false,
        oral: false,
        renal: false,
        reproductive: false,
        lung: false,
        skin: false,
        stroke: false,
        generic: false,
        other: "none",
        obese: false,
        sedentary: false,
        diet: false,
        smoker: false,
        drinker: false,
        bloodPressure: false,
        cholesterol: false
      }
      callback(user)
    }
    else {
      return $http.get("http://localhost:5000/api/users/" + _currentUserId);
    }
  }

  //loads userId
  this.loadEditUser = function(){
    return $http.get("http://localhost:5000/api/users/" + _currentUserId)
  }

  // sends updated user
  this.updateUser = function(user){
    return $http.put("http://localhost:5000/api/users/" + _currentUserId, user)
  }
})
