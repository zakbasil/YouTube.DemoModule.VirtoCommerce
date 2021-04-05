using YouTube.DemoModule.Core.Models;
using System.Linq;
using VirtoCommerce.Platform.Core.Common;

namespace YouTube.DemoModule.Data.Repositories
{
    public interface IYoutubeRepository : IRepository
    {
        IQueryable<YoutubeVideo> YoutubeVideos { get; }
    }
}
