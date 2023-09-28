using Microsoft.EntityFrameworkCore;
using ServerMkcert.Models;

namespace ServerMkcert
{
    public class DBConnector : DbContext
    {
        // Tables we can access
        public DbSet<User> users { get; set; }
        public DbSet<Car> cars { get; set; }

        public DBConnector(DbContextOptions<DBConnector> options)
            : base(options)
        {
        }

    }
}
