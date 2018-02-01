using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iClinical;

namespace iClinical.Model
{
  public class User
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Gender { get; set; }
    public string City { get; set; }
    public bool Blood { get; set; }
    public bool Cancer { get; set; }
    public bool Cardiovascular { get; set; }
    public bool Congenital { get; set; }
    public bool Ear { get; set; }
    public bool Eye { get; set; }
    public bool Infection { get; set; }
    public bool Inflammatory { get; set; }
    public bool Injuries { get; set; }
    public bool MentalHealth { get; set; }
    public bool Metabolic { get; set; }
    public bool Musculoskeletal { get; set; }
    public bool Neurological { get; set; }
    public bool OralGastro { get; set; }
    public bool Renal { get; set; }
    public bool Reproduction { get; set; }
    public bool Respiratory { get; set; }
    public bool Skin { get; set; }
    public bool Stroke { get; set; }
    public bool Generic { get; set; }
    public string Other { get; set; }
    public bool IsObese { get; set; }
    public bool IsSedentary { get; set; }
    public bool HasPoorDiet { get; set; }
    public bool IsSmoker { get; set; }
    public bool IsDrinker { get; set; }
    public bool HasHighBloodPressure { get; set; }
    public bool HasHighCholesterol { get; set; }
    public string Studies { get; set; }


  }
}