using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace YouTube.DemoModule.Data.Repositories
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<YouTubeDemoModuleDbContext>
    {
        public YouTubeDemoModuleDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<YouTubeDemoModuleDbContext>();

            builder.UseSqlServer("Data Source=TVMATP362738L;Initial Catalog=VirtoCommerce3;Persist Security Info=True;MultipleActiveResultSets=True;Connect Timeout=30;Integrated Security=True");

            return new YouTubeDemoModuleDbContext(builder.Options);
        }
    }
}
