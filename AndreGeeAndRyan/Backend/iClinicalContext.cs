using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using iClinical.Model;

namespace iClinical
{
    public class iClinicalContext : DbContext
    {
        public iClinicalContext (DbContextOptions<iClinicalContext> options) : base (options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Study> Studies { get; set; }

    }

}