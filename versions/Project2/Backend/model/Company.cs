using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iClinical;

namespace iClinical.Model
{
  public class Company
  {
    public int Id { get; set; }
    public string CompanyName { get; set; }
    public string CompanyUserName { get; set; }
    public string CompanyPassword { get; set; }
    public string Phone { get; set; }
    public string Description { get; set; }
    public string Email { get; set; }
    public string City { get; set; }
  }
}