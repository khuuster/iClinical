using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iClinical;
using System.ComponentModel.DataAnnotations;

namespace iClinical.Model
{
  public class Study
  {
    [Key]
    public int Id { get; set; }
    public string StudyId { get; set; }
    public string StudyTitle { get; set; }
    public string BriefSummary { get; set; }
    public string  Gender{ get; set; }
    public string Status { get; set; }
    public int SampleSize { get; set; }
    public int CompanyId {get; set;}
    public int UserId {get; set;}
    public string UserFirstName {get; set;}
    public string UserLastName {get; set;}
    public string UserEmail {get; set;}
    public string UserCity {get; set;}
    public string CompanyName {get; set;}
    public string CompanyPhone {get; set;}
    public string CompanyEmail {get; set;}
    public string CompanyCity {get; set;}

  }
}