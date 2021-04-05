using EntityFrameworkCore.Triggers;
using YouTube.DemoModule.Core.Models;
using Microsoft.EntityFrameworkCore;


namespace YouTube.DemoModule.Data.Repositories
{
    public class YouTubeDemoModuleDbContext : DbContextWithTriggers
    {
        public YouTubeDemoModuleDbContext(DbContextOptions<YouTubeDemoModuleDbContext> options)
          : base(options)
        {
        }

        protected YouTubeDemoModuleDbContext(DbContextOptions options)
            : base(options)
        {
        }
        public YouTubeDemoModuleDbContext() : base()
        {
        }
        public DbSet<YoutubeVideo> Videos { get; set; }

        public DbSet<YoutubeVideo> YouTubeDemo { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=TVMATP362738L;Initial Catalog=VirtoCommerce3;Persist Security Info=True;MultipleActiveResultSets=True;Connect Timeout=30;Integrated Security=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                    modelBuilder.Entity<YoutubeVideo>().ToTable("YouTubeDemo").HasKey(x => x.Id);
                    modelBuilder.Entity<YoutubeVideo>().Property(x => x.Id).HasMaxLength(128);
                    base.OnModelCreating(modelBuilder);
        }
    }
}

