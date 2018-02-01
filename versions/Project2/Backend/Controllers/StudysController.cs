using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iClinical;
using iClinical.Model;
using Microsoft.AspNetCore.Mvc;

namespace iClinical.Controllers
{
    [Route ("api/studies")]
    public class Studies : Controller
    {
        private readonly iClinicalContext _context;
        public Studies (iClinicalContext context)
        {
            _context = context;

        }
        // GET api/values
        [HttpGet]
        public List<Study> Get ()
        {
            return _context.Studies.ToList ();
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public Study Get (string id)
        {
            foreach (Study s in _context.Studies)
            {
                if (s.StudyId == id)
                {
                    return s;
                }
            }
            return null;

        }

        // POST api/values
        [HttpPost]
        public Study Post ([FromBody] Study s)
        {
            s.Id =  _context.Studies.Count()+1;
            _context.Studies.Add (s);
            _context.SaveChanges ();
            return s;
        }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public Study Put (string id, [FromBody] Study Study)
        {

            foreach (Study s in _context.Studies)
            {
                if (s.StudyId == id)
                {
                    _context.Studies.Remove (s);
                    _context.SaveChanges ();
                    _context.Studies.Add (Study);
                    _context.SaveChanges ();
                    return Study;
                }
            }

            return null;
        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public string Delete (int id)
        {
            foreach (Study s in _context.Studies)
            {
                if (s.Id == id)
                {
                    _context.Studies.Remove (s);
                    _context.SaveChanges ();
                    return "deleted";

                }
            }

            return "not found";
        }
    }
}