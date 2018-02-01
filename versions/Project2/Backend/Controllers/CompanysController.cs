using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iClinical;
using iClinical.Model;
using Microsoft.AspNetCore.Mvc;

namespace iClinical.Controllers
{
    [Route ("api/companies")]
    public class CompaniesController : Controller
    {
        private readonly iClinicalContext _context;
        public CompaniesController (iClinicalContext context)
        {
            _context = context;
            if (_context.Companies.Count () == 0)
            {
                _context.Companies.Add (new Company ()
                {
                    Id = 1, CompanyName = "Alternative Studes INC", CompanyUserName = "ALTMEDINC", CompanyPassword = "iclinical", Phone = "7145555555", Description = "We are Alternative Studies INC. We collectivley research hundreds on new studies daily. Thank you for your intrest in our Company.", Email = "ALTMEDINC@iclinical.com", City = "Santa Ana"
                });
                _context.Companies.Add (new Company ()
                {
                    Id = 2, CompanyName = "Nutrition Studes INC", CompanyUserName = "NutriStudies", CompanyPassword = "iclinical", Phone = "7143333333", Description = "We are Nutri Studies INC. We collectivley research hundreds on new studies daily. Thank you for your intrest in our Company.", Email = "NUTMEDINC@iclinical.com", City = "Los Angeles"
                });
                _context.Companies.Add (new Company ()
                {
                    Id = 3, CompanyName = "HealthAmerica Studes INC", CompanyUserName = "HELLAM", CompanyPassword = "iclinical", Phone = "3234444444", Description = "We are HealthAmerica Studies INC. We collectivley research hundreds on new studies daily. Thank you for your intrest in our Company.", Email = "HellAM@iclinical.com", City = "New York"
                });
        _context.SaveChanges ();
    }
}
// GET api/values
[HttpGet]
public List<Company> Get ()
{
    return _context.Companies.ToList ();
}

// GET api/values/5
[HttpGet ("{id}")]
public Company Get (int id)
{
    foreach (Company s in _context.Companies)
    {
        if (s.Id == id)
        {
            return s;
        }
    }
    return null;

}

// POST api/values
[HttpPost]
public Company Post ([FromBody] Company s)
{
    s.Id = _context.Companies.Count()+1;
    _context.Companies.Add (s);
    _context.SaveChanges ();
    return s;
}

// PUT api/values/5
[HttpPut ("{id}")]
public Company Put (int id, [FromBody] Company company)
{
    Console.WriteLine(company);
    foreach (Company s in _context.Companies)
    {
        if (s.Id == id)
        {
            _context.Companies.Remove (s);
            _context.SaveChanges ();
            _context.Companies.Add (company);
            _context.SaveChanges ();
            return company;
        }
    }

    return null;
}

// DELETE api/values/5
[HttpDelete ("{id}")]
public string Delete (int id)
{
    foreach (Company s in _context.Companies)
    {
        if (s.Id == id)
        {
            _context.Companies.Remove (s);
            _context.SaveChanges ();
            return "deleted";

        }
    }

    return "not found";
}
}
}