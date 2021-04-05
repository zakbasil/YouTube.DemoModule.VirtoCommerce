using YouTube.DemoModule.Core.Models;

using YouTube.DemoModule.Core.Services;
using YouTube.DemoModule.Data.Repositories;
using System.Linq;
using System.Threading.Tasks;
using System;
using VirtoCommerce.Platform.Core.Events;
using YouTube.DemoModule.Core.Events;

namespace YouTube.DemoModule.Data.Services
{
    public class YoutubeAddService : IYoutubeAddService
    {
        private readonly IYoutubeRepository _repository;
        private readonly IEventPublisher _eventPublisher;

        public YoutubeAddService(IYoutubeRepository repository, IEventPublisher eventPublisher)
        {
            _repository = repository;
            _eventPublisher = eventPublisher;
        }

        public string Add(YoutubeVideo sample)
        {

                string status;
                try
                {
                YoutubeVideo videoSample = new YoutubeVideo();
                YouTubeDemoModuleDbContext context = new YouTubeDemoModuleDbContext();
                videoSample.CreatedBy = sample.CreatedBy;
                videoSample.CreatedDate = sample.CreatedDate;
                videoSample.Id = sample.Id;
                videoSample.ModifiedBy = sample.ModifiedBy;
                videoSample.ModifiedDate = sample.ModifiedDate;
                videoSample.ProductId = sample.ProductId;
                videoSample.VideoTitle = sample.VideoTitle;
                videoSample.YoutubeId = sample.YoutubeId;



                context.YouTubeDemo.Add(videoSample);
                context.SaveChanges();
                    status = "Success";
            }
                catch (Exception ex)
                {
                    status = ex.InnerException.Message;
                }
                return status;
            }

        public async Task<string> Addition(YoutubeVideo video)
        {
             
                await _eventPublisher.Publish(new VideoAdditionEvent { Video = video });
                var result = Add(video);
                return result;
            
        }
    }
}

