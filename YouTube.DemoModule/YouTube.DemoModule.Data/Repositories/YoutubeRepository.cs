using YouTube.DemoModule.Core.Models;
using System.Linq;
using VirtoCommerce.Platform.Data.Infrastructure;
using YouTube.DemoModule.Data.Repositories;


namespace YouTube.DemoModule.Data.Repositories
{
    public class YoutubeRepository : DbContextRepositoryBase<YouTubeDemoModuleDbContext>, IYoutubeRepository
    {
        public YoutubeRepository(YouTubeDemoModuleDbContext context) : base(context)
        {

        }

        public IQueryable<YoutubeVideo> YoutubeVideos => DbContext.Set<YoutubeVideo>();
    }
}
