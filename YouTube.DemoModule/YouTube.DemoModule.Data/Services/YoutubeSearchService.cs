using YouTube.DemoModule.Core.Models;
using YouTube.DemoModule.Core.Services;
using YouTube.DemoModule.Data.Repositories;
using System.Linq;
using System.Threading.Tasks;
using VirtoCommerce.Platform.Core.Common;
using VirtoCommerce.Platform.Core.Events;
using YouTube.DemoModule.Core.Events;

namespace YouTube.DemoModule.Data.Services
{
    public class YoutubeSearchService : IYoutubeSearchService
    {
        private readonly IYoutubeRepository _repository;
        

        public YoutubeSearchService(IYoutubeRepository repository)
        {
            _repository = repository;
            
        }



        public Task<YoutubeSearchResult> Search(YoutubeSearchCriteria criteria)
        {
            var query = _repository.YoutubeVideos;

            if (!criteria.SearchPhrase.IsNullOrEmpty())
            {
                query = query.Where(x => x.VideoTitle.Contains(criteria.SearchPhrase));
            }

            var videoIds = query.Skip(criteria.Skip)
                                 .Take(criteria.Take)
                                 .Select(x => x.Id)
                                 .ToList();




            var result = new YoutubeSearchResult
            {

                TotalCount = _repository.YoutubeVideos.Count(),
                Results = _repository.YoutubeVideos.Where(x => videoIds.Contains(x.Id)).ToArray().OrderBy(x => videoIds.IndexOf(x.Id)).ToList()
            };

            return Task.FromResult(result);
        }

    }
}

