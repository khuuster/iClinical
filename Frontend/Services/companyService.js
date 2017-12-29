app.service("companyService", function ($http) {

  //POSTS NEW COMPANY
   this.newCompanyForm = function (x) {
    return $http.post("http://localhost:5000/api/companies", x)
  }

  //GETS COMPANY by ID
  this.getCompanyById = function (id, callback) {
    if (id == "" || id == undefined || id == null) {
      //create empty user object pass user object to callback
      var company = {
        companyName: "",
        companyUserName: "",
        companyPassword: "",
        phone: "",
        description: "",
        email: "",
        city: ""
      }
      callback(company)
    }
    else {
      return $http.get("http://localhost:5000/api/companies/" + id)
    }
  }

  //GETS ALL COMPANIES
  this.getAllCompanies = function(){
    return $http.get("http://localhost:5000/api/companies")
  }
  
  // login for company, 0 means no one is logged in, 1+ is the index of the user logged in.
  var _currentCompanyId = 4;
  this.setCurrentCompany = function (id){
    _currentCompanyId = id;
  }
  
  // returns logged on company' id
  this.currentCompanyReturn = function(){
    return _currentCompanyId;
  }

  // gets company by id
  this.getCurrentCompanyInfo = function(){
    console.log(_currentCompanyId)
    return $http.get("http://localhost:5000/api/companies/" + _currentCompanyId);
  }

  //holds current company userName for company profle creation
  var userName = null;
  this.holdUsername = function(name){
    userName = name; 
  }
  //returns company user name; 
  this.returnUsername = function(){
    return userName; 
  }

  // posts new study for company 
  this.postStudyCompany = function(trial){
    return $http.post("http://localhost:5000/api/studies", trial)
  }

  //gets all saved studies from backend
  this.getAllStudies = function(){
    return $http.get("http://localhost:5000/api/studies");
  } 

  //compnay deletes study from backend
  this.deleteStudy = function(id){
    return $http.delete("http://localhost:5000/api/studies/" + id)
  }

  //sets up company info for edit submission
  this.loadEditCompany = function(){
    return $http.get("http://localhost:5000/api/companies/" + _currentCompanyId)
  }

  //submits editteed company form
  this.updateCompany = function(id, company){
    return $http.put("http://localhost:5000/api/companies/" + id, company)
  }
})
  