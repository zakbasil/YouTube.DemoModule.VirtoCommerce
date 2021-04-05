using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VirtoCommerce.Platform.Core.Events;
using YouTube.DemoModule.Core.Events;

namespace YouTube.DemoModule.Data.Handlers
{
    public class VideoAdditionHandler : IEventHandler<VideoAdditionEvent>
    {
        private readonly IEventPublisher _eventPublisher;
        public VideoAdditionHandler(IEventPublisher eventPublisher)
        {
            _eventPublisher = eventPublisher;
        }
        public Task Handle(VideoAdditionEvent message)
        {
            //Some logic here
            //await _eventPublisher.Publish<VideoAdditionEvent>(new VideoAdditionEvent { Video = message.Video});
            return Task.FromResult(0);

        }
    }
}