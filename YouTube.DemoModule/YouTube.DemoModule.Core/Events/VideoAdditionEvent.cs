using System;
using System.Collections.Generic;
using System.Text;
using VirtoCommerce.Platform.Core.Events;
using VirtoCommerce.OrdersModule.Core.Model;
using YouTube.DemoModule.Core.Models;

namespace YouTube.DemoModule.Core.Events
{
    public class VideoAdditionEvent : DomainEvent
    {
        public YoutubeVideo Video { get; set; }
    }
}