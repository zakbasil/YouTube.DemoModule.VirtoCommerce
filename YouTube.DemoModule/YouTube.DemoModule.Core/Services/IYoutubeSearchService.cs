using YouTube.DemoModule.Core.Models;
using System.Threading.Tasks;

namespace YouTube.DemoModule.Core.Services
{
    public interface IYoutubeSearchService
    {
        Task<YoutubeSearchResult> Search(YoutubeSearchCriteria criteria);

        
    }

}
